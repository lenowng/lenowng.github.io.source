import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Zap, Globe, Cpu, Github, Linkedin, Twitter, ArrowRight, Server, Database } from 'lucide-react'
import './App.css'

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
      className="terminal-block scanline"
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
        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>NIGHTR_STATION.TERMINAL</div>
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

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const capabilities = [
    {
      id: "MODULE_01",
      name: "Shopify Architecture",
      icon: <Globe size={28} />,
      description: "Headless builds that shatter performance benchmarks. Hydrogen/Oxygen deployments at enterprise scale.",
      tags: ["Hydrogen", "Oxygen", "Liquid", "Metaobjects"]
    },
    {
      id: "MODULE_02",
      name: "Workflow Engineering",
      icon: <Zap size={28} />,
      description: "Bespoke middleware and automation pipelines. We connect the unconnectable and automate the impossible.",
      tags: ["n8n", "Pipedream", "Bespoke APIs", "Middlewares"]
    },
    {
      id: "MODULE_03",
      name: "Cloud Infrastructure",
      icon: <Cpu size={28} />,
      description: "Serverless systems designed for 99.99% availability. Secure, scalable, and fully automated cloud nodes.",
      tags: ["AWS Lambda", "PostgreSQL", "Terraform", "CI/CD"]
    }
  ]

  return (
    <div className="app">
      <motion.div className="progress-bar" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-primary)', zIndex: 2000, transformOrigin: '0%' }} />
      <div className="grid-background" />
      <div className="noise-overlay" />

      <header className="header glass">
        <div className="logo-container">
          <div className="logo-mark" />
          <div className="logo-text">NIGHTR.DEV</div>
        </div>
        <nav className="nav-links">
          <a href="#capabilities" className="nav-link">Capabilities</a>
          <a href="#projects" className="nav-link">Work</a>
          <div style={{ width: '1px', height: '15px', background: 'rgba(255,255,255,0.1)' }} />
          <a href="https://github.com" className="nav-link"><Github size={16} /></a>
          <button className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.65rem' }}>CONNECT_NODE</button>
        </nav>
      </header>

      <main className="app-container">
        <motion.section
          className="hero"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-meta"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              BUILDING THE WEB'S DARK MODE
            </motion.div>
            <motion.h1
              className="hero-title text-gradient"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The Invisible<br />Engine.
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We operate in the quiet hours to ensure your business makes noise.
              Engineering high-performance commerce and automated infrastructure
              for modern digital brands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button className="btn-primary" style={{ marginRight: '2rem' }}>INITIATE PROJECT</button>
              <a href="#capabilities" className="nav-link" style={{ fontSize: '0.75rem' }}>EXPLORE CAPABILITIES <ArrowRight size={12} style={{ marginLeft: '10px', verticalAlign: 'middle' }} /></a>
            </motion.div>
          </div>
          <Terminal />
        </motion.section>

        <section id="capabilities" style={{ padding: '120px 0' }}>
          <div className="section-header">
            <span className="section-label">SYSTEM_CAPABILITIES_INVENTORY</span>
            <h2 className="section-title text-gradient">Core Modules</h2>
          </div>
          <div className="services-grid">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="glass-card service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="service-id">{cap.id}</div>
                <div className="service-icon">{cap.icon}</div>
                <h3 className="service-name brand-font">{cap.name}</h3>
                <p className="service-description">{cap.description}</p>
                <div className="service-tags">
                  {cap.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" style={{ padding: '120px 0' }}>
          <div className="section-header">
            <span className="section-label">SELECTED_OUTPUT_LOGS</span>
            <h2 className="section-title text-gradient">Engineered Solutions</h2>
          </div>
          <motion.div
            className="glass-card"
            style={{ padding: '0', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}
            whileHover={{ borderColor: 'var(--accent-primary)' }}
          >
            <div style={{ padding: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <span className="tag" style={{ background: 'var(--accent-primary-dim)', color: 'var(--accent-primary)', border: 'none' }}>CASE_STUDY_01</span>
                <span className="text-muted mono" style={{ fontSize: '0.65rem' }}>ST_2025.04.12</span>
              </div>
              <h3 className="service-name brand-font">Enterprise Shopify<br />Hydrogen Transition</h3>
              <p className="service-description" style={{ fontSize: '1.1rem' }}>
                Re-architecting a legacy liquid storefront for a global fashion brand.
                Complete migration to Hydrogen/Oxygen for sub-second performance.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
                <div>
                  <div className="text-accent brand-font" style={{ fontSize: '2rem' }}>+48%</div>
                  <div className="text-muted mono" style={{ fontSize: '0.6rem' }}>CONVERSION_LIFT</div>
                </div>
                <div>
                  <div className="text-accent brand-font" style={{ fontSize: '2rem' }}>-1.2s</div>
                  <div className="text-muted mono" style={{ fontSize: '0.6rem' }}>LCP_REDUCTION</div>
                </div>
              </div>
            </div>
            <div className="glass" style={{ border: 'none', borderLeft: '1px solid rgba(255,255,255,0.05)', background: '#0D1117', padding: '3rem', position: 'relative' }}>
              <div className="mono" style={{ fontSize: '0.75rem', color: '#6A9955', marginBottom: '1.5rem' }}>// nightr.optimization_logic.main</div>
              <div className="mono" style={{ fontSize: '0.8rem' }}>
                <span style={{ color: '#569CD6' }}>async function</span> <span style={{ color: '#DCDCAA' }}>optimizePerformance</span>() {"{"}<br />
                &nbsp;&nbsp;<span style={{ color: '#569CD6' }}>const</span> status = <span style={{ color: '#569CD6' }}>await</span> <span style={{ color: '#DCDCAA' }}>analyzeEdge</span>();<br />
                &nbsp;&nbsp;<span style={{ color: '#C586C0' }}>if</span> (status.isDegraded) {"{"}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#569CD6' }}>await</span> <span style={{ color: '#DCDCAA' }}>rerouteToHealthyNode</span>();<br />
                &nbsp;&nbsp;{"}"}<br />
                &nbsp;&nbsp;<span style={{ color: '#C586C0' }}>return</span> {"{ status: 'NOMINAL', score: 100 }"};<br />
                {"}"}
              </div>
              <div style={{ position: 'absolute', bottom: '3rem', right: '3rem' }}>
                <Database size={100} className="text-muted" style={{ opacity: 0.05 }} />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer app-container">
        <div className="footer-main">
          <div className="system-logs">
            <div className="pulse-dot animate-pulse" />
            <span>NIGHTR_CORE_SYSTEM: NOMINAL</span>
            <span style={{ color: 'rgba(255,153,0,0.5)', marginLeft: '20px' }}>Uptime: 99.998%</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono text-muted" style={{ fontSize: '0.7rem', marginBottom: '10px' }}>{currentTime} // UTC+8</div>
            <div className="nav-links">
              <a href="#" className="nav-link"><Twitter size={14} /></a>
              <a href="#" className="nav-link"><Linkedin size={14} /></a>
              <span className="mono text-muted" style={{ fontSize: '0.6rem' }}>&copy; {new Date().getFullYear()} NIGHTR.DEV</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
