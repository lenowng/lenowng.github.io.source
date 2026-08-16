import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, ShieldCheck, Check } from 'lucide-react'

interface ServiceScenario {
  id: string
  title: string
  category: string
  problem: string
  solution: string
  timeline: string
  impact: string
  deliverables: string[]
  stack: string[]
}

const scenarios: ServiceScenario[] = [
  {
    id: 'sprint-automation',
    title: 'Sprint Automation',
    category: 'Operations',
    problem: 'Support and operations teams spending hours each day manually editing orders, transcribing tracking numbers, and copying data between systems.',
    solution: 'Deploying serverless background pipelines, Google Apps Script data connectors, automated tagging workflows, and custom Jira ScriptRunner scripts that process events instantly.',
    timeline: '1 to 2 Weeks',
    impact: 'Eliminates repetitive data entry and prevents order fulfillment delays',
    deliverables: [
      'Automated order tagging & status workflow',
      'Google Apps Script automated Sheets pipeline',
      'Idempotent webhook pipeline with retry handling',
      'Jira ScriptRunner / Groovy workflow automation'
    ],
    stack: ['Google Apps Script', 'AWS Lambda', 'Node.js', 'Webhooks', 'Groovy']
  },
  {
    id: 'custom-store-apps',
    title: 'Custom Store Apps & POS',
    category: 'Shopify Apps',
    problem: 'Off-the-shelf Shopify apps lack store-specific business rules, charge high recurring fees, and clutter the admin interface.',
    solution: 'Building store-tailored embedded Shopify Admin apps and POS UI extensions that integrate directly with your exact operational rules.',
    timeline: '2 to 3 Weeks',
    impact: 'Seamless admin workflows without recurring third-party SaaS fees',
    deliverables: [
      'Embedded Shopify Admin application (React / Polaris)',
      'Custom POS UI Extension for retail checkout',
      'Dynamic metafield and order tag automation',
      'Secure backend API with Shopify GraphQL integration'
    ],
    stack: ['Shopify Admin API', 'POS UI Extensions', 'React', 'Node.js', 'TypeScript']
  },
  {
    id: 'storefront-overhaul',
    title: 'Storefront Overhaul & Speed',
    category: 'E-Commerce',
    problem: 'Slow page load times, bloated theme code, and checkout friction hurting mobile store conversion rates.',
    solution: 'Rebuilding and tuning Liquid 2.0 themes with modular section architecture, removing unused app scripts, and optimizing assets.',
    timeline: '2 to 4 Weeks',
    impact: 'Sub-second load times (<1.2s LCP) and higher checkout conversions',
    deliverables: [
      'Modular Liquid 2.0 theme sections & layout refactor',
      'Subscription (Recharge) & custom cart drawer logic',
      'Third-party app script audit and asset optimization',
      'Core Web Vitals tuning (90+ mobile Lighthouse score)'
    ],
    stack: ['Shopify Liquid', 'Tailwind CSS', 'Alpine.js / JS', 'Recharge API']
  },
  {
    id: 'fullstack-app',
    title: 'Full-Stack Web Applications',
    category: 'Web Development',
    problem: 'Internal teams relying on complex spreadsheets with zero access control, audit history, or automated data validation.',
    solution: 'Developing custom internal tools, merchant consoles, and lightweight web apps with secure auth, responsive UI, and auto-scaling backends.',
    timeline: '3 to 6 Weeks',
    impact: 'Tailored operational tooling built for your exact workflow',
    deliverables: [
      'Full-stack React / Next.js web application',
      'Role-based authentication and user access control',
      'Clean data dashboard with tables, filtering, and export',
      'Serverless AWS backend (Lambda, API Gateway, DynamoDB)'
    ],
    stack: ['React', 'Next.js', 'Hono', 'TypeScript', 'AWS Lambda', 'DynamoDB']
  }
]

interface ServiceScopeCalculatorProps {
  onSelectScope?: (scenarioTitle: string) => void
}

const ServiceScopeCalculator = ({ onSelectScope }: ServiceScopeCalculatorProps) => {
  const [activeId, setActiveId] = useState<string>(scenarios[0].id)
  const activeScenario = scenarios.find(s => s.id === activeId) || scenarios[0]

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-6 sm:mb-10 pb-5 sm:pb-6 border-b border-zinc-100">
        <div>
          <span className="font-label-caps text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest block mb-1 font-semibold">
            ENGAGEMENT BLUEPRINTS
          </span>
          <h3 className="font-headline-md text-xl sm:text-2xl md:text-3xl text-zinc-950 font-normal tracking-tight">
            Explore standard project scopes
          </h3>
        </div>
        <div className="font-label-caps text-[9px] sm:text-[10px] text-zinc-600 border border-zinc-200 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-zinc-50 font-medium whitespace-nowrap">
          SELECT A TIER TO VIEW DETAILS
        </div>
      </div>

      {/* 4 Tier Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
        {scenarios.map((s) => {
          const isSelected = s.id === activeId
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`text-left p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-200 flex flex-col justify-between min-h-[130px] sm:min-h-[160px] active:scale-[0.98] ${
                isSelected
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-zinc-50 border border-zinc-200/80 text-zinc-800 hover:border-zinc-400 hover:text-zinc-950 hover:bg-white'
              }`}
            >
              <div>
                <div className={`font-label-caps text-[9px] sm:text-[10px] uppercase tracking-wider mb-1.5 sm:mb-2 font-medium ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {s.category}
                </div>
                <div className="font-body-lg text-sm sm:text-base font-semibold leading-snug">
                  {s.title}
                </div>
              </div>
              <div className={`mt-4 sm:mt-6 pt-2.5 sm:pt-3 border-t flex items-center justify-between font-label-caps text-[11px] sm:text-xs ${isSelected ? 'border-zinc-800 text-zinc-300' : 'border-zinc-200 text-zinc-500'}`}>
                <span>{s.timeline}</span>
                {isSelected ? <ArrowRight size={13} className="text-white" /> : <span className="text-zinc-400">View →</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="rounded-xl sm:rounded-2xl border border-zinc-200 p-5 sm:p-8 md:p-10 bg-zinc-50/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
            
            {/* Left Column: Challenge & Solution */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div>
                <div className="font-label-caps text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                  COMMON BOTTLENECK
                </div>
                <p className="font-body-sm text-zinc-700 text-sm sm:text-base leading-relaxed font-light">
                  {activeScenario.problem}
                </p>
              </div>

              <div>
                <div className="font-label-caps text-[11px] sm:text-xs text-zinc-950 uppercase tracking-wider mb-2 font-semibold">
                  TECHNICAL APPROACH
                </div>
                <p className="font-body-lg text-base sm:text-lg text-zinc-950 font-normal leading-relaxed">
                  {activeScenario.solution}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <div className="font-label-caps text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider mb-2.5 sm:mb-3 font-semibold">
                  PRIMARY TOOLS &amp; PROTOCOLS
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeScenario.stack.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="font-label-caps text-[10px] sm:text-[11px] rounded-full border border-zinc-200 bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 text-zinc-800 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Timeline, Outcome, Deliverables & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-200 pt-6 lg:pt-0 lg:pl-10 space-y-6">
              
              <div className="space-y-5 sm:space-y-6">
                {/* Timeline & Outcome */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-zinc-200">
                  <div>
                    <div className="font-label-caps text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                      <Clock size={12} className="text-zinc-500 shrink-0" /> TIMELINE
                    </div>
                    <div className="font-headline-md text-xl sm:text-2xl text-zinc-950 font-medium">
                      {activeScenario.timeline}
                    </div>
                  </div>

                  <div>
                    <div className="font-label-caps text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-semibold">
                      <ShieldCheck size={12} className="text-zinc-500 shrink-0" /> OUTCOME
                    </div>
                    <div className="font-body-sm text-xs sm:text-sm text-zinc-950 font-semibold leading-tight">
                      {activeScenario.impact}
                    </div>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div>
                  <div className="font-label-caps text-[11px] sm:text-xs text-zinc-950 uppercase tracking-wider mb-3 sm:mb-4 font-semibold">
                    KEY DELIVERABLES
                  </div>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {activeScenario.deliverables.map((item, idx) => (
                      <li key={idx} className="font-body-sm text-xs sm:text-sm text-zinc-700 flex items-start gap-2.5 font-light">
                        <Check size={15} className="text-zinc-950 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {onSelectScope && (
                <button
                  onClick={() => onSelectScope(activeScenario.title)}
                  className="w-full bg-zinc-950 text-white font-label-caps text-xs py-3.5 sm:py-4 px-6 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 font-medium shadow-sm active:scale-[0.98]"
                >
                  Discuss This Scope <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ServiceScopeCalculator
