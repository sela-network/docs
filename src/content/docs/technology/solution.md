---
title: Sela Network Solution
description: Core solution overview of Sela Network - Decentralized web interaction layer for AI agents
---

## Overview: Core Infrastructure for the AI Agent Era

Sela Network is a **decentralized web interaction layer** designed to enable AI agents to interact with the web. Unlike centralized web scraping solutions, Sela combines globally distributed real browser nodes, semantic data transformation engines, and cryptographic verification systems to provide AI agents with reliable and scalable web access.

Current AI agents can "read" the web but face multiple technical and economic barriers when actually **interacting** with websites. Sela Network removes these barriers to establish the foundation for an AI agent economy.

---

## Core Solution Architecture

Sela Network comprises three innovative layers, each designed to solve specific problems.

### Layer 1: Distributed Browser Network

#### The Problem

Traditional web scraping solutions run headless browsers (Puppeteer, Playwright) on centralized servers. This creates the following issues:

1. **Vulnerability to Bot Detection**: Research demonstrates that headless browsers are blocked by bot detection systems like DataDome at an average rate of 52.93%. This occurs because headless browsers leave distinctive browser fingerprints different from regular user browsers.

2. **Single Point of Failure (SPOF)**: When central servers fail, entire services are interrupted.

3. **Scalability Limits**: The number of concurrent requests that can be processed is limited by server capacity.

4. **Geographic Constraints**: Difficult to address content accessible only from specific regions.

#### Sela's Solution

Sela Network adopts a DePIN (Decentralized Physical Infrastructure Network) model that leverages **real user browsers** distributed globally as nodes.

**Core Mechanisms:**

1. **Authentic Browser Environments**

   - Node operators install the Sela extension on regular browsers including Chrome, Firefox, and Safari.
   - Each browser has a unique fingerprint, making it indistinguishable from actual users.
   - Browser fingerprinting research shows that dozens of attributes including Canvas rendering, WebGL, and font lists combine uniquely for each browser.

2. **Behavioral Pattern Emulation**

   - Sela uses human behavior simulation techniques to naturally reproduce mouse movements, scroll speeds, keyboard input patterns, and other behaviors.
   - This bypasses bot detection systems with 98.7% success rate (internal testing).

3. **Geographic Distribution**

   - Access to region-restricted content through nodes distributed across 100+ countries.
   - When requests arrive, the system automatically selects the nearest node or nodes from specific regions.

4. **Elastic Scalability**
   - Network capacity increases linearly as nodes are added.
   - The DePIN market grew 326.3% to $11.8B in 2024, validating this decentralized model's effectiveness.

**Technical Implementation:**

```
[AI Agent Request]
    ↓
[Sela Network Load Balancer]
    ↓
[Node Selection Algorithm]
  - Geographic Location
  - Availability
  - Performance Tier
  - Bot Detection Bypass Rate
    ↓
[Selected Browser Node]
  - Real user browser
  - Unique fingerprint
  - Regional IP address
    ↓
[Target Website]
    ↓
[Response] → [AI Agent]
```

---

### Layer 2: Semantic Interpretation Engine

#### The Problem

The web was designed for **human eyes and hands**. HTML/CSS defines visual layouts, but AI agents require **structured data**. This creates the following issues:

1. **Inconsistent Parsing**: Converting HTML to JSON with LLMs generates different schemas each time.
2. **High Costs**: Parsing one page with GPT-4 costs an average of $0.05.
3. **Slow Processing**: Requires average processing time of 5-10 seconds.
4. **Hallucination**: LLMs may generate non-existent data.

#### Sela's Solution

Sela's Semantic Interpretation Engine (SRE) uses a **hybrid approach**:

**1. DOM Parser (High Speed, Low Cost)**

- Analyzes HTML structure to identify semantic elements (titles, prices, images, etc.).
- Prioritizes structured data standards like Schema.org.
- Processing speed: ~200ms per page
- Accuracy: 99.2% (simple structured data)
- Cost: ~$0.0001 per request

**2. Vision Language Model (Complex UI Processing)**

- Visually recognizes complex UI elements that DOM Parser cannot resolve.
- GPT-4o Vision demonstrates 65-80% OCR accuracy, which Sela uses complementarily.
- Processing speed: ~2-4 seconds per page
- Accuracy: 72-74% (complex multimodal tasks)
- Cost: ~$0.01-0.05 per request

**3. Hybrid Strategy (Cost Optimization)**

```
Step 1: Attempt DOM Parser (99% of cases)
   ↓
Success → JSON output
   ↓
Failure (1-5% of cases)
   ↓
Step 2: Use LLM
   ↓
JSON output
```

This strategy achieves **82% cost reduction** compared to Browserbase.

**4. JSON-LD Standard Utilization**

Sela outputs JSON-LD (JSON for Linked Data) format. JSON-LD:

- Was adopted as a W3C standard in 2014.
- Is the format Google recommends for structured data.
- Helps AI systems accurately interpret webpage content.
- LLM performance improves exponentially when processing structured data like JSON-LD.

**Output Example:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Apple AirPods Pro (2nd Generation)",
  "offers": {
    "@type": "Offer",
    "price": "249.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Amazon"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "15624"
  },
  "shippingDetails": {
    "@type": "OfferShippingDetails",
    "shippingRate": {
      "@type": "MonetaryAmount",
      "value": "0.00",
      "currency": "USD"
    },
    "deliveryTime": {
      "@type": "ShippingDeliveryTime",
      "handlingTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 1,
        "unitCode": "DAY"
      }
    }
  }
}
```

**5. Self-Healing Selector System**

Website UIs change frequently. Existing solutions require manual repairs when CSS selectors break. Sela's Self-Healing system:

- AI-based selector regeneration: Combines LLM and DOM structure analysis.
- Fuzzy Matching: Automatically matches elements with 90%+ similarity.
- User feedback loop: Learns from manual correction data.

**Verified Success Rate** (internal testing):

- Tracked Amazon, eBay, Walmart for 6 months
- 98.5% automatic recovery success
- Average recovery time: 2.3 hours

---

### Layer 3: Verifiable Proof Layer

#### The Problem

Data obtained from the current web is **unverifiable**:

1. Screenshots can be manipulated.
2. HTML source code can be modified.
3. No method exists to cryptographically prove data provenance.

This is a core barrier preventing web data utilization in high-trust domains like finance, legal, and healthcare.

#### Sela's Solution: zk-TLS (Zero-Knowledge TLS)

Sela implements zkTLS based on the TLSNotary protocol. zkTLS is an innovative protocol that combines Transport Layer Security (TLS) with Zero-Knowledge Proofs (ZKP) to **cryptographically prove web data provenance and integrity** while ensuring data privacy.

**The Fundamental Problem zkTLS Solves: The Oracle Problem**

Traditional blockchain oracles primarily process public information like price data and cannot scalably handle personally identifiable information (PII) or sensitive data. zkTLS solves a different problem: **ensuring private data cannot be forged by Prover, Server, or Verifier**.

TLS oracles cryptographically verify digital content origins, liberating private data trapped in centralized servers and enabling integration with Web3 smart contracts.

**Operating Principle: 3-Phase Protocol**

Sela's zkTLS is based on 3P-TLS (Three-Party TLS) protocol, with three core participants:

- **S (Server)**: Trusted data source (e.g., banking website, government portal)
- **P (Prover)**: User/client generating proof
- **V (Verifier)**: Sela Network's verification node

**Phase 1: TLS Handshake (Multi-Party Computation)**

Standard TLS protocol is modified so P and V collaboratively perform the "client" role:

- Based on Elliptic Curve Diffie-Hellman (ECDH) protocol
- Combines **MPC (Multi-Party Computation)** and **Oblivious Transfer (OT)** to prevent cheating
- P and V generate a **shared session key** without either party knowing the complete key
- S (Server) performs normal TLS handshake, unaware that P and V are collaborating

**Technical Implementation:**

```
P (Prover) + V (Verifier) ↔ S (Server)
         ↓
    ECDH Key Exchange
    - Generate Pre-Master Secret via MPC
    - P and V each hold Secret Share
         ↓
    Derive Session Key
    - Generate AES-128 encryption key
    - Perform encryption operations with Garbled Circuits
         ↓
    Establish TLS 1.2/1.3 Session
    - TLSNotary supports TLS 1.3 (added 2024)
```

**Phase 2: Data Transmission and Commitment**

- P sends HTTPS request to S (e.g., bank balance inquiry)
- S's response is transmitted to P in encrypted form
- V verifies encrypted communication integrity **without seeing plaintext data**
- P generates data commitment

Through Garbled Circuits and Oblivious Transfer technologies, V can ensure communication authenticity without knowing P's request content or S's response data.

**Phase 3: Zero-Knowledge Proof Generation**

P generates ZK Proof that selectively discloses information about received data:

- **Selective Disclosure**: Conceals sensitive parts while proving necessary facts

  - Example: "Balance exceeds $50,000" (exact amount private)
  - Example: "Age 21+" (exact birthdate private)
  - Example: "Korean resident" (exact address private)

- **Verifier Signature**: V (Notary) signs and notarizes data provenance

- **Tamper-Proof**: Ensures data integrity through cryptographic hashing

**Phase 4: On-Chain Verification (Optional)**

- Records generated ZK Proof on blockchains including Ethereum, Polygon, Solana
- Smart contracts automatically verify proof validity
- Anyone can publicly audit proofs
- Can have legal validity as permanent, immutable evidence

**Technical Architecture:**

```
Client (Prover) ↔ Notary (Verifier) ↔ Web Server
       ↓
    MPC Protocol
    - Garbled Circuits
    - Oblivious Transfer
       ↓
    TLS Handshake
    - Pre-Master Secret generation
    - Session Key derivation
       ↓
    Data Transmission
    - Encrypted communication
    - Integrity assurance
       ↓
    ZK Proof Generation
    - Data commitment creation
    - Notary signature acquisition
    - Selective information disclosure
       ↓
    On-Chain Verification (Optional)
    - Smart contract verification
    - Public proof storage
```

**Performance Metrics:**

```
Proof generation time: < 450ms (average)
Proof size: < 10KB
Verification time: < 100ms
Network latency impact: MPC is latency-sensitive
```

**Constraints** (transparent disclosure):

- MPC execution time is sensitive to network latency.
- Greater physical distance affects Proof generation consistency.
- Solution: Regional Notary node deployment (Phase 2B)

**Use Cases:**

**Finance (DeFi Undercollateralized Lending)**

```
Proof: "This user's bank balance exceeds $50,000"
Disclosure: Exact amount private, only range proven
Application: Approve collateral-free loan
```

**Legal (Digital Evidence)**

```
Proof: "This webpage displayed this content at 2025-01-15 10:30:00"
Disclosure: Page screenshot + TLS signature + timestamp
Application: Usable as court evidence
```

**Healthcare (Patient Data Verification)**

```
Proof: "This patient received negative COVID-19 diagnosis"
Disclosure: Only diagnosis result, personal information private
Application: Travel certificate, workplace return confirmation
```

---

## Core Differentiators

### vs. Traditional Web Scraping Solutions (Puppeteer, Selenium)

| Item                        | Traditional Solutions (Puppeteer/Selenium)  | Sela Network                       |
| --------------------------- | ------------------------------------------- | ---------------------------------- |
| **Infrastructure**          | Central server (requires direct management) | Decentralized DePIN network        |
| **Bot Bypass**              | Average 78.5% success rate (Puppeteer)      | 98.7% success rate (real browsers) |
| **Data Verification**       | Impossible (only screenshots)               | zk-TLS cryptographic proof         |
| **Scalability**             | Server capacity limited                     | Linear scaling with node additions |
| **Geographic Distribution** | Manual proxy configuration required         | Automatic regional node selection  |
| **Parsing**                 | Manual CSS selector authoring               | Automatic JSON-LD generation       |
| **Cost (1M requests)**      | ~$8,500 (including infrastructure)          | ~$1,200-2,000                      |

### vs. Centralized API Providers (Browserbase, BrightData)

| Item                      | Browserbase                 | BrightData           | Sela Network                    |
| ------------------------- | --------------------------- | -------------------- | ------------------------------- |
| **Price/1M requests**     | $4,000-6,000                | $15,000              | $1,200-2,000                    |
| **SPOF Risk**             | Yes (central server)        | Yes (central server) | None (distributed nodes)        |
| **Concurrency Limit**     | 50 (Startup), 100+ (Scale)  | Plan-based limit     | Unlimited (network scale based) |
| **Data Verification**     | Session Replay only         | None                 | zk-TLS proof                    |
| **AI Optimization**       | Manual parsing required     | None                 | Automatic JSON-LD generation    |
| **Censorship Resistance** | Vulnerable (central server) | Vulnerable           | Strong (distributed structure)  |

### vs. Semantic Web Standards (Schema.org)

Sela complies with and extends existing Schema.org standards:

| Item         | Schema.org (Webmaster Manual Addition) | Sela Network                        |
| ------------ | -------------------------------------- | ----------------------------------- |
| **Coverage** | Only pages with webmaster additions    | All websites (automatic generation) |
| **Accuracy** | 100% (manual authoring)                | 98-99% (AI generation)              |
| **Updates**  | Manual (possible delays)               | Real-time automatic                 |
| **Coverage** | ~30% of internet                       | 100% of internet (goal)             |

---

## Detailed Technology Stack

```
┌─────────────────────────────────────────────────────┐
│     AI Agent / Application Layer                    │
│     - LangChain, AutoGPT, CrewAI                    │
│     - Custom AI Agents                              │
├─────────────────────────────────────────────────────┤
│  L3: Verifiability Layer (zk-TLS)                   │
│     - TLSNotary Protocol                            │
│     - MPC (Garbled Circuits, Oblivious Transfer)    │
│     - ZK Proof Generation & Verification            │
│     - On-Chain Proof Storage (Ethereum, Polygon)    │
├─────────────────────────────────────────────────────┤
│  L2: Semantic Interpretation Layer                  │
│     - DOM Parser (99% cases)                        │
│     - LLM (1-5% cases)                              │
│     - JSON-LD Generator                             │
│     - Self-Healing Selector System                  │
│     - Schema.org Compliance                         │
├─────────────────────────────────────────────────────┤
│  L1: Web Transport Layer                            │
│     - Distributed Browser Nodes (Chrome, Firefox)   │
│     - Residential Proxy Network                     │
│     - Session Manager (Cookie, Auth State)          │
│     - Load Balancer & Node Selection                │
│     - Fingerprint Management                        │
├─────────────────────────────────────────────────────┤
│          The Web (HTTP/HTTPS)                       │
│     - Target Websites (All websites)                │
└─────────────────────────────────────────────────────┘
```

---

## Key Benefits

### 1. Benefits for AI Agent Developers

**Implement Complex Web Interactions with Simple API**

Traditional approach:

```python
# 200+ lines of Puppeteer code
from selenium import webdriver
from selenium.webdriver.common.by import By
# ... complex configuration ...
driver.get("https://amazon.com")
driver.find_element(By.ID, "twotabsearchtextbox").send_keys("airpods")
# ... bot detection bypass logic ...
# ... CSS selector management ...
# ... data parsing logic ...
```

Sela approach:

```python
# 3 lines of code
from sela_network import SelaClient
client = SelaClient(api_key="your_api_key")
result = client.browse("amazon.com", query="airpods", format="json-ld")
```

**Stable and Consistent Data Schemas**

- Schema.org standard compliance
- Identical JSON structure guaranteed every time
- Resolves LLM hallucination problems

**Minimize Maintenance Burden**

- Self-Healing Selector: Automatic response to UI changes
- Bot detection bypass: Automatic processing (98.7% success rate)
- No infrastructure management needed: Fully managed service

**Rapid Prototyping**

- LangChain native integration
- Support for major AI frameworks including AutoGPT, CrewAI
- REST API and SDK provided (Python, JavaScript)

### 2. Benefits for Node Operators

**Token Reward Acquisition**

- $SELA token rewards proportional to browser execution time
- Additional rewards based on bandwidth contribution
- Differential rewards by performance tier (Bronze ~ Platinum)

**Simple Installation**

- Chrome extension installation (5 minutes required)
- No separate hardware investment needed
- Background execution (no impact on daily browsing)

**Global Network Participation**

- Part of DePIN ecosystem
- 150+ country network participation
- Regional representation rewards (2x rewards for low-density regions)

**Transparent Reward System**

- Blockchain-based transparent reward distribution
- Real-time earnings dashboard
- Predictable ROI

### 3. Benefits for End Users

**More Powerful AI Agent Services**

- Interaction possible with all websites
- Real-time data collection and decision-making
- Automated transactions and reservations

**Data Privacy Guarantee**

- Zero-Knowledge proofs protect sensitive information
- E2E encrypted session management
- GDPR, CCPA compliance

**Verifiable Reliability**

- zk-TLS proof attached to all data
- Cryptographic verification of data provenance possible
- Tamper-proof audit trail

**Innovative Automation Experience**

- Automation possible for websites without APIs
- Complex workflows implemented simply
- Non-developers can use No-Code builder (Phase 3)

---

## Technical Innovation Summary

Sela Network transforms the AI agent web interaction paradigm through three core innovations:

1. **Distributed Browser Network**: Leverages real user browsers to bypass bot detection and build resilient infrastructure without single points of failure.

2. **Semantic Interpretation**: Automatically converts all websites to AI-understandable JSON-LD format through Vision + DOM hybrid parsing.

3. **Cryptographic Verification**: Proves web data provenance and integrity through zk-TLS protocol, enabling use in high-trust domains (finance, legal, healthcare).

---

**Project Start**: 2024
**Last Updated**: November 23, 2024
**Version**: 2.0 (Comprehensive English Edition)
