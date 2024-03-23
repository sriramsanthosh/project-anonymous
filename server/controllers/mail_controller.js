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

        await nodeMailer.transporter.sendMail({
            from: `"ANONYMOUS-Project 👻" ${await process.env.SMTP_USER_NAME}`,
            to: await userData.email,
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