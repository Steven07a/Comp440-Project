import execsql from "execsql";

var dbConfig = {
  host: "localhost",
  user: "user",
  password: "password",
  database: "comp440_project",
};

const execute = execsql.config(dbConfig)

export default execute;