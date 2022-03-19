import {response, Router} from 'express'
import {createUser,login,renewToken, getAllUsers} from '../controller/auth.js'
import { createCoach,addBecados,getAllCoach,deleteBecados,getCoachById , getAllBecados} from '../controller/coach.js'
import {validateJWT} from '../helpers/jwtValidator.js'
import {ProductoImagen} from '../controller/pagos.js'
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello Worlasd!');
})

router.post('/', ProductoImagen )


export default router;