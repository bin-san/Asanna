class CalcStack {
    add(x, y) {
        return (parseFloat(x) + parseFloat(y)).toString()
    }
    mul(x, y) {
        return (parseFloat(x) * parseFloat(y)).toString()
    }
    sub(x, y) {
        return (parseFloat(x) - parseFloat(y)).toString()
    }
    div(x, y) {
        return (parseFloat(x) / parseFloat(y)).toString()
    }
    nullop(x, y) {
        return '0'
    }
    constructor() {
        this.stack = []
        this.displayCapacity = 10
        this.display = '0'

        this.numberCharacters = [
            '1', '2', '3', '4', '5',
            '6', '7', '8', '9', '0'
        ]
        this.opratorCharacters = [
            '+', '-', '×', '÷'
        ]
        this.target = null 
        this.setGameOver = null 
    }

    // does not accept `=`
    push(something) {
        if (this.stack.length === 0) {
            if (typeof something === 'number') {
                this.stack.push(something.toString())
            }
            else if (typeof something === 'function') {
                this.stack.push('0')
                this.stack.push(something)
            }
            else if (something === '.') {
                this.stack.push('0.')
            }
        }
        else if (this.stack.length === 1) {
            if (typeof something === 'number') {
                if (this.stack[0] === '0') {
                    this.stack[0] = ''
                }
                this.stack[0] += something.toString()
            }
            else if (typeof something === 'function') {
                this.stack.push(something)
            }
            else if (something === '.') {
                if (this.stack[0].indexOf('.') === -1) {
                    if (this.stack[2] === '') {
                        this.stack[2] = '0'
                    }
                    this.stack[0] += '.'
                }
            }
        }
        else if (this.stack.length === 2) {
            if (typeof something === 'number') {
                this.stack.push(something.toString())
            }
            else if (typeof something === 'function') {
                this.stack[1] = something
            }
            else if (something === '.') {
                this.stack.push('0.')
            }
        }
        else if (this.stack.length === 3) {
            if (typeof something === 'number') {
                if (this.stack[2] === '0') {
                    this.stack[2] = ''
                }
                this.stack[2] += something.toString()
            }
            else if (typeof something === 'function') {
                let x = this.stack.pop()
                let op = this.stack.pop()
                let y = this.stack.pop()
                this.stack.push(op(y, x))
                this.stack.push(something)
            }
            else if (something === '.') {
                if (this.stack[2].indexOf('.') === -1) {
                    if (this.stack[2] === '') {
                        this.stack[2] = '0'
                    }
                    this.stack[2] += '.'
                }
            }
        }
        // length constraints
        console.log(this.stack)
        let result = null
        if (this.stack.length === 3) {
            this.stack[2] = this.stack[2].slice(0, this.displayCapacity)
            result = this.stack[2]
        }
        else {
            this.stack[0] = this.stack[0].slice(0, this.displayCapacity)
            result = this.stack[0]
            // check if the result is target
            if (result === this.target) {
                this.setGameOver(true) 
            } 
        }
        return result 
    }

    evaluate() {
        let result = null 
        if (this.stack.length === 0) {
            console.log(this.stack)
            result = '0'
        }
        else if (this.stack.length === 1) {
            this.stack[0] = this.stack[0].slice(0, this.displayCapacity)
            console.log(this.stack)
            result = this.stack[0]
        }
        else if (this.stack.length === 2) {
            this.stack.pop()
            this.stack[0] = this.stack[0].slice(0, this.displayCapacity)
            console.log(this.stack)
            result = this.stack[0]
        }
        else if (this.stack.length === 3) {
            let x = this.stack.pop()
            let op = this.stack.pop()
            let y = this.stack.pop()
            this.stack.push(op(y, x))
            this.stack[0] = this.stack[0].slice(0, this.displayCapacity)
            console.log(this.stack)
            result = this.stack[0]
        }
        if (result === this.target) {
            this.setGameOver(true)
        }
        return result 
    }

}

export default CalcStack
