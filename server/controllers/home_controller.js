const User = require("../models/user");
const nodemailer = require("nodemailer");
const mailer = require("../controllers/mail_controller");
require("dotenv").config();

module.exports.home = function (req, res) {
    return res.status(200).send({
        message: `Connected to Server`
    });
}

module.exports.auth = async function (req, res) {
    const userData = await req.body;

    await User.findOne({ email: await userData.email }).then(async (user) => {
        if (user) {
            return res.status(201).send({
                message: `User already exists!! Please login`
            });
        }
        if (!user) {
            let randomCode = Math.floor(Math.random() * 1000000);
            await mailer.auth(randomCode, userData);
            return res.status(200).send({
                otp: `${randomCode}`,
                user: userData
            });

        }
    });

}

module.exports.register = async function (req, res) {
    const userData = await req.body.userData;

    let data = {
        name: await userData.name,
        email: await userData.email,
        password: await req.body.password
    }

    await User.create(data).then(async (user) => {
        return res.status(200).send({
            user: await user
        });
    }).catch((err) => {
        console.log(`Error ${err} in creating user`);
    });

}

module.exports.login = async function (req, res) {
    await User.findOne({ email: req.body.userEmail }).then(async (user) => {
        if (user === null) {
            return res.status(201).send({
                error_msg: "Email doesn't exists!! Please register your Email.."
            });
        }
        if (await req.body.userPassword !== user.password) {
            return res.status(201).send({
                error_msg: "Incorrect Password.. Try Again!"
            });
        }
        return res.status(200).send({
            user: user
        });

    });
}

module.exports.forgotPassword = async function (req, res) {

    await User.findOne({ email: await req.body.email }).then(async (user) => {
        if (!user) {
            return res.status(201).send({
                message: `Email doesn't exists.. Please register !!`
            });
        }
        if (user) {
            let userData = await user;
            let randomCode = Math.floor(Math.random() * 1000000);
            await mailer.auth(randomCode, userData).catch((err) => {
                console.log(err);
                return res.status(203).send({
                    error_msg: "Error in mailing OTP !"
                });
            });
            return res.status(200).send({
                otp: `${randomCode}`,
                user: userData,
                success_msg: "OTP sent to the Email !"
            });


        }
    });
}

module.exports.resetPassword = async (req, res) => {
    try {
        let user_id = await req.body.user_id;
        let password = await req.body.password;

        const beforeUpdateUser = await User.findByIdAndUpdate(user_id, { password })
        const updatedUser = await User.findById(user_id);
        return res.status(200).json({
            success_msg: "Password Reset Successful!",
            userData: await updatedUser
        });
    }
    catch (err) {
        console.error(err);
    }

}
