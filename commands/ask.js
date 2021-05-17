module.exports = {
	name: 'ask',
  cooldown: 5,
	description: 'Ask the bot something',
	execute(client, message, args) {
		const Discord = client.Discord;
    message.channel.startTyping();
    client.lib.getAnswer(message).then(data=>{
      if(data=="" || !data){
        data = "`[EMPTY MESSAGE]`"
      }
      message.inlineReply(data);
      message.channel.stopTyping();
    }).catch(error=>{
      message.channel.stopTyping();
      switch(error.code){
        case 0:
          message.inlineReply(`You don't have enough tokens to ask that! You have ${client.lib.thousands(error.has)} tokens, but you need ${client.lib.thousands(error.needed)}. The OpenAI API costs us money to use, so we limit how much users can use the bot.\nYour tokens reset every 24 hours. Run \`${client.config.bot.prefix}tokens\` to find out when your tokens reset.`);
          break;
        case 2:
          message.inlineReply("Uh oh that message contains a blacklisted word (warning)");
          break;
        case 3:
          message.inlineReply(`That message uses too many tokens (${client.lib.thousands(error.has)}). The max is 150 tokens.`)
        default:
          throw new Error(error);
      }
    });
	},
};
