import mysql from "mysql"

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "comp440_project_test",
    multipleStatements: true
});

export default db;