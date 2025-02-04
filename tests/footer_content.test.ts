// Ensures that the HTML is correctly generated for different input conditions, 
// including cases where some data might be missing.

import { describe, it, expect } from 'vitest';
import FooterContent from '../public/componentHTML/content/footerContent';

describe('FooterContent', () => {
  it('should generate correct HTML for footer with valid data', () => {
    const parsedFooterData = {
      logo: 'logo.png',
      slogan: 'Best website ever',
      socials: [
        { name: 'Facebook', url: 'facebook.com' },
        { name: 'Twitter', url: 'twitter.com' },
      ],
      navigation: [
        { title: 'Page 1', href: '/page1' },
        { title: 'Page 2', href: '/page2' },
        { title: 'Page 3', href: '/page3' },
      ],
      polices: [
        { title: 'Privacy Policy', url: 'privacy-policy' },
        { title: 'Terms & Conditions', url: 'terms' },
      ],
      copyRight: '© 2025 Best Website',
    };

    const footerContent = new FooterContent(parsedFooterData);
    const html = footerContent.getContent();

    // Check if the HTML contains expected values
    expect(html).toContain('<img src="logo.png" alt="Logo"/>');
    expect(html).toContain('Best website ever');
    expect(html).toContain('<a href="https://facebook.com">Facebook</a>');
    expect(html).toContain('<a href="https://twitter.com">Twitter</a>');
    expect(html).toContain('<a href="/page1">Page 1</a>');
    expect(html).toContain('<a href="/page2">Page 2</a>');
    expect(html).toContain('<a href="/page3">Page 3</a>');
    expect(html).toContain('<a href="https://privacy-policy">Privacy Policy</a>');
    expect(html).toContain('<a href="https://terms">Terms & Conditions</a>');
    expect(html).toContain('© 2025 Best Website');
  });

  it('should handle missing navigation and socials gracefully', () => {
    const parsedFooterData = {
      logo: 'logo.png',
      slogan: 'Best website ever',
      socials: [],
      navigation: [],
      polices: [],
      copyRight: '© 2025 Best Website',
    };

    const footerContent = new FooterContent(parsedFooterData);
    const html = footerContent.getContent();

    // Check if the generated HTML doesn't include navigation and socials
    expect(html).not.toContain('<a href="https://facebook.com">Facebook</a>');
    expect(html).not.toContain('<a href="https://twitter.com">Twitter</a>');
    expect(html).not.toContain('<a href="/page1">Page 1</a>');
    expect(html).not.toContain('<a href="/page2">Page 2</a>');
    expect(html).not.toContain('<a href="/page3">Page 3</a>');
    expect(html).toContain('© 2025 Best Website');
  });

  it('should handle missing polices gracefully', () => {
    const parsedFooterData = {
      logo: 'logo.png',
      slogan: 'Best website ever',
      socials: [
        { name: 'Facebook', url: 'facebook.com' },
      ],
      navigation: [
        { title: 'Page 1', href: '/page1' },
      ],
      polices: [],
      copyRight: '© 2025 Best Website',
    };

    const footerContent = new FooterContent(parsedFooterData);
    const html = footerContent.getContent();

    // Check if the generated HTML doesn't include policy links
    expect(html).not.toContain('<a href="https://privacy-policy">Privacy Policy</a>');
    expect(html).not.toContain('<a href="https://terms">Terms & Conditions</a>');
    expect(html).toContain('© 2025 Best Website');
  });

  it('should render default footer HTML structure even with missing data', () => {
    const parsedFooterData = {
      logo: '',
      slogan: '',
      socials: [],
      navigation: [],
      polices: [],
      copyRight: '',
    };

    const footerContent = new FooterContent(parsedFooterData);
    const html = footerContent.getContent();

    // Check that even with missing data, the HTML structure is still rendered
    expect(html).toContain('<div class="footer-container">');
    expect(html).toContain('<footer aria-labelledby="footer-heading" class="footer">');
    expect(html).toContain('<div class="footer-bottom">');
    expect(html).toContain('<p></p>'); // empty copyRight
  });
});
