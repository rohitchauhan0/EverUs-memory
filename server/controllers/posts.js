const Post = require("../models/posts");
const path = require("path");
const {uploadImageToCloudinary, uploadMusicToCloudinary, uploadVideoToCloudinary} = require("../utils/uploader")

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let imageUrl = null;
        let videoUrl = null;
        let musicUrl = null;
        const user = req.user;
    if(!user){
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

        // Check if files are uploaded and assign them accordingly
        if (req.files) {
            const files = req.files;

            if (files.image) {
                const image = files.image;
                const url= await uploadImageToCloudinary(image);
                imageUrl = url.url
            }

            if (files.video) {
                const video = files.video;
               const url= await uploadVideoToCloudinary(video);
               videoUrl = url.url
            }

            if (files.music) {
                const music = files.music;
                const url= await uploadMusicToCloudinary(music);
                musicUrl = url.url
            }
        }

     
        // Save post in the database
        const post = await Post.create({
            text,
            image: imageUrl,
            video: videoUrl,
            music: musicUrl,
            createdBy: user.id
        });

        res.status(200).json({ message: "Post created successfully", post });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(400).json({ message: "Error creating post", error });
    }
};

module.exports = { createPost };    
