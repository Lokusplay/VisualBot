const setupSchema = require(`${process.cwd()}/modelos/setups.js`);
const Discord = require('discord.js')
const { Welcome } = require('niby-welcomes')

module.exports = client =>  {
    client.on("guildMemberAdd", async member => {
        try{
            const {guild} = member;

            let setupData = await setupSchema.findOne({guildID: guild.id});
            if(!setupData) return;

            let canalBienvenidas = guild.channels.cache.get(setupData?.bienvenidas?.canal);
            if(!canalBienvenidas) return;


            let imagenBienvida = await new Welcome()
                .setWelcomeMessage("BIENVENID@")
                .setUsername(member.user.tag, /*OPCIONAL*/ {color: "#FFAA00"})
                .setMemberCount(`Eres el número #${member.guild.memberCount}`, /*OPCIONAL*/ {color: "#ffffff"})
                .setAvatar(member.user.displayAvatarURL({size: 512, extension: "png"}))
                .setBackgroundUrl(setupData?.bienvenidas?.fondo, /*OPCIONAL*/ {opacity: 0.8})
                .setBorder(true, /*OPCIONAL*/ {color: "#ffffff", size: 15})
                .setStyle("koya") //koya, mee6
                .build();

                let attachment = new Discord.AttachmentBuilder(imagenBienvida, {name: `bienvenida-${member.user.tag}.png`})

                canalBienvenidas.send({ content: `${setupData?.bienvenidas?.mensaje.replace(/usuario/, member).replace(/servidor/, guild.name)}`, 
                files: [attachment]
            }).cath(() => {});

        } catch(e) {
            console.log(e)
        }
    })
}