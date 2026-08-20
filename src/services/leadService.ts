export interface LeadData {
  name?: string;
  email: string;
  website?: string;
  budget?: string;
  service?: string;
  message?: string;
  source: 'project_modal' | 'cta_section';
  honeypot?: string;
  timestamp: string;
}

export interface LeadSubmissionResult {
  success: boolean;
  message: string;
}

/**
 * Validates an email address.
 */
export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Submits lead data to the configured webhook (e.g. Zapier, Make, Slack, CRM, or custom API).
 * If no external webhook is configured via VITE_LEAD_WEBHOOK_URL, it securely stores the lead
 * in localStorage for backup and returns a validated success response.
 */
export async function submitLead(data: LeadData): Promise<LeadSubmissionResult> {
  // 1. Spam detection: if honeypot is filled, silently reject or flag
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      success: false,
      message: 'Submission flagged by automated spam prevention.',
    };
  }

  // 2. Validate email
  if (!data.email || !validateEmail(data.email)) {
    return {
      success: false,
      message: 'Please provide a valid work email address.',
    };
  }

  // 3. Rate limiting (Client-side protection against rapid double-clicks)
  const lastSubmitKey = 'evotilee_last_lead_submit';
  const lastSubmit = localStorage.getItem(lastSubmitKey);
  const now = Date.now();
  if (lastSubmit && now - parseInt(lastSubmit, 10) < 5000) {
    return {
      success: false,
      message: 'Please wait a few seconds before submitting again.',
    };
  }

  // 4. Webhook submission if configured
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;

  try {
    if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.startsWith('http')) {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }
    }

    // 5. Store in local lead archive as resilient backup
    try {
      const existingLeads = JSON.parse(localStorage.getItem('evotilee_leads_archive') || '[]');
      existingLeads.push({
        ...data,
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('evotilee_leads_archive', JSON.stringify(existingLeads));
      localStorage.setItem(lastSubmitKey, now.toString());
    } catch {
      // Ignore storage quota errors
    }

    return {
      success: true,
      message: 'Audit request successfully received. Our strategy team will be in touch.',
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      message: 'Failed to deliver request. Please check your connection or contact us directly.',
    };
  }
}
