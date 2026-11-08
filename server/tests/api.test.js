import 'dotenv/config';
import assert from 'node:assert/strict';
import { after, before, beforeEach, describe, it } from 'node:test';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import Project from '../src/models/Project.js';
import User from '../src/models/User.js';

const testUri = process.env.TEST_MONGO_URI ?? process.env.MONGO_URI.replace(/\/[^/?]+(\?|$)/, '/portfolio_test$1');
const ADMIN = { email: 'admin@test.local', password: 'a-long-test-password' };

const reset = async () => {
  await Promise.all(Object.values(mongoose.connection.collections).map((collection) => collection.deleteMany({})));
  await User.create({ email: ADMIN.email, password: await bcrypt.hash(ADMIN.password, 10) });
};

const loginAgent = async () => {
  const agent = request.agent(app);
  await agent.post('/api/auth/login').send(ADMIN).expect(200);
  return agent;
};

describe('API', () => {
  before(async () => {
    const dbName = new URL(testUri).pathname.slice(1);
    assert.ok(dbName.endsWith('_test'), `Refusing to run tests on database "${dbName}"`);
    await mongoose.connect(testUri);
  });

  beforeEach(reset);

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  it('answers the health check', async () => {
    const res = await request(app).get('/api/health').expect(200);
    assert.equal(res.body.status, 'ok');
  });

  it('returns 404 for unknown routes', async () => {
    await request(app).get('/api/nothing-here').expect(404);
  });

  it('rejects wrong credentials', async () => {
    await request(app).post('/api/auth/login').send({ email: ADMIN.email, password: 'wrong' }).expect(401);
  });

  it('logs in with an httpOnly cookie', async () => {
    const res = await request(app).post('/api/auth/login').send(ADMIN).expect(200);
    const cookie = res.headers['set-cookie'].join(';');
    assert.match(cookie, /token=/);
    assert.match(cookie, /HttpOnly/i);
  });

  it('protects write routes and private data', async () => {
    await request(app).post('/api/skills').send({ name: 'Docker', category: 'Tools' }).expect(401);
    await request(app).get('/api/messages').expect(401);
    await request(app).get('/api/dashboard').expect(401);
  });

  it('lets the admin manage a resource', async () => {
    const admin = await loginAgent();
    const created = await admin.post('/api/skills').send({ name: 'Docker', category: 'Tools' }).expect(201);
    const id = created.body._id;

    const updated = await admin.put(`/api/skills/${id}`).send({ level: 'Expert' }).expect(200);
    assert.equal(updated.body.level, 'Expert');

    await admin.delete(`/api/skills/${id}`).expect(204);
    await request(app).get(`/api/skills/${id}`).expect(404);
  });

  it('hides draft projects from visitors', async () => {
    await Project.create({ title: 'Public', description: 'Visible', published: true });
    await Project.create({ title: 'Draft', description: 'Hidden', published: false });

    const visitor = await request(app).get('/api/projects').expect(200);
    assert.deepEqual(visitor.body.map((project) => project.title), ['Public']);

    const admin = await loginAgent();
    const all = await admin.get('/api/projects').expect(200);
    assert.equal(all.body.length, 2);
  });

  it('accepts a contact message and ignores unexpected fields', async () => {
    const res = await request(app)
      .post('/api/messages')
      .send({ name: 'Ann', email: 'ann@example.com', subject: 'Hi', message: 'Hello', isRead: true })
      .expect(201);
    assert.equal(res.body.isRead, false);
  });

  it('rejects an invalid email in a contact message', async () => {
    await request(app)
      .post('/api/messages')
      .send({ name: 'Ann', email: 'not-an-email', subject: 'Hi', message: 'Hello' })
      .expect(400);
  });

  it('requires the current password to change it', async () => {
    const admin = await loginAgent();
    await admin
      .put('/api/auth/password')
      .send({ currentPassword: 'wrong', newPassword: 'another-long-password' })
      .expect(400);
  });

  it('counts content on the dashboard', async () => {
    await Project.create({ title: 'One', description: 'Project' });
    const admin = await loginAgent();
    const res = await admin.get('/api/dashboard').expect(200);
    assert.equal(res.body.projects, 1);
  });
});