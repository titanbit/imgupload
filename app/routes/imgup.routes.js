module.exports = (app) => {

    const { uploadFile, getImages, getImage, edit_image, editImage, deleteImage } = require("../controller/imgup.controller");

    const upload = require('../middleware/imgUpload')

    //add image
    app.post('/img', upload.single('image'), uploadFile);

    //get all images
    app.get('/imglist', getImages);
    //get edit image section
    app.get('/editimg/:id', getImage);
    app.post('/edit/:id', upload.single('image'), edit_image);
    // delete image
    app.get('/img/:id', deleteImage)



}