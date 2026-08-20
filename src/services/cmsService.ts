import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { CmsReview, CmsCampaign, ProjectItem } from '../types';
import { templateConfig } from '../templateConfig';
import firebaseConfigData from '../../firebase-applet-config.json';

export interface CmsActivityLog {
  id: string;
  timestamp: string;
  type: 'save_review' | 'delete_review' | 'save_campaign' | 'delete_campaign' | 'test_connection' | 'seed_defaults';
  status: 'success' | 'error' | 'pending';
  targetId?: string;
  title: string;
  details?: string;
  errorCode?: string;
  latencyMs?: number;
}

// Curated Seed Reviews based on Evotilee's performance marketing & SEO brand
export const DEFAULT_REVIEWS: CmsReview[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'Aura Athletics DTC',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Evotilee completely overhauled our paid acquisition strategy and conversion funnels. In less than 90 days, our customer acquisition cost dropped by 34% while scaling revenue past $350k/mo.',
    rating: 5,
    highlightMetric: '-34% CAC • +3.8x Blended ROAS',
    isPublished: true,
    orderIndex: 0,
    createdAt: new Date('2026-01-15').toISOString(),
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    role: 'Head of Growth',
    company: 'Nexus Cloud Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'The organic search architecture and high-intent keyword clustering Evotilee deployed generated our highest quality inbound demo pipeline to date. Exceptional technical execution.',
    rating: 5,
    highlightMetric: '+210% Inbound Demo Pipelines',
    isPublished: true,
    orderIndex: 1,
    createdAt: new Date('2026-02-01').toISOString(),
  },
  {
    id: 'rev-3',
    name: 'David Chen',
    role: 'Chief Marketing Officer',
    company: 'HyperScale AI Platform',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Zero vanity metrics. Every week our growth check-ins focus on attribution data, conversion lift, and verified payback periods. Evotilee feels like a senior in-house growth squad.',
    rating: 5,
    highlightMetric: '+$1.4M Attributed ARR Growth',
    isPublished: true,
    orderIndex: 2,
    createdAt: new Date('2026-02-18').toISOString(),
  }
];

// Curated Seed Campaigns converted from templateConfig
export const DEFAULT_CAMPAIGNS: CmsCampaign[] = templateConfig.portfolio.projects.map((p, idx) => ({
  id: p.id || `campaign-${idx + 1}`,
  title: p.title,
  category: p.category,
  badge: p.stats || 'Growth Campaign',
  description: p.description,
  image: p.image,
  client: p.clientName || 'Partner Client',
  primaryMetric: p.stats || 'Acquisition Scaling',
  secondaryMetric: p.views || 'Conversion Lift',
  deliverables: Array.isArray(p.deliverables) 
    ? p.deliverables 
    : (p.deliverables ? p.deliverables.split(',').map(s => s.trim()) : ['Paid Media Strategy', 'CRO Landers', 'Funnel Optimization']),
  tags: p.tags || ['Paid Social', 'DTC E-commerce', 'Landing Page CRO'],
  link: p.link || '#',
  accentColor: p.accentColor || 'from-[#00d4ff]/30 to-[#0a0e27]',
  isPublished: true,
  orderIndex: idx,
  createdAt: new Date().toISOString()
}));

// Test Firestore Connection directly
export async function testFirestoreConnection(): Promise<{
  success: boolean;
  latencyMs: number;
  projectId: string;
  databaseId: string;
  error?: string;
  errorCode?: string;
}> {
  const start = performance.now();
  const projectId = firebaseConfigData.projectId || 'pro-heaven-xsjh2';
  const databaseId = firebaseConfigData.firestoreDatabaseId || '(default)';

  try {
    const testDocRef = doc(db, 'test', 'ping');
    const testPayload = {
      pingTime: new Date().toISOString(),
      source: 'web_cms_diagnostic',
      randomToken: Math.random().toString(36).substring(2, 9),
    };
    
    // Write test doc
    await setDoc(testDocRef, testPayload, { merge: true });
    
    // Read back test doc directly from server (bypassing local cache)
    const snapshot = await getDocFromServer(testDocRef);
    const end = performance.now();
    const latencyMs = Math.round(end - start);

    if (snapshot.exists()) {
      return {
        success: true,
        latencyMs,
        projectId,
        databaseId,
      };
    } else {
      throw new Error('Test document written but not found on server read verification.');
    }
  } catch (err: unknown) {
    const end = performance.now();
    const latencyMs = Math.round(end - start);
    const errorObj = err as { code?: string; message?: string };
    const errorMessage = errorObj?.message || 'Unknown Firestore communication error';
    const errorCode = errorObj?.code || 'unknown_error';

    return {
      success: false,
      latencyMs,
      projectId,
      databaseId,
      error: errorMessage,
      errorCode,
    };
  }
}

// Reviews Firestore operations
export function subscribeToReviews(
  callback: (reviews: CmsReview[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const reviewsRef = collection(db, 'reviews');

    const unsubscribe = onSnapshot(
      reviewsRef,
      (snapshot) => {
        if (snapshot.empty) {
          // Auto-seed if empty
          seedInitialReviews().catch(console.error);
          callback(DEFAULT_REVIEWS);
        } else {
          const items: CmsReview[] = [];
          snapshot.forEach((d) => {
            items.push({ id: d.id, ...(d.data() as Omit<CmsReview, 'id'>) });
          });
          items.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
          callback(items);
        }
      },
      (error) => {
        console.warn('Firestore reviews snapshot error, falling back to cached defaults:', error);
        if (onError) onError(error);
        callback(DEFAULT_REVIEWS);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('Failed to subscribe to reviews:', err);
    if (onError && err instanceof Error) onError(err);
    callback(DEFAULT_REVIEWS);
    return () => {};
  }
}

export function subscribeToCampaigns(
  callback: (campaigns: CmsCampaign[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const campaignsRef = collection(db, 'campaigns');

    const unsubscribe = onSnapshot(
      campaignsRef,
      (snapshot) => {
        if (snapshot.empty) {
          // Auto-seed if empty
          seedInitialCampaigns().catch(console.error);
          callback(DEFAULT_CAMPAIGNS);
        } else {
          const items: CmsCampaign[] = [];
          snapshot.forEach((d) => {
            items.push({ id: d.id, ...(d.data() as Omit<CmsCampaign, 'id'>) });
          });
          items.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
          callback(items);
        }
      },
      (error) => {
        console.warn('Firestore campaigns snapshot error, falling back to cached defaults:', error);
        if (onError) onError(error);
        callback(DEFAULT_CAMPAIGNS);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('Failed to subscribe to campaigns:', err);
    if (onError && err instanceof Error) onError(err);
    callback(DEFAULT_CAMPAIGNS);
    return () => {};
  }
}

// Seeding helpers
export async function seedInitialReviews() {
  try {
    const batch = writeBatch(db);
    for (const review of DEFAULT_REVIEWS) {
      const docRef = doc(db, 'reviews', review.id);
      batch.set(docRef, review);
    }
    await batch.commit();
  } catch (e) {
    console.warn('Could not auto-seed reviews to Firestore:', e);
  }
}

export async function seedInitialCampaigns() {
  try {
    const batch = writeBatch(db);
    for (const campaign of DEFAULT_CAMPAIGNS) {
      const docRef = doc(db, 'campaigns', campaign.id);
      batch.set(docRef, campaign);
    }
    await batch.commit();
  } catch (e) {
    console.warn('Could not auto-seed campaigns to Firestore:', e);
  }
}

// Review CRUD
export async function saveReview(review: Partial<CmsReview> & { id?: string }): Promise<string> {
  const id = review.id || `rev-${Date.now()}`;
  const now = new Date().toISOString();
  
  const payload: CmsReview = {
    id,
    name: review.name || 'Anonymous Client',
    role: review.role || 'Executive',
    company: review.company || 'Enterprise Partner',
    avatarUrl: review.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: review.quote || '',
    rating: review.rating ?? 5,
    highlightMetric: review.highlightMetric || '',
    isPublished: review.isPublished ?? true,
    orderIndex: review.orderIndex ?? 0,
    createdAt: review.createdAt || now,
    updatedAt: now,
  };

  const docRef = doc(db, 'reviews', id);
  await setDoc(docRef, payload, { merge: true });
  return id;
}

export async function deleteReview(id: string): Promise<void> {
  const docRef = doc(db, 'reviews', id);
  await deleteDoc(docRef);
}

// Campaign CRUD
export async function saveCampaign(campaign: Partial<CmsCampaign> & { id?: string }): Promise<string> {
  const id = campaign.id || `campaign-${Date.now()}`;
  const now = new Date().toISOString();

  const payload: CmsCampaign = {
    id,
    title: campaign.title || 'Growth Campaign',
    category: campaign.category || 'Paid Acquisition',
    badge: campaign.badge || campaign.primaryMetric || 'Featured Campaign',
    description: campaign.description || '',
    image: campaign.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    client: campaign.client || 'Partner Brand',
    primaryMetric: campaign.primaryMetric || 'Conversion Lift',
    secondaryMetric: campaign.secondaryMetric || 'Attributed Scale',
    deliverables: campaign.deliverables || ['Creative Strategy', 'Landing Page CRO', 'Tracking Setup'],
    tags: campaign.tags || ['Paid Social', 'CRO', 'Attribution'],
    link: campaign.link || '#',
    accentColor: campaign.accentColor || 'from-[#00d4ff]/30 to-[#0a0e27]',
    isPublished: campaign.isPublished ?? true,
    orderIndex: campaign.orderIndex ?? 0,
    createdAt: campaign.createdAt || now,
    updatedAt: now,
  };

  const docRef = doc(db, 'campaigns', id);
  await setDoc(docRef, payload, { merge: true });
  return id;
}

export async function deleteCampaign(id: string): Promise<void> {
  const docRef = doc(db, 'campaigns', id);
  await deleteDoc(docRef);
}

// Convert CmsCampaign to ProjectItem for WorkCarousel and ProjectDetailModal
export function mapCampaignToProjectItem(c: CmsCampaign): ProjectItem {
  return {
    id: c.id,
    title: c.title,
    category: c.category,
    description: c.description,
    image: c.image,
    accentColor: c.accentColor || 'from-[#00d4ff]/30 to-[#0a0e27]',
    link: c.link || '#',
    tags: c.tags || ['Growth Strategy', 'Attribution'],
    views: c.secondaryMetric || 'Attributed Growth',
    stats: c.primaryMetric || c.badge || 'Verified Lift',
    deliverables: c.deliverables || [],
    clientName: c.client,
    highlights: [
      `Client: ${c.client}`,
      `Primary Outcome: ${c.primaryMetric || 'Optimized Customer Acquisition Cost'}`,
      `Secondary Lift: ${c.secondaryMetric || 'Increased Conversion Rate'}`,
      `Key Focus: ${c.category}`
    ],
    isPublished: c.isPublished,
    orderIndex: c.orderIndex
  };
}
