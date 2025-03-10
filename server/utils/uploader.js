const cloudinary = require('cloudinary').v2

// Image Upload with Compression
exports.uploadImageToCloudinary = async (file, folder) => {
    const options = {
        folder,
        resource_type: 'image',
        quality: 'auto', // Automatically optimize the image quality
        fetch_format: 'auto', // Automatically convert to the best format (e.g., WebP for browsers that support it)
        width: 800, // Resize the image (optional, set to desired width)
        crop: 'limit' // Resize and limit the width without stretching the image
    };
    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Error uploading and compressing image to Cloudinary", error);
        throw error;
    }
};

// Video Upload with Compression
exports.uploadVideoToCloudinary = async (file, folder) => {
    const options = {
        folder,
        resource_type: 'video',
        quality: 'auto', // Automatically adjust the quality
        bitrate: 500, // Optional: reduce the bitrate to compress the video
        fetch_format: 'auto', // Convert to the best video format (e.g., WebM, MP4)
        width: 1280, // Resize video width (optional)
        height: 720, // Resize video height (optional)
        crop: 'limit', // Limit the video dimensions without distortion
    };
    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Error uploading and compressing video to Cloudinary", error);
        throw error;
    }
};

// Music Upload with Compression (using same video resource type)
exports.uploadMusicToCloudinary = async (file, folder) => {
    console.log(file)
    const options = {
        folder,
        resource_type: "video", // Cloudinary treats audio as video
        format: "mp3", // Ensure it is saved as MP3
        audio_codec: "mp3", // Explicitly set the audio codec
        overwrite: true, // Replace if already exists
        transformation: [
            { quality: "auto" }, // Auto-adjust quality
            { fetch_format: "auto" } // Convert to best format
        ],
    };

    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Error uploading music to Cloudinary:", error);
        throw error;
    }
};

