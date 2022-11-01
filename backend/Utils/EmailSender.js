const nodemailer = require('nodemailer');

const emailSender = async (objectEmail) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    let message = {
        from: process.env.SENDER_MAIL,
        to: objectEmail.toemail,
        subject: objectEmail.subject,
        text: objectEmail.message,
    };

    await transporter.sendMail(message);
};

module.exports = emailSender;
