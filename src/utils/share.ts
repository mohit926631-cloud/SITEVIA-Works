/**
 * Ready-made share utility for SITEVIA WORKS
 * Handles Web Share API (native browser share sheet) and clipboard fallback with ready-made promo message.
 */

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export const getReadyMadeShareData = (currentUrl?: string): ShareOptions => {
  const url = currentUrl || (typeof window !== 'undefined' ? window.location.href : 'https://siteviaworks.com');
  const title = typeof document !== 'undefined' ? document.title : 'SITEVIA WORKS — Custom Websites for Businesses Starting at ₹2,999';
  const text = '🚀 Need a modern, fast website for your business, shop, clinic or portfolio? Check out SITEVIA WORKS — custom designs starting at ₹2,999 with WhatsApp booking & free support!';

  return {
    title,
    text,
    url,
  };
};

export const shareWebsite = async (customOptions?: Partial<ShareOptions>): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'failed' }> => {
  const base = getReadyMadeShareData();
  const shareData = {
    title: customOptions?.title || base.title,
    text: customOptions?.text || base.text,
    url: customOptions?.url || base.url,
  };

  // Try official Web Share API (native browser share sheet)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err: unknown) {
      // User cancelled share dialog or API failed - if aborted, don't fall back
      const isAbort = err instanceof Error && err.name === 'AbortError';
      if (isAbort) {
        return { success: false, method: 'native' };
      }
    }
  }

  // Fallback: Copy ready-made message with link to clipboard
  try {
    const fullMessage = `${shareData.text}\n\n👉 ${shareData.url}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(fullMessage);
      return { success: true, method: 'clipboard' };
    }
  } catch (clipErr) {
    console.error('Clipboard copy failed:', clipErr);
  }

  return { success: false, method: 'failed' };
};
