import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Star,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Image as ImageIcon,
  Save,
  Clock,
  Activity,
  Check,
  Copy,
  Terminal,
  Database,
  RefreshCw,
  Info
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { CmsReview, CmsCampaign } from '../types';

export const CmsAdminModal: React.FC = () => {
  const {
    reviews,
    campaigns,
    isCmsOpen,
    closeCms,
    connectionInfo,
    activityLogs,
    lastError,
    clearLastError,
    runConnectionTest,
    saveReview,
    deleteReview,
    saveCampaign,
    deleteCampaign,
    seedDefaults,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'reviews' | 'campaigns' | 'logs'>('reviews');
  const [editingReview, setEditingReview] = useState<Partial<CmsReview> | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<Partial<CmsCampaign> | null>(null);
  
  // Pending delete confirmation states (to avoid relying on browser confirm dialogs in iframe)
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [deletingCampaignId, setDeletingCampaignId] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);

  if (!isCmsOpen) return null;

  const showNotice = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotice({ title, message, type });
    setTimeout(() => setNotice(null), 5000);
  };

  const handleTestConnection = async () => {
    setIsTestingConn(true);
    try {
      const info = await runConnectionTest();
      if (info.status === 'connected') {
        showNotice(
          'Firestore Connection Verified',
          `Successfully connected to database ${info.databaseId} (Latency: ${info.latencyMs}ms)`,
          'success'
        );
      } else {
        showNotice(
          'Firestore Connection Warning',
          info.errorMessage || 'Unable to ping server. Check console or Firestore rules.',
          'error'
        );
      }
    } catch (err: unknown) {
      showNotice(
        'Connection Test Failed',
        err instanceof Error ? err.message : String(err),
        'error'
      );
    } finally {
      setIsTestingConn(false);
    }
  };

  // Handle Review Save
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    if (!editingReview.name?.trim() || !editingReview.quote?.trim()) {
      showNotice('Validation Incomplete', 'Please fill in both the client name and testimonial quote.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const savedId = await saveReview(editingReview);
      setEditingReview(null);
      showNotice(
        'Review Saved to Cloud Firestore',
        `Document /reviews/${savedId} has been successfully written and synced to live website.`,
        'success'
      );
    } catch (err: unknown) {
      showNotice(
        'Save Failed',
        err instanceof Error ? err.message : 'Failed to write review to Firestore. Check logs tab for details.',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Campaign Save
  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;
    if (!editingCampaign.title?.trim() || !editingCampaign.client?.trim()) {
      showNotice('Validation Incomplete', 'Please fill in both campaign title and client name.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const savedId = await saveCampaign(editingCampaign);
      setEditingCampaign(null);
      showNotice(
        'Campaign Saved to Cloud Firestore',
        `Document /campaigns/${savedId} has been successfully written and synced to the live work showcase carousel.`,
        'success'
      );
    } catch (err: unknown) {
      showNotice(
        'Save Failed',
        err instanceof Error ? err.message : 'Failed to write campaign to Firestore. Check logs tab for details.',
        'error'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Review
  const confirmDeleteReview = async (id: string, name: string) => {
    setIsSaving(true);
    try {
      await deleteReview(id);
      setDeletingReviewId(null);
      showNotice('Review Deleted', `Removed document /reviews/${id} (${name}) from Firestore.`, 'info');
    } catch (err: unknown) {
      showNotice('Delete Failed', err instanceof Error ? err.message : String(err), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Campaign
  const confirmDeleteCampaign = async (id: string, title: string) => {
    setIsSaving(true);
    try {
      await deleteCampaign(id);
      setDeletingCampaignId(null);
      showNotice('Campaign Deleted', `Removed document /campaigns/${id} (${title}) from Firestore.`, 'info');
    } catch (err: unknown) {
      showNotice('Delete Failed', err instanceof Error ? err.message : String(err), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    setIsSaving(true);
    try {
      await seedDefaults();
      showNotice('Reference Defaults Seeded', 'Default reviews and growth campaigns successfully written to Firestore.', 'success');
    } catch (err: unknown) {
      showNotice('Reset Failed', err instanceof Error ? err.message : String(err), 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLogId(id);
    setTimeout(() => setCopiedLogId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={closeCms}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cms-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl bg-[#0d0d11] border border-white/20 rounded-3xl p-4 sm:p-6 md:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 my-auto text-left focus:outline-none max-h-[94vh] flex flex-col overflow-hidden"
      >
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 pointer-events-none" />

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                <span className={`w-2 h-2 rounded-full ${connectionInfo.status === 'connected' ? 'bg-emerald-400 animate-pulse' : connectionInfo.status === 'testing' ? 'bg-amber-400 animate-spin' : 'bg-red-400'}`} />
                <span>Cloud Firestore CMS</span>
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {connectionInfo.status === 'connected' ? '🟢 Live Real-Time Database' : connectionInfo.status === 'testing' ? '🟡 Connecting...' : '🔴 Check Connection'}
              </span>
            </div>
            <h2 id="cms-modal-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Content Management System
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Manage client testimonials, growth statistics, and case studies with real-time Firestore synchronization.
            </p>
          </div>

          {/* Quick Diagnostics & Close Controls */}
          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleTestConnection}
              disabled={isTestingConn || isSaving}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              title="Ping Firestore database to test end-to-end read and write permissions"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTestingConn ? 'animate-spin' : ''}`} />
              <span>{isTestingConn ? 'Pinging...' : 'Ping Firestore'}</span>
            </button>

            <button
              onClick={handleResetDefaults}
              disabled={isSaving}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restore standard sample dataset into Firestore"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={closeCms}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Firestore Connection Status Bar */}
        <div className="mt-3 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div className="flex flex-wrap items-center gap-3 text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>DB:</span>
              <span className="text-emerald-400 font-bold max-w-[200px] sm:max-w-[260px] truncate" title={connectionInfo.databaseId}>
                {connectionInfo.databaseId}
              </span>
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline">
              Project: <span className="text-white">{connectionInfo.projectId}</span>
            </span>
            {connectionInfo.latencyMs !== undefined && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400">⚡ {connectionInfo.latencyMs}ms roundtrip</span>
              </>
            )}
          </div>
          <div className="text-[11px] text-zinc-500">
            Checked: {connectionInfo.lastChecked || 'Just now'}
          </div>
        </div>

        {/* Global Notification Banner */}
        {notice && (
          <div
            className={`mt-3 p-3.5 rounded-xl text-xs flex items-start gap-2.5 font-medium shrink-0 animate-fade-in ${
              notice.type === 'success'
                ? 'bg-emerald-950/90 border border-emerald-500/50 text-emerald-200'
                : notice.type === 'error'
                ? 'bg-red-950/90 border border-red-500/50 text-red-200'
                : 'bg-zinc-900 border border-cyan-500/40 text-cyan-200'
            }`}
          >
            {notice.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : notice.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="font-bold">{notice.title}</div>
              <div className="text-[11px] opacity-90 mt-0.5">{notice.message}</div>
            </div>
            <button
              onClick={() => setNotice(null)}
              className="text-zinc-400 hover:text-white cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Firestore Detailed Error Notice (if any unhandled exception occurred) */}
        {lastError && (
          <div className="mt-3 p-3.5 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs shrink-0 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Firestore Request Notice: {lastError.title}</span>
              </div>
              <button
                onClick={clearLastError}
                className="text-red-400 hover:text-white text-[11px] font-mono underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
            <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-red-300 break-all border border-red-500/30">
              <div><strong>Message:</strong> {lastError.message}</div>
              {lastError.code && <div><strong>Error Code:</strong> {lastError.code}</div>}
              {lastError.action && <div><strong>Action:</strong> {lastError.action}</div>}
              <div><strong>Time:</strong> {lastError.timestamp}</div>
            </div>
          </div>
        )}

        {/* Management Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-between mt-3 pb-2 border-b border-white/5 shrink-0 gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => {
                setActiveTab('reviews');
                setEditingReview(null);
                setEditingCampaign(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews ({reviews.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('campaigns');
                setEditingReview(null);
                setEditingCampaign(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Campaigns ({campaigns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Activity Log ({activityLogs.length})</span>
            </button>
          </div>

          {activeTab === 'reviews' && !editingReview && (
            <button
              onClick={() =>
                setEditingReview({
                  name: '',
                  role: '',
                  company: '',
                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                  quote: '',
                  rating: 5,
                  highlightMetric: '+240% Growth • -30% CAC',
                  isPublished: true,
                  orderIndex: reviews.length,
                })
              }
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Review</span>
            </button>
          )}

          {activeTab === 'campaigns' && !editingCampaign && (
            <button
              onClick={() =>
                setEditingCampaign({
                  title: '',
                  client: '',
                  category: 'Paid Media & CRO Strategy',
                  badge: 'Growth Campaign',
                  description: '',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
                  primaryMetric: '+320% Revenue Lift',
                  secondaryMetric: '-35% Blended CAC',
                  deliverables: ['Performance Creative', 'Landing Page Optimization', 'Attribution Tracking'],
                  tags: ['Paid Social', 'CRO', 'Attribution'],
                  isPublished: true,
                  orderIndex: campaigns.length,
                })
              }
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Campaign</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-4">
          {/* ========================================================================= */}
          {/* TAB 1: REVIEWS MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Creator / Editor Form */}
              {editingReview ? (
                <form onSubmit={handleSaveReview} className="p-4 sm:p-6 rounded-2xl bg-zinc-900 border-2 border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Save className="w-4 h-4 text-emerald-400" />
                      <span>{editingReview.id ? `Edit Review (Doc: ${editingReview.id})` : 'Create New Client Testimonial'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingReview(null)}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Author Name *</label>
                      <input
                        type="text"
                        required
                        value={editingReview.name || ''}
                        onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Role / Title *</label>
                      <input
                        type="text"
                        required
                        value={editingReview.role || ''}
                        onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                        placeholder="e.g. Founder & CEO"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Company / Brand *</label>
                      <input
                        type="text"
                        required
                        value={editingReview.company || ''}
                        onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })}
                        placeholder="e.g. Aura Athletics DTC"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-zinc-300 mb-1">Avatar Image URL</label>
                      <input
                        type="url"
                        value={editingReview.avatarUrl || ''}
                        onChange={(e) => setEditingReview({ ...editingReview, avatarUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Rating (Stars)</label>
                      <select
                        value={editingReview.rating || 5}
                        onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                        <option value={3}>3 Stars ★★★☆☆</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Highlight Metric Badge</label>
                    <input
                      type="text"
                      value={editingReview.highlightMetric || ''}
                      onChange={(e) => setEditingReview({ ...editingReview, highlightMetric: e.target.value })}
                      placeholder="e.g. -34% CAC • +3.8x Blended ROAS"
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Testimonial Quote *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingReview.quote || ''}
                      onChange={(e) => setEditingReview({ ...editingReview, quote: e.target.value })}
                      placeholder="Enter the client's verified review quote and outcomes..."
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-mono self-start sm:self-center">
                      <input
                        type="checkbox"
                        checked={editingReview.isPublished !== false}
                        onChange={(e) => setEditingReview({ ...editingReview, isPublished: e.target.checked })}
                        className="rounded border-zinc-700 text-emerald-500 focus:ring-0 w-4 h-4"
                      />
                      <span className="font-bold text-white">Publish on live website immediately</span>
                    </label>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingReview(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold text-xs inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Writing to Firestore...' : editingReview.id ? 'Save Changes to Firebase' : 'Add Review to Firebase'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              {/* Reviews List Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      r.isPublished !== false
                        ? 'bg-zinc-900/70 border-white/15'
                        : 'bg-zinc-950/40 border-white/5 opacity-65'
                    }`}
                  >
                    <div>
                      {/* Top status bar */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: r.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500">ID: {r.id}</span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                              r.isPublished !== false
                                ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {r.isPublished !== false ? 'Live' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      {/* Highlight Metric Badge */}
                      {r.highlightMetric && (
                        <div className="mb-2.5 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/20 truncate">
                          {r.highlightMetric}
                        </div>
                      )}

                      {/* Quote */}
                      <p className="text-xs text-zinc-300 leading-relaxed italic mb-4 line-clamp-3">
                        "{r.quote}"
                      </p>
                    </div>

                    {/* Author & Actions Row */}
                    <div>
                      {deletingReviewId === r.id ? (
                        <div className="p-2.5 rounded-xl bg-red-950/90 border border-red-500/50 text-xs space-y-2">
                          <p className="text-red-200 font-bold text-[11px]">Delete this review document from Firestore?</p>
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setDeletingReviewId(null)}
                              className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-[10px] cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => confirmDeleteReview(r.id, r.name)}
                              disabled={isSaving}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>{isSaving ? 'Deleting...' : 'Yes, Delete'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 overflow-hidden">
                            {r.avatarUrl && (
                              <img
                                src={r.avatarUrl}
                                alt={r.name}
                                className="w-7 h-7 rounded-full object-cover shrink-0 border border-white/10"
                              />
                            )}
                            <div className="truncate">
                              <div className="text-xs font-bold text-white truncate">{r.name}</div>
                              <div className="text-[10px] text-zinc-400 truncate">
                                {r.role} • {r.company}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setEditingReview(r)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit review"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  await saveReview({ ...r, isPublished: !r.isPublished });
                                  showNotice('Status Updated', `Review status changed to ${!r.isPublished ? 'Live' : 'Draft'}`, 'info');
                                } catch (err: unknown) {
                                  showNotice('Status Update Failed', err instanceof Error ? err.message : String(err), 'error');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                              title={r.isPublished ? 'Toggle to Draft' : 'Toggle to Live'}
                            >
                              {r.isPublished ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-500" />}
                            </button>
                            <button
                              onClick={() => setDeletingReviewId(r.id)}
                              className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer"
                              title="Delete review from Firestore"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: CLIENT GROWTH CAMPAIGNS MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === 'campaigns' && (
            <div className="space-y-4">
              {/* Creator / Editor Form */}
              {editingCampaign ? (
                <form onSubmit={handleSaveCampaign} className="p-4 sm:p-6 rounded-2xl bg-zinc-900 border-2 border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Save className="w-4 h-4 text-emerald-400" />
                      <span>{editingCampaign.id ? `Edit Campaign (Doc: ${editingCampaign.id})` : 'Create New Growth Campaign'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingCampaign(null)}
                      className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Campaign Title *</label>
                      <input
                        type="text"
                        required
                        value={editingCampaign.title || ''}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                        placeholder="e.g. Direct-to-Consumer Growth Engine"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Client Name *</label>
                      <input
                        type="text"
                        required
                        value={editingCampaign.client || ''}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, client: e.target.value })}
                        placeholder="e.g. Aura Athletics DTC"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Category / Discipline</label>
                      <input
                        type="text"
                        value={editingCampaign.category || ''}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, category: e.target.value })}
                        placeholder="e.g. Paid Media & CRO Strategy"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Primary Metric</label>
                      <input
                        type="text"
                        value={editingCampaign.primaryMetric || ''}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, primaryMetric: e.target.value })}
                        placeholder="e.g. +320% Revenue Lift"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Secondary Metric</label>
                      <input
                        type="text"
                        value={editingCampaign.secondaryMetric || ''}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, secondaryMetric: e.target.value })}
                        placeholder="e.g. -35% Blended CAC"
                        className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Hero Image URL</label>
                    <input
                      type="url"
                      value={editingCampaign.image || ''}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Case Study Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingCampaign.description || ''}
                      onChange={(e) => setEditingCampaign({ ...editingCampaign, description: e.target.value })}
                      placeholder="Describe the acquisition strategy, creative testing framework, and verified growth outcomes..."
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-1 font-bold">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editingCampaign.tags) ? editingCampaign.tags.join(', ') : (editingCampaign.tags || '')}
                      onChange={(e) =>
                        setEditingCampaign({
                          ...editingCampaign,
                          tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Paid Social, DTC, Landing Page CRO, Attribution"
                      className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-mono self-start sm:self-center">
                      <input
                        type="checkbox"
                        checked={editingCampaign.isPublished !== false}
                        onChange={(e) => setEditingCampaign({ ...editingCampaign, isPublished: e.target.checked })}
                        className="rounded border-zinc-700 text-emerald-500 focus:ring-0 w-4 h-4"
                      />
                      <span className="font-bold text-white">Publish on live website carousel</span>
                    </label>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingCampaign(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold text-xs inline-flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Writing to Firestore...' : editingCampaign.id ? 'Save Changes to Firebase' : 'Add Campaign to Firebase'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              {/* Campaigns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                      c.isPublished !== false
                        ? 'bg-zinc-900/70 border-white/15'
                        : 'bg-zinc-950/40 border-white/5 opacity-65'
                    }`}
                  >
                    {/* Campaign Image Preview */}
                    <div className="h-36 relative bg-zinc-950 overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                      <span
                        className={`absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                          c.isPublished !== false
                            ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {c.isPublished !== false ? 'Live' : 'Draft'}
                      </span>
                      <span className="absolute bottom-2 left-2.5 text-[10px] font-mono text-zinc-300 bg-black/70 px-2 py-0.5 rounded-md border border-white/10">
                        {c.client}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="text-xs font-mono text-emerald-400 font-bold truncate">
                            {c.category}
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 shrink-0">ID: {c.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{c.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{c.description}</p>
                      </div>

                      {/* Primary & Secondary Metrics */}
                      <div className="pt-2.5 border-t border-white/5 space-y-1 mb-3">
                        {c.primaryMetric && (
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-zinc-400">Primary:</span>
                            <span className="text-emerald-400 font-bold">{c.primaryMetric}</span>
                          </div>
                        )}
                        {c.secondaryMetric && (
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-zinc-400">Secondary:</span>
                            <span className="text-white font-medium">{c.secondaryMetric}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div>
                        {deletingCampaignId === c.id ? (
                          <div className="p-2.5 rounded-xl bg-red-950/90 border border-red-500/50 text-xs space-y-2">
                            <p className="text-red-200 font-bold text-[11px]">Delete "{c.title}" from Firestore?</p>
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => setDeletingCampaignId(null)}
                                className="px-2 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => confirmDeleteCampaign(c.id, c.title)}
                                disabled={isSaving}
                                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>{isSaving ? 'Deleting...' : 'Yes, Delete'}</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <div className="flex flex-wrap gap-1">
                              {c.tags?.slice(0, 2).map((t, ti) => (
                                <span key={ti} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                                  {t}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setEditingCampaign(c)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                title="Edit campaign"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    await saveCampaign({ ...c, isPublished: !c.isPublished });
                                    showNotice('Status Updated', `Campaign status changed to ${!c.isPublished ? 'Live' : 'Draft'}`, 'info');
                                  } catch (err: unknown) {
                                    showNotice('Status Update Failed', err instanceof Error ? err.message : String(err), 'error');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                title={c.isPublished ? 'Toggle to Draft' : 'Toggle to Live'}
                              >
                                {c.isPublished ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-500" />}
                              </button>
                              <button
                                onClick={() => setDeletingCampaignId(c.id)}
                                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors cursor-pointer"
                                title="Delete campaign from Firestore"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: REAL-TIME ACTIVITY & DIAGNOSTICS LOG */}
          {/* ========================================================================= */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-zinc-900/80 rounded-xl border border-white/10 text-xs font-mono">
                <span className="text-zinc-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Real-Time Request & Synchronization Logs ({activityLogs.length} events)</span>
                </span>
                <button
                  onClick={handleTestConnection}
                  disabled={isTestingConn}
                  className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                >
                  Send Ping Test
                </button>
              </div>

              {activityLogs.length === 0 ? (
                <div className="p-8 text-center bg-zinc-950/40 rounded-2xl border border-white/5 text-xs text-zinc-500 font-mono">
                  No operations recorded yet. Add, edit, or test connection to see real-time request traces.
                </div>
              ) : (
                <div className="space-y-2 font-mono text-xs">
                  {activityLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        log.status === 'success'
                          ? 'bg-zinc-900/80 border-emerald-500/20 text-zinc-300'
                          : log.status === 'error'
                          ? 'bg-red-950/50 border-red-500/40 text-red-200'
                          : 'bg-zinc-900 border-white/10 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                            log.status === 'success'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-900 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {log.status}
                        </span>
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{log.title}</span>
                            {log.targetId && (
                              <span className="text-[10px] text-zinc-500">[{log.targetId}]</span>
                            )}
                          </div>
                          {log.details && (
                            <div className="text-[11px] text-zinc-400 mt-0.5 break-all">
                              {log.details}
                            </div>
                          )}
                          {log.errorCode && (
                            <div className="text-[10px] text-red-400 mt-0.5">
                              Code: {log.errorCode}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span className="text-[10px] text-zinc-500">{log.timestamp}</span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(log, null, 2), log.id)}
                          className="p-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy JSON details"
                        >
                          {copiedLogId === log.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 font-mono shrink-0">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Cloud Firestore • Active Collection Sync</span>
          </div>
          <div className="text-[11px] text-zinc-500">
            Shortcut: <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-zinc-300">Ctrl/Cmd + Shift + C</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
