const nodeMailer = require("../config/nodemailer");
require("dotenv").config();

exports.auth = async (randomCode, userData) => {
    try {
        let data = {
            randomCode: randomCode,
            user_email: userData.email,
            user_name: userData.name
        }
        const [htmlString] = await Promise.all([
            await nodeMailer.renderTemplate(data, "/auth"),
        ]);
        await Promise.all([
            await nodeMailer.transporter.sendMail({
            from: `"ANONYMOUS-Project 👻" ${await process.env.SMTP_USER_NAME}`,
            to: await userData.email,
            subject: "Verify your email",
            html: await htmlString
        })]).then(()=>{
            console.log("Email sent successfully!");
        });
    }
    catch (error) {
        console.log(`Error: `, error);
    }
}