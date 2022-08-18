const nodemailer = require('nodemailer');

class CompanyController {

    async sendContactEmail (req, res) {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'user@gmail.com',
              pass: 'userPass'
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.CONTACT_MAIL,
            subject: `Email from ${req.body.name}: ${req.body.subject}`,
            text: req.body.text
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ 
                    message: 'Failed to send email',
                });
            }
            console.log('Email sent successfully', info.response);
        });
    }
}

module.exports = new CompanyController();