import { useState, useEffect } from 'react';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'essays' | 'curation'>('all');
  const [searchQuery, setSearchQuery] = useState('');



  const writtenPosts = [
    {
      id: 'log_004',
      date: '2024-02-10',
      title: 'The Invisible Engine: Architecture Deep Dive',
      desc: 'Dual-repo CI/CD pipelines, sticky parallax, and React state machines. A technical breakdown of this portfolio.',
      tags: ['Architecture', 'React', 'DevOps'],
      type: 'essay',
      readTime: '12 min read',
      url: '/blog/architecture-deep-dive'
    },
    {
      id: 'log_005',
      date: '2025-01-20',
      title: 'Herbology.com.my Refactor',
      desc: 'Full-stack Shopify overhaul for a premium clean beauty brand. Custom Liquid theme implementation with integrated subscription logic.',
      tags: ['Liquid', 'Tailwind', 'Case Study'],
      type: 'essay',
      readTime: '18 min read',
      url: '/blog/herbology'
    },
    {
      id: 'log_003',
      date: '2025-12-20',
      title: 'Migrating to Hydrogen: A Survival Guide',
      desc: 'Lessons learned moving a $10M GMV store to headless. Performance wins, SEO challenges, and the truth about React Server Components.',
      tags: ['Hydrogen', 'React', 'Case Study'],
      type: 'essay',
      readTime: '15 min read',
      url: '/blog/hydrogen-migration'
    },
    {
      id: 'log_001',
      date: '2026-02-08',
      title: 'Automating the Mundane: Shopify Flow Quirks',
      desc: 'Deep dive into edge cases when handling high-volume webhooks. How to handle idempotency keys and race conditions in a serverless environment.',
      tags: ['Shopify', 'Automation', 'Serverless'],
      type: 'essay',
      readTime: '8 min read',
      url: '/blog/automation'
    }
  ];

  const curatedReads = [
    {
      id: 'ext_01',
      source: 'Hacker News',
      title: 'The End of Localhost: Cloud Development Environments',
      desc: 'A compelling argument for moving all development to remote containers. Latency vs convenience tradeoff analysis.',
      tags: ['DevTools', 'Cloud'],
      relevance: '98%',
      date: '2026-02-09',
      type: 'curation',
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
      type: 'curation',
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
      type: 'curation',
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
      type: 'curation',
      url: '#'
    }
  ];

  const allItems = [...writtenPosts, ...curatedReads].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredItems = allItems.filter(item => {
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'essays' && item.type === 'essay') ||
      (activeTab === 'curation' && item.type === 'curation');

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Wait a tick for DOM to update with filtered items before observing
    setTimeout(() => {
      document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el)
      })
    }, 50)

    return () => observer.disconnect()
  }, [filteredItems])

  return (
    <div className="w-full px-margin-safe pt-32 pb-element-gap relative min-h-screen">
      
      <div className="mb-24 fade-in-up">
        <h1 className="font-display-lg text-display-lg md:text-[80px] text-primary leading-none tracking-tighter mb-4">
          THE DIGEST
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
          Curated thoughts, technical essays, and industry insights. A hub for architectural exploration.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-8 mb-16 fade-in-up">
        <div className="flex gap-6 border-b border-outline-variant pb-2 flex-grow">
          <button
            onClick={() => setActiveTab('all')}
            className={`font-label-caps text-label-caps pb-2 transition-colors ${activeTab === 'all' ? 'text-primary font-bold border-b-2 border-primary -mb-[3px]' : 'text-on-surface-variant hover:text-primary'}`}
          >
            ALL
          </button>
          <button
            onClick={() => setActiveTab('essays')}
            className={`font-label-caps text-label-caps pb-2 transition-colors ${activeTab === 'essays' ? 'text-primary font-bold border-b-2 border-primary -mb-[3px]' : 'text-on-surface-variant hover:text-primary'}`}
          >
            ESSAYS
          </button>
          <button
            onClick={() => setActiveTab('curation')}
            className={`font-label-caps text-label-caps pb-2 transition-colors ${activeTab === 'curation' ? 'text-primary font-bold border-b-2 border-primary -mb-[3px]' : 'text-on-surface-variant hover:text-primary'}`}
          >
            CURATION
          </button>
        </div>

        <div className="relative md:w-96">
          <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Search digest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-outline-variant pb-2 pl-8 font-body-sm text-body-sm text-primary focus:outline-none focus:border-primary transition-colors placeholder:text-outline"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col gap-8 w-full mx-auto fade-in-up">
        {filteredItems.map((item) => (
          <div key={item.id} className="bracket-border hover:bg-surface-container-low transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-label-caps text-label-caps text-on-surface-variant">[{item.date}]</div>
                  <div className="font-label-caps text-label-caps text-primary">
                    {item.type.toUpperCase()}
                  </div>
                </div>
                
                <h3 className="font-body-lg text-[24px] text-primary mb-4 font-semibold leading-tight">{item.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl mb-6">{item.desc}</p>
                
                <div className="flex gap-4 flex-wrap">
                  {item.tags.map(tag => (
                    <span key={tag} className="font-label-caps text-label-caps text-outline border border-outline px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-end items-end h-full mt-4 md:mt-0">
                {item.type === 'curation' ? (
                  <a href={item.url} target="_blank" rel="noreferrer" className="font-label-caps text-label-caps text-primary border-b border-outline pb-1 hover:text-secondary hover:border-secondary transition-colors inline-flex items-center gap-2">
                    VISIT SOURCE <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link to={item.url as string} className="font-label-caps text-label-caps text-primary border-b border-outline pb-1 hover:text-secondary hover:border-secondary transition-colors inline-flex items-center gap-2">
                    READ <ArrowRight size={14} />
                  </Link>
                )}
              </div>
              
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="py-16 text-center text-on-surface-variant font-body-sm">
            No entries found matching your query.
          </div>
        )}
      </div>

    </div>
  );
};

export default ReadsPage;
