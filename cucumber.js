const { mkdirSync } = require("node:fs");

mkdirSync("reports", { recursive: true });

module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["features/step-definitions/**/*.ts", "hooks/**/*.ts"],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html"
    ],
    formatOptions: {
      snippetInterface: "async-await"
    }
  }
};
