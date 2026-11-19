require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

async function startServer() {
    try {
        await connectToDB()
    } catch (error) {
        console.error("Database connection failed:", error.message)
        console.error("The API will start, but database and interview operations will be unavailable.")
    }

    const port = Number(process.env.PORT) || 3000
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`)
    })
}

startServer()