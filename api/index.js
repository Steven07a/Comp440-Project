import express from "express";
import usersRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import fileRoutes from "./routes/execute.js"
import postRoutes from "./routes/post.js"
import cookieParser from "cookie-parser"


/* This File is known as middleware file basically this is what handles 
the connection from the frontend to the backend 
*/
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/users", usersRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/executeFile", fileRoutes)
app.use("/api/post", postRoutes)

// Which port to use for server
app.listen(3001, () => {
    console.log("server open on port 3001")
})