import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { FaMagic, FaCopy, FaSpinner } from "react-icons/fa";
import "./App.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://codereview-s9wv.onrender.com");

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState(``);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (isReviewing) return;

    try {
      setIsReviewing(true);
      setReview("Reviewing your code. This can take a few seconds...");
      const response = await axios.post(`${API_BASE_URL}/ai/get-review`, {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview(
        error.response?.data ||
          "Something went wrong while reviewing the code. Please try again."
      );
    } finally {
      setIsReviewing(false);
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Code copied to clipboard!");
    });
  };

  return (
    <>
      <header>
        <h1>Code Reviewer</h1>
        <p>Your AI-powered code review assistant</p>
      </header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #444",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                backgroundColor: "#0c0c0c",
                color: "#ffffff",
              }}
            />
          </div>
          <div className="actions">
            <button type="button" onClick={copyCode} className="copy">
              <FaCopy /> Copy Code
            </button>
            <button
              type="button"
              onClick={reviewCode}
              className="review"
              disabled={isReviewing}
            >
              {isReviewing ? <FaSpinner className="spinner" /> : <FaMagic />}
              {isReviewing ? "Reviewing..." : "Review Code"}
            </button>
          </div>
        </div>
        <div className="right">
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <p className="empty-state">Your AI review will appear here.</p>
          )}
        </div>
      </main>
      <footer>
        <p>© 2024 Code Reviewer. Built with ❤️ by Abhijeet Ranjan.</p>
      </footer>
    </>
  );
}

export default App;
