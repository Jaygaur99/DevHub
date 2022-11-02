require('dotenv').config();
const { app, httpsServer } = require('./app');
const connectDB = require('./Config/database');
const cloudinary = require('cloudinary').v2;

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const { PORT } = process.env;

httpsServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
