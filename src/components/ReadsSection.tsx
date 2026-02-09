import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight, Rss } from 'lucide-react';

const ReadsSection: React.FC = () => {
  const writtenPosts = [
    {
      id: 'log_001',
      date: '2026-02-08',
      title: 'Automating the Unautomatable: Shopify Flow Quirks',
      desc: 'Deep dive into edge cases when handling high-volume webhooks.',
      tags: ['Shopify', 'Automation']
    },
    {
      id: 'log_002',
      date: '2026-01-15',
      title: 'The "R" State Philosophy',
      desc: 'Why redundant systems are the only systems that matter.',
      tags: ['Philosophy', 'DevOps']
    },
    {
      id: 'log_003',
      date: '2025-12-20',
      title: 'Migrating to Hydrogen: A Survival Guide',
      desc: 'Lessons learned moving a $10M GMV store to headless.',
      tags: ['Hydrogen', 'React']
    }
  ];

  const curatedReads = [
    {
      id: 'ext_01',
      source: 'Hacker News',
      title: 'The End of Localhost: Cloud Development Environments',
      tags: ['DevTools', 'Cloud'],
      relevance: '98%'
    },
    {
      id: 'ext_02',
      source: 'Shopify.dev',
      title: 'New Admin GraphQL API version 2026-04 released',
      tags: ['Shopify', 'API'],
      relevance: '95%'
    },
    {
      id: 'ext_03',
      source: 'Verge',
      title: 'AI Agents are the new Apps',
      tags: ['AI', 'Future'],
      relevance: '88%'
    },
    {
      id: 'ext_04',
      source: 'React Blog',
      title: 'React Compiler is now stable',
      tags: ['React', 'News'],
      relevance: '92%'
    }
  ];

  return (
    <section id="reads" style={{ padding: '80px 0' }}>
      <div className="section-header">
        <span className="section-label">KNOWLEDGE_BASE // LOGS</span>
        <h2 className="section-title text-gradient">Reads</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="reads-grid">

        {/* Column 1: Written By Me */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <FileText size={18} className="text-accent" />
            <h3 className="brand-font" style={{ fontSize: '1.5rem' }}>Transmission Logs</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {writtenPosts.map((post, i) => (
              <motion.div
                key={post.id}
                className="glass-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '1.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <div className="mono text-muted" style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>
                  [{post.date}] &gt; {post.id}
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>{post.title}</h4>
                <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>{post.desc}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Column 2: Curated Reads */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
            <Rss size={18} className="text-secondary" />
            <h3 className="brand-font" style={{ fontSize: '1.5rem' }}>Inbound Telemetry</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {curatedReads.map((read, i) => (
              <motion.div
                key={read.id}
                className="glass"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '1.2rem',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  borderLeft: '2px solid var(--text-muted)'
                }}
                whileHover={{
                  borderColor: 'var(--accent-primary)',
                  backgroundColor: 'rgba(255,255,255,0.03)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--accent-secondary)' }}>{read.source}</span>
                    <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>// RELEVANCE: {read.relevance}</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.8rem', lineHeight: 1.4 }}>{read.title}</h4>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {read.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>#{tag}</span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted" />
              </motion.div>
            ))}

            <div className="mono text-muted" style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '1rem', opacity: 0.5 }}>
              ... WAITING_FOR_NEW_SIGNALS ...
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Responsive Style Injection */}
      <style>{`
        @media (max-width: 900px) {
          .reads-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ReadsSection;
