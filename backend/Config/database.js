const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;

const connectDB = () => {
    mongoose
        .connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log(`Database connect successfully! 😊😊😊`))
        .catch((error) => {
            console.log(`Database Failed To Connect! 😭😭😭`);
            console.log(error);
            process.exit(1);
        });
};

module.exports = connectDB;
