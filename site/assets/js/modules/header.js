// ヘッダー：少しスクロールしたら背景を付け、下へ進むときは隠し、戻るときに出す
export function initHeader() {
  const hd = document.querySelector('[data-hd]');
  if (!hd) return;
  let last = scrollY;
  const onScroll = () => {
    const y = scrollY;
    hd.classList.toggle('is-scrolled', y > 8);
    hd.classList.toggle('is-hidden', y > 400 && y > last + 2);
    if (y < last - 2) hd.classList.remove('is-hidden');
    last = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
