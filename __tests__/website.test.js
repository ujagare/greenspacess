/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Greenspaces Website Tests', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  });

  beforeEach(() => {
    document.documentElement.innerHTML = html;
  });

  test('should have correct page title', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('GREENSPACESS');
  });

  test('should have navigation menu', () => {
    const nav = document.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  test('should have contact links', () => {
    const contactLinks = document.querySelectorAll('a[href*="contact"]');
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  test('should have project sections', () => {
    const projectLinks = document.querySelectorAll('a[href*="purandhar"], a[href*="khed"], a[href*="kokan"], a[href*="mulshi"]');
    expect(projectLinks.length).toBeGreaterThan(0);
  });
});
