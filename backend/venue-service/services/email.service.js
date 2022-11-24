
const nodemailer = require("nodemailer");

const  sendEmail = async (reqBody) => {

    let { to, from, subject, message } = reqBody;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bookmyvenueteam15@gmail.com',
            pass: 'lugfpqptoxxhurfu'
        }
    })
// bookmyvenueteam15@gmail.com
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Info .... ' + info);
            console.log("Email Sent: " + info.response);
        }
    });

}

module.exports = { sendEmail }

// lugfpqptoxxhurfu
