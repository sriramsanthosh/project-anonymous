const User = require("../models/user");

module.exports.home = function(req, res){
    // res.send("This is the home page of Server");
    return res.status(200).send({
        message: `Connected to Server`
    });
}

function sendOTP(randomNumber, user){
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        pool: true,
        host: 'smtp.elasticemail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sriramsanthosh321@gmail.com',
            pass: '12F9C36CBA8DDDDD240E8EDC6ECC35D05EC8'
        }
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `"ANONYMOUS-Project 👻" sriramsanthosh321@gmail.com`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Verify your email", // Subject line
        text: `OTP : ${randomNumber}`, // plain text body
        html: `<div class="body" style = "font-size: large;">
        <h2>Dear ${user.name},</h2>
        <p>Share your thoughts anonymously with others.</p>
        <p>Thank you for choosing our platform! <br> Please use the following OTP to complete the verification process:</p>
        <div class ="msgcontentContainer" style = "margin:auto; text-align: center; border:2px solid lightgray; width: fit-content; padding: 15px 20px; ">
            <h2>Your OTP Code</h2>
            <h1 style="letter-spacing: 0.5cm;">${randomNumber}</h1>
        </div>
        <p>Please enter this code on the verification page to confirm your email address. <br>If you did not request this verification, please ignore this email.</p>
        <p>-- <br>Best Regards<br> <a href="https://www.linkedin.com/in/sriramsanthosh/" target="_blank" style="text-decoration: underline;">Sriram Santhosh</a></p>
    </div>`, // html body
      }).then((message)=>{
        console.log(message);
      }).catch((err)=>{
        console.log(`Error in nodemailer : ${err}`);
      });

    //   console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //
      // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
      //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
      //       <https://github.com/forwardemail/preview-email>
      //
    }

    main().catch(console.error);

}



module.exports.auth = function(req, res){ 
    const userData = req.body;

    User.findOne({email: userData.email}).then((user)=>{
        if(!user){
            let randomNumber = Math.floor(Math.random()*1000000);
            sendOTP(randomNumber, userData);
            setTimeout(() => {
                return res.status(200).send({
                    otp: `${randomNumber}`,
                    user: userData
                });
                    
            }, 2000);
            
        }
        return res.status(201).send({
            message: `User already exists!! Please login`
        });
    });
    
}

module.exports.register = function(req, res){
    const userData = req.body;

    User.create(userData).then((user)=>{
        return res.status(200).send({
            user: user
        });
    }).catch((err)=>{
        console.log(`Error ${err} in creating user`);
    });

}

module.exports.login = function(req, res){

    User.findOne({email: req.body.userEmail}).then((user)=>{
        if(user === null){
            return res.status(201).send({
                message: `😑 User doesn't exists!! Please register your account..`
            });
        }
        
        let randomNumber = Math.floor(Math.random()*1000000);
        sendOTP(randomNumber, user);

        setTimeout(() => {
            return res.status(200).send({
                otp: `${randomNumber}`,
                user: user
            });
        }, 2000);
        
    });
}
