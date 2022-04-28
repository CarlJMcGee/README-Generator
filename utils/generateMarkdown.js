const fs = require("fs");

// If there is no license, return an empty string
const renderLicenseBadge = (license) => {
  let licenseSplitArr = license.split(" ");
  let licenseShort = licenseSplitArr.join("--");

  return `
  ![license badge](https://img.shields.io/badge/license-${licenseShort}-blue);
  `;
};

// If there is no license, return an empty string
const renderLicenseLink = (license) => {
  switch (license) {
    case "Apache License 2.0":
      if (!fs.existsSync("./dist/apache.txt")) {
        fs.copyFile("./src/apache.txt", "./dist/apache.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./apache.txt`;
      break;

    case "Boost Software License 1.0":
      if (!fs.existsSync("./dist/boost.txt")) {
        fs.copyFile("./src/boost.txt", "./dist/boost.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./boost.txt`;
      break;

    case "GNU AGPLv3":
      if (!"./dist/agpl-3.txt") {
        fs.copyFile("./src/agpl-3.txt", "./dist/agpl-3.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./agpl-3.txt`;
      break;

    case "GNU GPLv3":
      if (!"./dist/gpl-3.txt") {
        fs.copyFile("./src/gpl-3.txt", "./dist/gpl-3.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./gpl-3.txt`;
      break;

    case "GNU LGPLv3":
      if (!"./dist/lgpl-3.txt") {
        fs.copyFile("./src/lgpl-3.txt", "./dist/lgpl-3.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./lgpl-3.txt`;
      break;

    case "MIT License":
      if (!"./dist/mit.txt") {
        fs.copyFile("./src/mit.txt", "./dist/mit.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./mit.txt`;
      break;

    case "Mozilla Public License 2.0":
      if (!"./dist/mozilla.txt") {
        fs.copyFile("./src/mozilla.txt", "./dist/mozilla.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./mozilla.txt`;
      break;

    case "The Unlicense":
      if (!"./dist/unlicense.txt") {
        fs.copyFile("./src/unlicense.txt", "./dist/unlicense.txt", (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      return `./unlicense.txt`;
      break;

    default:
      break;
  }
};

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// check for stock or custom guideline
const contributeCreate = (confirm, guideline) => {
  if (confirm) {
    fs.copyFile(
      "./src/code_of_conduct.md",
      "./dist/code_of_conduct.md",
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
    return `
  [Click to see the Contributor Covenant guidelines](./code_of_conduct.md)
    `;
  } else {
    return guideline;
  }
};

// ✔️ Create a function to generate markdown for README
const generateMarkdown = (data) => {
  const {
    title,
    description,
    installation,
    usage,
    credits,
    license,
    contributing,
    contributingCustom,
    tests,
  } = data;

  return `
  # ${title}
  
  [${renderLicenseBadge(license)}](${renderLicenseLink(license)})
  
  ## Description
  
  ${description}

  ## Table of Contents

  - [Installation](#Installation)

  - [Usage](#Usage)

  - [Credits](#Credits)

  - [License](#License)

  - [Contributing](#Contributing)

  - [Tests](#Tests)

  ## Installation

  ${installation}

  ## Usage

  ${usage}

  ## Credits

  ${credits}

  ## License

  [This project uses ${license}](${renderLicenseLink(license)})

  ## Contributing

  ${contributeCreate(contributing, contributingCustom)}

  ## Tests

  ${tests}
  `;
};

const createREADME = (content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/README.md", content, (err) => {
      if (err) {
        reject(err);
        return;
      }

      console.log("README Created");

      resolve({
        ok: true,
        message: "README Created",
      });
    });
  });
};

module.exports = {
  generateMarkdown,
  createREADME,
};
