import { useEffect, useState, useRef } from "react"
import './css/Instructor.css'
import Quote from "./Quote"
import Landing from "./Landing"

// creating blocked digits 
let digits = new Set()
digits.clear()
while (digits.size !== 4) {
  let x = Math.floor(Math.random() * 10)
  if (x <= 9) {
    digits.add(x)
  }
}

let mockStarter = ''
let i = 0
while (i < 3) {
  let n = Math.floor(Math.random() * 10)
  if (n === 0) {
    continue
  }
  mockStarter += n
  i++
}

let mockTarget = ''
i = 0
while (i < 7) {
  let n = Math.floor(Math.random() * 10)
  if (n === 0) {
    continue
  }
  mockTarget += n
  i++
}

function opposeDirection (direction) {
  switch (direction) {
    case 'up': return 'down'
    case 'down': return 'up'
    case 'left': return 'right'
    case 'right': return 'left'
    default: return 'left'
  }
}

function Instructor({ view, setView, gameOver, showMe, startGame, setShowMe, setShowCalculator, setShowStopWatch, setShowTarget, quoteSize, appAlignment, setBlockedKeys, setStarter, setTarget }) {
  // const [view, setView] = useState(initialView)

  let calculatorAt = 'left'
  if (appAlignment === 'row') {
    calculatorAt = 'left'
  }
  else if (appAlignment === 'column-reverse') {
    calculatorAt = 'down'
  }
  else {
    throw new Error("Update needed in the Instructor as you added extra the appAlignment");

  }
  return (<div style={{
    display: showMe ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    {
      (() => {
        // function goToTheNextSection(delay = 0) {
        //   setTimeout(
        //     ()=>{
        //       setView(view + 1)
        //     },
        //     delay
        //   )
        // }
        switch (view) {
          case 1:
            setShowCalculator(true)
            return <Quote text={'This is a nice calculator. 🤩'} size={quoteSize} direction={calculatorAt}  ></Quote>
          case 2:
            setBlockedKeys((v)=>{
              if ( v instanceof Set && v.size !== 0) {
                v.clear()
                return v 
              }
            })
            return <Quote text={'But...🤔'} size={quoteSize} direction={calculatorAt}   ></Quote>
          case 3:
            console.log('case 3')
            setBlockedKeys(digits)
            setStarter('0')
            return <Quote text={'Some keys are missing 🙂'} size={quoteSize} direction={calculatorAt}   ></Quote>

          case 4:
            setStarter(mockStarter)
            setShowTarget(false)
            return <Quote text={`And you will be given with an initial number`} size={quoteSize} direction={calculatorAt}  ></Quote>
          
          case 5:
            setShowTarget(true)
            setTarget(mockTarget)
            return <Quote text={`And here you have a target 🥵`} size={quoteSize} direction={opposeDirection(calculatorAt)}  ></Quote>
          case 6:
            return <Quote text={`All you have to do is use the calculator to make ${mockTarget} from ${mockStarter} 🤓`} size={quoteSize} direction={opposeDirection(calculatorAt)}  ></Quote>
          case 7:
            setShowStopWatch(false)
            return <Quote text={`Within...😲`} size={quoteSize} direction={opposeDirection(calculatorAt)}  ></Quote>
          case 8:
            setShowStopWatch(true)
            return <Quote text={`Within Time 🥲`} size={quoteSize} direction={opposeDirection(calculatorAt)}  ></Quote>
          case 9:
            return <Quote text={`So...`} size={quoteSize} direction={opposeDirection(calculatorAt)}  ></Quote>
          
          case 10:
            return <Quote text={`Let's start 😏`} size={quoteSize} direction={opposeDirection(calculatorAt)}  ></Quote>
          case 11:
            // initialize the Game 
            setShowMe(false)
            setShowCalculator(true)
            setShowStopWatch(true)
            setShowTarget(true)
            startGame()
            setView(12)

        }
      })()
    }
    <div style={{
      position: 'absolute',
      bottom: 0, right: 0,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      {/* <div className="guideBtn patrick-hand-regular" onClick={() => (view > 1) ? setView(view - 1) : null}>Back</div> */}
      <div className="guideBtn patrick-hand-regular" onClick={() => (view < 11) ? setView(view + 1) : null}>Next</div>
    </div>
    <div style={{
      position: 'absolute',
      top: 0, left: 0,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
      <div className="guideBtn patrick-hand-regular" onClick={() => setView(11)}>Skip</div>
    </div>
  </div>)
}

export default Instructor
