import { useEffect, useState } from 'react'
import stopwatchImage from './images/stopwatch.png'
// import './index.css'
// import './Stopwatch.css'

function timeString(time) {
    if (!time) {
        time = 0 
    }
    if (time < 10) {
        return '0' + time.toString()
    }
    else {
        return time.toString()
    }

}

function Stopwatch({size, time, showMe}) {
    return <div style={{
        position: 'relative',
        width: size,
        height: size,
        display: showMe?'flex':"none",
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'digital',
        fontSize: size *0.2
    }}>
        <img style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            boxShadow: 'inset 0px 0px 20px 2px black, 0px 0px 5px 1px black',
            borderRadius: '50%',
        }} src={stopwatchImage} width={size} height={size}/>
        <div style={{
            width: 'fit-content',
            height: 'fit-content',
            // paddingTop: size * 0.09,
            // color: 'rgba(16, 160, 16, 0.5)',
            animationName: 'stopwatchBlinkAnimation',
            animationDuration: '1s',
            animationIterationCount: 'infinite',
        }}>00:{timeString(time)}</div>
    </div>
}

export default Stopwatch;
