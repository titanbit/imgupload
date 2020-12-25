const mongoose = require('mongoose');

const ImgSchema = mongoose.Schema({
    name: { type: String },
    img: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
}
);

module.exports = new mongoose.model("Imgup", ImgSchema)