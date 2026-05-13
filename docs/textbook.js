/* ============================================================
   textbook.js ── text-books の共通スクリプト
   ============================================================
   担当:
     - 読了進捗バー (.progress-bar__fill の幅をスクロール率に同期)
     - 目次ドロワー (.toc-drawer の開閉)
     - フェードイン (.fade-in を IntersectionObserver で is-visible 化)

   いずれの動作も、対応する DOM 要素が存在しないページでは
   何もしない。だから index.html / 教科書本体 / 単体デモ いずれも
   この同じスクリプトを安全に読み込める。
   ============================================================ */

(function () {
  // ── 進捗バー ───────────────────────────
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      progressFill.style.width = Math.min(scrolled, 100) + '%';
    });
  }

  // ── 目次ドロワー ───────────────────────────
  const tocToggle = document.getElementById('tocToggle');
  const tocDrawer = document.getElementById('tocDrawer');
  const tocClose = document.getElementById('tocClose');
  const tocBackdrop = document.getElementById('tocBackdrop');

  if (tocToggle && tocDrawer && tocBackdrop) {
    const openToc = () => {
      tocDrawer.classList.add('is-open');
      tocBackdrop.classList.add('is-open');
    };
    const closeToc = () => {
      tocDrawer.classList.remove('is-open');
      tocBackdrop.classList.remove('is-open');
    };

    tocToggle.addEventListener('click', openToc);
    if (tocClose) tocClose.addEventListener('click', closeToc);
    tocBackdrop.addEventListener('click', closeToc);

    document.querySelectorAll('.toc-drawer a').forEach((link) => {
      link.addEventListener('click', closeToc);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeToc();
    });
  }

  // ── フェードイン (.chapter__header / .key-concept / .summary を対象) ──
  const fadeTargets = document.querySelectorAll('.chapter__header, .key-concept, .summary');
  if (fadeTargets.length > 0 && 'IntersectionObserver' in window) {
    fadeTargets.forEach((el) => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    fadeTargets.forEach((el) => observer.observe(el));
  }
})();
