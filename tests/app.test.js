import request from 'supertest';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import app from '../app';

describe('Express App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should respond with 500 on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(500);
  });

  test('should respond with 200 on GET /users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
  });

  test('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.status).toBe(404);
  });
});
