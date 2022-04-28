const fs = require("fs");

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = (license) => {
  let licenseSplitArr = license.split(" ");
  let licenseShort = licenseSplitArr.join("--");

  return `
  ![license badge](https://img.shields.io/badge/${licenseShort}-MIT-blue);
  `;
};

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

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
  [Click to see the Contributor Covenant contribution guidelines](./code_of_conduct.md)
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

  ${renderLicenseBadge(license)}

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
