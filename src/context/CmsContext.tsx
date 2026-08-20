import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CmsReview, CmsCampaign, ProjectItem } from '../types';
import {
  subscribeToReviews,
  subscribeToCampaigns,
  saveReview as apiSaveReview,
  deleteReview as apiDeleteReview,
  saveCampaign as apiSaveCampaign,
  deleteCampaign as apiDeleteCampaign,
  mapCampaignToProjectItem,
  testFirestoreConnection,
  CmsActivityLog,
  DEFAULT_REVIEWS,
  DEFAULT_CAMPAIGNS
} from '../services/cmsService';
import firebaseConfigData from '../../firebase-applet-config.json';

export interface ConnectionInfo {
  status: 'connected' | 'error' | 'testing' | 'offline';
  projectId: string;
  databaseId: string;
  latencyMs?: number;
  lastChecked?: string;
  errorMessage?: string;
  errorCode?: string;
}

export interface DetailedError {
  id: string;
  title: string;
  message: string;
  code?: string;
  action?: string;
  timestamp: string;
}

interface CmsContextType {
  reviews: CmsReview[];
  campaigns: CmsCampaign[];
  publishedReviews: CmsReview[];
  publishedProjects: ProjectItem[];
  isLoading: boolean;
  isCmsOpen: boolean;
  connectionInfo: ConnectionInfo;
  activityLogs: CmsActivityLog[];
  lastError: DetailedError | null;
  openCms: () => void;
  closeCms: () => void;
  clearLastError: () => void;
  runConnectionTest: () => Promise<ConnectionInfo>;
  saveReview: (review: Partial<CmsReview> & { id?: string }) => Promise<string>;
  deleteReview: (id: string) => Promise<void>;
  saveCampaign: (campaign: Partial<CmsCampaign> & { id?: string }) => Promise<string>;
  deleteCampaign: (id: string) => Promise<void>;
  seedDefaults: () => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<CmsReview[]>(DEFAULT_REVIEWS);
  const [campaigns, setCampaigns] = useState<CmsCampaign[]>(DEFAULT_CAMPAIGNS);
  const [isLoading, setIsLoading] = useState(true);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [activityLogs, setActivityLogs] = useState<CmsActivityLog[]>([]);
  const [lastError, setLastError] = useState<DetailedError | null>(null);

  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    status: 'testing',
    projectId: firebaseConfigData.projectId || 'pro-heaven-xsjh2',
    databaseId: firebaseConfigData.firestoreDatabaseId || '(default)',
    lastChecked: new Date().toLocaleTimeString(),
  });

  const addLog = useCallback((log: Omit<CmsActivityLog, 'id' | 'timestamp'>) => {
    const newEntry: CmsActivityLog = {
      ...log,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setActivityLogs((prev) => [newEntry, ...prev.slice(0, 49)]); // keep last 50
  }, []);

  const triggerError = useCallback((title: string, err: unknown, action?: string) => {
    const errorObj = err as { code?: string; message?: string };
    const msg = errorObj?.message || (typeof err === 'string' ? err : 'Unknown Firestore communication error');
    const code = errorObj?.code;

    const newError: DetailedError = {
      id: `err-${Date.now()}`,
      title,
      message: msg,
      code,
      action,
      timestamp: new Date().toLocaleTimeString(),
    };

    setLastError(newError);
    console.error(`[CMS ERROR] ${title}:`, err);
  }, []);

  const runConnectionTest = useCallback(async (): Promise<ConnectionInfo> => {
    setConnectionInfo((prev) => ({ ...prev, status: 'testing' }));
    
    const result = await testFirestoreConnection();
    const newInfo: ConnectionInfo = {
      status: result.success ? 'connected' : 'error',
      projectId: result.projectId,
      databaseId: result.databaseId,
      latencyMs: result.latencyMs,
      lastChecked: new Date().toLocaleTimeString(),
      errorMessage: result.error,
      errorCode: result.errorCode,
    };

    setConnectionInfo(newInfo);

    if (result.success) {
      addLog({
        type: 'test_connection',
        status: 'success',
        title: 'Firestore Ping & Roundtrip Test',
        details: `Connected to ${result.databaseId} in ${result.latencyMs}ms`,
        latencyMs: result.latencyMs,
      });
    } else {
      addLog({
        type: 'test_connection',
        status: 'error',
        title: 'Firestore Ping Failed',
        details: result.error,
        errorCode: result.errorCode,
        latencyMs: result.latencyMs,
      });
      triggerError('Firestore Connection Failed', result.error, 'test_connection');
    }

    return newInfo;
  }, [addLog, triggerError]);

  useEffect(() => {
    // Initial connection ping check
    runConnectionTest();

    // Check URL hash for direct #cms or #admin entry
    const handleHashChange = () => {
      if (window.location.hash === '#cms' || window.location.hash === '#admin') {
        setIsCmsOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    // Keyboard shortcut: Cmd/Ctrl + Shift + C
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsCmsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Subscribe to Firestore collections with real-time feedback
    const unsubReviews = subscribeToReviews(
      (updatedReviews) => {
        setReviews(updatedReviews);
        setIsLoading(false);
      },
      (err) => {
        triggerError('Failed to fetch real-time reviews from Firestore', err, 'subscribe_reviews');
      }
    );

    const unsubCampaigns = subscribeToCampaigns(
      (updatedCampaigns) => {
        setCampaigns(updatedCampaigns);
        setIsLoading(false);
      },
      (err) => {
        triggerError('Failed to fetch real-time campaigns from Firestore', err, 'subscribe_campaigns');
      }
    );

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
      unsubReviews();
      unsubCampaigns();
    };
  }, [runConnectionTest, triggerError]);

  const openCms = () => {
    setIsCmsOpen(true);
    // Refresh connection status when opening
    runConnectionTest();
  };

  const closeCms = () => {
    setIsCmsOpen(false);
    if (window.location.hash === '#cms' || window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const clearLastError = () => setLastError(null);

  const saveReview = async (reviewData: Partial<CmsReview> & { id?: string }): Promise<string> => {
    try {
      const docId = await apiSaveReview(reviewData);
      addLog({
        type: 'save_review',
        status: 'success',
        targetId: docId,
        title: `Saved Review for "${reviewData.name || 'Client'}"`,
        details: `Saved to Firestore document /reviews/${docId} (Published: ${reviewData.isPublished !== false ? 'Yes' : 'No'})`,
      });
      return docId;
    } catch (err) {
      triggerError(`Failed to save review "${reviewData.name || 'Unknown'}"`, err, 'save_review');
      addLog({
        type: 'save_review',
        status: 'error',
        targetId: reviewData.id,
        title: `Error saving review "${reviewData.name || 'Client'}"`,
        details: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  };

  const deleteReview = async (id: string): Promise<void> => {
    try {
      await apiDeleteReview(id);
      addLog({
        type: 'delete_review',
        status: 'success',
        targetId: id,
        title: `Deleted Review from Firestore`,
        details: `Removed document /reviews/${id}`,
      });
    } catch (err) {
      triggerError(`Failed to delete review ${id}`, err, 'delete_review');
      addLog({
        type: 'delete_review',
        status: 'error',
        targetId: id,
        title: `Error deleting review ${id}`,
        details: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  };

  const saveCampaign = async (campaignData: Partial<CmsCampaign> & { id?: string }): Promise<string> => {
    try {
      const docId = await apiSaveCampaign(campaignData);
      addLog({
        type: 'save_campaign',
        status: 'success',
        targetId: docId,
        title: `Saved Campaign "${campaignData.title || 'Growth Campaign'}"`,
        details: `Saved to Firestore document /campaigns/${docId} (Published: ${campaignData.isPublished !== false ? 'Yes' : 'No'})`,
      });
      return docId;
    } catch (err) {
      triggerError(`Failed to save campaign "${campaignData.title || 'Unknown'}"`, err, 'save_campaign');
      addLog({
        type: 'save_campaign',
        status: 'error',
        targetId: campaignData.id,
        title: `Error saving campaign "${campaignData.title || 'Campaign'}"`,
        details: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  };

  const deleteCampaign = async (id: string): Promise<void> => {
    try {
      await apiDeleteCampaign(id);
      addLog({
        type: 'delete_campaign',
        status: 'success',
        targetId: id,
        title: `Deleted Campaign from Firestore`,
        details: `Removed document /campaigns/${id}`,
      });
    } catch (err) {
      triggerError(`Failed to delete campaign ${id}`, err, 'delete_campaign');
      addLog({
        type: 'delete_campaign',
        status: 'error',
        targetId: id,
        title: `Error deleting campaign ${id}`,
        details: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  };

  const seedDefaults = async (): Promise<void> => {
    try {
      for (const r of DEFAULT_REVIEWS) {
        await apiSaveReview(r);
      }
      for (const c of DEFAULT_CAMPAIGNS) {
        await apiSaveCampaign(c);
      }
      addLog({
        type: 'seed_defaults',
        status: 'success',
        title: 'Synchronized Reference Defaults',
        details: `Seeded ${DEFAULT_REVIEWS.length} reviews and ${DEFAULT_CAMPAIGNS.length} campaigns into Firestore.`,
      });
    } catch (err) {
      triggerError('Failed to reset default datasets in Firestore', err, 'seed_defaults');
      throw err;
    }
  };

  // Filtered views for public pages
  const publishedReviews = reviews.filter((r) => r.isPublished !== false);
  const publishedProjects = campaigns
    .filter((c) => c.isPublished !== false)
    .map(mapCampaignToProjectItem);

  return (
    <CmsContext.Provider
      value={{
        reviews,
        campaigns,
        publishedReviews: publishedReviews.length > 0 ? publishedReviews : DEFAULT_REVIEWS,
        publishedProjects: publishedProjects.length > 0 ? publishedProjects : DEFAULT_CAMPAIGNS.map(mapCampaignToProjectItem),
        isLoading,
        isCmsOpen,
        connectionInfo,
        activityLogs,
        lastError,
        openCms,
        closeCms,
        clearLastError,
        runConnectionTest,
        saveReview,
        deleteReview,
        saveCampaign,
        deleteCampaign,
        seedDefaults,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
