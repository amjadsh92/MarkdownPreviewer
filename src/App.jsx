/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons";
import React from "react";

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

  const cappedData = data.replace(/\n{3,}/g, "\n\n");
  
  let processedData = cappedData.split(/(\n)/).map((line, index) =>
    line === "\n" ? <br key={index} /> : <React.Fragment key={index}><Parser data = {line} /></React.Fragment>
  )

 
  
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
        <div className="previewer-data p-2">{processedData}</div>
      </div>
    </div>
  );
}

export default App;

function Parser({data}){
    
  function containsInterpretedHash(data){
    let patternHash = /^(?:\s{0,3})?(#{1,6})(?!\S)(\s?.{0,})/
    let containsInterpretedHash = data.match(patternHash) 
    return containsInterpretedHash

}
  let InterpretedHash = containsInterpretedHash(data)

  return (InterpretedHash ? <Hash data={data} dataSegment = {InterpretedHash} /> : data)





}



function Hash({data, dataSegment}){

  if ( data === dataSegment[1] && !dataSegment[2]){
    if(dataSegment[1].length === 1){
        return (<div className="border-bottom border-2 border-dark mt-2"></div>)   
    }
    else if (dataSegment[1].length === 2){
      return (<div className="border-bottom border-1 border-dark mt-2"></div>)  
    }
    else{
      return ""
    }
}
 else if(dataSegment[2]){
  let str = dataSegment[2].match(/^(?:\s{0,}|(.{0,})\s{1,})(#{1,})(?!\S)(\s{0,})$/)
  
  
  if(dataSegment[1].length === 1){

    
      return <div className="border-bottom border-2 border-dark mt-2 fs-2 fw-bold">{ str ? str[1] : dataSegment[2]}</div>
    
    
    
  }
  else if(dataSegment[1].length === 2){
    return (<div className="border-bottom border-1 border-dark mt-2 fs-4 fw-bold">{ str ? str[1] : dataSegment[2]}</div>) 

  }
  else if(dataSegment[1].length === 3){
    return (<div className="hash3 mt-2 fw-bold">{ str ? str[1] : dataSegment[2]}</div>) 

  }
  else if(dataSegment[1].length === 4){
    return (<div className="hash4 mt-2 fw-bold">{ str ? str[1] : dataSegment[2]}</div>) 

  }

  else if(dataSegment[1].length === 5){
    return (<div className="hash5 mt-2 fw-bold">{ str ? str[1] : dataSegment[2]}</div>) 

  }
  else if(dataSegment[1].length === 6){
    return (<div className="hash6 mt-2 fw-bold">{ str ? str[1] : dataSegment[2]}</div>) 

  }
  }

 }

