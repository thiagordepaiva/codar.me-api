require("dotenv-safe/config");

process.env.DATABASE_URL = `${process.env.DATABASE_URL}_testdb?schema=test_schema`;

const { execSync } = require("child_process");

execSync("yarn prisma migrate deploy", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

const config = {
  verbose: true,
};

module.exports = config;
