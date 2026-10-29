/* 予約・問い合わせ導線のクリックをGA4に送る（委任リスナー）。
   サイト内リンクは click_internal(link_url=遷移先, page_path=遷移元)。キーイベント候補: click_hpb / click_tel / click_line_customer / click_line_giftcard / click_line_recruit */
(function () {
  var LINE = {
    '7oXigom': 'click_line_recruit',
    'Eg7VWn7': 'click_line_giftcard',
    'zPYAv3Y': 'click_line_customer'
  };
  function classify(h) {
    var m;
    if (h.indexOf('tel:') === 0) return 'click_tel';
    if ((m = h.match(/^https?:\/\/lin\.ee\/([A-Za-z0-9]+)/))) return LINE[m[1]] || 'click_line_other';
    if (/^https?:\/\/liff\.line\.me\//.test(h)) return 'click_line_other';
    if (/^https?:\/\/beauty\.hotpepper\.jp\//.test(h)) return /\/review\/?(\?|$)/.test(h) ? 'click_hpb_review' : 'click_hpb';
    if (/^https?:\/\/g\.page\//.test(h)) return 'click_google_review';
    if (/^https?:\/\/(www\.)?instagram\.com\//.test(h)) return 'click_instagram';
    if (/^https?:\/\/www\.bhappy-platform\.jp\//.test(h)) return 'click_shop';
    return null;
  }
  function norm(p) {
    p = p.replace(/\.html$/, '').replace(/\/+$/, '');
    return (p === '' || p === '/index') ? '/' : p;
  }
  function internalPath(h) {
    try {
      var u = new URL(h, location.href);
      if (u.origin !== location.origin) return null;
      return norm(u.pathname);
    } catch (e) { return null; }
  }
  function here() { return norm(location.pathname); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || typeof window.gtag !== 'function') return;
    var h = a.getAttribute('href') || '';
    var name = classify(h);
    if (!name) {
      var to = internalPath(h);
      if (to === null || to === here() || h.charAt(0) === '#') return;
      window.gtag('event', 'click_internal', {
        link_url: to,
        link_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
        page_path: here(),
        transport_type: 'beacon'
      });
      return;
    }
    var sln = h.match(/sln(H\d+)/);
    window.gtag('event', name, {
      link_url: h.slice(0, 100),
      salon_id: sln ? sln[1] : (h.indexOf('tel:') === 0 ? h.slice(4) : undefined),
      link_text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
      page_path: here(),
      transport_type: 'beacon'
    });
    // Meta広告の成果用。ピクセルを入れたページ（今は /recruit-stylist のみ）でだけ送られる
    if (name === 'click_line_recruit' && typeof window.fbq === 'function') window.fbq('track', 'Lead');
  }, true);
})();
