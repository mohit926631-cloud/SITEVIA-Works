import { VITEWEB_WHATSAPP_NUMBER } from '../constants';

/**
 * Ready-made share utility for SITEVIA WORKS
 * Handles Web Share API (native browser share sheet) and clipboard fallback with rich agency promo message.
 */

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export const getReadyMadeShareData = (currentUrl?: string): ShareOptions => {
  const url =
    currentUrl ||
    (typeof window !== 'undefined'
      ? window.location.origin && window.location.origin !== 'null'
        ? window.location.origin
        : window.location.href
      : 'https://siteviaworks.com');
  const title = 'SITEVIA WORKS — Custom Websites for Businesses Starting at ₹2,999';

  const text = `🚀 *SITEVIA WORKS — Professional Websites for Your Business*
_Your Vision, Our Code_

Custom, mobile-friendly websites starting at just *₹2,999* (one-time fee).
⚡ Launch in 3–7 days · 1-Tap WhatsApp buttons · Dedicated support included.

🌐 Explore & View Demos:
${url}

💬 WhatsApp: +91 95110 07593`;

  return {
    title,
    text,
    url,
  };
};

export const shareWebsite = async (
  customOptions?: Partial<ShareOptions>
): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'failed' }> => {
  const base = getReadyMadeShareData();
  const title = customOptions?.title || base.title;
  const text = customOptions?.text || base.text;
  const url = customOptions?.url || base.url;

  // Try official Web Share API (native browser share sheet)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      // Pass text and url in share payload
      await navigator.share({
        title,
        text,
      });
      return { success: true, method: 'native' };
    } catch (err: unknown) {
      // User cancelled share dialog or API failed - if aborted, don't fall back
      const isAbort = err instanceof Error && err.name === 'AbortError';
      if (isAbort) {
        return { success: false, method: 'native' };
      }

      // Retry with URL explicitly attached if browser required URL property
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return { success: true, method: 'native' };
      } catch (retryErr: unknown) {
        const isAbortRetry = retryErr instanceof Error && retryErr.name === 'AbortError';
        if (isAbortRetry) {
          return { success: false, method: 'native' };
        }
      }
    }
  }

  // Fallback: Copy rich ready-made message to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard' };
    }
  } catch (clipErr) {
    console.error('Clipboard copy failed:', clipErr);
  }

  return { success: false, method: 'failed' };
};
