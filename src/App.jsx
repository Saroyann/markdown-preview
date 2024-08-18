import React, { useState, useEffect } from "react";
import { maximize, minimize } from './assets/index.js';
import { marked } from 'marked';

// Konfigurasi marked
marked.setOptions({
  breaks: true,
  gfm: true
});

function App() {
  const [clickMark, setClick] = useState(false);
  const [clickPreview, setClickPreview] = useState(false);
  const [text, setText] = useState('# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here\'s some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == \'```\' && lastLine == \'```\') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere\'s also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let\'s not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n');

  useEffect(() => {
    document.getElementById('preview').innerHTML = marked(text);
  }, [text]);

  const clickHandler = () => {
    setClick(prevClick => !prevClick);
  }

  const clickPreviewHandler = () => {
    setClickPreview(prevClickPreview => !prevClickPreview);
  }

  const textHandler = e => setText(e.target.value);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-emerald-500">
        <div className={`${!clickMark ? 'h-[250px] w-[400px]' : 'h-[100vh] w-[700px]'} ${!clickPreview ? '' : 'hidden'} bg-white relative overflow-hidden transition-all duration-500 overflow-y-scroll border-2 border-black`}>
          <div className={`w-full h-[50px] bg-emerald-600 absolute top-0 flex justify-end items-center`}>
            <img onClick={clickHandler} className="w-[30px] h-[30px] mr-5 cursor-pointer" src={!clickMark ? maximize : minimize} alt="toggle size" />
          </div>
          <textarea 
            className={`w-full ${!clickMark ? 'h-[400px]' : 'h-[100vh]' } mt-[49px] border-none outline-none overflow-hidden resize-none p-4`} 
            placeholder="Enter markdown"
            name="text" 
            id="editor"
            value={text}
            onChange={textHandler}
          ></textarea>
        </div>

        <div className={`${!clickPreview ? 'h-[350px] w-[700px] mt-5' : 'h-screen w-[700px]'} ${!clickMark ? '' : 'hidden'} bg-white relative overflow-hidden transition-all duration-500 overflow-y-scroll border-2 border-black`}>
          <div className={`w-full h-[50px] bg-emerald-600 absolute top-0 flex justify-end items-center`}>
            <img onClick={clickPreviewHandler} className="w-[30px] h-[30px] mr-5 cursor-pointer" src={!clickPreview ? maximize : minimize} alt="toggle size" />
          </div>
          <div 
            id="preview"
            className="mt-[50px] p-4 markdown-body"
          >
          </div>
        </div>
      </div>
    </>
  )
}

export default App;