import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ArrowRight, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from '../components/BrandLogo'
import ContactModal from '../components/ContactModal'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactPresetScope, setContactPresetScope] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const location = useLocation()

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleOpenContact = (scope?: string) => {
    setContactPresetScope(scope)
    setContactModalOpen(true)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  const handleNavClick = (sectionId?: string, path: string = '/') => {
    setMobileMenuOpen(false)
    if (path !== location.pathname) {
      navigate(path)
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 antialiased overflow-x-hidden selection:bg-zinc-950 selection:text-white flex flex-col justify-between">
      
      {/* Desktop & Mobile Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-zinc-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-margin-safe py-3.5 sm:py-4 flex items-center justify-between">
          
          {/* Brand Mark */}
          <div className="flex items-center gap-3 sm:gap-4">
            <BrandLogo 
              size="md" 
              showIcon={false}
              onClick={() => handleNavClick(undefined, '/')} 
            />
            <span className="hidden lg:inline-block text-[11px] font-label-caps text-zinc-400 tracking-wider border-l border-zinc-200 pl-4">
              SOLUTIONS ARCHITECTURE &amp; AUTOMATION
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('services')} 
              className="font-label-caps text-xs text-zinc-600 hover:text-zinc-950 transition-colors uppercase tracking-wider"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('work')} 
              className="font-label-caps text-xs text-zinc-600 hover:text-zinc-950 transition-colors uppercase tracking-wider"
            >
              Work
            </button>
            <button 
              onClick={() => handleNavClick('stack')} 
              className="font-label-caps text-xs text-zinc-600 hover:text-zinc-950 transition-colors uppercase tracking-wider"
            >
              Stack
            </button>
            <button 
              onClick={() => handleNavClick(undefined, '/reads')} 
              className={`font-label-caps text-xs transition-colors uppercase tracking-wider ${location.pathname === '/reads' ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
            >
              Digest
            </button>
            <button
              onClick={() => handleOpenContact()}
              className="font-label-caps text-xs text-white bg-zinc-950 px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-all uppercase tracking-wider font-medium shadow-sm active:scale-95"
            >
              Start a Project
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2.5">
            <button
              onClick={() => handleOpenContact()}
              className="font-label-caps text-[11px] text-white bg-zinc-950 px-3.5 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
            >
              Contact
            </button>
            <button 
              aria-label="Toggle menu"
              className="p-2 -mr-1 text-zinc-900 rounded-full hover:bg-zinc-100 active:scale-90 transition-all" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[53px] z-40 bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
          >
            <div className="space-y-6 pt-4">
              <div className="font-label-caps text-[10px] text-zinc-400 tracking-widest uppercase pb-3 border-b border-zinc-100">
                NAVIGATION
              </div>
              
              <nav className="flex flex-col space-y-4">
                {[
                  { num: '01', label: 'Services & Scope', action: () => handleNavClick('services') },
                  { num: '02', label: 'Selected Work', action: () => handleNavClick('work') },
                  { num: '03', label: 'Technical Stack', action: () => handleNavClick('stack') },
                  { num: '04', label: 'Written Digest', action: () => handleNavClick(undefined, '/reads') }
                ].map((item, idx) => (
                  <motion.button
                    key={item.num}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                    onClick={item.action}
                    className="flex items-baseline justify-between text-left py-2 group"
                  >
                    <span className="font-display-lg text-2xl text-zinc-950 group-hover:text-zinc-600 transition-colors">
                      {item.label}
                    </span>
                    <span className="font-label-caps text-xs text-zinc-400 font-mono">
                      {item.num}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Info */}
            <div className="pt-8 border-t border-zinc-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-label-caps text-[10px] text-zinc-600 tracking-wider font-semibold">
                  AVAILABLE FOR NEW PROJECTS
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-zinc-500 font-body-sm">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-zinc-400" /> xyleze@gmail.com
                </span>
                <span>Kuala Lumpur (Remote)</span>
              </div>

              <button 
                onClick={() => handleOpenContact()} 
                className="w-full font-label-caps text-xs text-white bg-zinc-950 py-4 rounded-2xl text-center flex items-center justify-center gap-2 font-medium shadow-md active:scale-[0.98] transition-transform"
              >
                Start a Project <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full flex-grow">
        <Outlet context={{ handleOpenContact }} />
      </main>

      {/* Clean Studio Footer */}
      <footer className="w-full bg-zinc-50 border-t border-zinc-200 relative z-10 pt-16 sm:pt-20 pb-12" id="contact">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-margin-safe">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 sm:pb-16 border-b border-zinc-200">
            
            {/* Column 1: Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-label-caps text-xs text-zinc-950 font-semibold tracking-wider">
                  AVAILABLE FOR NEW PROJECTS
                </span>
              </div>
              <p className="font-body-sm text-sm text-zinc-600 font-light leading-relaxed max-w-sm">
                Full-stack engineer and solutions architect helping growing businesses build fast Shopify stores, serverless AWS backends, and internal automation tools.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleOpenContact()}
                  className="font-label-caps text-xs text-zinc-950 border border-zinc-300 bg-white hover:bg-zinc-950 hover:text-white px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2 font-medium active:scale-95"
                >
                  Get in Touch <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="md:col-span-3 space-y-3">
              <div className="font-label-caps text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-4">
                NAVIGATION
              </div>
              <ul className="space-y-2.5 text-sm font-body-sm text-zinc-600">
                <li><button onClick={() => handleNavClick('services')} className="hover:text-zinc-950 transition-colors">Services &amp; Scope</button></li>
                <li><button onClick={() => handleNavClick('work')} className="hover:text-zinc-950 transition-colors">Selected Work</button></li>
                <li><button onClick={() => handleNavClick('stack')} className="hover:text-zinc-950 transition-colors">Technical Stack</button></li>
                <li><button onClick={() => handleNavClick(undefined, '/reads')} className="hover:text-zinc-950 transition-colors">Written Digest</button></li>
              </ul>
            </div>

            {/* Column 3: Coordinates */}
            <div className="md:col-span-4 space-y-3">
              <div className="font-label-caps text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-4">
                CONNECT
              </div>
              <ul className="space-y-2.5 text-sm font-body-sm text-zinc-600">
                <li><a href="mailto:xyleze@gmail.com" className="hover:text-zinc-950 transition-colors">xyleze@gmail.com</a></li>
                <li><a href="https://github.com/lenowng" target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">github.com/lenowng</a></li>
                <li><a href="https://www.linkedin.com/in/lenowng/" target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">linkedin.com/in/lenowng</a></li>
                <li className="text-zinc-400 text-xs pt-2">Kuala Lumpur, Malaysia (Remote)</li>
              </ul>
            </div>

          </div>

          {/* Footer Brand Anchor (Mirrored) */}
          <div className="pt-12 sm:pt-16 pb-8">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group flex items-baseline justify-between select-none"
            >
              <BrandLogo 
                size="monumental" 
                variant="mirrored" 
                showIcon={false}
              />
              <span className="font-label-caps text-[10px] sm:text-xs text-zinc-400 group-hover:text-zinc-950 transition-colors hidden sm:block">
                BACK TO TOP ↑
              </span>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-zinc-200 text-[11px] sm:text-xs font-label-caps text-zinc-400 gap-2 sm:gap-4">
            <div>
              ©{new Date().getFullYear()} LEON WONG. ALL RIGHTS RESERVED.
            </div>
            <div>
              BUILT WITH REACT, TAILWIND &amp; TYPESCRIPT
            </div>
          </div>

        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        presetScope={contactPresetScope}
      />
    </div>
  )
}

export default Layout
