const { SlashCommandBuilder } = require('@discordjs/builders')
const { Dictionary } = require('../markov/markov')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generate')
    .setDescription('Generates markov text')
    .addIntegerOption(option => option.setName('length').setDescription('Enter how long you want to generate'))
    .addStringOption(option => option.setName('startword').setDescription('Enter a word you want to start generation with, or leave blank')),
  async execute (interaction) {
    await interaction.reply(dic.generate(interaction.options.getInteger('length'), interaction.options.getString('startword'), null).join(' '))
  }
}
