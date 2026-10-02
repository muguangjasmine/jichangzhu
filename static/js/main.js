
document.addEventListener('DOMContentLoaded', () => {
  // Theme Switcher
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  function updateThemeDisplay(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = '深色';
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.textContent = '☼';
      if (themeText) themeText.textContent = '浅色';
    }
  }

  const isDark = document.documentElement.classList.contains('dark');
  updateThemeDisplay(isDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isNowDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
      updateThemeDisplay(isNowDark);
    });
  }
});
