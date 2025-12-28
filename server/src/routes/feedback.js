import express from "express";
import { sendFeedbackMail } from "../utils/sendMail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required" });
  }

  try {
    await sendFeedbackMail(feedback);
    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send feedback" });
  }
});

export default router;
