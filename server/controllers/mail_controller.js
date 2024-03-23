const nodeMailer = require("../config/nodemailer");
require("dotenv").config();

exports.auth = async (randomCode, userData) => {
    try {
        let data = {
            randomCode: randomCode,
            user_email: userData.email,
            user_name: userData.name
        }
        let htmlString = await nodeMailer.renderTemplate(data, "/auth").catch((err) => {
            console.log(err);
        });

        nodeMailer.transporter.sendMail({
            from: `"ANONYMOUS-Project 👻" ${process.env.SMTP_USER_NAME}`,
            to: userData.email,
            subject: "Verify your email",
            html: await htmlString
        }, (err, msg) => {
            if (err) {
                console.log(err);
            }
        });

    }
    catch (error) {
        console.log(`Error: `, error);
    }
}