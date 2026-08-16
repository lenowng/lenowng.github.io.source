import { useState } from 'react'
import { Search, ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SpotlightCard from '../components/SpotlightCard'

const ReadsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'essays' | 'curation'>('all')
  const [searchQuery, setSearchQuery] = useState('')

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
      desc: 'Full-stack Shopify overhaul for a clean beauty brand. Custom Liquid theme implementation with integrated subscription logic.',
      tags: ['Liquid', 'Tailwind', 'Case Study'],
      type: 'essay',
      readTime: '18 min read',
      url: '/blog/herbology'
    },
    {
      id: 'log_003',
      date: '2025-12-20',
      title: 'Migrating to Hydrogen: A Practical Guide',
      desc: 'Lessons learned moving a high-volume store to headless. Performance wins, SEO challenges, and the reality of React Server Components.',
      tags: ['Hydrogen', 'React', 'Case Study'],
      type: 'essay',
      readTime: '15 min read',
      url: '/blog/hydrogen-migration'
    },
    {
      id: 'log_001',
      date: '2026-02-08',
      title: 'Automating the Mundane: Shopify Flow Quirks',
      desc: 'Edge cases when handling high-volume webhooks. How to handle idempotency keys and race conditions in a serverless environment.',
      tags: ['Shopify', 'Automation', 'Serverless'],
      type: 'essay',
      readTime: '8 min read',
      url: '/blog/automation'
    }
  ]

  const curatedReads = [
    {
      id: 'ext_01',
      source: 'Hacker News',
      title: 'The End of Localhost: Cloud Development Environments',
      desc: 'A compelling argument for moving development to remote containers. Latency vs convenience tradeoff analysis.',
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
  ]

  const allItems = [...writtenPosts, ...curatedReads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filteredItems = allItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-8 md:px-margin-safe max-w-6xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="mb-10 sm:mb-16 fade-in-up">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-label-caps text-zinc-800 mb-3 font-medium">
          WRITING &amp; CASE STUDIES
        </span>
        <h1 className="font-display-lg text-3xl sm:text-5xl md:text-6xl text-zinc-950 tracking-tight font-normal mb-3 sm:mb-4">
          The Engineering Digest
        </h1>
        <p className="font-body-lg text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl font-light leading-relaxed">
          Articles, project breakdowns, and technical notes on Shopify, AWS serverless backends, and process automation.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-between items-stretch md:items-center mb-8 sm:mb-12 fade-in-up">
        {/* Filter Pills */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: 'All Posts' },
            { id: 'essay', label: 'Case Studies & Essays' },
            { id: 'curation', label: 'Curated Notes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'all' | 'essays' | 'curation')}
              className={`px-3.5 sm:px-4 py-2 font-label-caps text-[11px] sm:text-xs rounded-full transition-all duration-200 shrink-0 active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-zinc-950 text-white font-medium shadow-sm'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-full py-2.5 pl-10 pr-4 font-body-sm text-base sm:text-sm text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors shadow-sm placeholder:text-zinc-400"
          />
        </div>
      </div>

      {/* Content Cards */}
      <div className="flex flex-col gap-4 sm:gap-6 w-full mx-auto fade-in-up">
        {filteredItems.map((item) => (
          <SpotlightCard key={item.id} className="p-5 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                  <span className="font-label-caps text-[11px] sm:text-xs text-zinc-400 font-semibold">[{item.date}]</span>
                  <span className="font-label-caps text-[9px] px-2.5 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 uppercase font-medium">
                    {item.type}
                  </span>
                </div>
                
                <h3 className="font-body-lg text-lg sm:text-2xl text-zinc-950 mb-2 sm:mb-3 font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-zinc-600 max-w-3xl mb-4 sm:mb-6 font-light leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {item.tags.map(tag => (
                    <span key={tag} className="font-label-caps text-[9px] sm:text-[10px] text-zinc-600 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 sm:px-3 py-0.5 sm:py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-end items-start md:items-end shrink-0 mt-3 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 w-full md:w-auto">
                {item.type === 'curation' ? (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="font-label-caps text-xs text-zinc-950 hover:text-zinc-600 inline-flex items-center gap-1.5 font-semibold active:scale-95"
                  >
                    View Source <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link 
                    to={item.url as string} 
                    className="font-label-caps text-xs text-zinc-950 hover:text-zinc-600 inline-flex items-center gap-1.5 font-semibold active:scale-95"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                )}
              </div>
              
            </div>
          </SpotlightCard>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="py-16 sm:py-20 text-center text-zinc-500 font-body-sm bg-zinc-50 rounded-2xl sm:rounded-3xl border border-zinc-200">
            No entries found matching your search.
          </div>
        )}
      </div>

    </div>
  )
}

export default ReadsPage
