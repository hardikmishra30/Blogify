import { sendFeedbackMail } from "../utils/sendFeedbackMail.js";

export const submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    await sendFeedbackMail(message);

    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
    });
  } catch (error) {
    console.error("Feedback error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send feedback",
    });
  }
};
