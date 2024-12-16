import transporter from "./nodemailer";

export const sendEmail = async (email: string) => {
    try {
        const mailOptions = {
            from: "Team </> VoTech <team.votech@gmail.com>",
            to: email,
            subject: "Welcome to our platform!",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                    <h1 style="color: #ff6f00; text-align: center;">Welcome to VoTech!</h1>
                    <p style="font-size: 16px; color: #333; line-height: 1.5;">
                        Thank you for joining us! We're excited to have you on board and can't wait to share the latest updates with you.
                    </p>
                    <p style="font-size: 16px; color: #333; line-height: 1.5;">
                        Stay tuned for our amazing features and news.
                    </p>
                    <div style="text-align: center; margin-top: 20px;">
                     <a href="https://vo-tech.vercel.app/" 
                           style="background-color: #ff6f00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                           Visit our platform
                        </a>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.error("Error sending email:", e);
        throw new Error("An error occurred while sending the email.");
    }
}
