import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'logs' | 'signals'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const writtenPosts = [
    {
      id: 'log_004',
      date: '2024-02-10',
      title: 'The Invisible Engine: Architecture Deep Dive',
      desc: 'Dual-repo CI/CD pipelines, sticky parallax, and React state machines. A technical breakdown of this portfolio.',
      tags: ['Architecture', 'React', 'DevOps'],
      type: 'log',
      readTime: '12 min read',
      url: '/architecture'
    },
    {
      id: 'log_005',
      date: '2025-01-20',
      title: 'Herbology.com.my Refactor',
      desc: 'Full-stack Shopify overhaul for a premium clean beauty brand. Custom Liquid theme implementation with integrated subscription logic.',
      tags: ['Liquid', 'Tailwind', 'Case Study'],
      type: 'log',
      readTime: '18 min read',
      url: '/herbology'
    },
    {
      id: 'log_003',
      date: '2025-12-20',
      title: 'Migrating to Hydrogen: A Survival Guide',
      desc: 'Lessons learned moving a $10M GMV store to headless. Performance wins, SEO challenges, and the truth about React Server Components.',
      tags: ['Hydrogen', 'React', 'Case Study'],
      type: 'log',
      readTime: '15 min read',
      url: '/hydrogen'
    },
    {
      id: 'log_001',
      date: '2026-02-08',
      title: 'Automating the Mundane: Shopify Flow Quirks',
      desc: 'Deep dive into edge cases when handling high-volume webhooks. How to handle idempotency keys and race conditions in a serverless environment.',
      tags: ['Shopify', 'Automation', 'Serverless'],
      type: 'log',
      readTime: '8 min read',
      url: '/automation'
    }
  ];

  // ... (skipping unchanged code)


  const curatedReads = [
    {
      id: 'ext_01',
      source: 'Hacker News',
      title: 'The End of Localhost: Cloud Development Environments',
      desc: 'A compelling argument for moving all development to remote containers. Latency vs convenience tradeoff analysis.',
      tags: ['DevTools', 'Cloud'],
      relevance: '98%',
      date: '2026-02-09',
      type: 'signal',
      url: '#'
    },
    {
      id: 'ext_02',
      source: 'Shopify.dev',
      title: 'New Admin GraphQL API version 2026-04 released',
      desc: 'Breaking changes in the Order resource. New mutations for subscription billing and B2B catalog management.',
      tags: ['Shopify', 'API'],
      relevance: '95%',
      date: '2026-02-07',
      type: 'signal',
      url: '#'
    },
    {
      id: 'ext_03',
      source: 'Verge',
      title: 'AI Agents are the new Apps',
      desc: 'Why interface-less computing is the next major shift. Implications for frontend developers and UX designers.',
      tags: ['AI', 'Future'],
      relevance: '88%',
      date: '2026-02-05',
      type: 'signal',
      url: '#'
    },
    {
      id: 'ext_04',
      source: 'React Blog',
      title: 'React Compiler is now stable',
      desc: 'Manual memoization is dead. How the new compiler automatically optimizes render cycles.',
      tags: ['React', 'News'],
      relevance: '92%',
      date: '2026-02-01',
      type: 'signal',
      url: '#'
    }
  ];

  const allItems = [...writtenPosts, ...curatedReads].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredItems = allItems.filter(item => {
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'logs' && item.type === 'log') ||
      (activeTab === 'signals' && item.type === 'signal');

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="reads-page">
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <span className="section-label">DATA_ARCHIVE_V1.0</span>
        <h2 className="section-title text-gradient">Knowledge Base</h2>
      </div>

      {/* Control Bar */}
      <div className="glass" style={{ padding: '1rem', borderRadius: '8px', marginBottom: '3rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('all')}
            className={`btn-filter ${activeTab === 'all' ? 'active' : ''}`}
          >
            ALL_DATA
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`btn-filter ${activeTab === 'logs' ? 'active' : ''}`}
          >
            LOGS (WRITTEN)
          </button>
          <button
            onClick={() => setActiveTab('signals')}
            className={`btn-filter ${activeTab === 'signals' ? 'active' : ''}`}
          >
            SIGNALS (CURATED)
          </button>
        </div>

        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="SEARCH_DB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '8px 12px 8px 36px',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {filteredItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderLeft: item.type === 'log' ? '2px solid var(--accent-primary)' : '2px solid var(--accent-secondary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{item.date}</span>
              <span className="mono" style={{ fontSize: '0.65rem', color: item.type === 'log' ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}>
                {item.type === 'log' ? 'TRANSMISSION' : 'SIGNAL'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.8rem', lineHeight: 1.3 }}>{item.title}</h3>
            <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{item.desc}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {item.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {item.type === 'signal' ? (
                <ExternalLink size={16} className="text-muted" />
              ) : (
                // @ts-ignore
                <Link to={item.url} style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', textDecoration: 'none' }} className="mono">
                  READ <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .btn-filter {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-muted);
          padding: 6px 16px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-filter.active {
          background: rgba(255,255,255,0.05);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .btn-filter:hover:not(.active) {
          border-color: rgba(255,255,255,0.3);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default ReadsPage;
