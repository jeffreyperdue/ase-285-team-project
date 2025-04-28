const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Business = require('../backend/schemas/Business');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await Business.deleteMany({});
});

describe('Business Routes', () => {
  test('POST /api/menus - should create a new business', async () => {
    const businessData = {
      name: 'New Restaurant',
      address: '456 New St',
      allergens: ['dairy'],
      restaurant: new mongoose.Types.ObjectId().toString()
    };

    const response = await request(app)
      .post('/api/menus')
      .send(businessData)
      .expect(201);

    expect(response.body.name).toBe(businessData.name);
    expect(response.body.address).toBe(businessData.address);
    expect(response.body.allergens).toEqual(businessData.allergens);
    expect(response.body.restaurant).toBe(businessData.restaurant);
  });

  test('GET /api/menus/:id - should retrieve a business', async () => {
    const business = await Business.create({
      name: 'Test Get',
      address: '789 Get St',
      allergens: [],
      restaurant: new mongoose.Types.ObjectId(),
      menus: []
    });

    const response = await request(app)
      .get(`/api/menus/${business._id}`)
      .expect(200);

    expect(response.body._id).toBe(business._id.toString());
    expect(response.body.name).toBe('Test Get');
  });

  test('GET /api/menus/:id - should return 404 for non-existent business', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/api/menus/${fakeId}`)
      .expect(404);
  });

  test('PUT /api/menus/:id - should update a business', async () => {
    const business = await Business.create({
      name: 'Before Update',
      address: '123 Old St',
      allergens: [],
      restaurant: new mongoose.Types.ObjectId(),
      menus: []
    });

    const updateData = {
      name: 'After Update',
      address: '456 New St',
      allergens: ['peanuts'],
      menus: [new mongoose.Types.ObjectId()]
    };

    const response = await request(app)
      .put(`/api/menus/${business._id}`)
      .send(updateData)
      .expect(200);

    expect(response.body.name).toBe(updateData.name);
    expect(response.body.address).toBe(updateData.address);
    expect(response.body.allergens).toEqual(updateData.allergens);
    expect(response.body.menus.length).toBe(1);
  });

  test('DELETE /api/menus/:id - should delete a business', async () => {
    const business = await Business.create({
      name: 'To Delete',
      address: '123 Delete St',
      allergens: [],
      restaurant: new mongoose.Types.ObjectId(),
      menus: []
    });

    await request(app)
      .delete(`/api/menus/${business._id}`)
      .expect(200);

    const deletedBusiness = await Business.findById(business._id);
    expect(deletedBusiness).toBeNull();
  });
});