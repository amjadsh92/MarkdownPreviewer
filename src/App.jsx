/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Markdown from 'marked-react';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from 'dompurify';
import React from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Import the default Highlight.js style

function App() {
  const [markdown, setMarkdown] = useState({
    showEditor: true,
    showPreviewer: true,
    content: "",
  });

  const togglePreview = () => {
    setMarkdown({ ...markdown, showPreviewer: !markdown.showPreviewer });
  };

  const toggleEditor = () => {
    setMarkdown({ ...markdown, showEditor: !markdown.showEditor });
  };

  const setContent = (data) => {
    setMarkdown({ ...markdown, content: data });
  };

  return (
    <div className="body">
      <Editor
        isVisible={markdown.showEditor}
        togglePreview={togglePreview}
        setContent={setContent}
      />
      <Previewer
        isVisible={markdown.showPreviewer}
        toggleEditor={toggleEditor}
        data={markdown.content}
      />
    </div>
  );
}

function Editor({ isVisible, togglePreview, setContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
    togglePreview();
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    togglePreview();
  };

  const handleChange = (e) => {
    let data = e.target.value;

    setContent(data);
  };

  return (
    <div
      className={`${isVisible ? (isExpanded ? "editor-expanded" : "editor") : "d-none"} mx-auto border border-dark`}
    >
      <Header
        title="Editor"
        isExpanded={isExpanded}
        expand={handleExpand}
        minimize={handleMinimize}
      />
      <textarea
        onChange={handleChange}
        className="text-area border-0 w-100 form-control border-0 shadow-none"
      ></textarea>
    </div>
  );
}

function Previewer({ isVisible, toggleEditor, data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
    toggleEditor();
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    toggleEditor();
  };

  
 

  return (
    <div
      className={`${isVisible ? (isExpanded ? "previewer-expanded" : "previewer") : "d-none"} mx-auto border border-dark`}
    >
      <Header
        title="Previewer"
        isExpanded={isExpanded}
        expand={handleExpand}
        minimize={handleMinimize}
      />
      <div className="previewer-area border-0 w-100 border-0">
        <div className="previewer-data bg-transparent p-4"><Parser data={data} /></div>
      </div>
    </div>
  );
}

function Header({ title, isExpanded, expand, minimize }) {
  return (
    <div className="d-flex header text-black fs-6 justify-content-between align-items-start">
      <span className="align-text-top">{title}</span>
      <FontAwesomeIcon
        className={isExpanded ? "minimize" : "maximize"}
        icon={isExpanded ? faDownLeftAndUpRightToCenter : faMaximize}
        onClick={isExpanded ? minimize : expand}
      />
    </div>
  );
}




function Parser({ data }) {
  React.useEffect(() => {
    document.querySelectorAll("code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [data]);

  return (
    <div className="markdown-body bg-transparent">
      <Markdown>{data}</Markdown>
    </div>
  );
}



export default App;