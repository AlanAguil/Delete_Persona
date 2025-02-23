const mongose = require('mongoose');

const PersonaSchema = mongose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    rfc: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
})

module.exports = mongose.model('Persona', PersonaSchema);