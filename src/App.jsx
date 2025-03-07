/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";

//test
function App() {
  return (
    <div className="body h-100 min-vh-100 w-100">
      <Editor />
      <Previewer />
    </div>
  );
}

function Editor() {
  const [isExpanded, setIsExpanded] = useState(false);

  function expand() {
    setIsExpanded(true);
  }

  function minimize() {
    setIsExpanded(false);
  }

  return (
    <div
      id="editor"
      className={`${isExpanded ? "editor-expanded" : "editor"} mx-auto border border-dark`}
    >
      <div
        id="header"
        className="d-flex header text-black fs-6 justify-content-between align-items-start"
      >
        <span className="editor-title align-text-top">Editor</span>{" "}
        {isExpanded ? (
          <FontAwesomeIcon
            className="minimize"
            icon={faDownLeftAndUpRightToCenter}
            onClick={minimize}
          />
        ) : (
          <FontAwesomeIcon
            icon={faMaximize}
            className="maximize"
            onClick={expand}
          />
        )}
      </div>
      <textarea className="text-area border-0 w-100 form-control border-0 shadow-none">
        {" "}
      </textarea>
    </div>
  );
}




function Previewer() {
  const [isExpanded, setIsExpanded] = useState(false);

  function expand() {
    setIsExpanded(true);
  }

  function minimize() {
    setIsExpanded(false);
  }

  return (
    <div
      id="previewer"
      className={`${isExpanded ? "previewer-expanded" : "previewer"} mx-auto border border-dark`}
    >
      <div
        id="header"
        className="d-flex header text-black fs-6 justify-content-between align-items-start"
      >
        <span className="previewer-title align-text-top">Previewer</span>{" "}
        {isExpanded ? (
          <FontAwesomeIcon
            className="minimize"
            icon={faDownLeftAndUpRightToCenter}
            onClick={minimize}
          />
        ) : (
          <FontAwesomeIcon
            icon={faMaximize}
            className="maximize"
            onClick={expand}
          />
        )}
      </div>
      <textarea className="text-area border-0 w-100 form-control border-0 shadow-none">
        {" "}
      </textarea>
    </div>
  );
}

export default App;
