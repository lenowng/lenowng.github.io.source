import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Globe, Cpu, Server, Activity } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import ArchitectureDiagram from '../components/ArchitectureDiagram'

const SystemPulse = () => {
  return (
    <div className="system-pulse glass" style={{ padding: '0.5rem 1rem', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.7rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <Activity size={14} className="text-accent" />
        <span className="mono text-muted">SYS_LOAD</span>
      </div>
      <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
        {[40, 70, 30, 80, 50, 90, 20].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: [`${h}%`, `${Math.random() * 80 + 10}%`] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.05 }}
            style={{ width: '3px', background: i === 5 ? 'var(--accent-primary)' : 'var(--text-muted)', borderRadius: '1px' }}
          />
        ))}
      </div>
      <span className="mono text-accent">NOMINAL</span>
    </div>
  )
}

const Terminal = () => {
  const [entries, setEntries] = useState<string[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)

  const messages = [
    "system.init() -> SUCCESS",
    "connecting to edge_nodes...",
    "node_01: TOKYO_NORTH (24ms)",
    "node_02: LONDON_WEST (88ms)",
    "integrity_check: 100%",
    "loading modules.shopify",
    "loading modules.automation",
    "loading modules.aws",
    "NIGHTR_CORE: READY",
    "waiting for input..."
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < messages.length) {
        setEntries(prev => [...prev, messages[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 900)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [entries])

  return (
    <motion.div
      className="terminal-block scanline glass"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-dot" style={{ background: '#FF5F56' }} />
          <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
          <div className="terminal-dot" style={{ background: '#27C93F' }} />
        </div>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>NIGHTR_STATION.TERMINAL</div>
        <Server size={12} className="text-muted" />
      </div>
      <div className="terminal-body" ref={bodyRef}>
        <div className="terminal-line">
          <span className="terminal-prompt">&lambda;</span>
          <span style={{ color: 'var(--text-primary)' }}>./nightr_core --boot --verbose</span>
        </div>
        {entries.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="terminal-line"
          >
            <span style={{ color: entry?.includes('SUCCESS') || entry?.includes('READY') ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              {entry?.includes('READY') ? '>>' : '>'}
            </span>
            <span>{entry}</span>
          </motion.div>
        ))}
        {entries.length === messages.length && (
          <div className="terminal-line">
            <span className="terminal-prompt">&lambda;</span>
            <span className="animate-pulse" style={{ width: '8px', height: '15px', background: 'var(--accent-primary)' }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

const HomePage = () => {
  const { theme } = useOutletContext<{ theme: 'day' | 'night' }>()

  const capabilities = [
    {
      id: "MODULE_01", name: "Commerce Engineering", icon: <Globe size={28} />,
      description: "Custom Shopify App development and POS UI/UX extensions. Automated order workflows and specialized admin tools.",
      tags: ["Shopify Apps", "POS UI", "Liquid", "Admin Extensions"]
    },
    {
      id: "MODULE_02", name: "Serverless Architecture", icon: <Cpu size={28} />,
      description: "Scalable backend systems built on AWS. Lambda functions, API Gateway, and DynamoDB for high-performance automation.",
      tags: ["AWS Lambda", "DynamoDB", "Serverless", "Node.js"]
    },
    {
      id: "MODULE_03", name: "Full-Stack Systems", icon: <Zap size={28} />,
      description: "Responsive web applications and digital products. React/Remix interfaces with clean, maintainable architecture.",
      tags: ["React / Remix", "TypeScript", "Tailwind CSS", "UI/UX"]
    }
  ]

  return (
    <>
      {/* Sticky Hero Section */}
      <section className="hero">
        <div className="hero-scroll-wrapper">

          <div className="hero-content">
            <motion.div className="hero-meta" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <SystemPulse />
            </motion.div>

            {/* Dynamic Hero based on Scroll/Theme state */}
            <AnimatePresence mode='wait'>
              <motion.h1
                key={theme}
                className="hero-title text-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {theme === 'night' ? (
                  <>The Invisible<br />Engine.</>
                ) : (
                  <>You Work<br />Hard.</>
                )}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <motion.p
                key={theme}
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
              >
                {theme === 'night'
                  ? "We operate in the quiet hours to ensure your business makes noise. Engineering high-performance commerce and automated infrastructure."
                  : "But your systems shouldn't require manual effort. We automate the mundane so you can continue generating value."}
              </motion.p>
            </AnimatePresence>

            <motion.div style={{ marginTop: '2rem' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mono text-accent"
                  style={{ fontSize: '1.2rem', fontWeight: 700 }}
                >
                  {theme === 'night' ? "> WE RUN HARDER." : "> WE OPTIMIZE."}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="hero-terminal-wrapper">
            <Terminal />
          </div>

        </div>
      </section>

      <section id="capabilities" style={{ padding: '80px 0', position: 'relative', zIndex: 10, background: 'var(--bg-primary)' }}>
        <div className="section-header">
          <span className="section-label">SYSTEM_CAPABILITIES_INVENTORY</span>
          <h2 className="section-title text-gradient">Core Modules</h2>
        </div>
        <div className="services-grid">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              className="glass-card service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="service-header">
                <div className="service-icon">{cap.icon}</div>
                <div className="service-id mono">{cap.id}</div>
              </div>
              <h3 className="service-name brand-font">{cap.name}</h3>
              <p className="service-description">{cap.description}</p>
              <div className="service-tags">
                {cap.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" style={{ padding: '80px 0', position: 'relative', zIndex: 10, background: 'var(--bg-primary)' }}>
        <div className="section-header">
          <span className="section-label">SELECTED_OUTPUT_LOGS</span>
          <h2 className="section-title text-gradient">Engineered Solutions</h2>
        </div>

        <div className="glass-card project-terminal">
          <div className="terminal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
            <div className="terminal-controls">
              <div className="terminal-dot" style={{ background: '#FF5F56' }} />
              <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
              <div className="terminal-dot" style={{ background: '#27C93F' }} />
            </div>
            <div className="mono text-muted" style={{ fontSize: '0.75rem' }}>user@nightr:~/projects/shopify-automation</div>
          </div>
          <div className="project-content" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
            <div>
              <div className="mono text-accent" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>CASE_STUDY_01: HYDROGEN_MIGRATION</div>
              <h3 className="brand-font" style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.1 }}>Enterprise Scale<br />Commerce</h3>
              <p className="text-secondary" style={{ marginBottom: '2rem' }}>
                Re-architecting a legacy liquid storefront for a global fashion brand.
                Complete migration to Hydrogen/Oxygen for sub-second performance.
              </p>
              <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <div className="text-accent brand-font" style={{ fontSize: '2.5rem' }}>+48%</div>
                  <div className="mono text-muted" style={{ fontSize: '0.7rem' }}>CONVERSION_LIFT</div>
                </div>
                <div>
                  <div className="text-accent brand-font" style={{ fontSize: '2.5rem' }}>-1.2s</div>
                  <div className="mono text-muted" style={{ fontSize: '0.7rem' }}>LCP_REDUCTION</div>
                </div>
              </div>
            </div>
            <div className="architecture-container glass" style={{ padding: '1.5rem', borderRadius: '8px', position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="scanline" style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay', pointerEvents: 'none', opacity: 0.1 }}></div>
              <ArchitectureDiagram />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
