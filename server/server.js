const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { connectDB } = require('./config/db-connection');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
const fileUpload= require('express-fileupload') 

app.use(cors({
    origin: "*",
    credentials: true,
}));

// Routes
const authRoutes = require('./routes/auth-routes');
const postRoutes = require('./routes/post-route');

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./temp"
}))

require('./config/cloudinary-connect').cloudinaryConnect();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
