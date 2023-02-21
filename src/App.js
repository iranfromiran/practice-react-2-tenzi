import React from 'react';
import './App.css';
import Die from './Die';
import Confetti from 'react-confetti'

function App() {
  
  const[num,setNum]=React.useState(allNewDice);
  const[tenzies,setTenzies]=React.useState(false);

  React.useEffect(()=>{
    const firstValue=num[0].value;
    const isWin=num.map(
      function(element){
        if(element.isHeld===true &&element.value===firstValue){return true}
        else return false
      })
    const isTrue=()=>{
      let t=true;
      for(let i=0;i<10;i++){
         if(!isWin[i]===true){
           t=false;
         } 
        }  
    return t;
  };
  
  if(isTrue()){
    setTenzies(true)
    console.log("Yeah!you won ^_^")}

  },[num])




function allNewDice(){
  const n=10; //number of dices
  const array=[]
  
  const uniqueId=[]
  uniqueId[0]=0;
    for(let i=1;i<n;i++){
        uniqueId[i]=uniqueId[i-1]+1;
         uniqueId.push(uniqueId[i])}
    for(let i=0;i<n;i++) {
      const randomNum=Math.floor(
        (Math.random())*6+1);
         array.push({
          value:randomNum,id:uniqueId[i],isHeld:false})
    }
  return array;
}

 

function holdDice(id){
  setNum(prevNum=>prevNum.map(element=>{
  return element.id ===id ?
    {...element,isHeld:!element.isHeld} : element}
    )
  )
  };



const diceGenerator=num.map(
    (element)=><Die 
    key={element.id} 
    value={element.value} 
    isHeld={element.isHeld}
    holdDice={()=>holdDice(element.id)}
    />)
    
function roll(){
  setNum(prevNum=>prevNum.map(element=>{return !element.isHeld ? {...element, value:Math.floor((Math.random())*6+1) }: element
}
))
}
 
function newGame(){
  setNum(prevNum=>prevNum.map(element=>{return {...element,isHeld:false, value:Math.floor((Math.random())*6+1) }
}
))
setTenzies(false)
}


  return (
    <>
  <header>
    <h1 className='title-h1'>Tenzies Game</h1>
    
    </header>
   <main>
   {tenzies&&<Confetti 
   className='confetti-window'
   />}
    <p>Roll until dices are the same.Click each die to freeze it at its current value between rolls.</p>
    <div className="dies-container">
    {diceGenerator}
    </div>
    <button className='roll-btn' onClick={tenzies?newGame:roll}>
      {tenzies?"New Game":"Roll"}
      </button>
      
   </main>
   </> );
}

export default App;
