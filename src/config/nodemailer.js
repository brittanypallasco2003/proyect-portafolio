//Importar nodemailer
const nodemailer = require("nodemailer");

//creación del transportador para el envió de correos utilizando SMTP
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


//Establecer la estructura del correo electrónico
module.exports.sendMailToUser = async(userMail,token)=>{
    console.log(token);
    let info = await transporter.sendMail({
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Verifica tu cuenta de correo electrónico",
    html: `<a href="https://webportafolio-ltbj.onrender.com/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    console.log("Message sent: %s", info.messageId);
}