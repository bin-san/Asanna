import { useEffect, useState, useRef } from "react"

function animateQuote(quoteRef) {
  (new Animation(
    new KeyframeEffect(
      quoteRef.current, 
      [
        {offset: 0, transform: 'scale(0)'},
        {offset: 0.8, transform: 'scale(1.2)'},
        {offset: 1, transform: 'scale(1)'}
      ], 
      {
        duration: 300,
        // delay: delay,
        fill: 'forwards',
      }
    )
  )).play()
}

function Quote({text, size, direction}) {
  // alert(size)
  // direction = 'down'
  const quoteRef = useRef(null)
  // const [textSize, setTextSize] = useState(0)

  // animation
  useEffect(
    ()=>{
      animateQuote(quoteRef)
    },
    []
  )

  // useEffect(
  //   ()=>{
  //     let textInterval = setInterval(
  //       ()=>{
  //         if (textSize == text.length) {
  //           clearInterval(textInterval)
  //           return
  //         }
  //         setTextSize((v)=>++v)
  //       },
  //       200
  //     )
  //   },
  //   [text]
  // )

  // let delay = 700
  let duration = 300

  let flexDirection = 'row'
  let rotation = "rotate(-90deg)"
  let justifyContent = 'center'
  let alignItems = 'center'
  switch (direction) {
    case 'left':
        flexDirection = 'row'
        rotation = "rotate(-90deg)"
        justifyContent = 'left'
        alignItems = 'center'
      break;
    case 'right':
      flexDirection = 'row-reverse'
      rotation = "rotate(90deg)"
      justifyContent = 'right'
      alignItems = 'center'
      break;
    case 'up':
      flexDirection = 'column'
      rotation = "rotate(0deg)"
      break;
      justifyContent = 'center'
      alignItems = 'flex-start'
    case 'down':
      flexDirection = 'column-reverse'
      rotation = "rotate(180deg)"
      justifyContent = 'center'
      alignItems = 'flex-end'
      break;
  }
  return <div ref={quoteRef} className="patrick-hand-regular" style={{
    transform: 'scale(0)',
    width: size,
    height: size,
    display: 'flex',
    flexDirection: flexDirection,
    justifyContent: justifyContent,
    alignItems: alignItems,
    // boxShadow: '0px 0px 10px 0px black'
    fontSize: '2rem',
    position: 'absolute',
    zIndex: 10,
  }}>
    <div style={{
      width: 'fit-content',
      height: 'fit-content',
    }}>
      <span className="material-symbols-outlined" style={{
        color: "rgba(0, 0, 0, 0.8)",
        transform: rotation,
        // boxShadow: '0px 0px 5px 0px black',
      }}>change_history</span>
    </div>
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'rgba(255, 255, 255, 0.8)',
      padding: '2rem',
      borderRadius: 10,
      // boxShadow: '0px 0px 5px 0px black',
    }}>{text}</div>
  </div>
}

export default Quote
