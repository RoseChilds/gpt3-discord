module.exports = {
	name: 'userinfo',
  cooldown: 5,
	description: 'Get information about yourself or another user',
  usage: '[user]',
  indms: false,
	execute(client, message, args) {
		const Discord = client.Discord;
    var user = message.author;
    if(args.length==1){
      user = client.lib.getUserFromMention(args[0], client);
			if(!user){
	      user=client.users.cache.get(args[0]);
	    }
      if(!user){
        return message.inlineReply("User not found, try mentioning them or using their ID");
      }
    }
    client.database.getUser(user.id).then(botuser=>{
      const infoembed = new Discord.MessageEmbed()
      .setTitle(`${user.username}'s account info`)
      .addFields(
        { name: 'ID', value: botuser.id, inline: true },
        { name: 'Permission level', value: botuser.perms, inline: true },
        { name: 'Tokens left', value: client.lib.thousands(botuser.tokensleft), inline: true },
        { name: 'Total tokens used', value: client.lib.thousands(botuser.tokens), inline: true },
        { name: 'Banned', value: `${botuser.banned ? "Yes" : "No"}`, inline: true },
        { name: 'Accepted the EULA', value: `${botuser.eula ? "Yes" : "No"}`, inline: true },
      ).setColor(`#${client.config.brandcolour}`)
      .setThumbnail(user.displayAvatarURL());
      message.inlineReply(infoembed);
    });
	},
};
