import './App.css';
import './Key.css';
import { useEffect, useRef, useState } from 'react';
import table from './images/table.jpg'
import Stopwatch from './Stopwatch';
import ScratchPad from './ScratchPad'
import Calculator from './Calculator';
import Game from './Game';
import CalcStack from './CalcStack';
import Test from './Test';
import { Toolbar } from './Toolbar';
import Instructor from './Instructor';
import GameOver from './GameOver';
import Landing from './Landing';

/**
 * Replace all the context manager with hooks
 */

let totalTime = 60
let game = new Game(totalTime)
let calcStack = new CalcStack()

document.title = 'Asanna'


function App() {
  const [winW, setWinW] = useState(window.innerWidth) // replace it later cuz: rerendering issue 
  const [winH, setWinH] = useState(window.innerHeight)
  const [starter, setStarter] = useState('0')
  const [target, setTarget] = useState('Target')
  const [appAlignment, setAppAlignment] = useState('row')
  const [gameOver, setGameOver] = useState(false) // later replace withh redux to dispatch multiple state 
  const [time, setTime] = useState(totalTime)
  const [blockedKeys, setBlockedKeys] = useState(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showTarget, setShowTarget] = useState(false)
  const [showStopWatch, setShowStopWatch] = useState(false)
  const [showInstructor, setShowInstructor] = useState(true)
  const [showGameOver, setShowGameOver] = useState(false)
  const [view, setView] = useState(0)
  console.log('rerendering app')

  let intervalID = useRef(null)

  // run only once a life time 
  useEffect(
    () => {
      calcStack.setGameOver = setGameOver
      game.setBlockedKeys = setBlockedKeys

    },
    []
  )

  // gameOver
  useEffect(
    () => {
      if (gameOver === true) {
        console.log('Game is way over you')
        game.end()
        clearInterval(intervalID.current)
        setGameOver(false)
      }
    },
    [gameOver, intervalID]
  )

  function startGame() {
    if (game.running) {
      return
    }
    game.start()
    calcStack.target = game.target
    calcStack.stack.length = 0
    calcStack.stack.push(game.starter.toString())
    setStarter(game.starter)
    setTarget(game.target)

    setTime(totalTime)
    intervalID.current = setInterval(
      () => {
        setTime((n) => {
          if (n === 1) {
            // clearInterval(intervalID)
            // gameOver
            setShowStopWatch(false)
            setShowCalculator(false)
            setShowTarget(false)
            setShowInstructor(false)
            setShowGameOver(true)
            setGameOver(true)
          }
          return --n
        })
      },
      1000
    )

  }

  // responsiveness
  window.onresize = (e) => {
    console.log('resized')
    setWinH(window.innerHeight)
    setWinW(window.innerWidth)
  }

  // calculating dimensions
  let aspectRatio = 2.5 / 4
  let maxSide = Math.min(winH, winW)
  let _height = maxSide * 0.95
  let width = (aspectRatio * _height)
  let height = (width / aspectRatio)
  if (winH > winW) {
    height = winH * (3.5 / 5)
    width = height * aspectRatio
  }

  let remainingWidth = winW - width
  let remainingHeight = winH - height
  let accessoryAlignment = 'column'
  let accessorySize = {
    width: 'fit-content',
    height: '100%'
  }
  let maxRemainingSide = remainingWidth
  let accessoryItemSide = Math.min(winH / 2, maxRemainingSide) * 0.8
  if (remainingHeight > remainingWidth) {
    if (appAlignment !== 'column-reverse') {
      setAppAlignment('column-reverse')
    }
    accessoryAlignment = 'row'
    accessorySize.width = '100%'
    accessorySize.height = 'fit-content'
    maxRemainingSide = remainingHeight
    accessoryItemSide = Math.min(winW / 2, maxRemainingSide) * 0.8
    // stopwatchH = accessoryItemSide
    // stopwatchW = null
  }
  else {
    if (appAlignment !== 'row') {
      setAppAlignment('row')
    }
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: appAlignment,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: window.innerWidth,
      height: window.innerHeight,
      overflow: 'none none',
    }}>
      <img style={{
        position: 'absolute',
        zIndex: -1,
      }} src={table} width={winW} height={winH} />
      {(view === 0)?<Landing setView={setView} />:
      <>
      <Calculator width={width} height={height} starter={starter} calcStack={calcStack} blockedKeys={blockedKeys} showMe={showCalculator} />
      <div style={{
        flexShrink: 1,
      }}>
        <Instructor view={view} setView={setView} gameOver={gameOver} startGame={startGame} setTarget={setTarget} setShowMe={setShowInstructor} showMe={showInstructor} setShowCalculator={setShowCalculator}
          setShowStopWatch={setShowStopWatch} setShowTarget={setShowTarget} setStarter={setStarter}
          quoteSize={accessoryItemSide} appAlignment={appAlignment} setBlockedKeys={setBlockedKeys} />
      </div>
      <Toolbar
        target={target} time={time} accessoryAlignment={accessoryAlignment}
        accessoryItemSide={accessoryItemSide} accessorySize={accessorySize}
        showStopWatch={showStopWatch} showTarget={showTarget} />
      <GameOver setBlockedKeys={setBlockedKeys} setView={setView} showGameOver={showGameOver} setShowGameOver={setShowGameOver} setShowInstructor={setShowInstructor} />
    
      </>
      }
    </div>
  )
}

export default App;
