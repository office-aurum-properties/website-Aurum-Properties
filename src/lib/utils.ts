export function cn(...inputs: (string | undefined | null | false | Record<string, boolean> | (string | undefined | null | false)[] )[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      classes.push(cn(...input));
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Sanitizes user text inputs to prevent XSS and CRLF header injection.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[\r\n\t\0\b]/g, ' ') // Remove control characters / CRLF injection
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Clean phone numbers to strictly digits.
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '').slice(0, 10);
}

/**
 * Submits form data to Netlify Forms endpoint using standard application/x-www-form-urlencoded.
 * Handles both deployed Netlify environment and graceful fallback in local/preview environments.
 */
export async function submitNetlifyForm(formName: string, data: Record<string, string>): Promise<boolean> {
  try {
    const payload: Record<string, string> = {
      'form-name': formName,
      'bot-field': '',
      ...data,
    };
    const encoded = Object.keys(payload)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key] || ''))
      .join('&');

    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded,
    });
    return res.ok;
  } catch (err) {
    console.warn('Netlify form submission caught (normal during offline/preview):', err);
    return false;
  }
}

/**
 * Triggers direct download of a brochure PDF to user device.
 * Uses blob download with fallback to direct navigation.
 */
export async function downloadBrochurePDF(
  url: string,
  defaultFilename: string = 'Aurum-Sre-Nagar-Extension-Brochure.pdf'
): Promise<boolean> {
  const filename = url.split('/').pop() || defaultFilename;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const blob = await response.blob();
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(pdfBlob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 45000);
    return true;
  } catch (err) {
    console.warn('Direct blob download failed, falling back to direct link:', err);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
}

