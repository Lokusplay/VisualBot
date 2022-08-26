const Discord = require('discord.js');
const setupSchema = require(`${process.cwd()}/modelos/setups.js`);
module.exports = {
    name: "setup-welcome",
    aliases: ["setup-welcomes", "setup-bienvenida", "setup-bienvenidas"],
    desc: "Sirve para crear un sistema de bienvidas personalizable",
    permisos: ["Administrator"],
    run: async (client, message, args, prefix) => {
        const canalBienvenidas = message.guild.channels.cache.get(args[0]) || message.mentions.channels.filter(c => c.guild.id == message.guild.id).first()
        if(!canalBienvenidas) return message.reply("❌ **No has especificado un canal que has especificado**");

        let imagenBienvida = args[1];
        if(!imagenBienvida) return message.reply("❌ **Tines que especificar una imagen de bienvenida**");

        let mensajebienvenida = args.slice(2).join(" ")
        if(!mensajebienvenida) return message.reply("❌ **Tines que especificar un mensaje de bienvenida**");

        await setupSchema.findOneAndUpdate({guildID: message.guild.id}, {
            bienvenidas: {
                canal: canalBienvenidas.id,
                mensaje: mensajebienvenida,
                fondo: imagenBienvida,
            }
        })

        return message.reply({embeds: [
            new Discord.EmbedBuilder().setTitle(`✅ Sistema de Bienvenidas activado!\n**Mensaje de bienvenida**\`${mensajebienvenida}\`\n\n**Imagen de bienvenida**[\`Haz click\`](${imagenBienvida})`)
            .setDescription(`* Canal de bienvenidas ${canalBienvenidas}*`)
            .setColor('Green')
        ]})
    }
}

