
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, // Environment variable for email username
                pass: process.env.EMAIL_PASSWORD  // Environment variable for email password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            text: text,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        
    }
};

export default sendEmail;
module.exports = sendEmail;
