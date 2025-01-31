import { describe, test, expect, vi } from 'vitest';
import { parseData } from '../main/index.js';

describe('parseData', () => {
  
  test('parses valid JSON correctly', () => {
    const data = [{ textBoxData: '{"title":"Test","content":"Hello World"}' }];
    const parsed = parseData(data, 'textBoxData');

    expect(parsed).toEqual({
      title: 'Test',
      content: 'Hello World',
    });
  });

  test('returns null when data is empty', () => {
    const data = [];
    const parsed = parseData(data, 'textBoxData');
    expect(parsed).toBeNull();
  });

  test('returns null when key is missing', () => {
    const data = [{ someOtherKey: '{"title":"Should not parse"}' }];
    const parsed = parseData(data, 'textBoxData');
    expect(parsed).toBeNull();
  });

  test('handles invalid JSON gracefully', () => {
    const data = [{ textBoxData: '{invalidJson:}' }]; // Malformed JSON
    const consoleSpy = vi.spyOn(console, 'error'); // Spy on console.error

    const parsed = parseData(data, 'textBoxData');

    expect(parsed).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to parse data:', expect.any(String));

    consoleSpy.mockRestore(); // Restore console
  });

});
