import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Server, Zap, Code, ArrowUpRight, CheckCircle2, TrendingUp, MessageSquare } from 'lucide-react'
import { Link, useOutletContext } from 'react-router-dom'
import ShaderBackground from '../components/ShaderBackground'
import Hero3DCanvas from '../components/Hero3DCanvas'
import SpotlightCard from '../components/SpotlightCard'
import ServiceScopeCalculator from '../components/ServiceScopeCalculator'
import TechStackMatrix from '../components/TechStackMatrix'

interface OutletContextType {
  handleOpenContact: (scope?: string) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
}

const HomePage = () => {
  const { handleOpenContact } = useOutletContext<OutletContextType>()

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const engineeringLogs = [
    {
      title: "The Invisible Engine: Architecture Deep Dive",
      date: "2024-02-10",
      tldr: "Dual-repo CI/CD pipelines, sticky parallax, and React state machines.",
      link: "/blog/architecture-deep-dive"
    },
    {
      title: "Shopify at Scale: Hydrogen Migration",
      date: "2024-01-15",
      tldr: "Migrating a $50M/yr brand from Liquid to Headless Hydrogen.",
      link: "/blog/hydrogen-migration"
    },
    {
      title: "Automating the Mundane",
      date: "2023-11-20",
      tldr: "Using AWS Lambda to eliminate 40 hours of manual data entry per week.",
      link: "/blog/automation"
    }
  ]

  const clientLogos = [
    { name: "Herbology Clean Beauty", label: "HERBOLOGY" },
    { name: "Shopify Plus Partner", label: "SHOPIFY PLUS" },
    { name: "AWS Cloud Architecture", label: "AWS CLOUD" },
    { name: "Hydrogen Headless", label: "HYDROGEN REACT" },
    { name: "Atlassian ScriptRunner", label: "ATLASSIAN JIRA" }
  ]

  return (
    <>
      {/* Immersive Monochromatic 3D Kinetic Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShaderBackground />
        <Hero3DCanvas />
      </div>

      {/* Hero Section */}
      <header className="relative w-full min-h-[92vh] flex flex-col justify-center px-margin-safe overflow-hidden pt-32 pb-24 z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 fade-in-up pt-8 max-w-4xl"
        >
          {/* Refined Architectural Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="font-label-caps text-xs text-zinc-950 font-semibold tracking-widest uppercase">
              LEON WONG
            </span>
            <span className="text-zinc-300">/</span>
            <span className="font-label-caps text-xs text-zinc-500 tracking-widest uppercase font-medium">
              SOLUTIONS ARCHITECT &amp; AUTOMATION ENGINEER
            </span>
          </motion.div>

          {/* Grand Monolithic Display Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="font-display-lg text-display-lg md:text-[115px] text-zinc-950 leading-none tracking-tighter mb-8 font-normal"
          >
            ARCHITECTING<br />SCALE.
          </motion.h1>

          <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-zinc-600 max-w-2xl mb-12 leading-relaxed font-light">
            Engineering high-volume <strong className="text-zinc-950 font-normal">Shopify commerce storefronts</strong>, resilient <strong className="text-zinc-950 font-normal">AWS serverless systems</strong>, and bespoke <strong className="text-zinc-950 font-normal">workflow automations</strong> designed for long-term operational sustainability.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenContact()}
              className="font-label-caps text-xs text-white bg-zinc-950 px-8 py-4 rounded-full hover:bg-zinc-800 transition-all inline-flex items-center gap-2.5 font-medium shadow-sm"
            >
              Initiate Project Collaboration <ArrowRight size={14} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              className="font-label-caps text-xs text-zinc-800 bg-white border border-zinc-200 px-8 py-4 rounded-full hover:border-zinc-400 transition-all shadow-sm"
            >
              Explore Services &amp; Scope
            </motion.a>
          </motion.div>

          {/* Metrics Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-200 max-w-2xl">
            <div className="p-4 bg-white/80 rounded-2xl border border-zinc-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-zinc-950 font-headline-md text-2xl font-normal">
                <TrendingUp size={18} className="text-zinc-500" /> &lt;1.2s
              </div>
              <div className="font-label-caps text-[10px] text-zinc-500 uppercase mt-1">Shopify LCP Speed</div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-zinc-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-zinc-950 font-headline-md text-2xl font-normal">
                <CheckCircle2 size={18} className="text-zinc-500" /> 99.99%
              </div>
              <div className="font-label-caps text-[10px] text-zinc-500 uppercase mt-1">Cloud Uptime SLA</div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-zinc-200/80 shadow-sm">
              <div className="flex items-center gap-2 text-zinc-950 font-headline-md text-2xl font-normal">
                <Zap size={18} className="text-zinc-500" /> ~40 Hrs
              </div>
              <div className="font-label-caps text-[10px] text-zinc-500 uppercase mt-1">Weekly Time Saved</div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Copenhagen Architectural Curved Shell */}
      <main className="w-full relative z-10 rounded-t-[36px] sm:rounded-t-[44px] bg-white border-t border-zinc-200 shadow-[0_-20px_50px_-15px_rgba(9,9,11,0.03)] pt-16">
        
        {/* Partner & Platform Proof Strip */}
        <section className="px-margin-safe pb-20 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-8 mb-8 fade-in-up">
              <span className="font-label-caps text-[10px] text-zinc-400 font-medium tracking-widest uppercase whitespace-nowrap">
                PROVEN ACROSS HIGH-GROWTH PLATFORMS
              </span>
              <div className="h-px w-full bg-zinc-200"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center fade-in-up">
              {clientLogos.map((item, idx) => (
                <div 
                  key={idx} 
                  className="py-3.5 px-5 rounded-xl bg-zinc-50 border border-zinc-200 text-center font-display-lg text-xs font-semibold text-zinc-700 tracking-wider hover:text-zinc-950 hover:bg-white hover:border-zinc-400 transition-all shadow-sm"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 01. SERVICES SECTION (Spacious & Architectural Layout) */}
        <section className="py-section-gap px-margin-safe relative" id="services">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-16 fade-in-up">
              <span className="font-label-caps text-xs text-zinc-500 tracking-widest uppercase block mb-3 font-semibold">
                01. Services &amp; Architecture
              </span>
              <h2 className="font-headline-md text-3xl sm:text-5xl font-light text-zinc-950 tracking-tight leading-tight">
                We help brands engineer scalable infrastructure and automate complex operations.
              </h2>
              <p className="mt-4 text-base text-zinc-600 font-light leading-relaxed">
                By designing lean systems that bridge Shopify commerce, AWS serverless pipelines, and bespoke software, we build platforms that scale effortlessly without spiraling maintenance costs.
              </p>
            </div>

            {/* 4 Core Service Pillars Grid (Spacious 2x2 Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 fade-in-up">
              
              {/* Item 1: Shopify */}
              <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-10 before:absolute before:top-0 before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-16 after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingBag size={20} className="text-zinc-950" />
                  <h3 className="font-body-lg text-xl font-semibold text-zinc-950">
                    Shopify Commerce &amp; Headless Storefronts
                  </h3>
                </div>
                <p className="font-body-sm text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Custom Liquid theme engineering, headless React/Hydrogen storefronts, custom admin apps, and checkout optimizations engineered for conversion and sub-second page speeds.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  LIQUID / HYDROGEN REACT / ADMIN GRAPHQL
                </div>
              </div>

              {/* Item 2: AWS Cloud */}
              <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-10 before:absolute before:top-0 before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-16 after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <Server size={20} className="text-zinc-950" />
                  <h3 className="font-body-lg text-xl font-semibold text-zinc-950">
                    AWS Serverless Systems &amp; APIs
                  </h3>
                </div>
                <p className="font-body-sm text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Architecting resilient serverless microservices on AWS (Lambda, API Gateway, DynamoDB, SQS) that automatically scale during flash sales and minimize baseline cloud expenditure.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  AWS LAMBDA / DYNAMODB / SQS QUEUES
                </div>
              </div>

              {/* Item 3: Automation */}
              <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-10 before:absolute before:top-0 before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-16 after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <Zap size={20} className="text-zinc-950" />
                  <h3 className="font-body-lg text-xl font-semibold text-zinc-950">
                    Workflow &amp; Business Process Automation
                  </h3>
                </div>
                <p className="font-body-sm text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Eliminating manual data entry and operational drag. Building automated order rescheduling apps, multi-platform inventory syncing pipelines, and custom JIRA Groovy scripts.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  WEBHOOKS / DATA SYNC / GROOVY
                </div>
              </div>

              {/* Item 4: Web Apps */}
              <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-10 before:absolute before:top-0 before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-16 after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <Code size={20} className="text-zinc-950" />
                  <h3 className="font-body-lg text-xl font-semibold text-zinc-950">
                    Bespoke Full-Stack Web Applications
                  </h3>
                </div>
                <p className="font-body-sm text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Developing tailored internal dashboards, client portals, and web platforms using React, Next.js, Hono, and TypeScript with minimalist, accessible design systems.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  REACT / NEXT.JS / HONO / TYPESCRIPT
                </div>
              </div>

            </div>

            {/* Expansive Full-Width Interactive Scope Calculator */}
            <div className="fade-in-up">
              <ServiceScopeCalculator onSelectScope={(scope) => handleOpenContact(scope)} />
            </div>

          </div>
        </section>

        {/* 02. WORK & CASE STUDIES SECTION (Studio 3-Column Editorial Grid) */}
        <section className="py-section-gap px-margin-safe relative bg-zinc-50/70 border-y border-zinc-200" id="work">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-3xl mb-16 fade-in-up">
              <span className="font-label-caps text-xs text-zinc-500 tracking-widest uppercase block mb-3 font-semibold">
                02. Case Studies &amp; Impact
              </span>
              <h2 className="font-headline-md text-3xl sm:text-5xl font-light text-zinc-950 tracking-tight">
                Architecting real measurable outcomes for modern business.
              </h2>
            </div>
            
            {/* Studio 3-Column Case Study Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-in-up">
              
              {/* Case Study 1 */}
              <SpotlightCard className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-label-caps text-zinc-400 mb-6">
                    <span className="font-bold text-zinc-950">2025</span>
                    <span>/</span>
                    <span className="text-zinc-600 font-medium">SHOPIFY &amp; AUTOMATION</span>
                  </div>
                  <h3 className="font-headline-md text-2xl font-semibold text-zinc-950 mb-4 leading-snug">
                    Shopify Rescheduling Admin App
                  </h3>
                  <p className="font-body-sm text-sm text-zinc-600 font-light leading-relaxed mb-6">
                    An embedded Shopify Admin app enabling merchants to dynamically reschedule orders with an interactive modal calendar and automated tag pipelines.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-xs font-label-caps text-zinc-950 font-semibold bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                    100% Automated Tagging
                  </div>
                  <span className="text-xs font-label-caps text-zinc-400">Shopify GraphQL</span>
                </div>
              </SpotlightCard>

              {/* Case Study 2 */}
              <SpotlightCard className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-label-caps text-zinc-400 mb-6">
                    <span className="font-bold text-zinc-950">2025</span>
                    <span>/</span>
                    <span className="text-zinc-600 font-medium">CLEAN BEAUTY OVERHAUL</span>
                  </div>
                  <h3 className="font-headline-md text-2xl font-semibold text-zinc-950 mb-4 leading-snug">
                    Herbology.com.my Storefront Refactor
                  </h3>
                  <p className="font-body-sm text-sm text-zinc-600 font-light leading-relaxed mb-6">
                    Complete theme revamp for a premium beauty brand with customized Liquid sections, subscription cart logic, and mobile-first responsive architecture.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <a 
                    href="https://herbology.com.my/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-label-caps text-zinc-950 hover:text-zinc-600 font-semibold inline-flex items-center gap-1"
                  >
                    View Live Store <ArrowUpRight size={14} />
                  </a>
                  <span className="text-xs font-label-caps text-zinc-400">Liquid / Alpine</span>
                </div>
              </SpotlightCard>

              {/* Case Study 3 */}
              <SpotlightCard className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-label-caps text-zinc-400 mb-6">
                    <span className="font-bold text-zinc-950">2024</span>
                    <span>/</span>
                    <span className="text-zinc-600 font-medium">HEADLESS COMMERCE</span>
                  </div>
                  <h3 className="font-headline-md text-2xl font-semibold text-zinc-950 mb-4 leading-snug">
                    Enterprise Scale Hydrogen Storefront
                  </h3>
                  <p className="font-body-sm text-sm text-zinc-600 font-light leading-relaxed mb-6">
                    Migrating a high-volume storefront from legacy Liquid to Shopify Hydrogen / Oxygen (React), achieving instant transitions and global edge delivery.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-xs font-label-caps text-zinc-950 font-semibold bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                    +48% Conversion Lift
                  </div>
                  <span className="text-xs font-label-caps text-zinc-400">&lt;1.2s LCP Speed</span>
                </div>
              </SpotlightCard>

            </div>

          </div>
        </section>

        {/* Pull-Quote Testimonial Section */}
        <section className="py-section-gap px-margin-safe relative">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <figure>
              <blockquote className="font-display-lg text-2xl sm:text-4xl text-zinc-950 font-light leading-snug tracking-tight mb-8">
                “Leon’s architectural expertise eliminated our team's manual order bottlenecks completely. His solutions are lean, bulletproof, and built with long-term cost efficiency in mind.”
              </blockquote>
              <figcaption className="flex flex-col items-center justify-center gap-1">
                <div className="font-label-caps text-xs text-zinc-950 font-semibold">HERBOLOGY CLEAN BEAUTY</div>
                <div className="text-xs text-zinc-500 font-light">E-Commerce Leadership &amp; Operations</div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 03. TECHNICAL CAPABILITIES SECTION */}
        <section className="py-section-gap px-margin-safe relative bg-zinc-50/70 border-y border-zinc-200" id="stack">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 fade-in-up">
              <span className="font-label-caps text-xs text-zinc-500 tracking-widest uppercase block mb-3 font-semibold">
                03. Technical Capabilities
              </span>
              <h2 className="font-headline-md text-3xl sm:text-5xl font-light text-zinc-950 tracking-tight">
                Technologies, Frameworks &amp; Tooling
              </h2>
            </div>
            <div className="fade-in-up">
              <TechStackMatrix />
            </div>
          </div>
        </section>

        {/* 04. THE DIGEST SECTION */}
        <section className="py-section-gap px-margin-safe relative" id="digest">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 fade-in-up gap-4">
              <div>
                <span className="font-label-caps text-xs text-zinc-500 tracking-widest uppercase block mb-3 font-semibold">
                  04. Written Insights
                </span>
                <h2 className="font-headline-md text-3xl sm:text-5xl font-light text-zinc-950 tracking-tight">
                  The Engineering Digest
                </h2>
              </div>
              <Link to="/reads" className="font-label-caps text-xs text-zinc-950 hover:text-zinc-600 flex items-center gap-1 font-semibold">
                View All Articles <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up">
              {engineeringLogs.map((log, i) => (
                <SpotlightCard 
                  key={i} 
                  className="p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-label-caps text-[10px] text-zinc-400 mb-2 font-semibold">[{log.date}]</div>
                    <h3 className="font-body-lg text-lg text-zinc-950 mb-3 font-semibold">{log.title}</h3>
                    <p className="font-body-sm text-xs text-zinc-600 leading-relaxed font-light mb-6">{log.tldr}</p>
                  </div>
                  <Link to={log.link} className="font-label-caps text-xs text-zinc-950 hover:text-zinc-600 transition-colors inline-flex items-center gap-2 pt-4 border-t border-zinc-100 font-semibold">
                    READ LOG <ArrowRight size={14} />
                  </Link>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Monumental CTA Box: "Tell us about your project" */}
        <section className="py-section-gap px-margin-safe relative" id="cta">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl bg-zinc-950 text-white p-8 sm:p-16 shadow-xl relative overflow-hidden fade-in-up">
              <div className="max-w-2xl relative z-10">
                <span className="font-label-caps text-xs text-zinc-400 uppercase tracking-widest block mb-4 font-medium">
                  INITIATE A COLLABORATION
                </span>
                <h2 className="font-display-lg text-3xl sm:text-5xl font-light text-white tracking-tight mb-6">
                  Tell us about your project.
                </h2>
                <p className="text-zinc-400 font-body-sm text-base font-light leading-relaxed mb-8">
                  Whether you require an end-to-end Shopify refactor, auto-scaling AWS infrastructure, or custom workflow automations, let's architect a solution that drives measurable value.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleOpenContact()}
                    className="font-label-caps text-xs text-zinc-950 bg-white hover:bg-zinc-100 px-8 py-4 rounded-full transition-all inline-flex items-center gap-2 font-medium shadow-sm"
                  >
                    <MessageSquare size={14} /> Start a Conversation
                  </button>
                  <a
                    href="mailto:xyleze@gmail.com"
                    className="font-label-caps text-xs text-white border border-zinc-800 hover:border-zinc-600 px-8 py-4 rounded-full transition-all inline-flex items-center gap-2"
                  >
                    Direct Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default HomePage
