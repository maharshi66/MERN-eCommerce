import express from 'express'
import path from 'path'
import multer from 'multer'

const router = express.Router()

//Initialize storage engine
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        //Callback with the filename
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    } 
})

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        return cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

router.post('/',upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router