/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from 'dompurify';
import React from "react";

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
    <div className="body h-100 min-vh-100 w-100">
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
    data = marked.parse(data)
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
        <div className="previewer-data p-2"><Parser data={data} /></div>
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


function Parser({data})
{

  const sanitizedData = DOMPurify.sanitize(data);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedData }} />;
    
  


}

export default App;
