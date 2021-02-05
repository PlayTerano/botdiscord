const Discord = require('discord.js')
const client = new Discord.Client()
const moment = require('moment')
moment.locale('pt-BR')
const config = require('./config.json')
const command = require('./command')
const privateMessage = require('./private-message')

client.on('ready', () => {
    console.log('The client is ready!')

    privateMessage(client, '!help','Por enquanto não temos um comando de ajuda,adicionaremos mais tarde.')

    command(client,['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })
    command(client, 'serverinfo', (message) => {
      const { guild } = message
      const date = message.guild.createdAt
      const joined = message.member.joinedAt
      const {name} = guild
      const icon = guild.iconURL()
      let Region = { "brazil": ":flag_br: Brazil",        
      "eu-central": ":flag_eu: Central Europe",
      "singapore": ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      "sydney": ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      "london": ":flag_gb: London",
      "amsterdam": ":flag_nl: Amsterdam",
      "hongkong": ":flag_hk: Hong Kong",
      "russia": ":flag_ru: Russia",
      "southafrica": ":flag_za:  South Africa"}
  
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setTitle(`🔍 Informações do servidor: **${name}**`)
        .setThumbnail(icon)
        .addField("Total | Humans | Bots",
          `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member =>
          !member.user.bot).size} | ${message.guild.members.cache.filter(member =>
          member.user.bot).size}`, true)
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Region", Region[message.guild.region], true)
        .addField("Channels", message.guild.channels.cache.size, true)
        .addField("Roles", message.guild.roles.cache.size, true)
        .addField("Create Date",formatDate('DD/MM/YYYY, às HH:mm:ss', date))
        .addField("Joined Date",formatDate('DD/MM/YYYY, às HH:mm:ss', joined))
        

        function formatDate (template, date) {
          var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
          date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
          return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
            return template.split(specs[i]).join(item)
          }, template)
        }

      message.channel.send(embed)
    })
})


client.login(config.token)