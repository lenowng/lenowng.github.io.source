import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ShaderBackground from '../components/ShaderBackground'

const HomePage = () => {

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
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

  return (
    <>
      {/* Hero Section */}
      <header className="relative w-full h-screen flex flex-col justify-center px-margin-safe overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <ShaderBackground />
        </div>
        
        <div className="relative z-10 fade-in-up">
          <h1 className="font-display-lg text-display-lg md:text-[120px] text-primary leading-none tracking-tighter mb-8">
            ARCHITECTING<br />SCALE
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Scalable automation systems engineered with architectural precision. The intersection of robust cloud infrastructure and minimalist design.
          </p>
        </div>
        
        <div className="absolute bottom-12 left-margin-safe flex items-center gap-4 fade-in-up" style={{ transitionDelay: '0.3s' }}>
          <span className="block w-12 h-fine-line bg-outline"></span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">SCROLL TO EXPLORE</span>
        </div>
      </header>

      <main className="w-full">
        {/* DIGEST Section */}
        <section className="pt-section-gap pb-element-gap px-margin-safe relative" id="digest">
          <div className="absolute top-0 left-margin-safe right-margin-safe h-fine-line bg-outline-variant"></div>
          <h2 className="font-headline-md text-headline-md text-primary mb-24 fade-in-up">01. THE DIGEST</h2>
          
          <div className="flex flex-col gap-8 w-full md:w-3/4 mx-auto fade-in-up">
            {engineeringLogs.map((log, i) => (
              <div key={i} className="bracket-border hover:bg-surface-container-low transition-colors duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-2">[{log.date}]</div>
                    <h3 className="font-body-lg text-body-lg text-primary mb-2 font-semibold">{log.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">{log.tldr}</p>
                  </div>
                  <Link to={log.link} className="font-label-caps text-label-caps text-primary border-b border-outline pb-1 hover:text-secondary hover:border-secondary transition-colors inline-flex items-center gap-2 mt-4 md:mt-0">
                    READ <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK Section */}
        <section className="pt-section-gap pb-element-gap px-margin-safe relative" id="work">
          <div className="absolute top-0 left-margin-safe right-margin-safe h-fine-line bg-outline-variant"></div>
          <h2 className="font-headline-md text-headline-md text-primary mb-24 fade-in-up">02. WORK</h2>
          
          <div className="flex flex-col gap-32">
            {/* Project 1 */}
            <article className="fade-in-up organic-offset-1 w-full md:w-2/3">
              <div className="mb-element-gap">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Enterprise Scale Commerce" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 ease-in-out object-cover aspect-[4/3]"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-t border-outline-variant pt-8">
                <div>
                  <h3 className="font-body-lg text-body-lg text-primary mb-2 font-semibold">ENTERPRISE SCALE COMMERCE</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                    Re-architecting a legacy liquid storefront for a global fashion brand. Complete migration to Hydrogen/Oxygen for sub-second performance.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-label-caps text-label-caps text-on-surface-variant">METRICS</div>
                  <div className="font-body-sm text-primary">+48% CONVERSION LIFT</div>
                  <div className="font-body-sm text-primary">-1.2s LCP REDUCTION</div>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="fade-in-up organic-offset-3 w-full md:w-1/2">
              <div className="mb-element-gap">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
                  alt="Herbology Architecture" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 ease-in-out object-cover aspect-[3/4]"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 bracket-border pt-8">
                <div>
                  <h3 className="font-body-lg text-body-lg text-primary mb-2 font-semibold">
                    <a href="https://herbology.com.my/" target="_blank" rel="noreferrer" className="hover:underline">HERBOLOGY REFACTOR</a>
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                    Full-stack Shopify overhaul for a premium clean beauty brand. Custom Liquid theme implementation with integrated subscription logic.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-label-caps text-label-caps text-on-surface-variant">STACK</div>
                  <div className="font-body-sm text-primary">Liquid, Alpine.js, Tailwind</div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CRAFT Section */}
        <section className="pt-section-gap pb-element-gap px-margin-safe relative" id="craft">
          <div className="absolute top-0 left-margin-safe right-margin-safe h-fine-line bg-outline-variant"></div>
          <div className="flex flex-col md:flex-row gap-element-gap justify-between items-start">
            <h2 className="font-headline-md text-headline-md text-primary fade-in-up sticky top-32">03. CRAFT</h2>
            <div className="w-full md:w-2/3 flex flex-col gap-16">
              
              <div className="fade-in-up border-l border-outline-variant pl-8 py-4 relative">
                <span className="absolute -left-[5px] top-4 w-2 h-2 bg-primary rounded-full"></span>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">OPERATIONAL ARCHITECTURE</h3>
                <p className="font-body-lg text-[24px] md:text-[32px] text-primary leading-tight tracking-tight">
                  Bridging the gap between physical logistics and technical execution. Engineering scalable AWS infrastructure that handles high-volume traffic while fiercely optimizing for cost-efficiency.
                </p>
              </div>

              <div className="fade-in-up border-l border-outline-variant pl-8 py-4 relative">
                <span className="absolute -left-[5px] top-4 w-2 h-2 bg-surface-variant rounded-full"></span>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">SYSTEM RESILIENCE</h3>
                <p className="font-body-lg text-[24px] md:text-[32px] text-primary leading-tight tracking-tight">
                  Architecting self-healing, auto-scaling patterns that guarantee continuous uptime. Defining robust automated deployments and Infrastructure-as-a-Code to ensure stability across complex environments.
                </p>
              </div>

              <div className="fade-in-up border-l border-outline-variant pl-8 py-4 relative">
                <span className="absolute -left-[5px] top-4 w-2 h-2 bg-outline-variant rounded-full"></span>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4">AI-AUGMENTED AUTOMATION</h3>
                <p className="font-body-lg text-[24px] md:text-[32px] text-primary leading-tight tracking-tight">
                  Rapidly deploying bespoke business applications using agentic development workflows. Designing sophisticated automations and intelligence pipelines to eliminate manual overhead and eradicate bottlenecks.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* MANIFESTO Section */}
        <section className="py-section-gap px-margin-safe relative bg-surface-container-low" id="manifesto">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-12 fade-in-up" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>architecture</span>
            <p className="font-display-lg md:text-[56px] text-display-lg text-primary leading-tight tracking-tighter mb-12 fade-in-up">
              Automation is about achieving maximum impact with minimal overhead. It is the practice of engineering lean systems that handle complexity while remaining fiercely frugal with your project budget, ensuring you scale efficiently without unnecessary costs.
            </p>
            <div className="h-16 w-fine-line bg-outline fade-in-up"></div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
