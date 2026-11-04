(function () {
  const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });

  // Animações de entrada (GSAP). Sem GSAP ou com movimento reduzido, o conteúdo fica visível.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('load', () => {
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-txt > *', { y: 28, opacity: 0, duration: .7, stagger: .12, ease: 'power3.out' });
    gsap.from('.hero-img', { x: 60, opacity: 0, duration: .9, ease: 'power3.out' });
    gsap.from('.stripes i', { x: 200, opacity: 0, duration: .8, stagger: .1, delay: .3 });
    gsap.utils.toArray('.rv').forEach(el => gsap.from(el, { y: 36, opacity: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    gsap.to('.hero-img img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  });

  // Formulário: apenas validação no navegador. Não há backend; nada é enviado.
  const form = document.getElementById('form'), status = document.getElementById('status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.checkValidity() || !f.value.trim();
      f.classList.toggle('err', bad); if (bad) ok = false;
    });
    status.textContent = ok ? 'Protótipo: dados validados, mas nenhuma informação foi enviada.' : 'Confira os campos destacados.';
  });
})();
