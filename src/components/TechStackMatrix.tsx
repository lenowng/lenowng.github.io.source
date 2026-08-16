import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Server, ShoppingBag, Terminal, Database } from 'lucide-react'

interface TechItem {
  name: string
  category: 'commerce' | 'cloud' | 'database' | 'automation' | 'frontend'
  level: string
  description: string
}

const techItems: TechItem[] = [
  // Commerce & Apps
  { name: 'Shopify Liquid 2.0', category: 'commerce', level: 'Commerce', description: 'Modular theme sections, JSON templates, and mobile Core Web Vitals optimization.' },
  { name: 'Custom Shopify Apps', category: 'commerce', level: 'Commerce', description: 'Embedded Admin apps (React / Polaris) tailored to specific merchant workflows.' },
  { name: 'Shopify Admin API (GraphQL)', category: 'commerce', level: 'Commerce', description: 'Metafield automation, order tag pipelines, and inventory synchronization.' },
  { name: 'POS UI Extensions', category: 'commerce', level: 'Commerce', description: 'Custom retail point-of-sale checkout workflows and in-store operations.' },

  // Cloud & Backend
  { name: 'AWS Lambda & Gateway', category: 'cloud', level: 'Cloud', description: 'Auto-scaling serverless microservices and low-latency REST/GraphQL APIs.' },
  { name: 'Hono / Node.js', category: 'cloud', level: 'Backend', description: 'Lightweight, ultra-fast edge web framework for microservices and webhook handlers.' },
  { name: 'Serverless Framework', category: 'cloud', level: 'DevOps', description: 'Infrastructure as code for reliable, reproducible AWS deployments.' },

  // Databases & Queues
  { name: 'DynamoDB (Single-Table)', category: 'database', level: 'Database', description: 'High-throughput NoSQL modeling, secondary indexes, and Dynamoose integration.' },
  { name: 'AWS SQS & EventBridge', category: 'database', level: 'Queues', description: 'Asynchronous message queues, dead-letter retries, and event-driven architecture.' },
  { name: 'PostgreSQL', category: 'database', level: 'Database', description: 'Relational data modeling, ACID transactions, and structured query optimization.' },

  // Automation & Tooling
  { name: 'Google Apps Script', category: 'automation', level: 'Automation', description: 'Automated Google Sheets data pipelines, custom Workspace triggers, and REST connectors.' },
  { name: 'Webhook Pipelines', category: 'automation', level: 'Automation', description: 'Idempotent real-time sync between Shopify, ERPs, CRMs, and databases.' },
  { name: 'Groovy / Jira ScriptRunner', category: 'automation', level: 'Automation', description: 'Custom business logic scripts, listeners, and workflow transitions in Jira.' },
  { name: 'GitHub Actions CI/CD', category: 'automation', level: 'DevOps', description: 'Automated type checking, production build verification, and edge CDN deployment.' },

  // Frontend & UI
  { name: 'TypeScript / Modern JS', category: 'frontend', level: 'Frontend', description: 'Strict typing, modern ECMAScript standards, and maintainable modular architecture.' },
  { name: 'React / Next.js', category: 'frontend', level: 'Frontend', description: 'Server components, custom hooks, SSR/SSG, and responsive client state.' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Frontend', description: 'Mobile-first utility architecture, design tokens, and lightweight purged CSS payloads.' },
  { name: 'Framer Motion', category: 'frontend', level: 'Frontend', description: 'Physics animations, layout transitions, and interactive UI micro-interactions.' }
]

const categories = [
  { key: 'all', label: 'All Stack', icon: Cpu },
  { key: 'commerce', label: 'Commerce & Apps', icon: ShoppingBag },
  { key: 'cloud', label: 'Cloud & Backend', icon: Server },
  { key: 'database', label: 'Databases & Queues', icon: Database },
  { key: 'automation', label: 'Automation & Tooling', icon: Terminal },
  { key: 'frontend', label: 'Frontend & UI', icon: Cpu },
]

const TechStackMatrix = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all' 
    ? techItems 
    : techItems.filter(item => item.category === activeCategory)

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 sm:mb-8 pb-1 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 sm:px-4 py-2 font-label-caps text-[11px] sm:text-xs rounded-full flex items-center gap-1.5 sm:gap-2 transition-all duration-200 shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-zinc-950 text-white font-medium shadow-sm'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
              }`}
            >
              <Icon size={13} className={isActive ? 'text-zinc-300' : 'text-zinc-400'} />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tech Cards Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <AnimatePresence>
          {filtered.map((item) => (
            <div
              key={item.name}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-zinc-200 hover:border-zinc-950 transition-all duration-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-body-lg text-sm sm:text-base font-semibold text-zinc-950">
                  {item.name}
                </h4>
                <span className="font-label-caps text-[9px] px-2 py-0.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 font-medium">
                  {item.level}
                </span>
              </div>
              <p className="font-body-sm text-xs text-zinc-600 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default TechStackMatrix
