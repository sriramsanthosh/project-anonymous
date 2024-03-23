const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASSCODE
    }
});

const renderTemplate = async (data, relativePath) => {
    let mailHTML;
    console.log(data, relativePath);
    await ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath + '.ejs'),
        data,
        async (err, template) => {
            if (err) {
                console.log(`Error ${err} in rendering template`);
            }
            mailHTML = await template;
        }
    );
    console.log(mailHTML);
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}