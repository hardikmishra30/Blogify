router.post("/", async (req, res) => {
  const feedback = req.body.feedback || req.body.message || req.body.content;

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required" });
  }

  try {
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

    return res.status(200).json({
      success: false,
      message: "Feedback received (email may have failed)",
    });
  }
});

export default router;
