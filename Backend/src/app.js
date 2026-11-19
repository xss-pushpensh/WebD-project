const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ limit: "1mb" }))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL ? [
        process.env.FRONTEND_URL
    ] : [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    credentials: true
}))

app.get("/api/health", (req, res) => {
    res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
        status: mongoose.connection.readyState === 1 ? "ok" : "database_unavailable",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Route not found." })
})

app.use((error, req, res, next) => {
    if (error instanceof require("multer").MulterError) {
        const message = error.code === "LIMIT_FILE_SIZE"
            ? "Resume file must be smaller than 5MB."
            : "Invalid resume upload."
        return res.status(400).json({ message })
    }
    if (error?.message?.includes("Only PDF and DOCX")) {
        return res.status(400).json({ message: error.message })
    }
    console.error(error)
    res.status(error.status || 500).json({
        message: error.status ? error.message : "Internal server error."
    })
})

module.exports = app