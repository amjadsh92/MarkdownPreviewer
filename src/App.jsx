/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
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
    //Insure that the newline does not have an effect at
    //the beginning of the document
    data = data.replace(/^\n+/, "");
    //Insure that newline does not have an effect for hashes
    const hashPattern = /^(?:\s{0,3})?(#{1,6})(?!\S)\s?(.{0,})/;
    const newlinePattern = /\n{2,}/g;
    const cappedData = data.replace(
      newlinePattern,
      (match, offset, fullString) => {
        // Extract the text just before the matched \n{2,}
        const beforeMatch = fullString.slice(0, offset);
        // Extract the text just after the matched \n{2,}
        const afterMatch = fullString.slice(offset + match.length);

        //Check if the hashpattern appears just after \n{2,}
        // For example:
        // "aaaaaaaaaaaaaaa# dfsdfsdfdfdfdfdfdfdf"
        // now if  I press two enters before the
        // hashPatern # dfsdfsdfdfdfdfdfdfdf I will
        // get two \n
        // before the hashPattern "# dfsdfsdfdfdfdfdfdfdf"
        // The hashPattern is just after the match
        // So the "\n\n"(or more in case there are)
        // will be transformed in "\n"
        if (hashPattern.test(afterMatch.split("\n")[0])) {
          return "\n";
        }
        //Check if the hashpattern appears just before \n{2,}
        // For example:
        // "# dfsdfsdfdfdfdfdfdfdfaaaaaaaaaaaaa"
        // now if  I choose to press two enters before
        // aaaaaaaaaaaaa, the hashPattern will be directly
        // before the \ns.
        // So the "\n\n"(or more in case there are)
        // will be transformed in "\n", and
        // aaaaaaaaaaaaa will only move one line
        // downwords and not more.
        if (hashPattern.test(beforeMatch.split("\n").pop())) {
          return "\n";
        } else {
          return "\n\n";
        }
      }
    );

    setContent(cappedData);
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

  //debugger;
  let processedData = data?.match(/(?:^(?: {4}|\t).*(?:\n(?: {4}|\t).*)*)|(?:[^\n]+|\n)/gm)?.map((line, index) => {
    // Check if the previous line exists and matches the pattern
    //const previousLine = index > 0 ? arr[index - 1] : "";
    //const isPreviousCodeBlock = /^( {4}|\t)(.*)/.test(previousLine);
  
    // If the current line is "\n" and the previous line was a code block, return null
    //if (line === "\n" && isPreviousCodeBlock) {
    //  return null;
    //}
  
    return line === "\n" ? (
      <br key={index} />
    ) : (
      <React.Fragment key={index}>
        <Parser data={line} />
      </React.Fragment>
    );
  });

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
        <div className="previewer-data p-2">{processedData}</div>
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
  debugger;
  let pattern;
  const codePattern = data.match(/^( {4}|\t)([^]*)/)
  const hashPattern = data.match(/^(\s{0,3})(#{1,6})(?!\S)\s?(.{0,})/);
  
  if (codePattern){
    pattern = codePattern
  }
  else if (hashPattern){
    pattern = hashPattern
  }
  else{
    pattern = ""
  }

  switch(pattern){
    case codePattern:
      return <Code dataSegment ={codePattern} />
    case hashPattern:
      return <Hash dataSegment={hashPattern} />

    default:
      return data  

  }
  
  
}

function Hash({ dataSegment }) {
  // dataSegment[2] holds the hashes; dataSegment[3] holds the context

  const hashCount = dataSegment[2]?.length || 0;
  const context = dataSegment[3];

  const noContextClasses = {
    1: "border-bottom border-2 border-dark",
    2: "border-bottom border-1 border-dark",
  };

  const contextClasses = {
    1: "border-bottom border-2 border-dark fs-2 fw-bold",
    2: "border-bottom border-1 border-dark fs-4 fw-bold",
    3: "hash3 fw-bold",
    4: "hash4 fw-bold",
    5: "hash5 fw-bold",
    6: "hash6 fw-bold",
  };

  if (!context) {
    const className = noContextClasses[hashCount];
    return className ? <div className={className} /> : null;
  }

  // This handles cases where the content might be padded with extra spaces.
  // for example:aaaaa ########(Editor) aaaaa(previewer)
  // aaaaaaa ###### rrrrr(editor) aaaaaaa ###### rrrrr(previewer)
  // match[1] would be the first captured group which is .{0,1}

  const match = context.match(
    /^(?:\s{0,}|(.{0,})\s{1,})(#{1,})(?!\S)(\s{0,})$/
  );

  // If the regex matches, use the first captured group (match[1]); otherwise, use the full context.

  const content = match ? match[1] : context;
  const className = contextClasses[hashCount];
  return className ? <div className={className}>{content}</div> : null;
}

function Code({dataSegment}){

  let codeContent  = dataSegment[2]

  codeContent = codeContent.replace(/(?<=\n)\s{4}/g,"")
  
  return (
  
   <SyntaxHighlighter language="javascript" className="code" style={dracula}>
        {codeContent}
   </SyntaxHighlighter>
  );
}

export default App;
