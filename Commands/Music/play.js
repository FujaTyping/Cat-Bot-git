const {EmbedBuilder, messageLink} = require('discord.js');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const scPlugin = new SoundCloudPlugin();

module.exports = {
    config: {
        name: 'play',
        description: 'play music',
        usage: `m.play`,
    },
    async run (client,message,args) {
      const MusicAuthorprofile = client.config.defultauthorprofile
        if (!message.member.voice.channel) {
          const NotinVC = new EmbedBuilder()
            .setColor(16711680)
            .setAuthor({ name: `กรุณาเข้าห้องก่อนจะเล่นเพลงนะคะ !` , iconURL: `${MusicAuthorprofile}`})
            .setTimestamp()

          return message.channel.send({  embeds : [NotinVC] })
        } else {
          const string = args.join(' ')
          const NospngName = new EmbedBuilder()
            .setColor(16711680)
            .setAuthor({ name: `ดูเหมือนว่าชื่อเพลง / ลิงค์เพลงจะไม่ถูกต้องนะ !` , iconURL: `${MusicAuthorprofile}`})
            .setTimestamp()
          if (!string) return message.channel.send({ embeds : [NospngName] })
          //console.log(string)

          scPlugin.search(string).then(results => {
              const url = results[0].url;
              //console.log(url)
              client.distube.play(message.member.voice.channel, url, {
                member: message.member,
                textChannel: message.channel,
                message
              })
          }).catch(error => {
            //console.error(error);
            const Nosong = new EmbedBuilder()
              .setColor(16711680)
              .setAuthor({ name: `หนูไม่พบเพลง : ${string} บน Soundcloud เลยลองหาเพลงอื่นดูสิ !` , iconURL: `${MusicAuthorprofile}`})
              .setDescription("ขณะนี้ระบบเล่นเพลง เล่นเพลงได้แค่ใน Soundcloud เท่านั้น spotify กำลังมา เร็วนี้ๆ")
              .setTimestamp();
            message.channel.send({ embeds : [Nosong] });
          });

        }
    }
}