//const markov = require('../markov/markov')



module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    console.log(message.content)
    dic.parse(message.content)
  }
}
