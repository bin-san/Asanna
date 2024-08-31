import { useEffect, useRef, useState } from "react"

function GrandDumb({textRef}) {
    console.log('rendering GrandDumb')
    useEffect(
        ()=>{},
        [textRef.current]
    )
    return <span>{textRef.current}</span>
}

function GrandChild({textRef}) {
    console.log('rendering GrandChild')
    return <button onClick={()=>(textRef.current += 1)}>Touch your grandson</button>
}

function Child({textRef}) {
    console.log('rendering Child')
    return <div style={{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <GrandDumb textRef={textRef}/>
        <GrandChild textRef={textRef}/>
    </div>
}

function Test() {
    const textRef = useRef(0)
    console.log('Rendering Test')
    return <div>
        <Child textRef={textRef}/>
    </div>
}

export default Test 
