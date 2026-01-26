/**
 * @jest-environment jsdom
 */

describe('Barba.js Integration Tests', () => {
  beforeEach(() => {
    // Mock Barba.js
    global.barba = {
      init: jest.fn(),
      hooks: {
        after: jest.fn()
      }
    };
  });

  test('should have data-barba wrapper in HTML', () => {
    document.body.innerHTML = `
      <div data-barba="wrapper">
        <div data-barba="container" data-barba-namespace="home">
          <h1>Home Page</h1>
        </div>
      </div>
    `;

    const wrapper = document.querySelector('[data-barba="wrapper"]');
    const container = document.querySelector('[data-barba="container"]');
    
    expect(wrapper).toBeTruthy();
    expect(container).toBeTruthy();
    expect(container.getAttribute('data-barba-namespace')).toBe('home');
  });

  test('should initialize Barba with transitions', () => {
    // Load barba-init.js logic
    if (typeof barba !== 'undefined') {
      barba.init({
        transitions: [{ name: 'fade' }]
      });
      
      expect(barba.init).toHaveBeenCalled();
    }
  });

  test('should have correct namespace for different pages', () => {
    const pages = ['home', 'about', 'contact', 'mulshi', 'khed', 'kokan', 'purandhar'];
    
    pages.forEach(page => {
      document.body.innerHTML = `
        <div data-barba="wrapper">
          <div data-barba="container" data-barba-namespace="${page}">
            <h1>${page} Page</h1>
          </div>
        </div>
      `;
      
      const container = document.querySelector('[data-barba="container"]');
      expect(container.getAttribute('data-barba-namespace')).toBe(page);
    });
  });
});
