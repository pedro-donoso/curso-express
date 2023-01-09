const express = require('express');
const app = express();
// desestructuracion infocursos, para importarlo directamente
const { infoCursos } = require('./cursos.js');

// Routers
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = express.Router();
app.use('/api/cursos/matematicas', routerMatematicas);

// routing sitio principal
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express de Cursos');
});
// routing cursos
app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});
// routing cursos de programacion
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion))
})

// parametros url programacion
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }

    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas)));
    } 
        res.send(JSON.stringify(resultados));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultados));
});

// routing cursos de matematicas
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas))
})
// parametros url matematicas
routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
});