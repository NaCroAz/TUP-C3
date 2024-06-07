import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id: 1, nombre: "Luca", apellido: "Perez", edad: 95, borrado: false, actualizado: 0},
    {id: 2, nombre: "Maria", apellido: "Garcia", edad: 30, borrado: false, actualizado: 0},
    {id: 3, nombre: "Juan", apellido: "Lopez", edad: 40, borrado: false, actualizado: 0},
    {id: 4, nombre: "Ana", apellido: "Martinez", edad: 25, borrado: false, actualizado: 0},
    {id: 5, nombre: "Pedro", apellido: "Sanchez", edad: 50, borrado: false, actualizado: 0},
    {id: 6, nombre: "Damian", apellido: "Perez", edad: 95, borrado: true, actualizado: 0}
   
]

app.get('/personas', (req, res) => {
    const noBorrados = datos.filter(persona => !persona.borrado);
    res.status(200).json(noBorrados);
});

app.put('/personas', (req, res) => {
    const dato = req.body;

    if (dato.id === undefined) {
       
        dato.id = datos.length > 0 ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        dato.borrado = false;
        dato.actualizado = Date.now();
        datos.push(dato);
        res.status(201).json(dato);
    } else {
        
        const personaIndex = datos.findIndex(p => p.id === dato.id);
        if (personaIndex !== -1) {
            datos[personaIndex] = {
                ...datos[personaIndex],
                ...dato,
                actualizado: Date.now()
            };
            res.status(201).json(datos[personaIndex]);
        } else {
            res.status(404).json({ message: 'Id no encontrado' });
        }
    }

})

export default app