import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Server, ShoppingBag, Terminal } from 'lucide-react'

interface TechItem {
  name: string
  category: 'frontend' | 'backend' | 'cloud' | 'shopify' | 'automation'
  level: string
  description: string
}

const techItems: TechItem[] = [
  // Languages & Frontend
  { name: 'TypeScript / JS', category: 'frontend', level: 'Core', description: 'Strong typing, modern ECMAScript features, clean modular code.' },
  { name: 'React / Next.js', category: 'frontend', level: 'Core', description: 'Server components, custom hooks, SSR/SSG, and responsive state management.' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Core', description: 'Design tokens, mobile-first responsive layouts, and utility styling.' },
  { name: 'Framer Motion', category: 'frontend', level: 'Core', description: 'Physics animations, layout transitions, and interactive UI polish.' },
  
  // Backend & Cloud
  { name: 'AWS Lambda & Gateway', category: 'cloud', level: 'Cloud', description: 'Serverless functions, REST/GraphQL endpoints, and auto-scaling backends.' },
  { name: 'DynamoDB / NoSQL', category: 'cloud', level: 'Cloud', description: 'Single-table schema design, high-throughput indexes, and Dynamoose modeling.' },
  { name: 'Hono / Node.js', category: 'backend', level: 'Backend', description: 'Fast edge web framework for lightweight, low-latency microservices.' },
  { name: 'AWS SQS & EventBridge', category: 'cloud', level: 'Cloud', description: 'Asynchronous queue processing, retry mechanisms, and event-driven architecture.' },
  
  // Shopify & Commerce
  { name: 'Shopify Liquid', category: 'shopify', level: 'Commerce', description: 'Custom theme development, section architecture, and Core Web Vitals optimization.' },
  { name: 'Hydrogen & Oxygen', category: 'shopify', level: 'Commerce', description: 'Headless React storefronts on Shopify edge infrastructure.' },
  { name: 'Shopify Admin API (GraphQL)', category: 'shopify', level: 'Commerce', description: 'App development, metafield automation, and order lifecycle tags.' },
  { name: 'POS UI Extensions', category: 'shopify', level: 'Commerce', description: 'Custom point-of-sale checkout workflows for retail stores.' },

  // Automation
  { name: 'Groovy / Jira Automation', category: 'automation', level: 'Automation', description: 'ScriptRunner scripts and automated workflow rules for Jira.' },
  { name: 'Webhook Pipelines', category: 'automation', level: 'Automation', description: 'Real-time data synchronization between Shopify, CRMs, and databases.' },
  { name: 'Serverless Framework', category: 'cloud', level: 'DevOps', description: 'Infrastructure as code for reproducible AWS deployments.' }
]

const categories = [
  { key: 'all', label: 'All Stack', icon: Cpu },
  { key: 'shopify', label: 'E-Commerce', icon: ShoppingBag },
  { key: 'cloud', label: 'Cloud Systems', icon: Server },
  { key: 'automation', label: 'Automations', icon: Terminal },
  { key: 'frontend', label: 'Web & UI', icon: Cpu },
]

const TechStackMatrix = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all' 
    ? techItems 
    : techItems.filter(item => item.category === activeCategory)

  return (
    <div className="w-full">
      {/* Category Pills */}
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
