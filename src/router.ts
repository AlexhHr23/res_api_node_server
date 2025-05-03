
import {Router} from 'express'
import { body } from 'express-validator'
import { createProduct } from './handlers/product'
import { hadleInputErrors } from './middleware'


const router = Router()


//Routing
// router.get('/', createProduct)

router.post('/', 


    //Validaciob en handler
        body('name')
                .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
                
        body('price')
                .isNumeric().withMessage('Valor no valido ')
                .notEmpty().withMessage('El precio del producto no puede ir vacio')
                .custom((value) => value > 0).withMessage('Precio no válido'),
                hadleInputErrors,
    createProduct)

router.put('/', (req, res) => {

    res.json('Desde PUT')
})

router.patch('/', (req, res) => {

    res.json('Desde PATCH')
})


router.delete('/', (req, res) => {

    res.json('Desde DELETE')
})


export default router