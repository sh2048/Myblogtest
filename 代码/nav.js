const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

btn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
});

// 无障碍增强：Esc 关闭
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
});
