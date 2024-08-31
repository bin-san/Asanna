import ScratchPad from "./ScratchPad"
import Stopwatch from "./Stopwatch"



function Toolbar({ target, time, accessoryAlignment, accessoryItemSide, accessorySize, showStopWatch, showTarget}) {
  // const {accessorySize, accessoryItemSide, accessoryAlignment} = calculateToolbarSize({calcHeight, calcWidth, winW, winH, setAppAlignment})
  return <div style={{
    display: (showStopWatch || showTarget)?'flex':'none',
    flexDirection: accessoryAlignment,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: accessorySize.width,
    height: accessorySize.height,
    // padding: '2vmin',
  }}>
    <ScratchPad size={accessoryItemSide} target={target} showMe={showTarget} />
    <Stopwatch size={accessoryItemSide} time={time} showMe={showStopWatch} />
  </div>
}

export {Toolbar}
