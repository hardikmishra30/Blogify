import express from "express";
import { sendFeedbackMail } from "../utils/sendMail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required" });
  }

  try {
    // ⏱️ Do NOT let email hang forever
    await Promise.race([
      sendFeedbackMail(feedback),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), 10000)
      ),
    ]);

    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
    });
  } catch (error) {
    console.error("Feedback error:", error);

    // 🔥 ALWAYS respond
    return res.status(200).json({
      success: false,
      message: "Feedback received (email may have failed)",
    });
  }
});

export default router;
