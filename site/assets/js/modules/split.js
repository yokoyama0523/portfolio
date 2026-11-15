// 見出しを語ごとに包み、下からせり上げる（[data-split]）
export function initSplit({ gsap }) {
  document.querySelectorAll('[data-split]').forEach((el) => {
    const parts = [];
    [...el.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) { parts.push(document.createTextNode(t)); return; }
          parts.push(wrap(document.createTextNode(t)));
        });
      } else {
        parts.push(wrap(n.cloneNode(true)));
      }
    });
    el.replaceChildren(...parts);
    gsap.to(el.querySelectorAll('.w > span'), {
      y: 0, duration: 1.05, ease: 'power4.out', stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}
function wrap(node) {
  const w = document.createElement('span'); w.className = 'w';
  const i = document.createElement('span'); i.appendChild(node);
  if (node.nodeType === 1 && node.tagName === 'SMALL') { w.style.display = 'block'; i.style.display = 'block'; }
  w.appendChild(i); return w;
}
