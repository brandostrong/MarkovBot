const Markov = require('../markov/markov')

module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message) {
    const Markov = require('../markov/markov.js')
    const markov = new Markov()
    markov.addStates('Implementing a Markov Chain is a lot easier than it may sound, and training it on a real corpus was fun. The results were frankly better than I expected, though I may have set the bar too low after my little LSTM fiasco. In the future, I may try training this model with even longer chains, or a completely different corpus. In this case, trying a 5-word chain had basically deterministic results again, since each 5-word sequence was almost always unique, so I did not consider 5-words and upwards chains to be of interest. Which corpus do you think would generate more interesting results, Especially for a longer chain? Let me know in the comments!')
    markov.train()
    console.log(markov.generateRandom(15))
  }
}
