import { describe, it, expect, vi } from 'vitest';
import { fetchData } from '../main/index.js';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  limit: vi.fn(),
};

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => mockSupabase,
}));

describe('fetchData', () => {
  it('should fetch data correctly for a valid projectId', async () => {

    mockSupabase.single.mockResolvedValueOnce({
      data: {
        projectId: '6ed47459-139a-4f39-ac04-f93765829206',
        projectTitle: 'Test Project',
        createdAt: '2022-01-01T00:00:00Z',
        lastUpdated: '2022-01-02T00:00:00Z',
      },
      error: null,
    });
    mockSupabase.limit.mockResolvedValueOnce({
      data: [{ textBoxData: '{"example":"content"}', footerData: '{"footer":"content"}' }],
      error: null,
    });
    mockSupabase.select.mockResolvedValueOnce({
      data: [
        { serviceId: '1', serviceName: 'Test Service', serviceDescription: 'Description' },
      ],
      error: null,
    });

    const projectId = '123';
    const result = await fetchData(projectId);

    expect(result.projectData.projectId).toBe('6ed47459-139a-4f39-ac04-f93765829206');
    expect(result.textboxData).toEqual({ example: 'content' });
    expect(result.footerData).toEqual({ footer: 'content' });
    expect(result.serviceData.length).toBe(1);
    expect(result.serviceData[0].serviceName).toBe('Test Service');
  });

  it('should return an error if projectId is missing', async () => {
    const result = await fetchData(null);

    expect(result.error).toBeDefined();
    expect(result.error.message).toBe('Invalid or missing Project ID');
  });
});
