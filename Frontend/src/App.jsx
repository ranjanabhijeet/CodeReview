import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { FaMagic, FaCopy } from "react-icons/fa"; // Import icons
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setReview(response.data);
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
            <div onClick={copyCode} className="copy">
              <FaCopy /> Copy Code
            </div>
            <div onClick={reviewCode} className="review">
              <FaMagic /> Review Code
            </div>
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
      <footer>
        <p>© 2024 Code Reviewer. Built with ❤️ by Abhijeet Ranjan.</p>
      </footer>
    </>
  );
}

export default App;
