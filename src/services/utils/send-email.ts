import nodemailer, { SentMessageInfo } from 'nodemailer'
import { config } from '../../utils/config'
import { MailOptions } from 'nodemailer/lib/json-transport'

export function sendEmail(to: string, subject: string, message: string): void {
    let transporter = nodemailer.createTransport({
        service: config.emailService,
        auth: {
          user: config.emailUser,
          pass: config.emailPass
        }
    })

    let mailOptions: MailOptions = {
        from: config.emailUser,
        to: to,
        subject: subject,
        html: message
    }
      
    transporter.sendMail(mailOptions, function(error: Error | null, info: SentMessageInfo) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}