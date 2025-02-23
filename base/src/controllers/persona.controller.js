const PersonaService = require('../services/persona.service');

class PersonaController {
    async getAllPersonas(req, res) {
        try {
            const personas = await PersonaService.getAllPersonas();

            // Por defecto siempre retorna 200 si no se le especifica el status
            // 200 => éxito || ok
            res.status(200).json(personas);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async getPersonaById(req, res) {
        try {
            const personaId = req.params.id;

            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id no ouede ser nulo');
            }

            const persona = await PersonaService.getPersonaById(personaId);
            res.status(200).json(persona);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async createPersona(req, res) {
        try {
            const persona = await PersonaService.createPersona(req.body);
            res.status(200).json(persona);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async updatePersona(req, res) {
        try {
            const personaId = req.params.id;

            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id no ouede ser nulo');
            }

            const persona = await PersonaService.updatePersona(personaId, req.body);

            res.status(200).json(persona);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async deletePersona(req, res) {
        try {
            const personaId = req.params.id;

            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id no ouede ser nulo');
            }

            const persona = await PersonaService.deletePersona(personaId);
            res.status(200).json(persona);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}

module.exports = new PersonaController();