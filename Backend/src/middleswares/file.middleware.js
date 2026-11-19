const multer = require("multer")
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(new Error("Only PDF and DOCX resume files are allowed"))
        }
        callback(null, true)
    }
})


module.exports = upload