import express from "express";
import body_parser from 'body-parser'
import cors from 'cors'
import routeUser from "./src/routes/user.router.js";
import routerPet from "./src/routes/pets.router.js";
import routerCategories from "./src/routes/categories.router.js";
import routerValidar from "./src/routes/seguridad.routes.js";
import routerGender from "./src/routes/genders.routes.js";
import routerRaces from "./src/routes/race.router.js";

const servidor = express();

const port =3000
servidor.use(cors())


servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.use('/user', routeUser)
servidor.use('/pet',routerPet)
servidor.use('/categorias',routerCategories)
servidor.use('/gender',routerGender)
servidor.use('/race',routerRaces)
servidor.use(routerValidar)

servidor.set('view engine', 'ejs')

servidor.set('views', './views')

servidor.use(express.static('./public'))

servidor.get('/documento', (req, res) => {
    res.render('document.ejs')
})

servidor.listen(port,()=>{
    console.log('servidor funcionando en el puerto: '+port);
})