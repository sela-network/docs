---
title: Architecture Overview
description: Sela Network's three-layer architecture
---

## The Three-Layer Stack

Sela Network's architecture comprises **three independent yet integrated layers** designed to enable AI agents to interact safely and efficiently with the web. Each layer serves a specific role, working together to provide a complete web interaction solution.

### Layer Responsibilities

| Layer                                 | Role                                            | Core Technologies                               |
| ------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| **L1: Web Transport Layer**           | Distributed browser execution, web page access  | Sela Nodes, Residential Proxy                   |
| **L2: Semantic Interpretation Layer** | HTML/Screen → JSON/Action transformation        | LLM, DOM-to-JSON Engine, Self-Healing Selectors |
| **L3: Verifiability Layer**           | Data integrity proof, provenance authentication | zk-TLS, Notary Signatures                       |

---

## Layer 1: Web Transport Layer

### Purpose and Role

The Web Transport Layer provides the **physical infrastructure** enabling AI agents to access and interact with actual websites. This layer overcomes centralized service limitations through globally distributed real browser nodes, bypasses bot detection systems, and enables access to region-restricted content.

### Components

#### 1. Sela Nodes (Distributed Browser Nodes)

**Technical Description:**

Sela Nodes are **real browser instances** operated by users and businesses worldwide. Each node operates as a Chrome extension or standalone application, receiving requests from Sela Network to access websites and collect data.

**Distributed Architecture Advantages:**

Horizontal scaling is a method that enables near-linear processing capacity increase by adding nodes. Sela Network applies this principle to achieve:

- **Unlimited Scalability**: Total network processing capacity increases with each new node addition.
- **Elimination of Single Points of Failure**: Independence from central servers means individual node failures do not impact the entire system.
- **Geographic Distribution**: Nodes distributed across 150+ countries enable optimal regional routing.

**Node Selection Algorithm:**

Sela Gateway selects optimal nodes based on the following criteria:

1. **Geographic Proximity**: Select nodes closest to target website to minimize latency.
2. **Node Performance**: Consider resource availability including CPU, memory, and network bandwidth.
3. **Load Distribution**: Distribute load evenly based on currently processing request count.

#### 2. Residential Proxy Network

**Core of Bot Detection Bypass:**

Residential proxies route traffic through actual residential internet connections. Unlike traditional proxies using datacenter IPs, this generates traffic **indistinguishable from regular user access** from website perspectives.

**Datacenter Proxy vs Residential Proxy:**

| Item                      | Datacenter Proxy               | Residential Proxy                       |
| ------------------------- | ------------------------------ | --------------------------------------- |
| IP Source                 | Cloud servers (AWS, GCP, etc.) | Actual residential internet connections |
| Bot Detection Rate        | High (easily detected)         | Low (84% of websites fail detection)    |
| IP Reputation             | Low (shared IPs blacklisted)   | High (actual user IPs)                  |
| Region-Restricted Content | Difficult to bypass            | Bypassable                              |
| Cost                      | Inexpensive                    | Expensive                               |
| Sela Network Strategy     | Not used                       | Core infrastructure                     |

**Bot Detection Bypass Mechanisms:**

Modern websites detect bots through the following methods:

1. **IP Reputation Analysis**: Blacklist datacenter IP ranges
2. **Request Pattern Analysis**: Block IPs sending many requests in short time
3. **Geographic Consistency Check**: Suspect when multiple regional IPs used in same session

Sela's Residential Proxy Network bypasses all these detection mechanisms:

- **Clean IP Reputation**: Not blacklisted as actual user IPs
- **Natural Request Patterns**: Independent node operation generates distributed request patterns
- **Geographic Consistency**: Consistent requests from actual user locations

#### 3. Session Manager

**Complex Authentication State Management:**

Modern web applications use various mechanisms to maintain login sessions. Session Manager handles this complexity to enable AI agents to perform authenticated tasks.

**Managed Elements:**

1. **Cookie Management**:

   - HTTP cookies (session ID, authentication tokens)
   - Secure and HttpOnly flag handling
   - SameSite policy compliance

2. **Local Storage and Session Storage**:

   - Client-side data storage via JavaScript
   - Domain-based isolation

3. **Authentication Tokens**:
   - JWT (JSON Web Token) management
   - OAuth 2.0 token refresh
   - API keys and Bearer tokens

**Multi-Session Isolation:**

Each request executes in an independent **sandbox environment**. This leverages Chrome's Site Isolation technology to:

- Ensure different user sessions do not mix
- Prevent security vulnerabilities through memory isolation
- Completely separate cookies and local storage for each session

### Key Features

#### Human Browsing Pattern Emulation

Bot detection systems analyze the following signals to identify bots:

- **Mouse Movement Patterns**: Humans move in curved paths, bots move linearly
- **Typing Speed**: Humans type at irregular speeds, bots at constant speed
- **Scroll Patterns**: Humans scroll naturally, bots move mechanically
- **Inter-Page Navigation Time**: Humans need time to read pages, bots navigate immediately

Sela Nodes learn and reproduce these human behaviors through **machine learning models**.

#### WebGL, Canvas, AudioContext Fingerprint Generation

Browser fingerprinting is a core bot detection technology. Each browser and device has a unique "fingerprint" that distinguishes bots from actual users.

**Fingerprinting Elements:**

1. **WebGL Fingerprint**:

   - Generated based on GPU rendering characteristics
   - Unique values based on graphics card model and driver version
   - Sela generates natural fingerprints using actual user GPU information

2. **Canvas Fingerprint**:

   - Subtle differences when rendering graphics using HTML5 Canvas API
   - Drawing identical images produces different results at pixel level per device
   - Sela possesses natural Canvas fingerprints through actual browser rendering

3. **AudioContext Fingerprint**:
   - Generated based on audio processing hardware characteristics
   - Unique signals based on sound card and audio codec

#### Dynamic JavaScript Rendering

Most modern websites are built as **Single Page Applications (SPAs)**. Sites using frameworks like React, Vue, and Angular:

- Have minimal content in initial HTML
- Render actual content only after JavaScript execution
- Load data asynchronously via AJAX requests

Sela Nodes use **actual browser engines (Chromium)** to:

- Wait for JavaScript execution completion
- Automatically handle AJAX requests
- Confirm React/Vue virtual DOM rendering results

#### File Upload/Download Processing

File handling in web interactions is complex:

**File Upload:**

- Handle `<input type="file">` elements
- Support drag-and-drop interfaces
- Generate multipart form data
- Monitor upload progress

**File Download:**

- Handle Blob URLs
- Parse Content-Disposition headers
- Support streaming downloads
- Verify download completion

---

## Layer 2: Semantic Interpretation Layer

### Purpose and Role

The web was designed for **human eyes**. HTML, CSS, and JavaScript are tools for creating visually beautiful and intuitive UIs, not for providing **data structures that AI can easily understand**.

The Semantic Interpretation Layer bridges this gap. It transforms visual web content into **structured data (JSON)** that AI can understand and provides **self-healing** capabilities that automatically adapt to website UI changes.

### Components

#### 1. Large Language Model (LLM)

**What is LLM?**

Large Language Models are AI models trained on vast amounts of text data that can understand and generate human-like text. Advanced LLMs like GPT-4, Claude, and Gemini can analyze HTML structures and extract semantic meaning from web content.

**LLM Role in Sela:**

1. **Semantic HTML Understanding**:

   - Interpret HTML structure and identify meaningful content
   - Extract key information from text-heavy pages
   - Understand context and relationships between page elements

2. **Content Classification and Extraction**:
   - Classify page types (product, article, form, etc.)
   - Extract structured information from unstructured HTML
   - Identify primary content versus navigation/advertisements

**Performance Benchmarks:**

Latest LLM capabilities for web content processing:

- GPT-4: High accuracy in HTML-to-JSON conversion for structured content
- Claude: Strong performance in semantic understanding and schema compliance
- Context windows up to 200K tokens enable processing of complex web pages

Sela leverages these advanced LLM technologies to accurately interpret web content and transform it into structured data.

#### 2. DOM-to-JSON Engine

**What is DOM (Document Object Model)?**

DOM is a tree-form representation of web page structure. Browsers parse HTML to generate DOM, and JavaScript manipulates this DOM to create dynamic web pages.

**DOM Parsing Advantages:**

While LLM provides visual information, DOM parsing provides **structural information**:

1. **Accurate Element Attribute Extraction**:

   - Element IDs, classes, data attributes
   - Link information like href and src
   - Accessibility attributes like aria-label

2. **Semantic Tag Utilization**:

   - HTML5 semantic tags like `<header>`, `<nav>`, `<article>`, `<footer>`
   - Understand page logical structure
   - Extract SEO metadata

3. **Form and Input Field Analysis**:
   - Action and method attributes of `<form>` elements
   - Type, name, and required attributes of `<input>`
   - Identify validation rules

#### 3. Self-Healing Selector System

**Web Scraping's Biggest Problem: UI Changes**

Websites continuously improve UIs. Button positions change, CSS class names are modified, and HTML structures are reorganized. Traditional web scraping tools **immediately break** with such changes.

**Self-Healing Principle:**

Self-Healing Selectors are systems that automatically detect UI changes and find new selectors. Sela operates through the following steps:

1. **Initial Mapping**:

   - Map all UI elements with LLM + DOM parsing on first visit
   - Generate **multiple selector candidates** for each element (ID, class, XPath, text content, etc.)
   - Determine selector priority (based on stability)

2. **Change Detection**:

   - Use MutationObserver API for real-time DOM change detection
   - Trigger change signal when element cannot be found with existing selector
   - Capture HTML snapshot of changed area

3. **Remapping**:

   - Use LLM to identify semantically equivalent elements
   - Analyze new DOM structure
   - Generate and validate new selectors

4. **Validation and Optimization**:
   - Verify new selector accuracy
   - Test multiple times to validate stability
   - Readjust selector priority

**Real Example: Coupang UI Change**

```
Before Change:
<button class="buy-button primary-action">Purchase</button>
→ CSS Selector: button.buy-button

After Change (Redesign):
<button class="purchase-btn cta-button">Purchase</button>
→ Existing selector does not work

Self-Healing Operation:
1. LLM: Detect button with "Purchase" text in HTML
2. DOM Parser: Confirm new class name (purchase-btn)
3. Generate new selector: button.purchase-btn
4. Validation: Test 3 times → Success
5. Automatic update complete

→ Service downtime: 0 seconds
```

**Supported Sites:**

Sela's Self-Healing System has been validated on major sites including:

- Coupang (Korea's largest e-commerce)
- Amazon (Global e-commerce)
- Naver (Korean portal)
- Delivery services
- Hundreds of other websites

#### 4. Schema Normalizer

**Problem: LLM JSON Output Inconsistency**

Converting HTML to JSON using LLMs generates **different schemas each time**:

```json
// First request
{
  "productName": "AirPods",
  "cost": 199.99
}

// Second request (same page)
{
  "name": "AirPods",
  "price": {
    "value": 199.99,
    "currency": "USD"
  }
}
```

This makes AI agent development extremely difficult.

**Schema Normalizer Role:**

1. **Define Normalization Rules**:

   - Define standard schemas by domain (e-commerce, news, finance, etc.)
   - Comply with Schema.org and JSON-LD standards
   - Standardize field names, data types, and nested structures

2. **Ensure Consistent Output**:

   ```json
   // Based on Schema.org Product schema
   {
     "@type": "Product",
     "name": "Apple AirPods Pro (2nd Gen)",
     "offers": {
       "@type": "Offer",
       "price": "199.99",
       "priceCurrency": "USD",
       "availability": "https://schema.org/InStock"
     },
     "aggregateRating": {
       "@type": "AggregateRating",
       "ratingValue": "4.7",
       "reviewCount": "12543"
     }
   }
   ```

3. **Version Management**:
   - Maintain backward compatibility during schema changes
   - Provide gradual upgrade paths
   - Support legacy schemas

**Ensure AI Agent Stability:**

Consistent schemas provide the following benefits:

- **Predictable Data Structure**: Simplifies AI agent code
- **Simplified Error Handling**: Eliminates errors from unexpected field names
- **Rapid Integration**: Immediately usable when adding new websites
- **Reduced Maintenance Burden**: No code modifications needed for schema changes

### Processing Flow

```
HTML/CSS/JS Web Page
    ↓
[Step 1] LLM Semantic Analysis
    → Understand content structure and meaning
    ↓
[Step 2] DOM Parsing
    → Extract HTML structure, attributes, links
    ↓
[Step 3] Semantic Element Extraction
    → Integrate LLM + DOM information
    → Understand element meaning and functionality
    ↓
[Step 4] JSON Schema Generation
    → Generate structured data
    ↓
[Step 5] Schema Normalization
    → Transform to standard schema
    → Normalize field names, types
    ↓
[Step 6] Deliver to AI Agent
    → Provide consistent JSON data
```

---

## Layer 3: Verifiability Layer

### Purpose and Role

The fundamental internet problem is **trust**. How can we prove that data retrieved from the web by AI agents is authentic and unaltered?

The Verifiability Layer uses zk-TLS (Zero-Knowledge TLS) technology to **cryptographically prove web data provenance and integrity**. This is core technology enabling AI agent utilization in trust-critical fields like finance, legal, and healthcare.

### Components

#### 1. zk-TLS (Zero-Knowledge Transport Layer Security)

**What is TLS?**

TLS (Transport Layer Security) is the protocol that encrypts communication between web browsers and servers. The "S" in HTTPS means TLS. TLS ensures:

- **Encryption**: Data is not eavesdropped in transit
- **Integrity**: Data is not altered during transmission
- **Authentication**: Server proves it is actual domain owner

**zk-TLS Innovation:**

The TLSNotary protocol enables **proving TLS session data to third parties (Verifiers)**. Core concept:

1. **Session Key Splitting**: Client (Prover) and Verifier share TLS session key
2. **MPC (Multi-Party Computation)**: Both parties cooperatively perform encryption/decryption
3. **Proof Generation**: Verifier confirms data actually came from server and signs

**Technical Process:**

```
[1] TLS Handshake with MPC
Client (Prover) ↔ Notary (Verifier) ↔ Web Server
         ↓
    MPC Protocol
    - Garbled Circuits (perform complex computations in encrypted state)
    - Oblivious Transfer (transmit data without information leakage)
         ↓
    Session Key Splitting
    - Prover holds Key Share 1
    - Verifier holds Key Share 2
    - Actual Key only generated when combined

[2] Data Transmission
Web Server → Encrypted Data → Prover
         ↓
    MPC Decryption
    - Prover and Verifier cooperatively decrypt
    - Verifier can confirm plaintext data
         ↓
    Notary Signature
    - Verifier proves data provenance with signature

[3] ZK Proof Generation
    - Do not disclose actual data
    - Only generate proof "This data came from amazon.com"
    - Store on blockchain or off-chain
```

**Proof Contents:**

zk-TLS proofs include:

- **Server Certificate Verification**: Proves data came from actual domain (e.g., amazon.com)
- **Data Integrity**: Proves data was not altered during transmission
- **Timestamp**: Proves when data was received
- **Transmission Path**: Proves route data traveled

#### 2. Notary Service

**Independent Third-Party Verification:**

Notary Service is an independent service performing the **Verifier role** in TLS sessions. Sela Network operates distributed Notary nodes to provide:

- **Decentralization**: Independence from single Notary
- **Censorship Resistance**: Other Notary usable if specific Notary refuses service
- **Trust Distribution**: Combine multiple Notary signatures to improve reliability

**Notary Tasks:**

1. **Participate in TLS Sessions**: Perform MPC protocol with Prover
2. **Verify Data**: Confirm decrypted data
3. **Timestamp and Sign**: Cryptographically sign verification time and results
4. **Audit Trail**: Store all verification records on blockchain

#### 3. Proof Aggregation

**Problem: Proof Data Size**

Generating zk-TLS proofs for each web request creates enormous data size. For example:

- Search 100 products on Amazon → 100 proofs
- Each proof size: ~10KB
- Total size: 1MB

Storing all proofs on blockchain becomes very expensive.

**Proof Aggregation Solution:**

Using Zero-Knowledge Proof technologies like zk-SNARK to:

1. **Combine Proofs**: Compress 100 individual proofs into one proof
2. **Reduce Size**: 1MB → ~10KB (100x reduction)
3. **Streamline Verification**: Verify all data by verifying one proof

**On-Chain Verification Optimization:**

When verifying proofs on blockchain:

- **Reduce Gas Costs**: Verify multiple proofs with one transaction
- **Reduce Storage Costs**: Store only small-size proofs on-chain
- **Improve Verification Speed**: Fast verification with simple proof structure

### Verifiable Elements

Sela's zk-TLS can prove:

#### Data Provenance (Which server did it come from)

```
Proof: "This price information came from actual amazon.com server"
→ TLS certificate verification
→ Domain match confirmation
→ Notary signature
```

#### Data Integrity (Was it not altered)

```
Proof: "This data is exactly as received from server"
→ TLS encryption mechanism
→ Hash verification
→ Verifier confirmation through MPC
```

#### Time Proof (When was data received)

```
Proof: "This exchange rate information was received at 2024-01-15 10:30:00 UTC"
→ Notary timestamp signature
→ Blockchain block height record
→ Time manipulation impossible
```

#### Path Proof (What route did data travel)

```
Proof: "This data traveled the following path:
  Client → Sela Node → amazon.com → Sela Node → Client"
→ Signature of each hop
→ Network path verification
```

---

## Integrated Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   AI Agent Application                  │
│   (LangChain, AutoGPT, Custom Agents)                  │
└────────────────────────┬────────────────────────────────┘
                         ↕
                   [REST API / SDK]
                         ↕
┌─────────────────────────────────────────────────────────┐
│              Sela Network Gateway API                   │
│   - Request routing (API Gateway Pattern)              │
│   - Authentication and authorization                   │
│   - Rate Limiting & Throttling                         │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Verifiability (zk-TLS + Notary)              │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │  zk-TLS   │  │  Notary   │  │ Proof Store  │       │
│  │  Engine   │  │  Service  │  │ (Blockchain) │       │
│  └───────────┘  └───────────┘  └──────────────┘       │
│  - MPC-based TLS session                               │
│  - Data provenance and integrity proof                 │
│  - Zero-Knowledge Proof generation                     │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Semantic Interpretation                       │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │    LLM    │  │ DOM Parser│  │Self-Healing  │       │
│  │(Semantic) │  │ (Structure)│ │  Selectors   │       │
│  └───────────┘  └───────────┘  └──────────────┘       │
│  ┌─────────────────────────────────────────────┐       │
│  │         Schema Normalizer                   │       │
│  │    (Schema.org / JSON-LD Standards)         │       │
│  └─────────────────────────────────────────────┘       │
│  - HTML → JSON transformation                          │
│  - UI element semantic extraction                      │
│  - Automatic schema recovery                           │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Web Transport                                 │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │  Sela     │  │Residential│  │   Session    │       │
│  │   Nodes   │  │   Proxy   │  │   Manager    │       │
│  │(Distributed)│ │  Network  │  │(Isolated Exec)│      │
│  └───────────┘  └───────────┘  └──────────────┘       │
│  - Real browser instances                              │
│  - Bot detection bypass                                │
│  - Regional optimal node selection                     │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│                    The Web (Internet)                   │
│   amazon.com, coupang.com, naver.com, ...              │
└─────────────────────────────────────────────────────────┘
```

---

## Scalability and Performance

### Horizontal Scaling

Sela Network follows distributed system horizontal scaling principles. This means **adding more servers (horizontal scaling)** rather than **adding more powerful servers (vertical scaling)**.

**Node Addition Benefits:**

1. **Linear Performance Improvement**:

   - 2x node increase → approximately 2x processing capacity increase
   - No bottlenecks unlike centralized systems

2. **Unlimited Scalability**:

   - Anyone can contribute to network expansion by adding nodes
   - Initial 100 nodes → target 100,000 nodes
   - No scaling limits (P2P network principles)

3. **Cost Efficiency**:
   - Multiple small servers cheaper than one large server
   - Utilize user idle resources (Airbnb for Computing)

**Regional Distribution:**

Nodes distributed across 150+ countries worldwide:

- **Minimize Latency**: Korean request → Korean node (average <50ms)
- **Bypass Regional Restrictions**: Chinese website → use Chinese node
- **Load Balancing**: Distribute traffic by timezone (Asian daytime → utilize Asian nodes)

**Load Balancing Algorithms:**

Sela Gateway uses various load balancing algorithms:

1. **Least Response Time**:

   - Select node with fastest recent response time
   - Real-time performance-based routing

2. **Consistent Hashing**:

   - Route same user requests to same node
   - Maintain session consistency
   - Minimal redistribution when adding/removing nodes

3. **Geographic Load Balancing**:
   - Consider geographic location of user and target website
   - Select optimal path

### Performance Optimization

#### Caching Layer

Cache frequently requested pages and data to improve performance:

1. **HTML Caching**:

   - Cache static pages up to 1 hour
   - CDN-style distributed cache

2. **JSON Schema Caching**:

   - Reuse schemas for identical URLs
   - 90% LLM processing cost reduction

3. **Proof Caching**:
   - Reuse recently generated zk-TLS proofs
   - Reduce Notary signature costs

#### Parallel Processing

Improve processing speed by handling multiple requests simultaneously:

- **Multi-Node Parallel Execution**: Search 100 products → 10 nodes process 10 each in parallel
- **Asynchronous I/O**: Node.js-based asynchronous processing
- **Streaming Response**: Return results immediately as ready

#### Smart Prefetching

Predict and preprocess AI agent's next requests:

```
User request: "Search for AirPods on Amazon"
→ Sela prediction: Next request likely product detail page
→ Preload top 3 product detail pages along with search results
→ Instant response when user clicks (0-second latency)
```

### Security

#### Isolated Execution

Leverage Chrome's Site Isolation technology to:

1. **Process Isolation**:

   - Each request executes in independent browser process
   - No memory sharing
   - Defend against Spectre/Meltdown attacks

2. **Sandbox Environment**:

   - Isolate from node's actual system
   - Restrict file system access
   - Control network access

3. **Session Isolation**:
   - Completely separate each user's sessions
   - No cookie or local storage sharing
   - Prevent cross-site tracking

#### Encrypted Communication

All data transmission is encrypted:

- **AI Agent ↔ Sela Gateway**: TLS 1.3
- **Sela Gateway ↔ Node**: End-to-End Encryption
- **Node ↔ Web Server**: TLS (HTTPS)

#### Access Control

Token-based permission management:

1. **API Key Authentication**: Issue unique API Key per user/agent
2. **Rate Limiting**: Limit requests per API Key (DDoS prevention)
3. **Permission Levels**: Feature restrictions based on free/paid tier
4. **Audit Logs**: Record and track all API requests

---

## Competitive Advantages

### Versus Centralized Solutions

| Item                      | Browserbase (Centralized)                      | Sela Network (Decentralized)                      |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| **Scalability**           | Limited by server capacity                     | Unlimited scaling with node additions             |
| **SPOF**                  | Complete interruption when central server down | No single point of failure with node distribution |
| **Bot Detection Bypass**  | Stealth Mode (limited)                         | Real user browsers (strong)                       |
| **Cost**                  | $0.10/hour + separate proxy                    | Token economy-based (long-term cheaper)           |
| **Data Verification**     | Only logs provided                             | zk-TLS cryptographic proof                        |
| **Censorship Resistance** | Dependent on provider policy                   | Uncensorable through decentralization             |
| **Regional Coverage**     | Limited regions                                | Global coverage 150+ countries                    |

### Technical Innovations

1. **World's First zk-TLS Web Data Proof**: Only protocol capable of proving web data provenance
2. **Hybrid LLM + DOM Parsing**: Next-generation parsing combining semantic understanding and structural analysis
3. **Self-Healing Selectors**: Intelligent system automatically adapting to UI changes
4. **Distributed Browser Network**: First application of P2P principles to web scraping

---

**Sela Network's three-layer architecture achieves scalability, security, and verifiability, becoming the web infrastructure standard for the AI agent era.**

**Project Start**: 2024
**Last Updated**: November 23, 2024
**Version**: 2.0 (Comprehensive English Edition)
