const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoutes = require('./src/routes/persona.routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/personas', personasRoutes);

// Conexión a la base de datos
mongoose.connect('mongodb+srv://20233tn135:%40Conectado1@clusteralan.lj3nm.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=ClusterAlan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la nase');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
}).catch((e) => {
    console.log('No se puede conectar a la base de datos', e)
});