# Technical Profile & Services Architecture

**Leon Wong**  
Solutions Architect & Full-Stack Engineer  
Kuala Lumpur, Malaysia (Global Remote)  
Contact: xyleze@gmail.com | GitHub: [github.com/lenowng](https://github.com/lenowng) | LinkedIn: [linkedin.com/in/lenowng](https://www.linkedin.com/in/lenowng/)

---

## 1. Executive Summary

I am a full-stack engineer and solutions architect helping growing commerce brands and tech companies build scalable digital products, high-performance storefronts, and automated backend systems.

My practice bridges three core disciplines:
1. **Shopify Themes & Store-Tailored Apps:** Custom Liquid 2.0 theme engineering, performance optimization, and custom Shopify apps built for specific client business requirements.
2. **Serverless Cloud Systems:** Cost-effective, auto-scaling backend APIs and asynchronous pipelines built on AWS.
3. **Workflow & Operations Automation:** Custom webhook microservices, Google Apps Script pipelines, cross-platform data synchronization, and internal tooling that eliminate repetitive manual data entry.

---

## 2. Core Service Pillars

### Pillar 1: Shopify Theme Engineering & Store-Tailored Apps
* **Core Objective:** Build high-performance Liquid themes and store-tailored custom apps designed around specific merchant business requirements.
* **Problems Solved:**
  - Generic themes that cannot accommodate unique product configurations, custom checkout logic, or brand guidelines.
  - App overload and performance drag from stacking multiple generic third-party Shopify apps.
  - Manual merchant workflows caused by off-the-shelf apps lacking specific business logic.
* **Key Deliverables:**
  - Custom Shopify Liquid 2.0 theme development and modular section architecture.
  - Store-tailored custom Shopify apps (embedded Admin apps, backend workers, and webhooks).
  - Custom POS UI extensions for specialized retail and point-of-sale checkout workflows.
  - Subscription integration (Recharge / custom selling plans), cart drawers, and bundle builders.
  - Theme performance optimization (CSS purging, asset minification, 90+ Core Web Vitals score).
* **Tech Stack:** Shopify Liquid, Node.js, TypeScript, React, Tailwind CSS, Shopify Admin GraphQL API, Storefront API, POS UI Extensions.

---

### Pillar 2: AWS Serverless Cloud Architecture
* **Core Objective:** Architect resilient, cost-efficient cloud backends that automatically scale to absorb flash-sale traffic spikes with zero server maintenance.
* **Problems Solved:**
  - Monolithic server crashes and downtime during marketing campaigns or product drops.
  - High fixed monthly server hosting bills for idle computing capacity.
  - Brittle synchronous API endpoints blocking frontend user interactions.
* **Key Deliverables:**
  - Auto-scaling microservices using AWS Lambda and API Gateway.
  - Single-table NoSQL database design using Amazon DynamoDB and Dynamoose.
  - Asynchronous background worker queues using AWS SQS and EventBridge.
  - Infrastructure as Code (IaC) configuration using Serverless Framework or AWS CDK.
  - CloudWatch metrics, structured logging, and automated failure alerts.
* **Tech Stack:** AWS Lambda, API Gateway, DynamoDB, SQS, EventBridge, Node.js, TypeScript, Serverless Framework.

---

### Pillar 3: Workflow & Operations Automation
* **Core Objective:** Connect fragmented platforms and automate manual operational tasks to save team hours and eliminate human data entry errors.
* **Problems Solved:**
  - Customer service and operations teams spending 20+ hours per week manually editing orders, updating tags, or re-entering data across systems.
  - Spreadsheets and Google Workspace documents disconnected from live databases and Shopify orders.
  - Inventory discrepancies between Shopify, warehouse management systems, and third-party marketplaces.
  - Unreliable webhook deliveries causing dropped orders or missing customer records.
* **Key Deliverables:**
  - Automated order lifecycle apps (such as dynamic delivery date rescheduling and automated tag pipelines).
  - Google Apps Script automation (automated Google Sheets pipelines, custom Workspace triggers, Gmail data ingestion, and REST API sync).
  - Idempotent webhook processing pipelines with automated retries and dead-letter queues.
  - Cross-platform data synchronization between Shopify, ERPs, CRMs, and relational databases.
  - Custom Atlassian Jira automations and ScriptRunner Groovy business logic scripts.
* **Tech Stack:** Node.js, TypeScript, AWS Lambda, Google Apps Script, Webhooks, REST/GraphQL APIs, Groovy (ScriptRunner / Jira).

---

### Pillar 4: Custom Full-Stack Web Applications
* **Core Objective:** Develop clean, focused internal software and client portals tailored to exact business workflows without recurring SaaS licensing fees.
* **Problems Solved:**
  - Off-the-shelf software forcing teams into inefficient workarounds.
  - Cluttered spreadsheets used as makeshift databases with zero access control or audit history.
  - Lack of visibility into operational metrics and order fulfillment status.
* **Key Deliverables:**
  - Production-ready web applications built with React, Next.js, or Hono.
  - Role-based authentication (JWT / OAuth) and user permission management.
  - Minimalist admin consoles with responsive data tables, filtering, and CSV/JSON export.
  - Documented, secure REST and GraphQL API endpoints.
* **Tech Stack:** React, Next.js, Hono, Node.js, TypeScript, Tailwind CSS, PostgreSQL, DynamoDB.

---

## 3. Technical Capabilities Matrix

| Domain | Primary Tools & Languages | Scope & Applications |
| :--- | :--- | :--- |
| **Frontend & UI** | TypeScript, React, Next.js, Tailwind CSS, Framer Motion | Component systems, responsive layouts, physics animations, state machines |
| **Commerce & Apps** | Shopify Liquid, Admin GraphQL API, Storefront API, POS UI | Custom themes, section builders, embedded apps, retail POS extensions |
| **Backend & Cloud** | Node.js, TypeScript, Hono, AWS Lambda, API Gateway | Lightweight edge APIs, serverless microservices, REST & GraphQL endpoints |
| **Databases & Queues** | DynamoDB (Single-Table), PostgreSQL, AWS SQS, EventBridge | High-throughput data storage, asynchronous queues, event-driven pipelines |
| **Automation & Tooling** | Google Apps Script, Webhook pipelines, Groovy (Jira), Git, CI/CD | Google Workspace automation, cross-platform syncing, Jira automation, CI/CD |

---

## 4. Featured Project Case Studies

### 1. Herbology.com.my Storefront Refactor
* **Category:** Clean Beauty Storefront Engineering
* **Challenge:** Legacy theme bloat and poor mobile conversion on a high-growth beauty brand with complex subscription requirements.
* **Solution:** Rebuilt the storefront from scratch using modular Shopify Liquid 2.0 sections, Tailwind CSS, and lightweight Alpine.js components. Integrated direct Recharge API subscription logic into product pages.
* **Outcomes:**
  - Consistent 90+ Lighthouse mobile performance score.
  - 12kb gzipped CSS payload via targeted PostCSS utility purging.
  - Streamlined subscription checkout resulting in a 3.2x increase in customer retention.

### 2. Shopify Order Rescheduling Admin App
* **Category:** Operations & E-Commerce Automation
* **Challenge:** Merchants were losing hours weekly managing manual customer requests to change order delivery schedules.
* **Solution:** Developed an embedded Shopify Admin application with an interactive modal calendar. Changing a date automatically updates order metafields and writes structured tags to trigger downstream fulfillment holds.
* **Outcomes:**
  - 100% elimination of manual date transcription errors.
  - Direct integration with warehouse fulfillment pipelines via webhook updates.

### 3. Custom POS UI Extensions & Retail Workflows
* **Category:** Shopify App & POS Engineering
* **Challenge:** Retail staff needed customized order tagging, customer verification, and delivery notes directly at the retail point-of-sale checkout.
* **Solution:** Built custom Shopify POS UI Extensions connected to a private backend API, allowing in-store staff to trigger custom backend workflows without leaving the POS terminal.
* **Outcomes:**
  - Streamlined in-store checkout process for omnichannel fulfillment.
  - Instant synchronization between physical retail sales and online inventory rules.

### 4. Automated Logistics Email Parser & ERP Sync
* **Category:** Cloud Microservices & Process Automation
* **Challenge:** Operations staff manually copied tracking numbers and invoice data from supplier emails into an ERP for over 40 hours each week.
* **Solution:** Configured AWS SES to ingest supplier emails into Amazon S3, triggering an AWS Lambda parser that extracts tracking numbers and order IDs via regex and PDF parsing, pushing updates directly to the ERP REST API.
* **Outcomes:**
  - 40 hours per week saved in manual operational overhead.
  - 99.9% data extraction accuracy.
  - Less than $5/month total AWS running costs.

---

## 5. Standard Engagement Models

| Scope Tier | Typical Timeline | Common Focus Areas |
| :--- | :--- | :--- |
| **Sprint Automation** | 1 to 2 Weeks | Google Apps Script pipelines, webhook microservices, order rescheduling tools, data sync scripts, Jira Groovy automation |
| **Custom Store Apps** | 2 to 3 Weeks | Embedded Shopify Admin apps, POS UI extensions, custom metafield & tag pipelines |
| **Storefront Overhaul** | 2 to 4 Weeks | Custom Liquid 2.0 theme engineering, mobile speed optimization, subscription checkout integration |
| **Full-Stack Application** | 3 to 6 Weeks | Tailored internal tools, custom merchant consoles, customer portals (React / Next.js / Hono) |