import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Database } from 'lucide-react';

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="architecture-diagram" style={{
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '2rem',
      padding: '1rem'
    }}>
      {/* Node 1: Shopify */}
      <motion.div
        className="node glass"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid var(--accent-primary-dim)',
          width: 'fit-content'
        }}
      >
        <div style={{ color: 'var(--accent-primary)' }}><ShoppingCart size={20} /></div>
        <div className="mono" style={{ fontSize: '0.7rem' }}>
          <div style={{ opacity: 0.5 }}>SOURCE</div>
          <div>SHOPIFY_WEBHOOK</div>
        </div>
      </motion.div>

      {/* Connector 1 */}
      <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)', marginLeft: '25px', opacity: 0.3 }} />

      {/* Node 2: Nightr Runtime */}
      <motion.div
        className="node glass"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid var(--accent-primary)',
          boxShadow: 'var(--glow-accent)',
          width: 'fit-content',
          background: 'var(--accent-primary-dim)'
        }}
      >
        <div style={{ color: 'var(--accent-primary)' }}><Zap size={20} /></div>
        <div className="mono" style={{ fontSize: '0.7rem' }}>
          <div style={{ color: 'var(--accent-primary)' }}>NIGHTR_RUNTIME</div>
          <div style={{ fontSize: '0.6rem', opacity: 0.8 }}>AWS_LAMBDA // NODE_20.X</div>
        </div>
      </motion.div>

      {/* Connector 2 */}
      <div style={{ height: '30px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)', marginLeft: '25px', opacity: 0.3 }} />

      {/* Node 3: Database */}
      <motion.div
        className="node glass"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          width: 'fit-content'
        }}
      >
        <div style={{ color: 'var(--text-muted)' }}><Database size={20} /></div>
        <div className="mono" style={{ fontSize: '0.7rem' }}>
          <div style={{ opacity: 0.5 }}>PERSISTENCE</div>
          <div>POSTGRES_REDUNDANT</div>
        </div>
      </motion.div>

      {/* Pulse Line */}
      <motion.div
        style={{
          position: 'absolute',
          left: '25px',
          top: '45px',
          width: '2px',
          height: '180px',
          background: 'var(--accent-primary)',
          zIndex: -1,
          transformOrigin: 'top'
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Moving Signal */}
      <motion.div
        style={{
          position: 'absolute',
          left: '23px',
          width: '6px',
          height: '20px',
          background: 'var(--accent-primary)',
          borderRadius: '10px',
          boxShadow: '0 0 15px var(--accent-primary)',
          zIndex: 0
        }}
        animate={{
          top: [45, 225],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default ArchitectureDiagram;
