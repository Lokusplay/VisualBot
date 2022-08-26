const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: String,
    reaccion_roles: Array,
    sistema_tickets: {type: Object, default: {canal: "", mensaje: ""}},
    sugerencias: {type: String, default: ""},
    niveles: {type: Object, default: {canal: "", mensaje: ""}},
    bienvenidas: {type: Object, default: {canal: "", fondo: "https://cdn.discordapp.com/attachments/1012106135815323838/1012428145409937568/visual.jpg",mensaje: "Bienvenido {usuario} al {servidor}"}},
})

const model = mongoose.model("Configuraciones", setupSchema);

module.exports = model;
