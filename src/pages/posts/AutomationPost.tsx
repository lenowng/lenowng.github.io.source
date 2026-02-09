import React from 'react';
import BlogPostLayout from '../../layouts/BlogPostLayout';

const AutomationPost: React.FC = () => {
  return (
    <BlogPostLayout
      title="Automating the Mundane"
      date="2023-11-20"
      readTime="10 min read"
      tags={['Automation', 'Serverless', 'AWS']}
    >
      <p><strong>Problem:</strong> A logistics client was spending 40+ hours per week manually copy-pasting tracking numbers from supplier emails into their ERP system. This was error-prone and a massive drain on resources.</p>

      <h2>The Trap of Manual Processes</h2>
      <p>Businesses often tolerate manual workflows because "it works." But manual data entry is a ticking time bomb. One typo in a tracking number means:</p>
      <ul>
        <li>Angry customers calling support.</li>
        <li>Refund requests due to "lost" packages.</li>
        <li>Employee burnout.</li>
      </ul>

      <h2>The Solution: Serverless Glue</h2>
      <p>I built an automated pipeline using <strong>AWS Lambda</strong> and <strong>SES (Simple Email Service)</strong>.</p>

      <h3>Step 1: Ingestion</h3>
      <p>An SES rule catches emails from specific supplier domains and dumps the raw MIME content into an S3 bucket.</p>

      <h3>Step 2: Parsing (Node.js Lambda)</h3>
      <p>An S3 event triggers a Lambda function. This function uses regex to extract tracking numbers, order IDs, and carriers from the email body (even from PDFs attachments using <code>pdf-parse</code>).</p>

      <pre><code>{`// Parsing logic simplified
const trackingRegex = /Tracking Number: ([A-Z0-9]+)/;
const match = emailBody.match(trackingRegex);
if (match) {
    const trackingNo = match[1];
    await updateOrder(orderId, trackingNo);
}`}</code></pre>

      <h3>Step 3: Execution</h3>
      <p>The extracted data is pushed directly to the ERP's REST API. Slack notifications are sent for both success and failure (e.g., unmatched order ID).</p>

      <h2>Results</h2>
      <ul>
        <li><strong>40 Hours/Week Saved:</strong> The person doing data entry was redeployed to customer success.</li>
        <li><strong>99.9% Accuracy:</strong> No more typos.</li>
        <li><strong>Cost:</strong> Less than $5/month on AWS.</li>
      </ul>

      <p>Automation isn't just about speed—it's about removing the mundane so humans can focus on value.</p>
    </BlogPostLayout>
  );
};

export default AutomationPost;
