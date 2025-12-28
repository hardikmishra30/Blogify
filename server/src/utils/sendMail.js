import nodemailer from "nodemailer";

export const sendFeedbackMail = async (message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FEEDBACK_EMAIL,
      pass: process.env.FEEDBACK_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Blogify Feedback" <${process.env.FEEDBACK_EMAIL}>`,
    to: process.env.FEEDBACK_EMAIL,
    subject: "New Feedback Received - Blogify",
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
