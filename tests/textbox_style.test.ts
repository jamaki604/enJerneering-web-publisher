// Check if the returned CSS contains expected rules

import { describe, it, expect } from 'vitest';
import TextBoxStyle from '../public/componentHTML/style/textBoxStyle';

describe('TextBoxStyle', () => {
  it('should return the correct CSS styles from getStyle', () => {
    const textBoxStyle = new TextBoxStyle();
    const css = textBoxStyle.getStyle();

    expect(css).toContain('.container');
    expect(css).toContain('display: flex');
    expect(css).toContain('flex-direction: column');
    expect(css).toContain('align-items: center');
    expect(css).toContain('gap: 1.5rem');
    expect(css).toContain('max-width: 400px');
    expect(css).toContain('.text');
    expect(css).toContain('font-size: 1rem');
    expect(css).toContain('font-weight: 400');
    expect(css).toContain('color: #6b7280');
    expect(css).toContain('white-space: pre-wrap');
  });
});
