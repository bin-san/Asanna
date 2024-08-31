import { useState } from "react"

function Title() {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: 'rgb(240, 240, 240)',
    padding: '5vmin',
    boxShadow: '0px 0px 6px 0px black',
  }}>
    <span className="luckiest-guy-regular" style={{
      fontSize: '8vmin',

    }}>ASANNA (APPROXIMATE)</span>
    <span className="shadows-into-light-regular" style={{
      fontSize: '6vmin',
    }}>A casual number game</span>
    <span className="patrick-hand-regular" style={{
      fontSize: '7vmin',
      fontStyle: 'italic',
    }}>By</span>
    <span className="patrick-hand-regular" style={{
      fontSize: '5vmin',
      color: 'rgb(0,0,100)',
    }}>Sandipan Chowdhury</span>
  </div>
}

function Landing({ setView }) {
  const [showMe, setShowMe] = useState(true)
  return <div style={{
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    gap: '5vmin'
  }}>
    <Title />
    <button style={{
      fontSize: '4vmin',
      padding: '2vmin 6vmin',
      border: '0px solid black',
      borderRadius: '5vmin',
      backgroundColor: 'yellowgreen',
      boxShadow: '0px 0px 5px 0px black',
      cursor: 'pointer',
      color: 'green',
    }} onClick={() => { setView(1) }}>Play</button>
  </div>
}

export default Landing
