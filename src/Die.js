import React from "react"

export default function Die(props){
  return(
    <div onClick={props.holdDice}>
  <h1 className={`die-num ${props.isHeld?"held":""}` }
  >{props.value}</h1>
  </div>
  )
  }