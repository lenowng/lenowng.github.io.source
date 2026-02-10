import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Github, Moon, Sun, Menu, X, Sparkles } from 'lucide-react'
import '../App.css'
import CodeStarfield from '../components/CodeStarfield'

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [rText, setRText] = useState("R")
  const navigate = useNavigate()

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
      onClick={() => navigate('/')}
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

const Layout = () => {
  // Theme State: 'auto' is default, persisted in localStorage
  const [themeMode, setThemeMode] = useState<'auto' | 'day' | 'night'>(() => {
    const saved = localStorage.getItem('theme-mode') as 'auto' | 'day' | 'night'
    return saved || 'auto'
  })
  const [effectiveTheme, setEffectiveTheme] = useState<'day' | 'night'>('day')
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const navigate = useNavigate()
  const location = useLocation()

  // Auto-Theme Scroll Logic
  // Auto-Theme Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only trigger auto-theme logic on the homepage
    if (themeMode === 'auto' && location.pathname === '/') {
      // Trigger night mode after 150px of scrolling
      const shouldBeNight = latest > 150
      if (shouldBeNight && effectiveTheme !== 'night') setEffectiveTheme('night')
      if (!shouldBeNight && effectiveTheme !== 'day') setEffectiveTheme('day')
    }
  })

  // Sync effectiveTheme when manual mode changes or initially
  useEffect(() => {
    localStorage.setItem('theme-mode', themeMode)
    if (themeMode !== 'auto') {
      setEffectiveTheme(themeMode)
    } else {
      // Checks current scroll position on mount/switch back to auto
      setEffectiveTheme(window.scrollY > 150 ? 'night' : 'day')
    }
  }, [themeMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme)
  }, [effectiveTheme])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setThemeMode(prev => {
      if (prev === 'auto') return 'day'
      if (prev === 'day') return 'night'
      return 'auto'
    })
  }

  const getThemeIcon = () => {
    if (themeMode === 'auto') return <Sparkles size={18} />
    if (themeMode === 'day') return <Sun size={18} />
    return <Moon size={18} />
  }

  return (
    <div className="app">
      <motion.div
        className="progress-bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-primary)', zIndex: 2000, transformOrigin: '0%' }}
      />
      <div className="grid-background" />
      <CodeStarfield />
      <div className="noise-overlay" />

      <header className="header glass">
        <Logo />
        <nav className="nav-links">
          {location.pathname === '/' ? (
            <>
              <a href="#capabilities" className="nav-link">Capabilities</a>
              <a href="#projects" className="nav-link">Work</a>
            </>
          ) : (
            <button onClick={() => navigate('/')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button>
          )}
          <button onClick={() => navigate('/reads')} className={`nav-link ${location.pathname === '/reads' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Reading</button>
          <div className="divider-vertical" />

          <button onClick={toggleTheme} className="icon-btn" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginRight: '1rem' }}>
            {getThemeIcon()}
            {themeMode === 'auto' && <span className="mono" style={{ fontSize: '0.6rem' }}>AUTO</span>}
          </button>

          <a href="https://github.com/lenowng" target="_blank" className="nav-link"><Github size={18} /></a>
          <button className="btn-primary desktop-only">INIT_PROTOCOL</button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav-overlay glass"
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
              <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="nav-link mobile-link">HOME</button>
              <button onClick={() => { navigate('/reads'); setMobileMenuOpen(false); }} className="nav-link mobile-link">READING</button>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="nav-link mobile-link">WORK</a>
              <a href="https://github.com/lenowng" target="_blank" className="nav-link mobile-link">GITHUB</a>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono text-muted" style={{ fontSize: '0.8rem' }}>THEME: {themeMode.toUpperCase()}</span>
              <button onClick={toggleTheme} className="icon-btn" style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '50%', border: 'none', color: 'var(--text-primary)' }}>
                {getThemeIcon()}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="app-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{ paddingTop: '120px', minHeight: 'calc(100vh - 160px)' }}
        >
          <Outlet context={{ theme: effectiveTheme }} />
        </motion.main>
      </AnimatePresence>

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

export default Layout
