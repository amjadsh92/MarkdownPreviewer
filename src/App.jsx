/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMaximize} from "@fortawesome/free-solid-svg-icons";

//test
function App() {


  
    return(
      <div className="body h-100 min-vh-100 w-100">
       <Editor  />
      </div>
    )  


}


function Editor(){

  return (
    <div id="editor" className="editor mx-auto border border-dark">
      <div id="header" className="d-flex header text-black fs-6 justify-content-between align-items-start"><span className="editor-title align-text-top">Editor</span> <FontAwesomeIcon  icon={faMaximize} className="maximize" /></div>
      <textarea className = "text-area border-0 w-100 form-control border-0 shadow-none" > </textarea>
    </div>
  )
}


export default App