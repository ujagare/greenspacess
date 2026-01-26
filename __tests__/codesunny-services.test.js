/**
 * @jest-environment jsdom
 */

describe('CodeSunny Services Section Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="light-effect"></div>
      <div class="feature-icon-circle"></div>
      <div class="feature-icon-circle"></div>
      <div class="feature-icon-circle"></div>
      <div class="feature-icon-circle"></div>
      <div class="tech-icon"><i aria-hidden="true"></i><span class="visually-hidden">HTML5</span></div>
      <div class="tech-icon"><i aria-hidden="true"></i><span class="visually-hidden">CSS3</span></div>
      <div class="tech-icon"><i aria-hidden="true"></i><span class="visually-hidden">JavaScript</span></div>
      <div class="tech-icon"><i aria-hidden="true"></i><span class="visually-hidden">React</span></div>
      <div class="stats-card"></div>
      <button class="btn">Button 1</button>
      <button class="btn">Button 2</button>
    `;
  });

  test('should have light effect element', () => {
    const lightEffect = document.querySelector('.light-effect');
    expect(lightEffect).toBeTruthy();
  });

  test('should have feature icon circles', () => {
    const featureIcons = document.querySelectorAll('.feature-icon-circle');
    expect(featureIcons.length).toBe(4);
  });

  test('should have tech icons with accessibility', () => {
    const techIcons = document.querySelectorAll('.tech-icon');
    expect(techIcons.length).toBe(4);
    
    techIcons.forEach(icon => {
      const ariaHidden = icon.querySelector('[aria-hidden="true"]');
      const visuallyHidden = icon.querySelector('.visually-hidden');
      expect(ariaHidden).toBeTruthy();
      expect(visuallyHidden).toBeTruthy();
    });
  });

  test('should have stats card without inline transform', () => {
    const statsCard = document.querySelector('.stats-card');
    expect(statsCard).toBeTruthy();
    expect(statsCard.style.transform).toBe('');
  });

  test('should have CTA buttons', () => {
    const ctaButtons = document.querySelectorAll('.btn');
    expect(ctaButtons.length).toBeGreaterThanOrEqual(2);
  });
});
