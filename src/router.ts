
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability } from './handlers/product'
import { hadleInputErrors } from './middleware'


const router = Router()


//Routing

//All products
router.get('/', getProducts),

    //Prodyct by id
    router.get('/:id',
        param('id').isInt().withMessage('ID no valido'),
        hadleInputErrors,
        getProductById),


    //Create product
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

router.put('/:id',

    //Validaciob en handler
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no valido ')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('Precio no válido'),

    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válaido'),
    hadleInputErrors,
    updateProduct)

router.patch('/:id', updateAvailability)


router.delete('/', (req, res) => {

    res.json('Desde DELETE')
})


export default router