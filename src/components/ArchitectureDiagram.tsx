import { motion } from 'framer-motion'
import { GitBranch, Box, Globe, Code, Shield, Activity } from 'lucide-react'

const ArchitectureDiagram = () => {
  // Pipeline Steps
  const steps = [
    { id: 'source', label: 'SOURCE_CORE', sub: 'Private Repo', icon: <Code size={16} />, color: '#fff' },
    { id: 'build', label: 'CI_PIPELINE', sub: 'Vite Build', icon: <Box size={16} />, color: '#FFBD2E' },
    { id: 'deploy', label: 'DEPLOY_KEY', sub: 'SSH Auth', icon: <Shield size={16} />, color: '#FF5F56' },
    { id: 'dist', label: 'DIST_LAYER', sub: 'Public Repo', icon: <GitBranch size={16} />, color: '#27C93F' },
    { id: 'edge', label: 'GLOBAL_CDN', sub: 'GitHub Pages', icon: <Globe size={16} />, color: '#00a8ff' }
  ]

  return (
    <div style={{ width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
      }}>
        {steps.map((step, i) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>

            {/* Node */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${step.color}40`,
                padding: '1rem',
                borderRadius: '8px',
                minWidth: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative'
              }}
            >
              <div style={{ color: step.color, marginBottom: '4px' }}>{step.icon}</div>
              <div className="mono" style={{ fontSize: '0.65rem', color: step.color, fontWeight: 700 }}>{step.label}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{step.sub}</div>

              {/* Ping Animation */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: step.color
                }}
              />
            </motion.div>

            {/* Arrow Connector (except last item) */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '40px', opacity: 1 }}
                transition={{ delay: (i * 0.2) + 0.1, duration: 0.4 }}
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${step.color}, ${steps[i + 1].color})`,
                  margin: '0 0.5rem',
                  position: 'relative',
                  opacity: 0.5
                }}
              >
                <div style={{ position: 'absolute', right: 0, top: '-3px', width: '0', height: '0', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `6px solid ${steps[i + 1].color}` }} />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px dashed rgba(255,255,255,0.1)',
        width: '100%',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', background: '#27C93F', borderRadius: '50%' }} />
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>STATUS: ONLINE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={10} className="text-muted" />
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>LATENCY: 24ms</span>
          </div>
        </div>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
          ARCH_VER_2.4.0
        </div>
      </div>

    </div>
  )
}

export default ArchitectureDiagram
