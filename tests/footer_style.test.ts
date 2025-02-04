// Check if the returned CSS contains expected rules
import { describe, it, expect } from 'vitest';
import FooterStyle from '../public/componentHTML/style/footerStyle';

describe('FooterStyle', () => {
  it('should return the correct CSS styles from getStyle', () => {
    const footerStyle = new FooterStyle();
    const css = footerStyle.getStyle();

    expect(css).toContain('.footer-container');
    expect(css).toContain('background-color: #DCD3FF');
    expect(css).toContain('flex-direction: column');
    expect(css).toContain('max-width: 60%');
    expect(css).toContain('font-size: 1rem');
    expect(css).toContain('color: #6b7280');
    expect(css).toContain('grid-template-columns: repeat(2, 1fr)');
    expect(css).toContain('@media (min-width: 768px)');
    expect(css).toContain('@media (min-width: 1280px)');
    expect(css).toContain('.footer-group');
    expect(css).toContain('text-transform: uppercase');
  });
});
