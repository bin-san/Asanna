function SratchPad({size, target, showMe}) {
    return <div style={{
        width: size,
        height: size,
        // transform: 'rotate(2deg)',
        boxShadow: '0px 0px 4px 0px black',
        backgroundColor: 'white',
        display: showMe?"flex":"none",
        justifyContent: 'center',
        alignItems: 'center',
        // fontFamily: '',
        fontSize: size * 0.25,
        textTransform: 'rotate(5deg)'
    }}>
        <span style={{
            transform: 'rotate(-10deg)',
            color: 'rgb(0, 0, 129)',
        }} className="shadows-into-light-regular">{target}</span>
    </div>
}

export default SratchPad;
