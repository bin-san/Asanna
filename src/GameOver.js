function GameOver({setView, showGameOver, setShowGameOver, won, setShowInstructor, setBlockedKeys}) {
  return <>
    {showGameOver ? 
    <div style={{
      // transform: 'translate(-50% -50%)',
      position: 'absolute',
      backgroundColor: "rgba(0,0,0,0.6)",
      borderRadius: '2rem',
      padding: '3rem',
      color: 'rgba(255, 255, 255, 0.8)',
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      zIndex: 2,
      gap: '2rem'
    }}>
      <span style={{
        fontSize: '3rem',
      }}>{won?'You won':'You lost'}</span>
      <button style={{
        fontSize: '1.5rem',
        padding: '1rem',
        borderRadius: '1rem',
        borderWidth: 0,
        cursor: "pointer",
        boxShadow: '0px 0px 8px 0px black'
      }} onClick={()=>{
        setShowGameOver(false)
        setView(1)
        setShowInstructor(true)
        setBlockedKeys((v)=>{
          if (v instanceof Set && v.size > 0) {
            v.clear()
          }
          return v
        })
      }}>Start Over</button>
    </div>
    :
    <></>}
  </>
}

export default GameOver
