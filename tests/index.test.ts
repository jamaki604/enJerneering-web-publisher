import express, { Request, Response, NextFunction } from "express";
import { vi, describe, it, expect } from 'vitest';
import { fetchData } from '../main/index';

const app = express();

describe('fetchData function', () => {
  it('should be a function', () => {
    expect(fetchData).toBeDefined();
    expect(typeof fetchData).toBe('function'); 
  });
});

