require('dotenv').config();
const AWS = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3Config = new AWS.S3({
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    },
    Bucket: process.env.BUCKET + "/img/profile-pics",
    region: 'us-east-1'
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// Test if Multer is working
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'img/profile-pics')
    },
    filename: (req, file, cb) => {
        cb(null, req.app.locals.user.username + '-profileImg.jpg')
    }
})

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.BUCKET,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, req.app.locals.user.username + '-profileImg.jpg')
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
}).single('profile-pic');

module.exports = { upload };
//exports.profileImage = upload; 