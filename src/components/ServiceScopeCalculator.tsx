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
    id: 'shopify-speed',
    title: 'High-Scale Shopify Speed & Headless Migration',
    category: 'E-Commerce Engineering',
    problem: 'Slow Liquid themes, excessive app bloat, and legacy checkout bottlenecks causing revenue drop-offs on high-volume storefronts.',
    solution: 'Engineered sub-second Shopify storefronts using Hydrogen / Oxygen (React) or streamlined modular Liquid architectures with optimized asset delivery.',
    timeline: '2 – 4 Weeks',
    impact: '+30% to +50% Conversion Lift & <1.2s LCP Load Speed',
    deliverables: [
      'Custom Hydrogen React / Liquid Storefront',
      'Integrated Subscription & Bundling Architecture',
      'Checkout Funnel Optimization & Script Tag Purge',
      'Core Web Vitals Performance Hardening (95+ Score)'
    ],
    stack: ['Shopify Liquid', 'Hydrogen / Oxygen', 'React', 'Tailwind CSS', 'Shopify Storefront API']
  },
  {
    id: 'automation-ops',
    title: 'Custom Workflow & Order Automation',
    category: 'Process Automation',
    problem: 'Operations and customer service teams losing 20+ hours each week to repetitive manual order management, tagging, and cross-platform data entry.',
    solution: 'Deploy bespoke serverless microservices and custom admin tools with automated webhooks, dynamic tagging engines, and automated error retries.',
    timeline: '1 – 2 Weeks',
    impact: 'Eradicates 100% manual entry errors & saves ~40 hrs/week',
    deliverables: [
      'Custom Embedded Shopify Admin App',
      'Automated Order Metadata & Tagging Pipelines',
      'Idempotent Webhook Handler Microservices',
      'Real-Time Audit Logging & Alerting System'
    ],
    stack: ['AWS Lambda', 'API Gateway', 'Node.js / TypeScript', 'GraphQL', 'Shopify Admin API']
  },
  {
    id: 'aws-infrastructure',
    title: 'Cloud Serverless Infrastructure & Security',
    category: 'Cloud Architecture',
    problem: 'Monolithic backend setups crashing under sudden marketing traffic spikes with unpredictable server scaling costs and security vulnerabilities.',
    solution: 'Auto-scaling serverless infrastructure on AWS (Lambda, API Gateway, DynamoDB, SQS) designed with single-table efficiency and hardened IAM policies.',
    timeline: '2 – 3 Weeks',
    impact: '99.99% Uptime SLA with up to 60% Cloud Infrastructure Cost Reduction',
    deliverables: [
      'Infrastructure-as-Code (Serverless Framework / CDK)',
      'High-Throughput Single-Table DynamoDB Schema',
      'Resilient Asynchronous SQS Queue Workers',
      'Comprehensive CloudWatch Metrics & Threat Audits'
    ],
    stack: ['AWS Lambda', 'DynamoDB', 'Serverless Framework', 'SQS', 'CloudWatch']
  },
  {
    id: 'bespoke-web-app',
    title: 'Bespoke Full-Stack Web App Development',
    category: 'Web Engineering',
    problem: 'Off-the-shelf SaaS software failing to meet unique internal workflow requirements, forcing teams into complex manual workarounds.',
    solution: 'Tailored, light-speed web applications with bespoke business logic, intuitive minimalist UI, edge-rendered backends, and role-based access control.',
    timeline: '3 – 6 Weeks',
    impact: 'Dedicated custom software built for long-term scalability without recurring licensing fees',
    deliverables: [
      'Production-Ready Full-Stack Web Platform',
      'Intuitive Admin Management Console',
      'Role-Based JWT / OAuth Authentication',
      'High-Performance REST & GraphQL API Endpoints'
    ],
    stack: ['React', 'Next.js', 'Hono', 'TypeScript', 'Tailwind CSS', 'PostgreSQL / DynamoDB']
  }
]

interface ServiceScopeCalculatorProps {
  onSelectScope?: (scenarioTitle: string) => void
}

const ServiceScopeCalculator = ({ onSelectScope }: ServiceScopeCalculatorProps) => {
  const [activeId, setActiveId] = useState<string>(scenarios[0].id)
  const activeScenario = scenarios.find(s => s.id === activeId) || scenarios[0]

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-zinc-100">
        <div>
          <span className="font-label-caps text-[11px] text-zinc-400 uppercase tracking-widest block mb-1">
            INTERACTIVE SCOPE BLUEPRINT
          </span>
          <h3 className="font-headline-md text-2xl sm:text-3xl text-zinc-950 font-normal tracking-tight">
            Select Your Primary Technical Bottleneck
          </h3>
        </div>
        <div className="font-label-caps text-[10px] text-zinc-600 border border-zinc-200 px-3.5 py-1.5 rounded-full bg-zinc-50 font-medium">
          CLICK A BLUEPRINT TO VIEW TAILORED STRATEGY
        </div>
      </div>

      {/* 4 Expansive Scenario Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {scenarios.map((s) => {
          const isSelected = s.id === activeId
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`text-left p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between min-h-[160px] ${
                isSelected
                  ? 'bg-zinc-950 text-white shadow-md'
                  : 'bg-zinc-50 border border-zinc-200/80 text-zinc-800 hover:border-zinc-400 hover:text-zinc-950 hover:bg-white'
              }`}
            >
              <div>
                <div className={`font-label-caps text-[10px] uppercase tracking-wider mb-2 font-medium ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {s.category}
                </div>
                <div className="font-body-lg text-base font-semibold leading-snug">
                  {s.title}
                </div>
              </div>
              <div className={`mt-6 pt-3 border-t flex items-center justify-between font-label-caps text-xs ${isSelected ? 'border-zinc-800 text-zinc-300' : 'border-zinc-200 text-zinc-500'}`}>
                <span>{s.timeline}</span>
                {isSelected ? <ArrowRight size={14} className="text-white" /> : <span className="text-zinc-400">Select →</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Spacious Active Blueprint Details Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScenario.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-zinc-200 p-8 sm:p-10 bg-zinc-50/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Challenge & Solution (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="font-label-caps text-xs text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                  CHALLENGE TO RESOLVE
                </div>
                <p className="font-body-sm text-zinc-700 text-base leading-relaxed font-light">
                  {activeScenario.problem}
                </p>
              </div>

              <div>
                <div className="font-label-caps text-xs text-zinc-950 uppercase tracking-wider mb-2 font-semibold">
                  ARCHITECTURAL STRATEGY &amp; APPROACH
                </div>
                <p className="font-body-lg text-lg text-zinc-950 font-normal leading-relaxed">
                  {activeScenario.solution}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <div className="font-label-caps text-xs text-zinc-400 uppercase tracking-wider mb-3 font-semibold">
                  DEPLOYED TECHNOLOGIES &amp; PROTOCOLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeScenario.stack.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="font-label-caps text-[11px] rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-zinc-800 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Timeline, Measurable Outcome, Deliverables & CTA (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-200 pt-8 lg:pt-0 lg:pl-10 space-y-6">
              
              <div className="space-y-6">
                {/* Timeline & Impact */}
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-zinc-200">
                  <div>
                    <div className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Clock size={12} className="text-zinc-500" /> TURNAROUND
                    </div>
                    <div className="font-headline-md text-2xl text-zinc-950 font-medium">
                      {activeScenario.timeline}
                    </div>
                  </div>

                  <div>
                    <div className="font-label-caps text-[10px] text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-zinc-500" /> OUTCOME
                    </div>
                    <div className="font-body-sm text-sm text-zinc-950 font-semibold leading-tight">
                      {activeScenario.impact}
                    </div>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div>
                  <div className="font-label-caps text-xs text-zinc-950 uppercase tracking-wider mb-4 font-semibold">
                    KEY SCOPE DELIVERABLES
                  </div>
                  <ul className="space-y-3">
                    {activeScenario.deliverables.map((item, idx) => (
                      <li key={idx} className="font-body-sm text-sm text-zinc-700 flex items-start gap-2.5 font-light">
                        <Check size={16} className="text-zinc-950 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {onSelectScope && (
                <button
                  onClick={() => onSelectScope(activeScenario.title)}
                  className="w-full bg-zinc-950 text-white font-label-caps text-xs py-4 px-6 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 font-medium shadow-sm"
                >
                  Initiate This Scope <ArrowRight size={14} />
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
