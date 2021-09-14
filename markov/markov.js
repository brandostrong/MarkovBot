class Markov {
  constructor () {
    this.states = []

    this.possibilities = {}

    this.order = 3

    this.start = []
  }

  addStates (state) {
    if (Array.isArray(state)) {
      this.states = Array.from(state)
    } else {
      this.states.push(state)
    }
  }

  clearChain () {
    this.states = []

    this.start = []

    this.possibilities = {}
    this.order = 3
  }

  clearState () {
    this.states = []

    this.start = []
  }

  clearPossibilities () {
    this.possibilities = {}
  }

  getStates () {
    return this.states
  }

  setOrder (order = 3) {
    if (order <= 0) {
      console.error(
        'Markov.setOrder: Order is not a positive number. Defaulting to 3.'
      )
    }
    this.order = order
  }

  getOrder () {
    return this.order
  }

  getPossibilities (possibility) {
    if (possibility) {
      if (this.possibilities[possibility] !== undefined) {
        return this.possibilities[possibility]
      } else {
        throw new Error('There is no such possibility called ' + possibility)
      }
    } else {
      return this.possibilities
    }
  }

  train (order) {
    this.clearPossibilities()

    if (order) {
      this.order = order
    }

    for (let i = 0; i < this.states.length; i++) {
      this.start.push(this.states[i].substring(0, this.order))

      for (let j = 0; j <= this.states[i].length - this.order; j++) {
        const gram = this.states[i].substring(j, j + this.order)

        if (!this.possibilities[gram]) {
          this.possibilities[gram] = []
        }

        this.possibilities[gram].push(this.states[i].charAt(j + this.order))
      }
    }
  }

  generateRandom (chars = 15) {
    const startingState = this.random(this.start, 'array')
    let result = startingState
    let current = startingState
    let next = ''

    for (let i = 0; i < chars - this.order; i++) {
      next = this.random(this.possibilities[current], 'array')

      if (!next) {
        break
      }

      result += next
      current = result.substring(result.length - this.order, result.length)
    }

    return result
  }

  random (obj, type) {
    if (Array.isArray(obj) && type === 'array') {
      const index = Math.floor(Math.random() * obj.length)

      return obj[index]
    }

    if (typeof obj === 'object' && type === 'object') {
      const keys = Object.keys(obj)
      const index = Math.floor(Math.random() * keys.length)

      return keys[index]
    }
  }

  getType () {
    return this.type
  }

  setType (type = 'text') {
    if (type === 'text' || type === 'numeric') {
      this.clearChain()
      this.type = type
    } else {
      throw new Error('Invalid type: ' + type)
    }
  }
}

module.exports = Markov
