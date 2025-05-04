import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {

    test('Should display validation errors', async() => {
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
        
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('Should validate that the price is grater than 0', async() => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo - Testing",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    }) 

    test('Should validate that the price is a number and greater than 0', async() => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo - Testing",
            price: "hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })


    test('Should create a new product', async () => {
        const respones = await request(server).post('/api/products').send({
            name: "Tablet - Testing",
            price: 300
        })

        expect(respones.status).toBe(201)
        expect(respones.body).toHaveProperty('data')
        
        expect(respones.status).not.toBe(404)
        expect(respones.status).not.toBe(200)
        expect(respones.body).not.toHaveProperty('errors')

    },50000)


})



describe('GET /api/products', () => {

    test('Should check if api/products url exist', async() => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errros')
    })
})



describe('Get /api/products/:id' , () => {
    test('Should return a 404 response for a non-existent producto', async () => {
        const productId = 200
        const response = await request(server).get(`/api/products/${productId}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    test('Should check a valid ID in the URL', async() => {
        const response = await request(server).get('/api/products/not-valid-url')
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })


    test('get a JSON response for a single product', async() => {
        const response = await request(server).get('/api/products/1')
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})