'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/models/index.js');

beforeAll(async() => {
  await db.sync();  
});

afterAll(async () => {
  await db.drop()
});

describe('api server', ()=>{

  it('Should respond with 404 on a bad route', async () => {
    const response = await mockRequest.get('/fakeroute');
    expect(response.status).toBe(404)
  });

  it('Should respons with 404 on a bad method', async () => {
    const response = await mockRequest.patch('/movies/1');
    expect(response.status).toBe(404);
  });

  it('Should correctly respond to creating a record', async ()=>{
    const response = await mockRequest.post('/movies').send({
      title : "Test movie",
      genre: "test genre"
    });
    expect(response.body.title).toEqual('Test movie');
    expect(response.body.id).toBeDefined();
  })

  it('Should correctly respond to getting records from DB', async ()=>{
    const response = await mockRequest.get('/movies');  
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
  })

  it('Should correctly respond to getting one record from DB', async ()=>{
    const response = await mockRequest.get('/movies/1');
    expect(response.body.title).toEqual('Test movie');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object')
  })

  it('Should update a property of a record', async ()=>{
    const data = { year: 2000}
    const response = await mockRequest.put('/movies/1').send(data);
    expect(response.status).toBe(200);
    expect(response.body.year).toEqual(data.year);
  })

  it('Should delete a single record in the database', async ()=>{
    const response = await mockRequest.delete('/movies/1');
    expect(response.body.title).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(1);
  })
}) 