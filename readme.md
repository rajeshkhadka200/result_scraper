# 📊 PU Result Scraper

This is a Node.js-based web scraper that automatically fetches semester-wise results of BE IT students from the official Pokhara University result portal.

## 🚀 Features

- Scrapes individual student data using their symbol numbers.
- Extracts:
  - Student name
  - Exam roll number
  - Subject-wise grades
  - Semester GPA (SGPA)
- Maps full subject names to short codes (e.g., "Applied Physics" → `PHY`).
- Handles multiple students (batch scraping).
- Logs progress and skips broken requests gracefully.

## 🛠️ Tech Stack

- **Node.js**
- **Axios** – For making HTTP requests
- **Cheerio** – For HTML parsing and scraping
- **ES Modules** – Modern JavaScript support

## 📦 Installation

```bash
git clone https://github.com/rajeshkhadka200/result_scraper.git
cd result-scraper
npm install
```

### 🧠 Notes

- The scraper assumes a fixed HTML structure. If the PU result page changes, selectors may need updates.

- This is for educational purposes only.

---

Let me know if you want to:

- Publish this as an NPM tool or CLI version

Made with ❤️ by Rajesh Khadka
