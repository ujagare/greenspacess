/**
 * Website Tests - GREENSPACESS
 * Testing critical functionality
 */

const fs = require('fs');
const path = require('path');

describe('GREENSPACESS Website Tests', () => {
  const pages = [
    'index.html',
    'about.html',
    'contact.html',
    'service.html',
    'project.html',
    'purandhar.html',
    'khed.html',
    'kokan.html',
    'mulshi.html'
  ];

  describe('HTML Files Existence', () => {
    pages.forEach(page => {
      test(`${page} should exist`, () => {
        const filePath = path.join(__dirname, '..', page);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('HTML Structure Validation', () => {
    pages.forEach(page => {
      test(`${page} should have valid HTML structure`, () => {
        const filePath = path.join(__dirname, '..', page);
        const content = fs.readFileSync(filePath, 'utf8');
        
        expect(content).toContain('<!doctype html>');
        expect(content).toContain('<html');
        expect(content).toContain('</html>');
        expect(content).toContain('<head>');
        expect(content).toContain('</head>');
        expect(content).toContain('<body>');
        expect(content).toContain('</body>');
      });
    });
  });

  describe('Barba.js Removal Verification', () => {
    pages.forEach(page => {
      test(`${page} should not contain Barba.js references`, () => {
        const filePath = path.join(__dirname, '..', page);
        const content = fs.readFileSync(filePath, 'utf8');
        
        expect(content).not.toContain('barba.umd.js');
        expect(content).not.toContain('barba-init.js');
        expect(content).not.toContain('data-barba="wrapper"');
        expect(content).not.toContain('data-barba="container"');
      });
    });
  });

  describe('Navigation Links', () => {
    pages.forEach(page => {
      test(`${page} should have navigation links`, () => {
        const filePath = path.join(__dirname, '..', page);
        const content = fs.readFileSync(filePath, 'utf8');
        
        expect(content).toContain('href="index.html"');
        expect(content).toContain('href="about.html"');
        expect(content).toContain('href="contact.html"');
        expect(content).toContain('href="service.html"');
        expect(content).toContain('href="project.html"');
      });
    });
  });

  describe('SEO Meta Tags', () => {
    pages.forEach(page => {
      test(`${page} should have essential meta tags`, () => {
        const filePath = path.join(__dirname, '..', page);
        const content = fs.readFileSync(filePath, 'utf8');
        
        expect(content).toContain('<title>');
        expect(content).toContain('name="description"');
        expect(content).toContain('name="viewport"');
      });
    });
  });

  describe('CSS Resources', () => {
    test('index.html should have deferred CSS', () => {
      const filePath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(filePath, 'utf8');
      
      expect(content).toContain('rel="preload"');
      expect(content).toContain('as="style"');
      expect(content).toContain('onload="this.onload=null;this.rel=\'stylesheet\'"');
    });
  });

  describe('Spinner/Loader', () => {
    pages.forEach(page => {
      test(`${page} should have spinner element`, () => {
        const filePath = path.join(__dirname, '..', page);
        const content = fs.readFileSync(filePath, 'utf8');
        
        expect(content).toContain('id="spinner"');
      });
    });
  });

  describe('JavaScript Files', () => {
    const jsFiles = [
      'js/main.js',
      'js/contact-form.js',
      'js/dropdown.js',
      'js/smooth-scroll.js'
    ];

    jsFiles.forEach(jsFile => {
      test(`${jsFile} should exist`, () => {
        const filePath = path.join(__dirname, '..', jsFile);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('Locomotive Scroll Implementation', () => {
    test('index.html should have Locomotive Scroll', () => {
      const filePath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(filePath, 'utf8');
      
      expect(content).toContain('locomotive-scroll');
      expect(content).toContain('data-scroll-container');
    });

    test('smooth-scroll.js should exist and contain Locomotive code', () => {
      const filePath = path.join(__dirname, '..', 'js/smooth-scroll.js');
      const content = fs.readFileSync(filePath, 'utf8');
      
      expect(content).toContain('LocomotiveScroll');
      expect(content).toContain('smooth: true');
    });
  });

  describe('Video Loader', () => {
    test('index.html should have video loader', () => {
      const filePath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(filePath, 'utf8');
      
      expect(content).toContain('id="loaderVideo"');
      expect(content).toContain('img/Video/small.mp4');
    });
  });

  describe('Footer Content', () => {
    pages.forEach(page => {
      test(`${page} should have footer with contact info`, () => {
        const filePath = path.join(__dirname, '..', page);
        const content = fs.readFileSync(filePath, 'utf8');
        
        expect(content).toContain('greennspacess@gmail.com');
        expect(content).toContain('7972258038');
        expect(content).toContain('7666090107');
      });
    });
  });
});
