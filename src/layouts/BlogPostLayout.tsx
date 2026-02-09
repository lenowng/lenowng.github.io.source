import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  children: React.ReactNode;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ title, date, readTime, tags, children }) => {
  return (
    <div className="blog-post-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 2rem 80px' }}>

      {/* Back Button */}
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '3rem', textDecoration: 'none', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} />
        <span className="mono">BACK_TO_HQ</span>
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '4rem' }}
      >
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} className="tag mono" style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>{tag}</span>
          ))}
        </div>
        <h1 className="brand-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
          {title}
        </h1>
        <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <Calendar size={16} />
            <span className="mono" style={{ fontSize: '0.8rem' }}>{date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <Clock size={16} />
            <span className="mono" style={{ fontSize: '0.8rem' }}>{readTime}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="blog-content"
      >
        {children}
      </motion.div>

      <style>{`
        .blog-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        
        .blog-content h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          color: var(--text-primary);
          margin-top: 4rem;
          margin-bottom: 1.5rem;
        }

        .blog-content h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            color: var(--text-primary);
            margin-top: 3rem;
            margin-bottom: 1rem;
        }

        .blog-content p {
          margin-bottom: 2rem;
        }

        .blog-content ul {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin-bottom: 0.8rem;
        }

        .blog-content strong {
          color: var(--text-primary);
        }

        .blog-content code {
            font-family: 'JetBrains Mono', monospace;
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9em;
            color: var(--accent-primary);
        }

        .blog-content pre {
            background: #0D1117;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 2rem;
            border: 1px solid rgba(255,255,255,0.05);
        }

        .blog-content pre code {
            background: transparent;
            padding: 0;
            color: var(--text-secondary);
            font-size: 0.85em;
        }
      `}</style>
    </div>
  );
};

export default BlogPostLayout;
