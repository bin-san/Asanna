import key from './images/key.png';
import goldBrick from './images/gold-brick.png';
import display from './images/display.png';
import keySound from './sounds/keySound.mp3';
import { useEffect, useState, useRef } from 'react';
import keyhole from './images/keyhole.jpg'
import { animateCalculator, removeKeyAnimation, vibrateKey } from './MyAnimation';

function Display({ width, height, fontSize, text }) {
  return (
    <div style={{
      height: height,
      width: width,
      // backgroundColor: 'green',
      // border: '0.1vmin solid black',
      // borderBottom: 'none',
      fontFamily: 'digital',
      fontSize: fontSize,
      textAlign: 'right',
      display: 'flex',
      justifyContent: 'right',
      alignItems: 'center',
      padding: '0.4vmin',
      color: 'rgb(70, 70, 70)',
      backgroundImage: `url(${display})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      borderImage: `url(${goldBrick}) 70 / 1.4vmin stretch`,
      boxShadow: 'inset -0.2vmin 0.2vmin 1vmin 1vmin rgba(0, 0, 0, 0.55)',
      // paddingRight: '10vmin',
    }}>
      <div style={{
        width: 'fit-content',
        height: 'fit-content',
        lineHeight: fontSize,
        margin: '0 2vmin'
      }}>
        {text}
      </div>
    </div>
  );
}

function NonExistantKey({name, customRef}) {
  return (
    <div className='non-existant-key' style={{
      backgroundImage: `url(${keyhole})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'serif',
      color: 'rgba(0, 0, 0, 0.7)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'not-allowed',
      borderRadius: '1.4vmin',
      boxShadow: 'inset -0.1vmin 0.1vmin 2vmin 0.2vmin rgba(0, 0, 0, 1), -0.1vmin 0.1vmin 0.1vmin 0vmin rgba(0, 0, 0, 0.445)',
      // border: '1vmin solid black',
    }}>
      <div ref={customRef} style={{
        backgroundImage: `url(${key})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>{name}</div>
    </div>
    )
}

function Key({ name, handler, customRef }) {
  return (
    <div  ref={customRef} className='my-key' style={{
      backgroundImage: `url(${key})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'serif',
      color: 'rgba(0, 0, 0, 0.7)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',
      borderRadius: '1.4vmin',
      boxShadow: 'inset -0.1vmin 0.1vmin 0.3vmin 0.2vmin rgba(0, 0, 0, 0.445), -0.1vmin 0.1vmin 0.1vmin 0vmin rgba(0, 0, 0, 0.445)',
      // border: '1vmin solid black',
    }}
      onMouseDown={
        (e) => {
          clickAudio.pause()
          clickAudio.currentTime = 0
          clickAudio.play()
        }
      }
      onMouseUp={
        (e) => {
          handler()
        }
      }>{name}</div>
  );
}

function KeyNonKeyDuality({name, value, handler, customRef}) {
  if (value) {
    return <Key name={name} handler={handler} />
  }
  else {
    return <NonExistantKey name={name} customRef={customRef} />
  }
}

function KeyBoard({ side, setDisplayText, calcStack, blockedKeys }) {
  const keyRef0 = useRef(null)
  const keyRef1 = useRef(null)
  const keyRef2 = useRef(null)
  const keyRef3 = useRef(null)
  const keyRef4 = useRef(null)
  const keyRef5 = useRef(null)
  const keyRef6 = useRef(null)
  const keyRef7 = useRef(null)
  const keyRef8 = useRef(null)
  const keyRef9 = useRef(null)

  const keyRefList = [keyRef0, keyRef1, keyRef2, keyRef3, keyRef4, keyRef5, keyRef6, keyRef7, keyRef8, keyRef9]

  useEffect(
    () => {
      if (blockedKeys instanceof Set) {
        for (let i of blockedKeys) {
          let keyRef = keyRefList[i]
          const {left, top, width, height} = keyRef.current.getBoundingClientRect()
          console.log({left, top, width, height})
          // keyRef.current.style.position = 'absolute'
          // keyRef.current.style.top = top + 'px'
          // keyRef.current.style.left = left + 'px'
          // keyRef.current.style.width = width + 'px'
          // keyRef.current.style.height = height + 'px'
          // console.log(keyRef.current.style.top)
          // keyRef.current.style.transform = 'translate(10px, 10px)'
          removeKeyAnimation(keyRef, left, top, width, height)
        }
      }
    },
    [blockedKeys]
  )
  let keys = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ]
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      width: side,
      height: side,
      // border: '1vmin solid black',
      // borderCollapse: 'collapse',
      gap: '0.8vmin',
      padding: '0.4vmin'
    }}>
      {
        keys.map(
          (s) => {
            let nn = parseInt(s, 10)
            let handler = null;
            if (!isNaN(nn)) {
              console.log(blockedKeys)
              if (blockedKeys instanceof Set && blockedKeys.has(nn)) {
                return <KeyNonKeyDuality name={s} value={false} customRef={keyRefList[nn]} handler={handler}/>
              }
              handler = () => {
                setDisplayText(calcStack.push(nn))
              }
              return <KeyNonKeyDuality name={s} value={true} customRef={keyRefList[nn]} handler={handler}/>
            }
            else if (s === '+') {
              handler = () => { setDisplayText(calcStack.push(calcStack.add)) }
            }
            else if (s === '-') {
              handler = () => { setDisplayText(calcStack.push(calcStack.sub)) }
            }
            else if (s === '×') {
              handler = () => { setDisplayText(calcStack.push(calcStack.mul)) }
            }
            else if (s === '÷') {
              handler = () => { setDisplayText(calcStack.push(calcStack.div)) }
            }
            else if (s === '.') {
              handler = () => { setDisplayText(calcStack.push('.')) }
            }
            else if (s === '=') {
              handler = () => { setDisplayText(calcStack.evaluate()) }
            }
            return <Key name={s} handler={handler} />
          }
        )
      }
    </div>
  );
}

let clickAudio = new Audio(keySound)

function Calculator({ width, height, starter, calcStack, blockedKeys, showMe }) {
  let [displayText, setDisplayText] = useState(starter)
  const calcRef = useRef(null)

  useEffect(
    () => {
      if (showMe) {
        console.log('Calculator is shown')
        animateCalculator(calcRef)
      }
    },
    [showMe]
  )

  useEffect(
    () => {
      setDisplayText(starter)
    },
    [starter]
  )

  let keyboardSide = (width * 0.78)
  let displayHeight = ((height - keyboardSide) * 0.4)
  let displayWidth = (keyboardSide * 0.98)
  let displayFontSize = displayWidth / 6
  // calcStack.stack.length = 0
  // calcStack.push(starter)

  return (
    <div ref={calcRef} style={{
      display: showMe ? 'flex' : 'none',
      flexDirection: 'column',
      flexShrink: 1,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      // borderImage: `url(${goldBrick}) 100 / 0.8rem 0 stretch`,
      borderRadius: '5vmin',
      backgroundImage: `url(${goldBrick})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      // padding: '2vmin 0',
      backgroundPosition: 'center',
      boxShadow: 'inset -0.1vmin 0.1vmin 1vmin 1vmin rgba(0, 0, 0, 0.5), -0.4vmin 0.4vmin 0.2vmin 0.1vmin rgba(0, 0, 0, 0.4)',

    }}>
      <Display width={displayWidth} height={displayHeight} fontSize={displayFontSize} text={displayText} />
      <KeyBoard side={keyboardSide} setDisplayText={setDisplayText} calcStack={calcStack} blockedKeys={blockedKeys} />
    </div>
  );
}

export default Calculator;
