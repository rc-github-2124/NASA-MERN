const request = require('supertest')
const app = require('../../express')
describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches').expect(200).expect('Content-Type', /json/)
    })
})
describe('Test POST /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).post('/launches').send({
            mission: 'USS Enterprise',
            rocket: 'NCC 272 -A',
            target: 'Kepler-186 f',
            launchDate: 'January 4, 2028'
        }).expect(201).expect('Content-Type', /json/)
    })
})



describe('Test POST /launches', () => {
    test('It should contain all missing fields', async () => {

    })
    test('It should catch invalid dates', () => { })
})