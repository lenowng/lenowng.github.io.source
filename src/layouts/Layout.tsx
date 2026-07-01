import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-surface-variant selection:text-on-surface">
      {/* Web Navigation */}
      <nav className="hidden md:flex justify-between items-start w-full px-margin-safe py-8 fixed top-0 z-50 bg-surface/80 backdrop-blur-md transition-all duration-500">
        <div 
          onClick={() => navigate('/')} 
          className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary cursor-pointer"
        >
          LEON.WONG
        </div>
        <div className="flex gap-8">
          <button 
            onClick={() => navigate('/')} 
            className={`font-label-caps text-label-caps font-bold pb-1 transition-transform duration-300 ease-in-out hover:translate-x-1 ${location.pathname === '/' ? 'text-primary border-b border-primary' : 'text-on-surface-variant border-none'}`}
          >
            WORK
          </button>
          <a href="#craft" className="font-label-caps text-label-caps text-on-surface-variant hover:translate-x-1 transition-transform duration-300 ease-in-out">
            CRAFT
          </a>
          <a href="#manifesto" className="font-label-caps text-label-caps text-on-surface-variant hover:translate-x-1 transition-transform duration-300 ease-in-out">
            MANIFESTO
          </a>
          <button 
            onClick={() => navigate('/reads')} 
            className={`font-label-caps text-label-caps font-bold pb-1 transition-transform duration-300 ease-in-out hover:translate-x-1 ${location.pathname === '/reads' ? 'text-primary border-b border-primary' : 'text-on-surface-variant border-none'}`}
          >
            DIGEST
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex justify-between items-start w-full px-margin-safe py-8 fixed top-0 z-50 bg-surface/90 backdrop-blur-md">
        <div 
          onClick={() => navigate('/')} 
          className="font-display-lg-mobile text-display-lg-mobile tracking-tighter text-primary cursor-pointer"
        >
          LEON.WONG
        </div>
        <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[100px] z-40 bg-surface/95 flex flex-col p-8 gap-8 border-t border-outline">
          <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-left font-display-lg-mobile text-3xl text-primary">WORK</button>
          <button onClick={() => { setMobileMenuOpen(false); document.getElementById('craft')?.scrollIntoView(); }} className="text-left font-display-lg-mobile text-3xl text-primary">CRAFT</button>
          <button onClick={() => { setMobileMenuOpen(false); document.getElementById('manifesto')?.scrollIntoView(); }} className="text-left font-display-lg-mobile text-3xl text-primary">MANIFESTO</button>
          <button onClick={() => { navigate('/reads'); setMobileMenuOpen(false); }} className="text-left font-display-lg-mobile text-3xl text-primary">DIGEST</button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center w-full px-margin-safe py-12 gap-8 bg-background border-t border-outline-variant" id="contact">
        <div className="font-label-caps text-label-caps text-primary">©{new Date().getFullYear()} LEON WONG. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          <a href="https://github.com/lenowng" target="_blank" rel="noreferrer" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-opacity opacity-70">GITHUB</a>
          <a href="https://www.linkedin.com/in/lenowng/" target="_blank" rel="noreferrer" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-opacity opacity-70">LINKEDIN</a>
          <a href="mailto:xyleze@gmail.com" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-opacity opacity-70">EMAIL</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
