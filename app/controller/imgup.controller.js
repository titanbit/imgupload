const Image = require("../models/imgup.models")
const fs = require('fs');
const path = require('path')

//upload image
exports.uploadFile = async (req, res, next) => {
    try {
        var imageObj = {
            name: req.body.name,
            img: {
                data: fs.readFileSync(path.join(__dirname + '../../../uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        const item = await Image.create(imageObj);
        res.redirect('/imglist');
    } catch (error) {
        console.log(error)
    }
}

//get all images
exports.getImages = async (req, res) => {
    try {
        const items = await Image.find({});
        res.render('list', { items: items });
    } catch (error) {
        console.log(error)
    }
}


//get single image
exports.getImage = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Image.findOne({ _id: id })
        return res.render(`editImage`, { item: item })
    } catch (err) {
        console.log(err)
    }

}

//edit image section
exports.edit_image = async (req, res) => {
    try {
        const id = req.params.id;
        let item = await Image.findOne({ _id: id });
        console.log(req.file);
        var imageObj = {
            name: req.body.name || item.name,
            img: {
                data: fs.readFileSync(path.join(__dirname + '../../../uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        item = await Image.findByIdAndUpdate(req.params.id, imageObj, { new: true });
        res.redirect('/imglist');

    } catch (err) {
        console.log(err)
    }

}

//delete image
exports.deleteImage = async (req, res) => {
    try {
        const item = await Image.findByIdAndRemove({ _id: req.params.id });
        res.redirect('/imglist')
    } catch (error) {
        console.log(error)
    }
}