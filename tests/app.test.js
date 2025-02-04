// Verifies the behavior of an Express.js application by making HTTP requests using Supertest.

import request from 'supertest';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import app from '../app';

describe('Express App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

// Ensures that a `GET /` request results in a `500 Internal Server Error` response, 
// likely indicating an issue with the root route or intended behavior for error handling.
  test('should respond with 500 on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(500);
  });

// Verifies that a `GET /users` request responds with a `200 OK` status, 
// confirming that the `/users` endpoint is working as expected.
  test('should respond with 200 on GET /users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
  });

// Checks that accessing an unknown route
// correctly returns a `404 Not Found` response, ensuring proper handling of invalid routes.
  test('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.status).toBe(404);
  });
});
