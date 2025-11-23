---
title: Core Technologies
description: Detailed explanation of Sela Network's core technologies
---

## 1. Sela Node

**Distributed browser infrastructure** operated by users or businesses worldwide. Sela Nodes leverage actual user browsers to bypass bot detection systems and provide secure web interaction environments.

### Key Features

#### Fingerprint Mimicking

Browser fingerprinting is a tracking technology websites use to identify users' hardware, software, and settings. Sela Nodes perfectly reproduce actual human browsing patterns to bypass bot detection systems.

**Fingerprinting Technology Details:**

Research on canvas fingerprinting and fingerprinting technologies demonstrates that modern bot detection identifies users by combining the following elements:

**1. Canvas Fingerprinting**

- When Canvas API renders graphics, each device generates minute pixel variations due to hardware and software differences
- Scripts create invisible canvas elements, draw text and shapes, then read the resulting image as a pixel array to generate hash values
- Research indicates Canvas fingerprinting alone can **uniquely identify over 60% of users**

**2. WebGL Fingerprinting**

- While Canvas reveals 2D rendering differences, WebGL deeply explores the GPU itself
- Collects GPU manufacturer and model information through the `WEBGL_debug_renderer_info` extension (e.g., Intel Inc., Intel Iris Plus Graphics 640)
- WebGL provides more unique data than Canvas but with lower stability
- Most websites use **Canvas and WebGL together** to maximize accuracy

**3. AudioContext Fingerprinting**

- Scripts create hidden audio contexts (primarily OfflineAudioContext)
- Oscillators generate fixed frequency tones (e.g., 1,000Hz triangle wave)
- Signals pass through audio effects like compressors to amplify hardware differences
- Audio processing pipeline (hardware, OS, drivers, browser implementation) introduces small variations, with final hashed audio output used as fingerprint
- Safari 17 deliberately injects randomness into AudioContext API in Private mode as a countermeasure

**4. Additional Fingerprinting Elements**

- **User Agent**: Browser and OS information
- **Screen Resolution**: Display resolution and pixel density
- **Timing Patterns**: Mouse movements, typing speed, click intervals
- **Installed Fonts**: System font list
- **Plugins and Extensions**: Plugin detection via navigator.plugins
- **CPU Core Count**: navigator.hardwareConcurrency

**Sela Node's Bypass Strategy:**

As of 2025, fingerprinting has evolved into a **multilayer identification system combining machine learning analysis, behavioral pattern recognition, and hardware-level signatures**, achieving **80-90% accuracy** in controlled environments.

Sela Nodes leverage actual user browsers to:

- Provide **genuine browser environments** rather than synthetic fingerprints
- Generate natural fingerprint distributions through hardware diversity
- Remain indistinguishable from actual user behavior patterns

**Bypass Success Rate:**

Research on bypassing Akamai and DataDome indicates:

- Standard Selenium, Puppeteer, Playwright expose **obvious bot signals** (HeadlessChrome flags, missing plugins)
- DataDome and Akamai combine JavaScript fingerprinting, JA3 fingerprinting, and TLS fingerprint analysis
- Cloudflare combines multiple signals to determine whether sessions are genuine or automated

Sela's real browser network **fundamentally bypasses** all these detection mechanisms.

#### Isolation Sandbox

Sela Nodes execute in users' personal browsers but are designed without access to sensitive information. This protects node operator privacy while enabling network contribution.

**Security Isolation Mechanisms:**

Sela Nodes utilize browser sandbox technologies to execute tasks in isolated environments:

- **Cookie and Session Information Isolation**: Sela tasks use completely separate cookie storage from users' login sessions
- **Local Storage Separation**: All browser storage including localStorage, sessionStorage, IndexedDB operates independently
- **Account Information Protection**: Cannot access users' saved passwords, payment information, or personal settings
- **Independent Execution Context**: Isolated from users' browsing history, bookmarks, and extension data

This isolation follows the Web Extension Manifest V3 permission model and adheres to the Principle of Least Privilege.

**Node Operator Protection:**

- Users can continue normal browsing during task execution
- Sela tasks execute isolated in background
- Sensitive websites (banking, medical, etc.) automatically added to exclusion list

#### Geo-Distributed Execution

Sela Network leverages globally distributed nodes to provide regionally optimized web access. This is essential for accessing region-restricted content, reducing latency, and collecting accurate localized data.

**Regional Node Selection Algorithm:**

Sela Gateway selects optimal nodes based on:

1. **Geographic Proximity**: Prioritize nodes in same country/region as target website
2. **Latency**: Select nodes with lowest average response time
3. **Node Performance**: Consider CPU utilization, memory availability, network bandwidth
4. **Load Distribution**: Distribute to prevent task concentration on specific nodes

**Regional Optimization Examples:**

```
US Amazon data request → New York/California nodes execution
Korean Coupang data request → Seoul/Busan nodes execution
Japanese Rakuten data request → Tokyo/Osaka nodes execution
European GDPR-compliant data → EU region nodes only
```

**Specific Benefits:**

**1. Region-Restricted Content Access**

- Collect metadata from region-restricted streaming services like Netflix, BBC iPlayer
- Access Chinese websites (Baidu, Taobao) with Chinese nodes
- Bypass access restrictions from government regulations

**2. Low Latency**

- Minimize round-trip time (RTT) through reduced physical distance
- Average latency: 50-100ms within same continent, 200-300ms inter-continental
- Improved response speed for real-time data collection

**3. Accurate Region-Specific Content**

- Same website displays different prices, inventory, promotions by region
- Example: Amazon.com shows different shipping options and prices when accessed from US IP vs Korean IP
- Collect localized search results and recommendation algorithm data

**4. CDN Cost Reduction**

- Download data from same CDN edge servers as website servers
- Minimize bandwidth costs (data transfer within same region is free or inexpensive)

#### Action Automation

Sela Nodes are designed to perform complex web interactions naturally like humans. Beyond simple clicks, they support all interactions of modern web applications.

**Supported Actions:**

**1. Click**

- Left click, right click, double click, middle button click
- Random point clicking like humans (natural positions rather than element centers)
- Mouse movement simulation before clicking (curved paths rather than straight lines)

**2. Scroll**

- Smooth scroll animations (avoid abrupt jumps)
- Automatic detection of infinite scroll pages and loading waits
- Scroll until specific elements are visible (e.g., "Load More" button at page bottom)

**3. Type**

- Mimic human typing speed (150-300ms/character, random variation)
- Occasional typos followed by backspace corrections (more natural pattern)
- Wait for form autocomplete triggers

**4. Download**

- Automatic handling of browser download dialogs
- Wait for and verify download completion
- Filename and path management

**5. Upload**

- Automatic detection of `<input type="file">` elements
- Support drag-and-drop uploads
- Simultaneous upload of multiple files

**6. Drag & Drop**

- Manipulate Kanban boards like Trello, Asana
- Operate image crop tools
- Rearrange custom UI elements

**7. Wait**

- Wait for JavaScript loading completion
- Wait for AJAX request completion
- Wait for specific DOM element appearance (configurable maximum timeout)
- Detect network Idle state (all requests completed)

**8. Find Element**

- Explore elements by CSS Selector, XPath, text content
- Retry logic for dynamic elements (repeat until elements appear)
- Access elements inside Shadow DOM
- Explore elements across iframe boundaries

**Behavior Pattern Mimicry:**

Advanced bot detection analyzes **behavioral patterns**:

- Mouse movement acceleration and deceleration
- Hover time before clicks
- Page dwell time and scroll patterns
- Natural variation in keystroke intervals

Sela Nodes utilize libraries like **ghost-cursor** to generate realistic mouse movements reproducing all these patterns like actual users.

---

## 2. Semantic Rendering Engine (SRE)

The Semantic Rendering Engine is a next-generation web data extraction engine that understands the **"semantics"** of UIs beyond HTML parsing. Unlike traditional CSS Selector-based scraping, SRE combines Large Language Models with DOM analysis to comprehend webpage intent and structure.

### Hybrid Parsing

Industry's first integrated approach combining LLM and DOM parsing. This transcends limitations of simple HTML tag analysis, mimicking how humans understand webpages.

#### LLM-Based Parsing

**Large Language Model (LLM) Utilization:**

Advanced LLMs like GPT-4, Claude, and Gemini can analyze HTML structures and extract semantic meaning from web content. These models are trained on vast amounts of text data and can understand context and relationships between page elements.

**Sela SRE's LLM Capabilities:**

According to recent research on LLM capabilities for web content processing, modern LLMs can:

- **Content Classification**: Identify page types (product, article, form, etc.)
- **Semantic Understanding**: Extract structured information from unstructured HTML
- **Context Recognition**: Understand relationships between page elements
- **Text Extraction**: Extract key information from text-heavy pages

**Accuracy and Performance:**

Recent advances in LLM technology demonstrate:

- GPT-4: High accuracy in HTML-to-JSON conversion for structured content
- Claude: Strong performance in semantic understanding and schema compliance
- Context windows up to 200K tokens enable processing of complex web pages
- Fast inference speeds enabling real-time web content processing

#### DOM-Based Parsing

**Structural Semantic Extraction:**

Research on AI-based HTML parsing demonstrates that AI models can collect data needed for web scraping without writing parsers. This is particularly useful when websites frequently update layouts.

Sela SRE's DOM Parser extracts:

- **HTML Tag Hierarchy**: Understanding data context through parent-child relationships

  ```html
  <article>
    <h2>Title</h2>
    <p>Content</p>
  </article>
  ```

  → SRE interpretation: "This title and content constitute one article"

- **Semantic Tags (Semantic HTML5)**: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, etc.

  - Semantic tags clearly convey page intent
  - Example: Links inside `<nav>` are navigation, text inside `<article>` is main content

- **Links and Reference Relationships**: Page-to-page relationships through `<a href>`, `<link>`, `rel` attributes

  - Identify canonical URLs
  - Build navigation paths to related pages

- **Forms and Input Fields**: `<form>`, `<input>`, `<select>`, `<textarea>` elements
  - Automatically identify login forms, search forms, payment forms
  - Understand required input fields and validation rules

#### Combined Effect: LLM + DOM Synergy

Research on AI-era web scraping and Claude AI text extraction demonstrates that Claude AI processes HTML documents and extracts text based on **semantic understanding rather than DOM manipulation**. This approach provides resilience to changes by using semantic understanding rather than DOM element IDs or classes.

**Integration Process:**

```
LLM Parser                    +                 DOM Parser
     ↓                                                 ↓
"HTML contains submit button              <button class="checkout-btn">
with text 'Complete Order'"                Proceed to Checkout
                                              </button>
     ↓                                                 ↓
         ========================================
                   Integrated Analysis
         ========================================
                          ↓
             Complete Semantic Extraction
                          ↓
         {
           "element_type": "button",
           "action": "proceed_to_checkout",
           "semantic_meaning": "primary_action",
           "location": "top_right",
           "text": "Proceed to Checkout"
         }
```

**Real Examples:**

Amazon product page:

- **LLM**: "Submit button with text 'Buy Now'"
- **DOM**: `<button id="buy-now-button">Buy Now</button>`
- **Integrated Result**: "This is primary CTA button triggering purchase action"

Coupang search results:

- **LLM**: "Product images, prices, ratings arranged in card format"
- **DOM**: Repeating `<li class="product-item">...</li>`
- **Integrated Result**: "This is product list where each item has identical structure"

### Self-Healing Selector Engine

Websites constantly update UIs. Traditional CSS Selector-based scraping fails immediately when websites change class names or DOM structures. Sela's Self-Healing Engine fundamentally solves this problem.

#### Operating Principle

**1. Initial Mapping**

- On first visit, identify all major UI elements of webpage with multiple attributes
- Store **multiple identifier combinations** rather than single selector:
  ```javascript
  {
    "primary": "button.buy-now",
    "fallbacks": [
      "button[data-action='purchase']",
      "button:contains('Buy Now')",
      "div#product-actions > button:first-child"
    ],
    "semantic_signature": {
      "text_pattern": "buy|purchase|order",
      "element_type": "button",
      "parent_context": "product_actions"
    }
  }
  ```

**2. Change Detection**

- Calculate DOM structure hash value for each request
- Trigger reanalysis when detecting structural changes from previous visit
- Sequentially attempt fallback selectors when target element not found

**3. Remapping**

- LLM Parser reanalyzes page to search for elements with identical **semantic features**
- Example: "Button with 'Buy', 'Purchase', 'Order' or similar text"
- DOM Parser searches for semantically identical elements
- Example: Among `<button>` tags, those containing similar text like "Buy", "Purchase", "Order"

**4. Validation & Learning**

- Verify newly detected element matches expected data type
- Example: Price field must be number + currency symbol
- Update new selector to primary upon successful validation
- Distribute update across network

#### Real Examples

**Coupang UI Change:**

```
[ January 2024 ]
Coupang changes class name
Before: button.rocket-buy-button
After: button.quick-purchase-btn

[ Traditional Scraper ]
→ Error: "Element not found"
→ Developer must manually modify code
→ Service interruption (hours ~ days)

[ Sela Self-Healing ]
→ Primary selector failure detected
→ Attempt fallback: button[data-purchase='rocket']
→ Fallback also fails
→ LLM Parser activates: "Button with 'Purchase' text"
→ Detect new selector: button.quick-purchase-btn
→ Validation: Confirm cart addition on click
→ Propagate update to network
→ Total time: <5 seconds, no service interruption
```

**Amazon Price Change:**

```
[ Change ]
Amazon modifies price display HTML structure
Before: <span class="price">$19.99</span>
After: <div class="new-price-box">
         <span class="amount">19</span>
         <span class="cents">99</span>
       </div>

[ Sela Self-Healing ]
→ Existing selector fails
→ LLM Parser: "Text containing price pattern near product image"
→ DOM Parser: Search for numeric pattern (\d+\.\d+)
→ Recognize and combine new structure: amount + "." + cents
→ JSON output maintains consistency: {"price": 19.99}
→ No user-side code changes required
```

#### Support Scope

Self-Healing Engine supports all major e-commerce and content sites:

- **Korea**: Coupang, Naver Shopping, 11st, Gmarket, Coupang Eats, Baedal Minjok, Yogiyo
- **Global**: Amazon, eBay, Walmart, AliExpress, Shopify-based stores
- **Social Media**: Twitter/X, Instagram, Facebook (public data)
- **News**: Article body and metadata from major news sites

### Schema Normalization

The biggest problem with LLM-based HTML→JSON conversion is **different output schemas each time**. Parsing the same Amazon product page 10 times may produce 10 different JSON structures. Sela SRE completely solves this.

#### Normalization Mechanism

**1. Domain-Specific Schema Templates**

Sela maintains predefined schema templates for each domain type (e-commerce, news, social media, etc.):

```json
// E-commerce Product Schema (Amazon, Coupang, eBay, etc.)
{
  "$schema": "https://schema.sela.network/v1/product",
  "product": {
    "id": "string", // Unique product ID
    "name": "string", // Product name
    "brand": "string", // Brand
    "price": {
      "amount": "number", // Price
      "currency": "string", // Currency (USD, KRW, etc.)
      "original": "number", // Pre-discount price (optional)
      "discount_percentage": "number" // Discount rate (optional)
    },
    "availability": "boolean", // Stock status
    "rating": {
      "score": "number", // Rating (0-5)
      "count": "number" // Review count
    },
    "images": ["string"], // Image URL array
    "specifications": {
      // Specs (key-value pairs)
      "key": "value"
    }
  }
}
```

**2. Automatic Field Mapping**

SRE automatically maps extracted data to templates:

```
Extracted from webpage:
- "Product: Apple AirPods Pro"
- "$249.99 (was $299.99)"
- "★★★★☆ 4.7 (12,543 reviews)"

↓ Automatic Mapping ↓

Normalized JSON:
{
  "product": {
    "name": "Apple AirPods Pro",
    "price": {
      "amount": 249.99,
      "currency": "USD",
      "original": 299.99,
      "discount_percentage": 16.67
    },
    "rating": {
      "score": 4.7,
      "count": 12543
    }
  }
}
```

**3. Type Enforcement**

- Prices always `number` (string "$249.99" → number 249.99)
- Dates in ISO 8601 format ("Jan 15, 2024" → "2024-01-15T00:00:00Z")
- Booleans as true/false ("In Stock" → true)

**AI Agent Stability Assurance:**

OpenAI Structured Outputs achieved **100% JSON schema compliance** with GPT-4o-2024-08-06 model, but requires specifying schema in prompts. Sela automates this to:

- **Predictable Data Structure**: Same URL always returns same schema
- **Simplified Error Handling**: Prevent type mismatch errors proactively
- **Rapid Integration**: AI agents can immediately use Sela output
- **Reduced Maintenance Burden**: Maintain schema even with website changes

---

## 3. zk-TLS: Verifiable Web Proof Layer

zk-TLS is Sela Network's most critical differentiator and innovative technology that cryptographically guarantees web data trustworthiness. Current web interactions have no method to prove data provenance, but Sela makes this possible.

### Overview: Need for Verifiable Web

Research on zkTLS analysis demonstrates that **TLS provides encryption but not verification**. TLS encryption schemes cannot generate proofs verifying data or provenance, and this is precisely the problem zkTLS solves.

**Existing Problems:**

- Screenshots can be manipulated
- API responses vulnerable to man-in-the-middle attacks
- Web data inadmissible as legal evidence
- Absence of audit trails

**Sela's Solution:**

**Cryptographically prove** that data received by AI agents originated from actual web servers. No one can manipulate data or forge provenance.

### Core Technology

#### TLS Attestation with Multi-Party Computation

Research on TLSNotary protocol and zkTLS guides demonstrates that zkTLS **extends standard TLS protocol using Zero-Knowledge Proofs and Secure Multi-Party Computation (MPC)** to achieve proofs without server-side coordination or permissions.

**Process Details:**

**1. TLS Handshake Capture**

```
Client (Prover)  ←→  Server (Website)
         ↓
    TLS 1.3 Handshake
    - Client Hello
    - Server Hello
    - Certificate exchange
    - Key exchange (ECDHE)
    - Session key generation
```

In typical browser-server communication, clients solely control TLS sessions with servers. In zkTLS, **Verifier** participates in this process.

**2. Multi-Party Computation (MPC)**

TLSNotary protocol description indicates TLSNotary comprises 3 phases:

- **First**, Prover (client) requests data from server via TLS while performing secure MPC with Verifier
- **Second**, Prover selectively discloses data to Verifier
- **Third**, Verifier validates data

During this process, TLS session keys are sharded between Prover and Verifier. Neither party solely possesses complete keys, preventing Prover from forging data.

**3. Zero-Knowledge Proof Generation**

zkTLS analysis and guides demonstrate that zkTLS enables **verifying data authenticity without disclosing actual data** by activating Zero-Knowledge Proofs.

Generated proof:

```javascript
{
  "proof_type": "zk-TLS",
  "server": "amazon.com",
  "certificate_chain": "...",  // Server certificate
  "timestamp": 1736982445,     // Unix timestamp
  "data_hash": "0xabc123...",  // Data hash
  "zk_proof": "...",           // Zero-knowledge proof
  "selective_disclosure": {     // Selective disclosure
    "product_id": "B08X4YZ123",
    "price": "REDACTED"         // Hide sensitive information
  }
}
```

**4. On-Chain/Off-Chain Verification**

Generated proofs are verified through:

- **On-Chain Verification**: Smart contracts verify proofs and record results on blockchain
- **Off-Chain Verification**: Anyone can download proof files for independent verification

**Proof Contents:**

- **Server Certificate Verification**: Prove data originated from actual amazon.com
- **Data Integrity**: Prove no alteration during transmission
- **Timestamp**: Prove exact data collection time
- **Transmission Path**: Prove TLS session completeness

#### Selective Disclosure with Zero-Knowledge

**Privacy Protection Mechanism:**

zkTLS privacy analysis and TLS Oracles research demonstrate that zkTLS **enables verification without actually disclosing private data**.

**Real Use Cases:**

**Case 1: Bank Balance Proof (Finance)**

```
Proof contents:
- "This user's bank balance exceeds $10,000"
- Data source: chase.com
- Query time: 2024-01-15 10:30:00 UTC
- Verification: ✓ TLS certificate valid
- Verification: ✓ Data integrity confirmed

Undisclosed information:
- Exact balance amount
- Account number
- Transaction history
```

**Case 2: News Article Authenticity (Media)**

```
Proof:
"This news article was collected from actual
bloomberg.com server on 2024-01-15 09:00 UTC
and has not been altered since"

→ Prevent fake news
→ Usable as court evidence
→ Perfect audit trail guarantee
```

**Case 3: Medical Data Verification (Healthcare)**

```
Proof:
- Patient's negative COVID-19 test result
- Data source: hospital-system.org
- Test date: 2024-01-10
- Verification: ✓ Collected directly from hospital server
- Verification: ✓ Tamper-proof

Undisclosed information:
- Patient name
- ID number
- Other medical records
```

**Technical Implementation:**

TLSNotary uses **garbled circuits and key sharding techniques for selective disclosure** but does not use ZKP. Sela combines TLSNotary's MPC approach with latest ZK-SNARK technology to provide stronger privacy.

### zkTLS Ecosystem and Major Projects

Research on zkTLS introduction indicates major projects related to zkTLS include:

- **TLSNotary**: Pioneer of MPC-based TLS proof, utilizing garbled circuits
- **DECO (Chainlink)**: Data proof integrated with oracle network
- **PADO Labs**: Privacy-preserving data computing
- **zkPass**: Mobile-optimized zkTLS implementation
- **Reclaim Protocol**: Connecting Web2 data to Web3

Sela is based on TLSNotary's MPC technology while adding ZK-SNARK for stronger privacy and efficiency.

### Industry-Specific Use Cases

zkTLS utilization analysis indicates potential use cases include:

**1. Identity Verification**

- Verify government-issued IDs without exposing personal data
- Simplify KYC processes
- Cross-border authentication

**2. Social Networks**

- Verify follower counts, engagement metrics
- Social graph data portability
- Proof of influence

**3. Crypto Asset Proof**

- Prove exchange balances (amounts private)
- Verify portfolio holdings
- Collateral proof

**4. DeFi Lending**

- Prove credit scores (details private)
- Income verification
- Automated loan qualification assessment

**5. Medical Data Sharing**

- Vaccination proof
- Prescription verification
- Clinical trial data integrity

### Technical Comparison: Sela zk-TLS vs Traditional Methods

| Item                  | Traditional Scraping           | API Access                  | Sela zk-TLS                     |
| --------------------- | ------------------------------ | --------------------------- | ------------------------------- |
| Data Provenance Proof | Impossible                     | Requires server trust       | Cryptographic proof             |
| Tampering Prevention  | Vulnerable (easy manipulation) | Susceptible to MITM attacks | Tamper-proof                    |
| Privacy               | High exposure risk             | Server sees all information | Zero-Knowledge protection       |
| Legal Validity        | None                           | Limited                     | Admissible as court evidence    |
| Auditability          | Limited                        | Log-dependent               | Perfect tracking                |
| Scalability           | Low (bot blocking)             | API rate limits             | Unlimited (distributed network) |
| Cost                  | High (proxies)                 | API fees                    | Token economy                   |

---

## Technology Integration Effect

### Synergy Effect

```
Sela Node (Access)
    +
SRE (Understanding)
    +
zk-TLS (Proof)
    =
Perfect AI Web Agent
```

### Real Workflow Example

**"Search for lowest AirPods price on Amazon then order"**

1. **Sela Node**: Access Amazon (bypass bot detection)
2. **SRE**: Convert product list to JSON
3. **zk-TLS**: Prove price data provenance
4. **AI Agent**: Select lowest price product
5. **Sela Node**: Add to cart and navigate to checkout page
6. **zk-TLS**: Generate order history proof
7. **Complete**: Verifiable order completion

---

Through perfect combination of these three core technologies, Sela Network provides an environment where AI agents can operate **securely**, **efficiently**, and **verifiably** on the web.

**Project Start**: 2024
**Last Updated**: November 23, 2024
**Version**: 2.0 (Comprehensive English Edition)
