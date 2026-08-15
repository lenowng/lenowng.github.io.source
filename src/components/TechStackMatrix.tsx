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
  { name: 'TypeScript / JS', category: 'frontend', level: 'Core', description: 'Strong typing, modern ESNext features, clean architecture.' },
  { name: 'React / Next.js', category: 'frontend', level: 'Core', description: 'Server components, hooks, state machines, SSR/SSG.' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Core', description: 'Custom design tokens, responsive layouts, utility design systems.' },
  { name: 'Framer Motion', category: 'frontend', level: 'Core', description: 'Physics animations, micro-interactions, layout transitions.' },
  
  // Backend & Cloud
  { name: 'AWS Lambda & Gateway', category: 'cloud', level: 'Cloud', description: 'Serverless microservices, REST/GraphQL APIs, auto-scaling.' },
  { name: 'DynamoDB / NoSQL', category: 'cloud', level: 'Cloud', description: 'Single-table design, Dynamoose ODM, high-throughput indexes.' },
  { name: 'Hono / Node.js', category: 'backend', level: 'Backend', description: 'Ultrafast edge API framework, lightweight serverless backends.' },
  { name: 'AWS SQS & EventBridge', category: 'cloud', level: 'Cloud', description: 'Asynchronous queue processing, event-driven pipelines.' },
  
  // Shopify & Commerce
  { name: 'Shopify Liquid', category: 'shopify', level: 'Commerce', description: 'Bespoke high-conversion theme development & performance tuning.' },
  { name: 'Hydrogen & Oxygen', category: 'shopify', level: 'Commerce', description: 'Headless React Shopify storefronts with sub-second page loads.' },
  { name: 'Shopify Admin GraphQL API', category: 'shopify', level: 'Commerce', description: 'App development, metadata automation, order tags.' },
  { name: 'POS UI Extensions', category: 'shopify', level: 'Commerce', description: 'Custom retail point-of-sale checkout workflows.' },

  // Automation
  { name: 'Groovy (JIRA)', category: 'automation', level: 'Automation', description: 'ScriptRunner automated business workflow scripts.' },
  { name: 'Webhook Pipelines', category: 'automation', level: 'Automation', description: 'Real-time multi-platform data syncing and automated retries.' },
  { name: 'Serverless Framework', category: 'cloud', level: 'DevOps', description: 'Infrastructure-as-code deployment for AWS environments.' }
]

const categories = [
  { key: 'all', label: 'All Capabilities', icon: Cpu },
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
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 font-label-caps text-xs rounded-full flex items-center gap-2 transition-all duration-200 ${
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
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((item) => (
            <div
              key={item.name}
              className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-950 transition-all duration-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-body-lg text-base font-semibold text-zinc-950">
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
