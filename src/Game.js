// time
// target: 6digit number
// starter
// 4 digits
// 20 operations
class Game {
  constructor(totalTime = 60) {
    this.target = 0
    this.targetCoeff = 10 ** 6
    // this.setTarget = null 

    this.starter = 0
    this.starterCoeff = 10 ** 3
    // this.setStarter = null

    this.digits = new Set()

    this.operationsRemaining = 0
    this.operationsLimit = totalTime

    this.running = false
    this.timeID = null
    this.timeRemaining = null
    // this.setTimeRemaining = null // can be lifecycle issue
    this.totalTime = totalTime
    this.setBlockedKeys = null

    this.onGameOver = ()=>{}
  }

  setTarget(v) {
    this.target = v
  }

  setStarter(v) {
    this.starter = v
  }

  setTimeRemaining(v) {
    this.timeRemaining = v
  }

  start() {
    if (this.running) {
      console.log('Already one instance of Game is running')
      return
    }

    let rnd = Math.random()
    this.target = Math.round(rnd * this.targetCoeff)
    // if (this.target < this.targetCoeff) {
    //   this.target = this.target * 10 + Math.round(Math.random() * 10)
    // }
    this.setTarget(this.target.toString())

    this.starter = Math.round(Math.random() * this.starterCoeff)
    // if (this.starter < this.starterCoeff) {
    //   this.starter = this.starter * 10 + Math.round(Math.random() * 10)
    // }
    this.setStarter(this.starter)

    this.digits.clear()
    while (this.digits.size !== 4) {
      let x = Math.floor(Math.random() * 10)
      if (x <= 9) {
        this.digits.add(x)
      }
    }
    console.log(this.digits)
    this.setBlockedKeys(this.digits)
    this.operationsRemaining = this.operationsLimit

    // this.setTimeRemaining(this.totalTime)
    // this.timeID = setInterval(
    //     (()=>{
    //         this.setTimeRemaining(this.timeRemaining - 1)
    //         console.log(this.timeRemaining)
    //         if (this.timeRemaining === 0) {
    //             clearInterval(this.timeID)
    //             this.running = false 
    //             // this.setTimeRemaining(0)
    //             console.log('Game ended.')
    //         }
    //     }).bind(this),
    //     1000
    // )
    this.running = true
    console.log('Game Started')
  }
  end() {
    this.running = false
  }
}

export default Game;
