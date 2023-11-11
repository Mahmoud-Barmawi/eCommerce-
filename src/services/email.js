import nodemailer from "nodemailer";
export async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "mahmoudbarmawi926@gmail.com",
            pass: "ikpr okhc sbua pull",
        },
    });

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <mahmoudbarmawi926@gmail.com>', 
        to,
        subject,
        html
    });
    return info;
}

