const { default: mongoose } = require("mongoose");

const postModal = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    music: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Post", postModal)