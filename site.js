const root = document.documentElement;
const storedTheme = (() => {
  try { return localStorage.getItem('portfolio-theme'); } catch { return null; }
})();
root.dataset.theme = storedTheme === 'light' ? 'light' : 'dark';

const updateThemeControls = () => {
  const light = root.dataset.theme === 'light';
  document.querySelectorAll('.theme-toggle').forEach((button) => {
    button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    button.querySelector('.theme-icon').textContent = light ? '☾' : '☼';
  });
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = light ? '#f4f1e8' : '#10151d';
};

updateThemeControls();
document.querySelectorAll('.theme-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
    updateThemeControls();
  });
});

document.querySelectorAll('.mobile-menu nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = link.closest('details');
    if (menu) menu.open = false;
  });
});

const typedText = document.querySelector('.typed-text');
if (typedText) {
  const phrases = ['full stack applications', 'mobile applications', 'web applications'];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedText.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;
    const type = () => {
      const phrase = phrases[phraseIndex];
      if (deleting) {
        characterIndex -= 1;
        typedText.textContent = phrase.slice(0, characterIndex);
        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          window.setTimeout(type, 420);
          return;
        }
      } else {
        characterIndex += 1;
        typedText.textContent = phrases[phraseIndex].slice(0, characterIndex);
        if (characterIndex === phrases[phraseIndex].length) {
          deleting = true;
          window.setTimeout(type, 1800);
          return;
        }
      }
      window.setTimeout(type, deleting ? 42 : 72);
    };
    window.setTimeout(type, 1800);
  }
}
