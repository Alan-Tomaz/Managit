import multer from "multer";

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets/')
    },
    filename: function (req, file, cb) {
        let fileType = file.originalname.split('.');
        fileType = fileType[fileType.length - 1];
        const supportedFiles = ["jpg", "jpeg", "png"];

        if (supportedFiles.includes(fileType)) {
            const pictureName = Date.now() + '-' + file.originalname;
            req.body.picturePath = pictureName;
            cb(null, pictureName);
        } else {
            cb(new Error('File Type Not Supported'))
        }
    }
})

export const upload = multer({ storage, limits: { fileSize: 3000000 } })