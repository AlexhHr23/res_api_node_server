
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { hadleInputErrors } from './middleware'


const router = Router()

/***
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 * 
 * 
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Sucessful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                               type: array
 *                               items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */

//All products
router.get('/', getProducts),



    //Prodyct by id
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Sucessful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bas request - Invalid ID
 *              
 *          
 */
router.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
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
    param('id').isInt().withMessage('ID no válido'),
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

router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    hadleInputErrors,
    updateAvailability)


router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    hadleInputErrors,
    deleteProduct)


export default router