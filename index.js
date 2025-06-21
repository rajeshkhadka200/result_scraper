import axios from "axios";
import * as cheerio from "cheerio";

// utils functions
import symbolNum from "./utils/symbolNumber.js";
import savetoExcel from "./utils/savetoExcel.js";

const fetchData = async () => {
  const result = [];

  const subjectMap = {
    "Applied Physics": "PHY",
    "Basic Electrical Engineering": "BEE",
    "Calculus I": "CAL_I",
    "Electronics Devices and Circuits": "EDC",
    "Problem Solving Techniques": "PST",
    "Programming in C": "PRGC",
  };

  for (let i = 0; i < 47; i++) {
    const URL = `https://exam.pu.edu.np:9094/Home/ViewResultSubmit?Year=2024&Academic_System=Fall&Semester=1st&Exam_Type=Regular_Retake&Program=Bachelor%20of%20Engineering%20in%20Information%20Technology&Symbol_Number=${symbolNum[i]}&DOB=2025-06-10`;

    try {
      const markup = (await axios.get(URL)).data;
      const $ = cheerio.load(markup);

      const $name = $('span:contains("Student Name:")').text().split(":")[1];
      const $roll = $('span:contains("Exam Roll No:")').text().split(":")[1];

      const academics = {
        PHY: "",
        BEE: "",
        CAL_I: "",
        EDC: "",
        PST: "",
        PRGC: "",
      };

      $("table tbody tr").each((index, row) => {
        const cols = $(row).find("td");
        if (cols.length < 5) return;

        const subjectTitle = $(cols[2]).text().trim();
        const grade = $(cols[4]).text().trim();
        const code = subjectMap[subjectTitle];

        if (code) {
          academics[code] = grade;
        }
      });

      // Extract SGPA
      let SGPA = "";
      $("table tbody tr td").each((index, cell) => {
        const text = $(cell).text().trim();
        if (text.startsWith("SGPA")) {
          SGPA = text.split("=")[1]?.trim() || "";
        }
      });

      result.push({
        stuDetails: {
          name: $name?.trim() || "N/A",
          rollNum: $roll?.trim() || "N/A",
        },
        academics,
        SGPA,
      });

      console.log(`Processed Symbol Number: ${symbolNum[i]}`);
    } catch (err) {
      console.error(
        `Error fetching symbol number ${symbolNum[i]}:`,
        err.message
      );
    }
  }
  savetoExcel(result);

  console.log("\n Final Result:", result);
};

fetchData();
