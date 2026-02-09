import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Zap, Globe, Cpu, Github, Moon, Sun, Activity, Server } from 'lucide-react'
import './App.css'

// --- Components ---

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [rText, setRText] = useState("R")

  useEffect(() => {
    if (isHovered) {
      const words = ["Runtime", "Reliability", "Resolution"]
      let i = 0
      const interval = setInterval(() => {
        setRText(words[i])
        i = (i + 1) % words.length
      }, 1200)
      return () => clearInterval(interval)
    } else {
      setRText("R")
    }
  }, [isHovered])

  return (
    <div
      className="logo-container cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700, letterSpacing: '-0.05em', fontSize: '1.5rem' }}
    >
      <span>NIGHT</span>
      <span style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center' }}>
        [
        <motion.span
          key={rText}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mono"
          style={{ padding: '0 2px' }}
        >
          {rText}
        </motion.span>
        ]
      </span>
      {!isHovered && (
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ width: '8px', height: '4px', background: 'var(--accent-primary)', marginLeft: '4px' }}
        />
      )}
    </div>
  )
}

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

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [theme, setTheme] = useState<'night' | 'day'>('night')
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => setTheme(prev => prev === 'night' ? 'day' : 'night')

  const capabilities = [
    {
      id: "MODULE_01", name: "Shopify Architecture", icon: <Globe size={28} />,
      description: "Headless builds that shatter performance benchmarks. Hydrogen/Oxygen deployments at enterprise scale.",
      tags: ["Hydrogen", "Oxygen", "Liquid", "Metaobjects"]
    },
    {
      id: "MODULE_02", name: "Workflow Engineering", icon: <Zap size={28} />,
      description: "Bespoke middleware and automation pipelines. We connect the unconnectable and automate the impossible.",
      tags: ["n8n", "Pipedream", "Bespoke APIs", "Middlewares"]
    },
    {
      id: "MODULE_03", name: "Cloud Infrastructure", icon: <Cpu size={28} />,
      description: "Serverless systems designed for 99.99% availability. Redundant AWS architecture that eliminates single points of failure.",
      tags: ["AWS Lambda", "PostgreSQL", "Terraform", "CI/CD"]
    }
  ]

  return (
    <div className="app">
      <motion.div className="progress-bar" style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-primary)', zIndex: 2000, transformOrigin: '0%' }} />
      <div className="grid-background" />
      <div className="noise-overlay" />

      <header className="header glass">
        <Logo />
        <nav className="nav-links">
          <a href="#capabilities" className="nav-link">Capabilities</a>
          <a href="#projects" className="nav-link">Work</a>
          <div className="divider-vertical" />
          <button onClick={toggleTheme} className="icon-btn" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            {theme === 'night' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="https://github.com/lenowng" target="_blank" className="nav-link"><Github size={18} /></a>
          <button className="btn-primary">INIT_PROTOCOL</button>
        </nav>
      </header>

      <main className="app-container">
        <section className="hero">
          <div className="hero-content">
            <motion.div className="hero-meta" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <SystemPulse />
            </motion.div>

            <AnimatePresence mode='wait'>
              <motion.h1
                key={theme}
                className="hero-title text-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {theme === 'night' ? (
                  <>The Invisible<br />Engine.</>
                ) : (
                  <>You Work<br />Hard.</>
                )}
              </motion.h1>
            </AnimatePresence>

            <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              {theme === 'night'
                ? "We operate in the quiet hours to ensure your business makes noise. Engineering high-performance commerce and automated infrastructure."
                : "But your systems shouldn't require manual effort. We automate the mundane so you can focus on the extraordinary."}
            </motion.p>

            <motion.div style={{ marginTop: '2rem' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <span className="mono text-accent" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{theme === 'night' ? "> WE RUN HARDER." : "> WE OPTIMIZE."}</span>
            </motion.div>
          </div>
          <Terminal />
        </section>

        <section id="capabilities" style={{ padding: '80px 0' }}>
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

        <section id="projects" style={{ padding: '80px 0' }}>
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
              <div className="code-block glass" style={{ padding: '1.5rem', borderRadius: '8px', fontSize: '0.8rem', position: 'relative', overflow: 'hidden' }}>
                <div className="scanline" style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay', pointerEvents: 'none', opacity: 0.1 }}></div>
                <div className="mono" style={{ lineHeight: 1.6 }}>
                  <span style={{ color: '#C586C0' }}>import</span> {'{'} <span style={{ color: '#9CDCFE' }}>optimize</span> {'}'} <span style={{ color: '#C586C0' }}>from</span> <span style={{ color: '#CE9178' }}>'@nightr/core'</span>;<br /><br />
                  <span style={{ color: '#569CD6' }}>export default</span> <span style={{ color: '#569CD6' }}>async function</span> <span style={{ color: '#DCDCAA' }}>loader</span>() {'{'}<br />
                  &nbsp;&nbsp;<span style={{ color: '#569CD6' }}>const</span> <span style={{ color: '#9CDCFE' }}>data</span> = <span style={{ color: '#569CD6' }}>await</span> <span style={{ color: '#DCDCAA' }}>fetchFast</span>();<br />
                  &nbsp;&nbsp;<span style={{ color: '#C586C0' }}>if</span> (<span style={{ color: '#9CDCFE' }}>data</span>.latency &gt; <span style={{ color: '#B5CEA8' }}>200</span>) {'{'}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4EC9B0' }}>Edge</span>.<span style={{ color: '#DCDCAA' }}>reroute</span>(<span style={{ color: '#9CDCFE' }}>data</span>);<br />
                  &nbsp;&nbsp;{'}'}<br />
                  &nbsp;&nbsp;<span style={{ color: '#C586C0' }}>return</span> <span style={{ color: '#9CDCFE' }}>optimize</span>(<span style={{ color: '#9CDCFE' }}>data</span>);<br />
                  {'}'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer app-container">
        <div className="footer-content glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="system-status">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="pulse-dot animate-pulse" />
              <span className="mono text-primary" style={{ fontSize: '0.8rem' }}>NIGHTR_CORE: NOMINAL</span>
            </div>
          </div>
          <div className="mono text-muted" style={{ fontSize: '0.7rem' }}>
            {currentTime} // UTC+8 <br />
            &copy; {new Date().getFullYear()} NIGHTR.DEV
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
