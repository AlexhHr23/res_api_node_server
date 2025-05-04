
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




/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor curvo 40 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *         201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 */
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


/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor curvo 40 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or invalid input data
 *          404:
 *              description: Product not found
 * 
 * 
 */

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


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updates a product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    hadleInputErrors,
    updateAvailability)


router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    hadleInputErrors,
    deleteProduct)


export default router