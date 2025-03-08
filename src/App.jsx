/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";


function App() {

  const [displayEditor, setDisplayEditor] = useState(true)
  const [displayPreviewer, setDisplayPreviewer] = useState(true)
  const [dataTyped, setDataTyped] = useState("")

  
  return (
    <div className="body h-100 min-vh-100 w-100">
      <Editor isVisible={displayEditor} setDisplayPreviewer={setDisplayPreviewer} setDataTyped={setDataTyped}/>
      <Previewer isVisible={displayPreviewer} setDisplayEditor={setDisplayEditor} data={dataTyped} />
    </div>
  );
}

function Editor({isVisible,setDisplayPreviewer, setDataTyped}) {
  const [isExpanded, setIsExpanded] = useState(false);
  

  function expand() {
    setIsExpanded(true);
    setDisplayPreviewer(false)
  }

  function minimize() {
    setIsExpanded(false);
    setDisplayPreviewer(true)
  }

  function data(e){
    setDataTyped(e.target.value)
    
  }

  

  return (
    <div
      id="editor"
      className={`${ isVisible ? (isExpanded ? "editor-expanded" : "editor") : "d-none"} mx-auto border border-dark`}
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
      <textarea onChange={() => data(event)} className="text-area border-0 w-100 form-control border-0 shadow-none">
        
      </textarea>
    </div>
  );
}




function Previewer({isVisible, setDisplayEditor, data}) {
  const [isExpanded, setIsExpanded] = useState(false);

  function expand() {
    setIsExpanded(true);
    setDisplayEditor(false)
  }

  function minimize() {
    setIsExpanded(false);
    setDisplayEditor(true)

  }

  return (
    <div
      id="previewer"
      className={`${ isVisible ? (isExpanded ? "previewer-expanded" : "previewer") : "d-none"} mx-auto border border-dark`}
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
      <div className="previewer-area border-0 w-100 border-0">
        {data}
      </div>
    </div>
  );
}

export default App;
