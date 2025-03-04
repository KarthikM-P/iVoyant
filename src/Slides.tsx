import React, { useState,useEffect } from "react";

function Slides({ slides }) {
  const[inc, setInc] = useState(0);
 
  const[slide, setSlide] = useState(slides[inc]);
  const[disablebutton, setDisablebutton] = useState(true)
  const[disablebutton1, setDisablebutton1] = useState(true)
  


  function handleNext(){
      setInc(inc => inc+1);
  } 
  function handleprev(){
      setInc(inc => inc-1);
  } 
  function handlereset(){
      setInc(0);
  } 
  
 
useEffect(()=>{
  if(inc === 0){
    setDisablebutton(true)
    setDisablebutton1(false)
  }
  if(inc === 1 ){
      setDisablebutton(false)
      
  }
  if(inc === 3){
    setDisablebutton1(false)
  }
 if(inc === 4){
  setDisablebutton1(true)
 }

  if(inc>=0&&inc<5)
  setSlide(slides[inc]);
  
},[inc])
  
  return (
    <div>
      <div id="navigation" className="text-center">
        <button data-testid="button-restart" className="small outlined" disabled={disablebutton}onClick={handlereset}>
          Restart
        </button>
        <button data-testid="button-prev" className="small" disabled={disablebutton} onClick={handleprev}>
          Prev
        </button>
        <button data-testid="button-next" className="small"  onClick={handleNext} disabled={disablebutton1}>
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{slide.title}</h1>
        <p data-testid="text">{slide.text}</p>
      </div>
    </div>
  );
}

export default Slides;
