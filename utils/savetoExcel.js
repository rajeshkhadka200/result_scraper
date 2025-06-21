import ExcelJS from "exceljs";
const savetoExcel = (result) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  worksheet.columns = [
    {
      header: "Name",
      key: "name",
      width: 30,
    },
    {
      header: "Roll Num",
      key: "roll",
      width: 30,
    },
    {
      header: "PHY",
      key: "phy",
      width: 10,
    },
    {
      header: "BEE",
      key: "bee",
      width: 10,
    },
    {
      header: "CAL_I",
      key: "cal",
      width: 10,
    },
    {
      header: "EDC",
      key: "edc",
      width: 10,
    },
    {
      header: "PST",
      key: "pst",
      width: 10,
    },
    {
      header: "PRGC",
      key: "prgc",
      width: 10,
    },
    {
      header: "SGPA",
      key: "sgpa",
      width: 10,
    },
  ];

  result.forEach((item, index) => {
    worksheet.addRow({
      name: item?.stuDetails?.name,
      roll: item?.stuDetails?.rollNum,
      phy: item?.academics?.PHY,
      bee: item?.academics?.BEE,
      cal: item?.academics?.CAL_I,
      edc: item?.academics?.EDC,
      pst: item?.academics?.PST,
      prgc: item?.academics?.PRGC,
      sgpa: item?.SGPA,
    });
  });
  // Save the workbook to a new file
  workbook.xlsx.writeFile("COSMOS_BE_IT_2024_FALL.xlsx").then(() => {
    console.log("File created successfully");
  });
};

export default savetoExcel;
