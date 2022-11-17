import mysql from "mysql"

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "comp440_project",
    multipleStatements: true
});

export default db;