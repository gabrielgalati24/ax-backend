import {response, Router} from 'express'
import {createUser,login,renewToken, getAllUsers} from '../controller/auth.js'
import { createCoach,addBecados,getAllCoach,deleteBecados,getCoachById , getAllBecados} from '../controller/coach.js'
import {createInversor,getAllInversores,getInversorById,pagarInversor} from '../controller/inversor.js'
import {validateJWT} from '../helpers/jwtValidator.js'
import {ProductoImagen} from '../controller/pagos.js'
const router = Router();



router.post('/inversorid',getInversorById)
router.post('/inversor/pagar',pagarInversor)
router.post('/', createInversor )

router.get('/inversores', getAllInversores )

export default router;