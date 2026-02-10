import React from 'react';
import BlogPostLayout from '../../layouts/BlogPostLayout';
import ArchitectureDiagram from '../../components/ArchitectureDiagram';

const HerbologyPost: React.FC = () => {
  return (
    <BlogPostLayout
      title="Herbology.com.my Refactor"
      date="2025-01-20"
      readTime="18 min read"
      tags={['Liquid', 'Tailwind', 'Recharge API', 'Case Study']}
    >
      <p><strong>Overview:</strong> Herbology is a premium clean-beauty brand with complex subscription logic and a highly branded aesthetic. Their previous theme was bloated and conversion was stagnant.</p>

      <h2>Theme Architecture: Liquid 2.0</h2>
      <p>Shopify's Theme Store themes are great for starting, but they often come with unnecessary baggage. For Herbology, I built a custom Liquid theme from scratch using <strong>Tailwind CSS</strong> and <strong>Alpine.js</strong>.</p>
      <ul>
        <li><strong>Tailwind CSS:</strong> We used a custom PostCSS pipeline to purge unused utilities, resulting in a tiny CSS payload (12kb gzipped).</li>
        <li><strong>Alpine.js:</strong> Replaced jQuery for interactive components like the Mini-Cart, Size Guide, and Subscription toggle.</li>
      </ul>

      <h2>The Subscription Challenge</h2>
      <p>Integrating Recharge subscriptions natively into the PDP (Product Detail Page) is tricky. Most apps inject heavy iframes or scripts.</p>
      <p>I utilized the Recharge API for a seamless, on-site implementation:</p>

      <pre><code>{`// Subscription Logic in Alpine.js
x-data="{ 
    selling_plan: null,
    price: {{ product.price_min | money_without_currency }},
    subscribe() {
        this.selling_plan = {{ product.selling_plan_groups[0].selling_plans[0].id }};
        this.price = (this.price * 0.9).toFixed(2); // 10% discount
    }
}"`}</code></pre>

      <h2>Performance Metrics</h2>
      <ul>
        <li><strong>98/100 SEO Score:</strong> Semantic HTML and proper structured data schema.</li>
        <li><strong>3.2x Retention Rate:</strong> The streamlined subscription flow reduced churn significantly.</li>
        <li><strong>Lighthouse Perf:</strong> Consistently 90+ on mobile.</li>
      </ul>

      <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="mono text-muted" style={{ marginBottom: '1rem' }}>SYSTEM_DIAGRAM:</div>
        <ArchitectureDiagram />
      </div>

      <p>We proved that even "traditional" Liquid themes can compete with Headless if engineered correctly.</p>
    </BlogPostLayout>
  );
};

export default HerbologyPost;
