const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require('../autenticate');
const multer = require('multer');
const uploadRouter  = express.Router();

//multer configuration to allow us to setup detsination and file name for the server
// these are the options for the multer module
var storage = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,'public/images');
        },
        filename: (req,file,cb)=>{
            cb(null,file.originalname);
        }
    }
);

const imageFileFilter = (req,file,cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('Your can upload only image files!'));
    }
    cb(null,true);
};
// running multer module
const upload = multer({storage:storage,fileFilter:imageFileFilter});



uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403 ;  //suggests not supported request
    res.end('put is edit message not supporeted on images');
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res,)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403 ;  //suggests not supported request
    res.end('put is edit message not supporeted on dishes');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403 ;  //suggests not supported request
    res.end('put is edit message not supporeted on dishes');
})
module.exports = uploadRouter;