export const CAMPAIGN_LINKS = {
  whatsapp: "https://wa.me/SEUNUMERO",
  menu: "https://cardapio.villarotisseria.com.br",
  site: "https://villarotisseria.com.br",
  instagram: "https://instagram.com/villarotisseria",
};

export const MARKETING_IDS = {
  gtm: "GTM-XXXXXXX",
  metaPixel: "123456789012345",
  googleAds: "AW-XXXXXXXXXX",
  googleAdsWhatsAppLabel: "CLICK_WHATSAPP",
  googleAdsMenuLabel: "CLICK_CARDAPIO",
};

export const PLACEHOLDER_IDS = {
  gtm: "GTM-XXXXXXX",
  metaPixel: "123456789012345",
  googleAds: "AW-XXXXXXXXXX",
};

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __saboresTracking?: {
      pageViewSent?: boolean;
      depth70Sent?: boolean;
    };
  }
}

function hasRealId(value: string, placeholder: string) {
  return value.trim().length > 0 && value !== placeholder;
}

function getTrackingState() {
  if (typeof window === "undefined") {
    return { pageViewSent: false, depth70Sent: false };
  }
  window.__saboresTracking = window.__saboresTracking || {};
  return window.__saboresTracking;
}

export function bootstrapMarketing() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  getTrackingState();

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args as unknown[]);
    };
  }

  if (!window.fbq) {
    window.fbq = (...args: unknown[]) => {
      window.dataLayer.push(["fbq", ...args]);
    };
  }
}

function pushDataLayer(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  bootstrapMarketing();
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    page_title: document.title,
    ...payload,
  });
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  bootstrapMarketing();

  const state = getTrackingState();
  if (state.pageViewSent) return;
  state.pageViewSent = true;

  pushDataLayer("sabores_page_view", { trigger: "visitou_pagina" });
  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    send_to: hasRealId(MARKETING_IDS.googleAds, PLACEHOLDER_IDS.googleAds)
      ? MARKETING_IDS.googleAds
      : undefined,
  });
  window.fbq?.("track", "PageView");
  window.fbq?.("track", "ViewContent", {
    content_name: "Sabores da Copa é na Villa",
    content_category: "landing_page",
  });
}

export function trackViewContent(section: string) {
  pushDataLayer("sabores_view_content", { section });
  window.gtag?.("event", "view_item", {
    item_name: section,
    item_category: "campaign_section",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: section,
    content_category: "campaign_section",
  });
}

export function trackWhatsAppClick(source: string) {
  pushDataLayer("click_whatsapp", {
    source,
    trigger: "clicou_whatsapp",
    destination: CAMPAIGN_LINKS.whatsapp,
  });

  window.gtag?.("event", "generate_lead", {
    event_category: "engagement",
    event_label: source,
    value: 1,
  });

  if (hasRealId(MARKETING_IDS.googleAds, PLACEHOLDER_IDS.googleAds)) {
    window.gtag?.("event", "conversion", {
      send_to: `${MARKETING_IDS.googleAds}/${MARKETING_IDS.googleAdsWhatsAppLabel}`,
      event_callback: () => undefined,
    });
  }

  window.fbq?.("track", "Contact", { source });
  window.fbq?.("track", "Lead", { source, channel: "whatsapp" });
}

export function trackMenuClick(source: string) {
  pushDataLayer("click_cardapio", {
    source,
    trigger: "clicou_cardapio",
    destination: CAMPAIGN_LINKS.menu,
  });

  window.gtag?.("event", "select_content", {
    content_type: "menu",
    item_id: source,
  });

  if (hasRealId(MARKETING_IDS.googleAds, PLACEHOLDER_IDS.googleAds)) {
    window.gtag?.("event", "conversion", {
      send_to: `${MARKETING_IDS.googleAds}/${MARKETING_IDS.googleAdsMenuLabel}`,
      event_callback: () => undefined,
    });
  }

  window.fbq?.("trackCustom", "MenuClick", { source });
}

export function trackScrollDepth70() {
  if (typeof window === "undefined") return;
  bootstrapMarketing();

  const state = getTrackingState();
  if (state.depth70Sent) return;
  state.depth70Sent = true;

  pushDataLayer("scroll_depth_70", {
    trigger: "rolou_70_porcento",
    scroll_percent: 70,
  });
  window.gtag?.("event", "scroll", {
    percent_scrolled: 70,
  });
  window.fbq?.("trackCustom", "ScrollDepth70", {
    percent_scrolled: 70,
  });
}

export const marketingBootstrapScript = `
window.__MARKETING_IDS__ = ${JSON.stringify(MARKETING_IDS)};
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.fbq = window.fbq || function(){window.dataLayer.push(['fbq'].concat(Array.prototype.slice.call(arguments)));};
(function(){
  var ids = window.__MARKETING_IDS__ || {};
  if (ids.gtm && ids.gtm !== '${PLACEHOLDER_IDS.gtm}') {
    var gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + ids.gtm;
    document.head.appendChild(gtmScript);
  }
  if (ids.googleAds && ids.googleAds !== '${PLACEHOLDER_IDS.googleAds}') {
    var adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + ids.googleAds;
    document.head.appendChild(adsScript);
    window.gtag('js', new Date());
    window.gtag('config', ids.googleAds);
  }
  if (ids.metaPixel && ids.metaPixel !== '${PLACEHOLDER_IDS.metaPixel}') {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq&&f.fbq.callMethod){return;}n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq){f._fbq=n;}
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', ids.metaPixel);
  }
})();
`;