const PersonaRepository = require('../repositories/persona.repository');
const Validaciones = require('../utils/Validaciones');
const Utils = require('../utils/Utils');

class PersonaService {
    async getAllPersonas() {
        return await PersonaRepository.getAllPersonas();
    }

    async getPersonaById(id) {
        const persona = await PersonaRepository.getPersonaById(id);

        if (!persona) {
            throw new Error('Persona no encontrada');
        }

        return persona;
    }

    async createPersona(persona) {

        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error('Todos los campos son requeridos.');
        }

        Validaciones.validarRFC(persona.rfc);
        Validaciones.validarCorreo(persona.correo);

        const personaByRFC = await PersonaRepository.getPersonaByRFC(persona.rfc);
        const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo);

        if (personaByRFC) {
            throw new Error('El rfc ya existe');
        }

        if (personaByCorreo) {
            throw new Error('El correo ya existe');
        }

        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }

        return await PersonaRepository.createPersona(persona);
    }

    async updatePersona(id, persona) {

        const personaById = await PersonaRepository.getPersonaById(id);

        if (!personaById) {
            throw new Error('Persona no encontrada');
        }

        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error('Todos los campos son requeridos.');
        }

        Validaciones.validarRFC(persona.rfc);
        Validaciones.validarCorreo(persona.correo);

        const personaByRFCAndNotId = await PersonaRepository.getPersonaByRFCAndNotId(id, persona.rfc);
        const personaByCorreoAndNotId = await PersonaRepository.getPersonaByCorreoAndNotId(id, persona.correo);

        if (personaByRFCAndNotId) {
            throw new Error('El rfc ya existe');
        }

        if (personaByCorreoAndNotId) {
            throw new Error('El correo ya existe');
        }

        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }

        return await PersonaRepository.createPersona(persona);
    }

    async deletePersona(id) {
        const persona = await PersonaRepository.deletePersona(id);

        if (!persona) {
            throw new Error('Persona no encontrada');
        }

        return persona;
    }
}

module.exports = new PersonaService();