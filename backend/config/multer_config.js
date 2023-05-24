const multer = require("multer");
const fs=require("fs")
var storageconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        if(!fs.existsSync("../uploads")){
            fs.mkdirSync("../uploads")
        }
        var foldername= `../uploads/${req.body.username}`
        if(!fs.existsSync(foldername))
            fs.mkdirSync(foldername)
        callback(null, foldername); // storing images in uploada folder
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}.${file.originalname}`) //giving unique name to each file being uploaded
    }
})

const docfilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

var upload = multer({
    storage: storageconfig,
    fileFilter: docfilter,
})

const studentUpload = upload.fields([
    { name: "image" }, // give name that you mentioned in form i.e. the key of json coming in req
    { name: "identification" },
    { name: "reports" }
])

const therapistUpload = upload.fields([
    { name: "image" },
    { name: "Identity" }, // give name that you mentioned in form i.e. the key of json coming in req
    { name: "Certification" },
    { name: "Resume" }
])

module.exports={studentUpload,therapistUpload};