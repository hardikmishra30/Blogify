import nodemailer from "nodemailer";

export const sendFeedbackMail = async (message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FEEDBACK_EMAIL,
      pass: process.env.FEEDBACK_EMAIL_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  // This prevents hanging forever
  await transporter.verify();

  const mailOptions = {
    from: `"Blogify Feedback" <${process.env.FEEDBACK_EMAIL}>`,
    to: process.env.FEEDBACK_EMAIL,
    subject: "New Feedback Received - Blogify",
    text: message,
  };

  return await transporter.sendMail(mailOptions);
};
