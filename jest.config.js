require("dotenv-safe/config");

process.env.DATABASE_URL = `${process.env.DATABASE_URL}_testdb?schema=test_schema`;

const { exec } = require("child_process");

// @TODO transformar esta execuão sincrona para não concorrer com a execução dos testes
exec("yarn db:migrate", (error, stdout, stderr) => {
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
