import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import ContactModal from '../components/ContactModal'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactPresetScope, setContactPresetScope] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenContact = (scope?: string) => {
    setContactPresetScope(scope)
    setContactModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 antialiased overflow-x-hidden selection:bg-zinc-950 selection:text-white flex flex-col justify-between">
      
      {/* Desktop Unified Floating Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-margin-safe py-4 flex items-center justify-between">
          
          {/* Brand Mark with Integrated Location Stamp */}
          <div className="flex items-center gap-4">
            <BrandLogo 
              size="md" 
              onClick={() => {
                if (location.pathname !== '/') navigate('/')
                else window.scrollTo({ top: 0, behavior: 'smooth' })
              }} 
            />
            <span className="hidden lg:inline-block text-[11px] font-label-caps text-zinc-400 tracking-wider border-l border-zinc-200 pl-4">
              SOLUTIONS ARCHITECTURE &amp; AUTOMATION
            </span>
          </div>

          {/* Navigation Links & Action */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => {
                if (location.pathname !== '/') navigate('/')
                setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }} 
              className="font-label-caps text-xs text-zinc-600 hover:text-zinc-950 transition-colors uppercase tracking-wider"
            >
              Services
            </button>
            <button 
              onClick={() => {
                if (location.pathname !== '/') navigate('/')
                setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }} 
              className="font-label-caps text-xs text-zinc-600 hover:text-zinc-950 transition-colors uppercase tracking-wider"
            >
              Work
            </button>
            <button 
              onClick={() => {
                if (location.pathname !== '/') navigate('/')
                setTimeout(() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }} 
              className="font-label-caps text-xs text-zinc-600 hover:text-zinc-950 transition-colors uppercase tracking-wider"
            >
              Stack
            </button>
            <button 
              onClick={() => navigate('/reads')} 
              className={`font-label-caps text-xs transition-colors uppercase tracking-wider ${location.pathname === '/reads' ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-950'}`}
            >
              Digest
            </button>
            <button
              onClick={() => handleOpenContact()}
              className="font-label-caps text-xs text-white bg-zinc-950 px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-all uppercase tracking-wider font-medium shadow-sm"
            >
              Initiate Project
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => handleOpenContact()}
              className="font-label-caps text-[10px] text-white bg-zinc-950 px-3 py-1.5 rounded-full"
            >
              Hire
            </button>
            <button className="p-1 text-zinc-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[56px] z-40 bg-white/98 flex flex-col p-8 gap-6 md:hidden">
          <button onClick={() => { navigate('/'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('services')?.scrollIntoView(), 100); }} className="text-left font-display-lg-mobile text-2xl text-zinc-950">Services</button>
          <button onClick={() => { navigate('/'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('work')?.scrollIntoView(), 100); }} className="text-left font-display-lg-mobile text-2xl text-zinc-950">Work</button>
          <button onClick={() => { navigate('/'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('stack')?.scrollIntoView(), 100); }} className="text-left font-display-lg-mobile text-2xl text-zinc-950">Stack</button>
          <button onClick={() => { navigate('/reads'); setMobileMenuOpen(false); }} className="text-left font-display-lg-mobile text-2xl text-zinc-950">Digest</button>
          <button onClick={() => { setMobileMenuOpen(false); handleOpenContact(); }} className="font-label-caps text-xs text-white bg-zinc-950 py-3.5 rounded-xl text-center mt-4">Initiate Project</button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full flex-grow">
        <Outlet context={{ handleOpenContact }} />
      </main>

      {/* Monumental Magazine-Grade Studio Footer */}
      <footer className="w-full bg-zinc-50 border-t border-zinc-200 relative z-10 pt-20 pb-12" id="contact">
        <div className="max-w-7xl mx-auto px-margin-safe">
          
          {/* Top Multi-Column Studio Index Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-200">
            
            {/* Column 1: Studio Info (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-950"></span>
                <span className="font-label-caps text-xs text-zinc-950 font-semibold tracking-wider">
                  STUDIO AVAILABILITY: ACCEPTING NEW WORK
                </span>
              </div>
              <p className="font-body-sm text-sm text-zinc-600 font-light leading-relaxed max-w-sm">
                An independent technical practice engineering high-growth Shopify storefronts, resilient AWS cloud systems, and automated operational pipelines.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleOpenContact()}
                  className="font-label-caps text-xs text-zinc-950 border border-zinc-300 bg-white hover:bg-zinc-950 hover:text-white px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2 font-medium"
                >
                  Initiate Discussion <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

            {/* Column 2: Index Navigation (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="font-label-caps text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-4">
                NAVIGATION
              </div>
              <ul className="space-y-2.5 text-sm font-body-sm text-zinc-600">
                <li><button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-zinc-950 transition-colors">Services &amp; Scope</button></li>
                <li><button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-zinc-950 transition-colors">Selected Case Studies</button></li>
                <li><button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-zinc-950 transition-colors">Technical Capabilities</button></li>
                <li><button onClick={() => navigate('/reads')} className="hover:text-zinc-950 transition-colors">Written Digest</button></li>
              </ul>
            </div>

            {/* Column 3: Connect & Coordinates (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="font-label-caps text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-4">
                CONNECT &amp; DIRECT
              </div>
              <ul className="space-y-2.5 text-sm font-body-sm text-zinc-600">
                <li><a href="mailto:xyleze@gmail.com" className="hover:text-zinc-950 transition-colors">xyleze@gmail.com</a></li>
                <li><a href="https://github.com/lenowng" target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">github.com/lenowng</a></li>
                <li><a href="https://www.linkedin.com/in/lenowng/" target="_blank" rel="noreferrer" className="hover:text-zinc-950 transition-colors">linkedin.com/in/lenowng</a></li>
                <li className="text-zinc-400 text-xs pt-2">Kuala Lumpur, Malaysia — Global Remote</li>
              </ul>
            </div>

          </div>

          {/* Monumental Brand Typography Anchor */}
          <div className="pt-16 pb-8">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group flex items-baseline justify-between select-none"
            >
              <div className="font-display-lg text-6xl sm:text-8xl md:text-9xl tracking-tighter text-zinc-950 font-normal group-hover:text-zinc-700 transition-colors">
                LEON<span className="text-zinc-400">.</span>WONG
              </div>
              <span className="font-label-caps text-xs text-zinc-400 group-hover:text-zinc-950 transition-colors hidden sm:block">
                BACK TO TOP ↑
              </span>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-200 text-xs font-label-caps text-zinc-400 gap-4">
            <div>
              ©{new Date().getFullYear()} LEON.WONG. ALL RIGHTS RESERVED.
            </div>
            <div>
              ENGINEERED WITH REACT, TAILWIND &amp; TYPESCRIPT
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        presetScope={contactPresetScope}
      />
    </div>
  )
}

export default Layout
