type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: MetaPixelFunction;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

let initializedPixelId = "";

const createPixelQueue = () => {
  const pixel = ((...args: unknown[]) => {
    if (pixel.callMethod) {
      pixel.callMethod(...args);
      return;
    }

    pixel.queue?.push(args);
  }) as MetaPixelFunction;

  pixel.push = pixel;
  pixel.loaded = true;
  pixel.version = "2.0";
  pixel.queue = [];

  window.fbq = pixel;
  window._fbq = pixel;

  return pixel;
};

export const initMetaPixel = () => {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();

  if (!pixelId || initializedPixelId === pixelId) {
    return;
  }

  const pixel = window.fbq ?? createPixelQueue();

  if (!document.querySelector('script[data-meta-pixel="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.metaPixel = "true";
    document.head.appendChild(script);
  }

  pixel("init", pixelId);
  pixel("track", "PageView");
  initializedPixelId = pixelId;
};

export const trackMetaLead = () => {
  window.fbq?.("track", "Lead", {
    content_name: "30 dní obsahu pro fitness trenéry",
    content_category: "lead_magnet",
  });
};

export const trackMetaContact = () => {
  window.fbq?.("track", "Contact", {
    content_name: "Web nebo web + Instagram",
    content_category: "lead_magnet_upsell",
  });
};
