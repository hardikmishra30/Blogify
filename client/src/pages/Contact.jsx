import "../styles/Page.css";
import { useState } from "react";

const Contact = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError("Feedback cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitted(true);
      setFeedback("");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Feedback Form</h1>

        <div className="page-content">
          {!submitted ? (
            <>
              <p className="para">
                Blogify is built around community, ideas, and meaningful interaction.
                We encourage users to share feedback, suggestions, and platform-related
                queries directly through the platform.
              </p>

              <p className="below">
                We value your feedback. Share your thoughts, suggestions, or report
                any issues to help us improve Blogify.
              </p>

              <form className="feedback-form" onSubmit={handleSubmit}>
                <textarea
                  required
                  placeholder="Write your feedback here..."
                  rows="5"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />

                {error && <p className="error-text">{error}</p>}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </>
          ) : (
            <div className="success-message contact-info">
              <p>
                ✅ Your response has been recorded successfully.
                We will review your feedback and update the platform accordingly.
                Thank you for taking the time to share your thoughts with us.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
