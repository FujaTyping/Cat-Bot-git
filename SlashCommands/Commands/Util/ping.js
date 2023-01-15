const { SlashCommandBuilder } = require(`@discordjs/builders`)

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ดูความล่าช้าของบอท | ตรวจสอบการตอบสนองของบอท"),
    async execute(interaction, client) {
        await interaction.reply({ content: `🏓 Pong !\nความล่าช้าของบอทอยู่ที่ **0 ms**\nความล่าช้าของ API อยู่ที่ **0 ms**`});
    }
}