import {response, Router} from 'express'
import {createUser,login,renewToken, getAllUsers} from '../controller/auth.js'
import { createCoach,addBecados,getAllCoach,deleteBecados,getCoachById , getAllBecados} from '../controller/coach.js'
import {validateJWT} from '../helpers/jwtValidator.js'
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello Worlasd!');
})

router.post('/', createUser )

router.post('/login', login )

router.post('/renew',validateJWT, renewToken )

router.get('/users', getAllUsers )

router.post('/coach',createCoach)

router.post('/coach/id',getCoachById)

router.post('/add-becados',addBecados)

router.post('/delete-becados',deleteBecados)

router.get('/all-coach',getAllCoach)

router.get('/all-becados',getAllBecados)
export default router;