"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../utils/config");
function sendEmail(to, subject, message) {
    let transporter = nodemailer_1.default.createTransport({
        service: config_1.config.emailService,
        auth: {
            user: config_1.config.emailUser,
            pass: config_1.config.emailPass
        }
    });
    let mailOptions = {
        from: config_1.config.emailUser,
        to: to,
        subject: subject,
        html: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
//# sourceMappingURL=send-email.js.map