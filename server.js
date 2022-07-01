import express from 'express';
import { engine } from 'express-handlebars'
import { Contenedor } from './contenedor.js'
let contenedor1 = new Contenedor()

const PORT = process.env.PORT || 8080


const app = express();

app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout:'index.hbs'
}));
app.set('view engine', '.hbs');
app.set('views','./views')

const routerProducto = express.Router()
app.use('/api/productos',routerProducto)
app.use(express.static('publico'))
routerProducto.use(express.json())
routerProducto.use(express.urlencoded({extended:true}))
const middle =(req,res,next)=>{
    const {id} = req.body

    if(id)
        console.log(`id ${id}`)
        
    next()
}
const server = app.listen(PORT,()=>{
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error',error=> console.log(`error en el servidor ${error}`))

routerProducto.get('/', (req,res)=>{
    res.send(contenedor1.getAll())
})

routerProducto.get('/:id',async (req,res)=>{
    const id= req.params.id
    const result = await contenedor1.getById(id) ?? {error:'producto no encontrado'}
    res.send(result)
})

routerProducto.post('/',middle,async (req,res)=>{
    const data = req.body
    const result = await contenedor1.post(data) ?? {error:'error al guardar'}
    res.send(result)
})
routerProducto.put('/:id',async (req,res)=>{
    const data = req.body
    data.id = req.params.id
    const result = await contenedor1.put(data) ?? {error:'error al actualizar'}
    res.send(result)
})
routerProducto.delete('/:id',async (req,res)=>{
    const id = req.params.id
    const result = contenedor1.deleteById(id)
    res.send(result)
})
//formularios para listar, agregar, editar y eliminar elementos
app.get('/',(req,res)=>{
    const productos = contenedor1.getAll()
    res.render("main",{productos})
})
app.get('/edit/:id',async(req,res)=>{
    const productos = contenedor1.getAll()
    const id = req.params.id
    const producto = await contenedor1.getById(id) ?? {error:'producto no encontrado'}
    res.render("main",{producto,productos})
})

