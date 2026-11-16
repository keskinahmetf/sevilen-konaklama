/* Shared behaviour for the sub pages: language switch (remembered across pages), big header at the top. */
(function(){
  const COMMON = {
    tr:{navHome:"Ana sayfa", navGuide:"Gezi Rehberi", navRoutes:"Rotalar", navMugla:"Muğla’yı Tanıyın", callBtn:"Bizi arayın", callNow:"Ara",
        footAddr:"Dikmekavak Mah. Dikmekavak Cad. No:184, Ortaca / Muğla"},
    en:{navHome:"Home", navGuide:"Travel Guide", navRoutes:"Routes", navMugla:"Discover Muğla", callBtn:"Call us", callNow:"Call",
        footAddr:"Dikmekavak Mah. Dikmekavak Cad. No:184, Ortaca / Muğla, Türkiye"}
  };
  let lang = "tr";
  try { const s = localStorage.getItem("lang"); if (s === "en" || s === "tr") lang = s; } catch(e){}
  function apply(){
    const t = Object.assign({}, COMMON[lang], (window.PAGE_T || {})[lang] || {});
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = t[el.dataset.i18n]; if (typeof v === "string") el.innerHTML = v; });
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    if (t.pageTitle) document.title = t.pageTitle;
    if (typeof window.renderPage === "function") window.renderPage(lang, t);
  }
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch(e){}
    apply();
  }));
  const topbar = document.getElementById("topbar");
  const setBig = () => topbar && topbar.classList.toggle("big", scrollY < 40);
  addEventListener("scroll", setBig, {passive:true}); setBig();
  window.siteLang = () => lang;
  apply();
})();
