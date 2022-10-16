/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");
const YAML = require("yaml");

const yamlPath = path.join(__dirname, "../public/api/openapi.yaml");
const yamlContent = fs.readFileSync(yamlPath, { encoding: "utf-8" });
const jsonContent = JSON.stringify(YAML.parse(yamlContent), null, 2);
const jsonPath = yamlPath.replace(/\.yaml$/, ".json");

fs.writeFileSync(jsonPath, jsonContent);
