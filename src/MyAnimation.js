export function vibrateKey(ref) {
  (new Animation(
    new KeyframeEffect(
      ref.current, 
      [
        {offset: 0, transform: 'rotate(2.5deg)'},
        {offset: 1, transform: 'rotate(-2.5deg)'}
      ], 
      {
        duration: 10,
        iterations: Infinity,
      }
    )
  )).play()
}

export function removeKeyAnimation(ref, left, top, width, height) {
  let anim = (new Animation(
    new KeyframeEffect(
      ref.current, 
      [
        {offset: 0, transform: 'translate(0px, 0px)'},
        {offset: 1, transform: `translate(0px, ${window.innerHeight - top + 100}px)`}
      ], 
      {
        duration: (window.innerHeight - top + 100) * 2,
        // iterations: Infinity,
        fill: 'forwards'
      }
    )
  ))
  anim.onfinish = ()=>{
    ref.current.style.display = 'none'
  }
  anim.play()
}

export function animateCalculator(calcRef) {
  (new Animation(
    new KeyframeEffect(
      calcRef.current, 
      [
        {offset: 0, transform: 'scale(1.5)'},
        {offset: 0.5, transform: 'scale(1)'},
        {offset: 0.7, transform: 'scale(1.1)'},
        {offset: 1, transform: 'scale(1)'}
      ], 
      {
        duration: 300,
      }
    )
  )).play()
}
