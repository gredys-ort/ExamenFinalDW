const express = require('express');
const mongoose = require('mongoose');
const {Auth, isAuthenticated}  = require('./auth.js');
const fichaP = require('./controlador.js');

const app = express();
app.use(express.json());
const port = 6000;

async function conectarDB() {
  try {
    await mongoose.connect(`mongodb://gredys9:morales@mongDB:27017/ExamenF?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error al conectar a MongoDB con Mongoose:', error);
  }
}
conectarDB();

app.post('/registrar-usuario', Auth.register);
app.post('/login', Auth.login);
app.post('/create-paciente', fichaP.crearP );
app.get('/get-pacientes', fichaP.getP);
app.get('/get-paciente/:id', fichaP.getPId);
app.put('/update-paciete/:id', fichaP.updateP);
app.delete('/delete-paciente/:id',fichaP.deleteP);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get('*', (req, res) => {
    res.status(404).send('404 not found');
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});