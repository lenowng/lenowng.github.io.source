import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Server, Zap, Code, ArrowUpRight, MessageSquare } from 'lucide-react'
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
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
    { label: "HERBOLOGY", name: "Shopify Storefront Overhaul" },
    { label: "SHOPIFY PLUS", name: "Liquid & Checkout Customizations" },
    { label: "AWS SERVERLESS", name: "Lambda, DynamoDB & SQS Systems" },
    { label: "HYDROGEN & REACT", name: "Headless Storefront Engineering" },
    { label: "ATLASSIAN JIRA", name: "ScriptRunner Workflow Automation" }
  ]

  return (
    <>
      {/* Monochromatic 3D Kinetic Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShaderBackground />
        <Hero3DCanvas />
      </div>

      {/* Hero Section */}
      <header className="relative w-full min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center px-5 sm:px-8 md:px-margin-safe overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 fade-in-up pt-4 sm:pt-8 max-w-4xl"
        >
          {/* Identity Label */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-4 sm:mb-6">
            <span className="font-label-caps text-[10px] sm:text-xs text-zinc-950 font-semibold tracking-widest uppercase">
              LEON WONG
            </span>
            <span className="text-zinc-300 hidden sm:inline">/</span>
            <span className="font-label-caps text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase font-medium block sm:inline">
              SOLUTIONS ARCHITECT &amp; AUTOMATION ENGINEER
            </span>
          </motion.div>

          {/* Fluid Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="font-display-lg text-[clamp(2.4rem,10.5vw,7.2rem)] sm:text-7xl md:text-8xl lg:text-[115px] text-zinc-950 leading-[0.94] tracking-tighter mb-6 sm:mb-8 font-normal"
          >
            ARCHITECTING<br />SCALE.
          </motion.h1>

          <motion.p variants={itemVariants} className="font-body-lg text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl mb-8 sm:mb-12 leading-relaxed font-light">
            I build fast <strong className="text-zinc-950 font-normal">Shopify storefronts</strong>, scalable <strong className="text-zinc-950 font-normal">AWS serverless backends</strong>, and custom <strong className="text-zinc-950 font-normal">automation workflows</strong> that eliminate manual work.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenContact()}
              className="font-label-caps text-xs text-white bg-zinc-950 px-6 sm:px-8 py-4 rounded-2xl sm:rounded-full hover:bg-zinc-800 transition-all inline-flex items-center justify-center gap-2.5 font-medium shadow-sm active:scale-[0.98]"
            >
              Get in Touch <ArrowRight size={14} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#services"
              className="font-label-caps text-xs text-zinc-800 bg-white/90 backdrop-blur-sm border border-zinc-200 px-6 sm:px-8 py-4 rounded-2xl sm:rounded-full hover:border-zinc-400 transition-all shadow-sm text-center active:scale-[0.98]"
            >
              View Services &amp; Stack
            </motion.a>
          </motion.div>
        </motion.div>
      </header>

      {/* Main Shell */}
      <main className="w-full relative z-10 rounded-t-[28px] sm:rounded-t-[44px] bg-white border-t border-zinc-200 shadow-[0_-20px_50px_-15px_rgba(9,9,11,0.03)] pt-12 sm:pt-16">
        
        {/* Specializations Strip */}
        <section className="px-5 sm:px-8 md:px-margin-safe pb-14 sm:pb-20 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 sm:gap-8 mb-8 sm:mb-10 fade-in-up">
              <span className="font-label-caps text-[9px] sm:text-[10px] text-zinc-400 font-semibold tracking-widest uppercase whitespace-nowrap">
                PLATFORMS &amp; SPECIALIZATIONS
              </span>
              <div className="h-px w-full bg-zinc-200"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-zinc-200 fade-in-up">
              {clientLogos.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col justify-start lg:px-6 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="font-display-lg text-sm sm:text-base font-semibold text-zinc-950 tracking-wider">
                    {item.label}
                  </div>
                  <div className="font-body-sm text-xs text-zinc-500 font-light mt-1">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 01. SERVICES SECTION */}
        <section className="py-14 sm:py-20 lg:py-section-gap px-5 sm:px-8 md:px-margin-safe relative" id="services">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16 fade-in-up">
              <span className="font-label-caps text-[11px] sm:text-xs text-zinc-500 tracking-widest uppercase block mb-2 sm:mb-3 font-semibold">
                01. Services
              </span>
              <h2 className="font-headline-md text-2xl sm:text-4xl lg:text-5xl font-light text-zinc-950 tracking-tight leading-tight">
                Engineering for commerce, cloud systems, and operations automation.
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
                I help brands speed up storefronts, reduce cloud costs, and replace manual spreadsheets with reliable background systems.
              </p>
            </div>

            {/* 4 Core Service Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 fade-in-up">
              
              {/* Item 1: Shopify */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-8 sm:pt-10 before:absolute before:top-0 before:left-6 sm:before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-14 sm:after:left-16 after:right-6 sm:after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingBag size={20} className="text-zinc-950 shrink-0" />
                  <h3 className="font-body-lg text-lg sm:text-xl font-semibold text-zinc-950 leading-snug">
                    Shopify &amp; Headless Commerce
                  </h3>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Custom Liquid theme development, headless Hydrogen storefronts, custom admin apps, and checkout optimizations focused on sub-second load times and higher conversions.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  LIQUID / HYDROGEN / ADMIN GRAPHQL
                </div>
              </div>

              {/* Item 2: AWS Cloud */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-8 sm:pt-10 before:absolute before:top-0 before:left-6 sm:before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-14 sm:after:left-16 after:right-6 sm:after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <Server size={20} className="text-zinc-950 shrink-0" />
                  <h3 className="font-body-lg text-lg sm:text-xl font-semibold text-zinc-950 leading-snug">
                    AWS Serverless Backends
                  </h3>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Cost-effective cloud backends using AWS Lambda, API Gateway, DynamoDB, and SQS queues that scale on demand during traffic spikes without idling server bills.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  LAMBDA / DYNAMODB / SQS
                </div>
              </div>

              {/* Item 3: Automation */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-8 sm:pt-10 before:absolute before:top-0 before:left-6 sm:before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-14 sm:after:left-16 after:right-6 sm:after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <Zap size={20} className="text-zinc-950 shrink-0" />
                  <h3 className="font-body-lg text-lg sm:text-xl font-semibold text-zinc-950 leading-snug">
                    Workflow &amp; Operations Automation
                  </h3>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Connecting fragmented tools with webhook handlers, automated inventory syncing, order management apps, and custom ScriptRunner scripts for Jira.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  WEBHOOKS / DATA SYNC / GROOVY
                </div>
              </div>

              {/* Item 4: Web Apps */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50 border border-zinc-200 relative pt-8 sm:pt-10 before:absolute before:top-0 before:left-6 sm:before:left-8 before:h-0.5 before:w-8 before:bg-zinc-950 after:absolute after:top-0 after:left-14 sm:after:left-16 after:right-6 sm:after:right-8 after:h-px after:bg-zinc-200">
                <div className="flex items-center gap-3 mb-3">
                  <Code size={20} className="text-zinc-950 shrink-0" />
                  <h3 className="font-body-lg text-lg sm:text-xl font-semibold text-zinc-950 leading-snug">
                    Custom Web Applications
                  </h3>
                </div>
                <p className="font-body-sm text-xs sm:text-sm text-zinc-600 leading-relaxed font-light mb-4">
                  Internal tools, merchant dashboards, and lightweight full-stack web apps built with React, Next.js, Hono, and TypeScript.
                </p>
                <div className="font-label-caps text-[10px] text-zinc-400 uppercase">
                  REACT / NEXT.JS / HONO / TYPESCRIPT
                </div>
              </div>

            </div>

            {/* Scope Calculator */}
            <div className="fade-in-up">
              <ServiceScopeCalculator onSelectScope={(scope) => handleOpenContact(scope)} />
            </div>

          </div>
        </section>

        {/* 02. WORK SECTION */}
        <section className="py-14 sm:py-20 lg:py-section-gap px-5 sm:px-8 md:px-margin-safe relative bg-zinc-50/70 border-y border-zinc-200" id="work">
          <div className="max-w-7xl mx-auto">
            
            <div className="max-w-3xl mb-12 sm:mb-16 fade-in-up">
              <span className="font-label-caps text-[11px] sm:text-xs text-zinc-500 tracking-widest uppercase block mb-2 sm:mb-3 font-semibold">
                02. Selected Work
              </span>
              <h2 className="font-headline-md text-2xl sm:text-4xl lg:text-5xl font-light text-zinc-950 tracking-tight">
                Production systems and recent client projects.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 fade-in-up">
              
              {/* Case Study 1 */}
              <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-label-caps text-zinc-400 mb-4 sm:mb-6">
                    <span className="font-bold text-zinc-950">2025</span>
                    <span>/</span>
                    <span className="text-zinc-600 font-medium">SHOPIFY &amp; AUTOMATION</span>
                  </div>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-semibold text-zinc-950 mb-3 sm:mb-4 leading-snug">
                    Shopify Order Rescheduling App
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-zinc-600 font-light leading-relaxed mb-6">
                    An embedded Shopify Admin app that lets support teams reschedule order delivery dates with an interactive modal calendar and automated tag updates.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-[11px] sm:text-xs font-label-caps text-zinc-950 font-semibold bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                    Automated Tagging
                  </div>
                  <span className="text-[11px] sm:text-xs font-label-caps text-zinc-400">Shopify GraphQL</span>
                </div>
              </SpotlightCard>

              {/* Case Study 2 */}
              <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-label-caps text-zinc-400 mb-4 sm:mb-6">
                    <span className="font-bold text-zinc-950">2025</span>
                    <span>/</span>
                    <span className="text-zinc-600 font-medium">CLEAN BEAUTY STOREFRONT</span>
                  </div>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-semibold text-zinc-950 mb-3 sm:mb-4 leading-snug">
                    Herbology.com.my Storefront Refactor
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-zinc-600 font-light leading-relaxed mb-6">
                    Full theme rebuild for a clean beauty brand featuring modular Liquid sections, subscription cart logic, and mobile performance tuning.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <a 
                    href="https://herbology.com.my/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[11px] sm:text-xs font-label-caps text-zinc-950 hover:text-zinc-600 font-semibold inline-flex items-center gap-1 active:scale-95 transition-transform"
                  >
                    View Live Store <ArrowUpRight size={14} />
                  </a>
                  <span className="text-[11px] sm:text-xs font-label-caps text-zinc-400">Liquid / Tailwind</span>
                </div>
              </SpotlightCard>

              {/* Case Study 3 */}
              <SpotlightCard className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-label-caps text-zinc-400 mb-4 sm:mb-6">
                    <span className="font-bold text-zinc-950">2024</span>
                    <span>/</span>
                    <span className="text-zinc-600 font-medium">HEADLESS COMMERCE</span>
                  </div>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-semibold text-zinc-950 mb-3 sm:mb-4 leading-snug">
                    Enterprise Hydrogen Migration
                  </h3>
                  <p className="font-body-sm text-xs sm:text-sm text-zinc-600 font-light leading-relaxed mb-6">
                    Migrated a high-volume catalog from legacy Liquid to Shopify Hydrogen on Oxygen (React), cutting page load times to under 1.2s.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <div className="text-[11px] sm:text-xs font-label-caps text-zinc-950 font-semibold bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                    48% Conversion Lift
                  </div>
                  <span className="text-[11px] sm:text-xs font-label-caps text-zinc-400">&lt;1.2s LCP Speed</span>
                </div>
              </SpotlightCard>

            </div>

          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-14 sm:py-20 lg:py-section-gap px-5 sm:px-8 md:px-margin-safe relative">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <figure>
              <blockquote className="font-display-lg text-xl sm:text-3xl md:text-4xl text-zinc-950 font-light leading-snug tracking-tight mb-6 sm:mb-8">
                “Leon solved our operational order bottlenecks in days. The automated tools he built are reliable, simple for our team to use, and keep maintenance costs minimal.”
              </blockquote>
              <figcaption className="flex flex-col items-center justify-center gap-1">
                <div className="font-label-caps text-[11px] sm:text-xs text-zinc-950 font-semibold">HERBOLOGY.COM.MY</div>
                <div className="text-xs text-zinc-500 font-light">E-Commerce Operations</div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 03. TECHNICAL STACK SECTION */}
        <section className="py-14 sm:py-20 lg:py-section-gap px-5 sm:px-8 md:px-margin-safe relative bg-zinc-50/70 border-y border-zinc-200" id="stack">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-16 fade-in-up">
              <span className="font-label-caps text-[11px] sm:text-xs text-zinc-500 tracking-widest uppercase block mb-2 sm:mb-3 font-semibold">
                03. Technical Stack
              </span>
              <h2 className="font-headline-md text-2xl sm:text-4xl lg:text-5xl font-light text-zinc-950 tracking-tight">
                Tools, languages, and platforms.
              </h2>
            </div>
            <div className="fade-in-up">
              <TechStackMatrix />
            </div>
          </div>
        </section>

        {/* 04. NOTES & DIGEST SECTION */}
        <section className="py-14 sm:py-20 lg:py-section-gap px-5 sm:px-8 md:px-margin-safe relative" id="digest">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 fade-in-up gap-4">
              <div>
                <span className="font-label-caps text-[11px] sm:text-xs text-zinc-500 tracking-widest uppercase block mb-2 sm:mb-3 font-semibold">
                  04. Notes &amp; Writing
                </span>
                <h2 className="font-headline-md text-2xl sm:text-4xl lg:text-5xl font-light text-zinc-950 tracking-tight">
                  Engineering notes and case breakdowns.
                </h2>
              </div>
              <Link to="/reads" className="font-label-caps text-xs text-zinc-950 hover:text-zinc-600 flex items-center gap-1 font-semibold active:scale-95 transition-transform">
                View All Notes <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up">
              {engineeringLogs.map((log, i) => (
                <SpotlightCard 
                  key={i} 
                  className="p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-label-caps text-[10px] text-zinc-400 mb-2 font-semibold">[{log.date}]</div>
                    <h3 className="font-body-lg text-lg text-zinc-950 mb-2 sm:mb-3 font-semibold">{log.title}</h3>
                    <p className="font-body-sm text-xs text-zinc-600 leading-relaxed font-light mb-6">{log.tldr}</p>
                  </div>
                  <Link to={log.link} className="font-label-caps text-xs text-zinc-950 hover:text-zinc-600 transition-colors inline-flex items-center gap-2 pt-4 border-t border-zinc-100 font-semibold active:scale-95">
                    READ NOTE <ArrowRight size={14} />
                  </Link>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-14 sm:py-20 lg:py-section-gap px-5 sm:px-8 md:px-margin-safe relative" id="cta">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl bg-zinc-950 text-white p-6 sm:p-12 md:p-16 shadow-xl relative overflow-hidden fade-in-up">
              <div className="max-w-2xl relative z-10">
                <span className="font-label-caps text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest block mb-3 sm:mb-4 font-medium">
                  GET IN TOUCH
                </span>
                <h2 className="font-display-lg text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4 sm:mb-6">
                  Have a project in mind?
                </h2>
                <p className="text-zinc-400 font-body-sm text-sm sm:text-base font-light leading-relaxed mb-6 sm:mb-8">
                  Whether you need a faster Shopify store, a scalable AWS backend, or custom automation to remove repetitive work, let's talk through the requirements.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => handleOpenContact()}
                    className="font-label-caps text-xs text-zinc-950 bg-white hover:bg-zinc-100 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full transition-all inline-flex items-center justify-center gap-2 font-medium shadow-sm active:scale-[0.98]"
                  >
                    <MessageSquare size={14} /> Send a Message
                  </button>
                  <a
                    href="mailto:xyleze@gmail.com"
                    className="font-label-caps text-xs text-white border border-zinc-800 hover:border-zinc-600 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    Email Directly
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
