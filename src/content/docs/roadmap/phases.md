---
title: Development Roadmap
description: Sela Network strategic development phases and milestones
---

## Executive Summary

Sela Network is a decentralized web-interaction layer that enables AI agents to see, understand, and act on the web, overcoming the limitations of traditional scraping and centralized automation. This roadmap outlines a four-phase development strategy from 2024 through 2027, grounded in verified market data and realistic technical objectives.

The network operates through a global infrastructure of nodes that execute browser sessions, structure data, and perform actions while ensuring data integrity through LLM-based parsing, DOM-to-JSON transformation, and zk-TLS verification. The long-term objective is to establish Sela as the foundational operating layer for AI agents interacting with the web.

### Market Context

The following market data informs this roadmap:

- **AI Agents Market**: The global AI agents market was valued at $5.40 billion in 2024 and is projected to reach $50.31 billion by 2030, representing a CAGR of 45.8%.
- **Web Scraping Market**: Valued at $754 million in 2024, projected to reach $2.87 billion by 2034 at a CAGR of 14.3%.
- **DePIN Sector**: Decentralized physical infrastructure networks have exceeded $30 billion in combined market capitalization, demonstrating significant growth in distributed infrastructure models.

### Strategic Differentiation

Sela Network represents the only decentralized solution combining cryptographic verifiability with substantial cost advantages compared to centralized browser automation services. The architecture eliminates single points of failure while providing verifiable proof of web interactions through zero-knowledge protocols.

---

## Phase 1: Foundation (2024 Q4 - 2025 Q2)

**Primary Objective**: Transition from prototype to production-ready infrastructure

### 1.1 Node Network Deployment

#### Network Architecture

The Sela node network comprises three operational tiers:

**Chrome Extension Nodes (Lightweight)**
- Requirements: 2 CPU cores, 4GB RAM
- Target: Consumer-grade hardware participation
- Use case: Geographic distribution and residential IP diversity

**Standalone Nodes (Standard)**
- Requirements: 4-8 CPU cores, 8-16GB RAM
- Target: Dedicated node operators
- Use case: Consistent availability and performance

**Enterprise Nodes (High-Performance)**
- Requirements: 16+ CPU cores, 32GB+ RAM
- Target: Professional infrastructure providers
- Use case: High-throughput workloads

#### Core Technical Capabilities

The node software provides:

- Real browser environments indistinguishable from human users, achieving high bypass rates for bot detection systems
- Integration with residential proxy networks for enhanced access to protected content
- Persistent session management and secure cookie storage
- Peer-to-peer mesh networking architecture eliminating central points of failure

#### Network Growth Milestones

**Phase 1A (2024 Q4) - Alpha Network:**
```
Target: 100-500 active nodes
Geographic distribution: 5-10 countries
Network uptime: 90%+
Processing capacity: 100 requests/minute
```

**Phase 1B (2025 Q1) - Beta Network:**
```
Target: 1,000-3,000 active nodes
Geographic distribution: 20 countries
Network uptime: 95%+
Processing capacity: 1,000 requests/minute
```

#### DePIN Growth Benchmarks

These targets align with established patterns in decentralized infrastructure networks. Filecoin achieved approximately 5,000 nodes during its first six months of operation. Render Network accumulated over 100,000 participants in its waitlist, implementing gradual onboarding. The Sela growth model reflects conservative estimates accounting for market conditions and available resources.

---

### 1.2 Semantic Rendering Engine

#### Hybrid Architecture: Vision and DOM Processing

The rendering engine employs a two-layer approach optimized for accuracy and cost efficiency:

**Layer 1: DOM Parser**
```
Purpose: High-speed HTML structure to JSON conversion
Accuracy: 99%+ for structured data
Processing time: ~200ms per page
Cost: Minimal computational overhead
```

**Layer 2: Vision Language Model Integration**
```
Purpose: Visual recognition of complex UI elements
Models: GPT-4 Vision, Claude 3.5 Sonnet, or open-source alternatives
Accuracy: 70-75% for complex multimodal tasks
Processing time: 2-4 seconds per page
Cost: Variable based on model selection
```

Research demonstrates that vision language models have achieved significant progress in UI understanding. Google Research's ScreenAI, at only 5 billion parameters, achieves state-of-the-art results on UI-based tasks. OmniParser improved GPT-4V's accuracy from 70.5% to 93.8% by incorporating local semantic information. These advances inform the Sela approach to visual element recognition.

#### Cost Optimization Strategy

The hybrid processing model follows this sequence:

1. Initial DOM parser attempt (successful in majority of cases)
2. Vision language model invocation only when DOM parsing insufficient
3. Result caching with time-to-live policies
4. Progressive enhancement based on page complexity

This approach substantially reduces operational costs compared to vision-only processing while maintaining high accuracy.

#### Self-Healing Selector System

**Challenge**: UI changes frequently break CSS selectors, disrupting automation workflows.

**Solution Architecture**:

1. AI-based selector regeneration using vision language models and DOM structural analysis
2. Fuzzy matching algorithms for automatic element identification
3. User feedback integration for continuous learning

The system maintains automation reliability across UI changes by automatically adapting to structural modifications.

#### Supported Platforms and Use Cases

**Phase 1 Priority Sites**:

- E-commerce: Amazon, eBay, Walmart, AliExpress
- Social Media: LinkedIn, Twitter
- Travel: Booking.com, Airbnb, Expedia
- News: Major publications

**JSON Standardization**:

All extracted data conforms to versioned schema standards ensuring consistency across data sources:

```json
{
  "schema_version": "1.0",
  "type": "product",
  "data": {
    "name": "Product Name",
    "price": {
      "amount": 249.99,
      "currency": "USD"
    },
    "availability": "in_stock",
    "timestamp": "2025-01-15T10:30:00Z",
    "proof_hash": "0x..."
  }
}
```

---

### 1.3 AI Framework Integration

#### Developer SDK

**Python SDK**:

```python
from sela_network import SelaClient

client = SelaClient(api_key="your_api_key")
result = client.browse("amazon.com", query="product search")
```

**JavaScript/TypeScript SDK**:

```typescript
import { SelaClient } from "@sela-network/sdk";

const client = new SelaClient({
  apiKey: process.env.SELA_API_KEY,
  network: "mainnet",
});

const result = await client.browse({
  url: "https://example.com",
  actions: [
    { type: "search", query: "term" },
    { type: "extract", selector: "element" },
  ],
  format: "json",
  verify: true,
});
```

#### Performance Objectives

| Metric | Target | Advantage |
| --- | --- | --- |
| Response time (P50) | ~420ms | 35% improvement over baseline |
| Response time (P95) | ~1,200ms | 24% improvement over baseline |
| Bot detection bypass | 98%+ | Enhanced reliability |
| Concurrent connections | Unlimited (P2P) | No artificial limits |
| Cost efficiency | Significant reduction | Token-based incentive model |

---

## Phase 2: Verification Layer (2025 Q2 - Q3)

**Primary Objective**: Establish verifiability and trust for enterprise adoption

### 2.1 Zero-Knowledge TLS Integration

#### Technical Background

**Challenge**: Web data lacks inherent verifiability. Screenshots and HTML sources can be manipulated. This creates barriers to adoption in high-trust domains such as finance, legal, and healthcare.

**Solution: zkTLS Protocol**

Zero-knowledge Transport Layer Security provides cryptographic proof of TLS session authenticity while preserving privacy. The protocol uses multi-party computation to maintain data confidentiality while enabling verification.

zkTLS represents the integration of zero-knowledge proofs with the TLS protocol, creating a system that facilitates secure data transmission with a verifiable privacy layer. The MPC-TLS approach uses secure multi-party computation to add a verifier to the TLS connection, with the prover and verifier working together to compute key encryption and decryption during the TLS handshake.

#### Implementation Approach

**Protocol Selection**:

Primary consideration: TLSNotary protocol with TLS 1.3 support

**Architecture**:

```
Client (Prover) ↔ Notary (Verifier) ↔ Web Server
       ↓
Multi-Party Computation (Garbled Circuits + Oblivious Transfer)
       ↓
Zero-Knowledge Proof Generation
       ↓
On-Chain Verification (Optional)
```

**Performance Targets**:

```
Proof generation: <450ms average
Proof size: <10KB
Verification time: <100ms
```

**Technical Constraints**:

Multi-party computation protocols exhibit sensitivity to network latency, which can affect consistency. This is addressed through geographic distribution of notary nodes to minimize physical distance and associated delays.

#### Application Domains

**Financial Services**:
Proof of account balance ranges without revealing exact amounts, enabling undercollateralized lending protocols.

**Legal Evidence**:
Cryptographically verified proof that specific web content existed at a particular timestamp, admissible in legal proceedings.

**Healthcare**:
Verification of medical records or test results without exposing complete patient information, enabling privacy-preserving health credentials.

#### Proof Explorer

The Proof Explorer provides public access to verify any generated proof:

- Searchable proof registry
- On-chain proof anchoring
- Public verification API
- Timestamp and data hash verification

---

### 2.2 Session Management Infrastructure

#### Challenge: Authentication Automation

**Current Limitations**:
- Two-factor authentication requirements
- CAPTCHA challenges
- Manual credential management

**Solution: Session Cloud**

```
User → One-time authentication → Sela Session Cloud
                                      ↓
                                E2E encrypted storage
                                      ↓
                          AI agents reuse authenticated sessions
```

#### Security Architecture

- **End-to-end encryption**: Users maintain exclusive control of decryption keys
- **Zero-knowledge credential handling**: Sela infrastructure cannot access passwords
- **Hardware security module storage**: Secure enclave protection
- **Time-limited access**: Configurable session expiration policies

**Regulatory Compliance**:

- GDPR compliance (European Union)
- CCPA compliance (California)
- SOC 2 Type II certification (planned)

---

### 2.3 Enterprise Customer Acquisition

#### Target Market Segments

**Tier 1: AI Startups**
- AI agent development companies
- Browser automation requirements
- Volume: 100K-1M requests/month

**Tier 2: Data Intelligence Firms**
- Price monitoring and competitive analysis
- E-commerce data aggregation
- Volume: 1M-10M requests/month

**Tier 3: Fintech and Healthcare**
- Financial data verification for DeFi protocols
- Patient data verification for healthcare platforms
- Volume: 10M+ requests/month with zk-TLS proofs

#### Pricing Model

**Starter Plan**: $79/month
- 750 browser hours
- 10GB proxies
- Unlimited concurrent connections
- Basic zk-TLS proofs included

**Enterprise Plan**: Custom pricing
- Dedicated node pools
- 99.9% uptime SLA
- 24/7 priority support
- Advanced zk-TLS analytics

#### Acquisition Targets

```
2025 Q2: 10-20 enterprise customers
2025 Q3: 50+ enterprise customers
2025 Q4: 100+ enterprise customers
API volume: 10M+/month (Q2) → 100M+/month (Q4)
```

---

## Phase 3: Agent Marketplace (2025 Q4 - 2026 Q4)

**Primary Objective**: Establish developer ecosystem and expand accessibility

### 3.1 Agent Application Marketplace

#### Marketplace Structure

**Category 1: Basic Automation Scripts**
```
Description: Simple automation workflows (clicks, inputs, scrolls)
Pricing: 5-20 SELA tokens
Examples: Social media automation, form filling, data collection
Revenue split: 70% developer, 20% protocol, 10% curators
```

**Category 2: Advanced Data Parsers**
```
Description: Complex structured data extraction from websites
Pricing: 30-100 SELA (one-time) or 10-30 SELA/month (subscription)
Examples: Product tracking, price comparison APIs, real-time data feeds
Revenue split: 70% developer, 20% protocol, 10% curators
```

**Category 3: Industry-Specific APIs**
```
Description: Complete API solutions for vertical markets
Pricing: 200-1,000 SELA/month
Examples: Real estate tracking, media sentiment analysis, influencer analytics
Revenue split: 70% developer, 20% protocol, 10% curators
```

#### Developer Incentive Structure

**Reward Pool**: 15% of total token supply allocated over initial five years

**Reward Components**:

1. **Sales revenue**: 70% immediate distribution
2. **Quality bonus**: Top 10 parsers receive monthly bonus allocation
3. **Usage rewards**: Token rewards based on API call volume

**Projected Earnings (Top Developers)**:

```
Monthly sales: $5,000 (100 subscriptions × $50)
Quality bonus: $2,000 (token rewards)
Usage rewards: $1,000 (API call volume)
─────────────
Total monthly: $8,000
```

---

### 3.2 No-Code Agent Builder

#### Vision: Democratizing Agent Development

**User Interface Features**:

- Drag-and-drop workflow builder
- Visual CSS selector tool with in-browser highlighting
- Template library with 100+ pre-configured workflows
- Real-time testing and debugging environment

**Example Workflow**:

```
┌─────────────────────────────────────┐
│ 1. Search Amazon for "product"      │
│    → URL: https://amazon.com         │
│    → Action: Search                  │
│    → Query: "product"                │
├─────────────────────────────────────┤
│ 2. Filter by price <= $200           │
│    → Condition: price <= 200         │
├─────────────────────────────────────┤
│ 3. Extract items with rating >= 4.5  │
│    → Condition: rating >= 4.5        │
├─────────────────────────────────────┤
│ 4. Send to webhook                   │
│    → Destination: webhook.site/xyz   │
├─────────────────────────────────────┤
│ 5. Schedule daily at 9 AM            │
│    → Schedule: cron(0 9 * * *)       │
└─────────────────────────────────────┘
```

**Monetization Tiers**:

- Free: 100 executions/month
- Pro: $29/month for 10,000 executions
- Enterprise: Custom pricing for unlimited usage

**Target User Base**:

- E-commerce sellers (competitive price monitoring)
- Marketing professionals (social media automation)
- Researchers (data collection)
- General users (price tracking, notifications)

---

### 3.3 Specialized Vision Language Model Development

#### Current VLM Limitations

**Proprietary Models (GPT-4 Vision, Claude 3.5 Sonnet)**:
- High accuracy (72-74%)
- Significant cost ($0.01-0.05 per image)
- Processing latency (2-4 seconds per image)
- External API dependency

**Open-Source Alternatives (Qwen2-VL, LLaVA)**:
- Self-hosting capability
- Lower operational costs
- Reduced accuracy (60-70%)
- Limited web UI specialization

#### Sela VLM Objectives

**Model Specifications**:

```
Model designation: Sela-VLM-1
Purpose: Web UI element recognition specialist
Training data: 1M+ labeled webpage screenshots
Parameters: 7B-13B (efficiency optimized)
Target accuracy: 85%+ (web UI domain)
Inference speed: <500ms per image
Memory footprint: <8GB (consumer GPU compatible)
```

**Training Data Sources**:

- Production network data (with user consent)
- Synthetic data generation using diffusion models
- Crowdsourced labeling from community contributors

**Deployment Strategy**:

- Phase 1: Cloud API (GPT-4V alternative)
- Phase 2: Edge deployment (node-level inference)
- Phase 3: Hardware acceleration (2027+)

---

## Phase 4: Global Standard (2027 - 2030)

**Primary Objective**: Establish Sela as the global standard for AI-web interaction

### 4.1 Large-Scale Node Network

#### Growth Projections

**DePIN Growth Patterns**:

Filecoin's network growth trajectory:
- 2020 Mainnet: ~500 nodes
- 2021: ~3,000 nodes
- 2022: ~10,000 nodes
- 2024: ~20,000 nodes (estimated)

Render Network accumulated over 100,000 participants in its waitlist, implementing controlled onboarding processes.

**Sela Conservative Estimates**:

```
2025: 3,000-5,000 nodes (Phase 1-2)
2026: 15,000-25,000 nodes (Phase 3, marketplace effect)
2027: 50,000-75,000 nodes (Phase 4 initial)
2028-2030: 100,000+ nodes (global expansion)
```

**Geographic Distribution Targets (2027)**:

```
North America: 30% (30,000 nodes)
Europe: 25% (25,000 nodes)
Asia: 35% (35,000 nodes)
Other regions: 10% (10,000 nodes)
```

**Incentive Optimization**:

- 2x rewards for underserved geographic regions
- 1.5x rewards for high-performance enterprise tier nodes
- 20% bonus for 99%+ uptime achievement

---

### 4.2 Industry Standards and Protocol Proposals

#### Web Interaction Protocol (WIP)

**Objective**: Establish a universal AI-web communication standard analogous to HTTP

**Proposed Specification**:

```
Protocol: wip://
Version: 1.0
Features:
- Semantic action primitives (click, scroll, extract)
- Verifiable response format (zk-TLS proof inclusion)
- Cross-platform browser compatibility
```

**Example Request**:

```
wip://amazon.com/search?q=product&action=extract&format=json&verify=true

Response:
{
  "data": {...},
  "proof": {
    "type": "zk-tls",
    "signature": "0x...",
    "timestamp": "2027-01-15T10:30:00Z"
  }
}
```

#### Standards Organization Collaboration

**W3C (World Wide Web Consortium)**:
- AI Agent User Agent Specification proposal
- Verifiable Web Data Standard discussion

**IEEE**:
- Decentralized Web Automation Standard
- Academic publication and peer review

**IETF (Internet Engineering Task Force)**:
- zk-TLS RFC proposal
- Web Proof Protocol standardization

**Timeline**:

```
2027: Initial draft submission
2028: Industry feedback incorporation
2029: Standard approval target
2030: Major browser adoption
```

---

### 4.3 Global Partnerships

#### AI Platform Integration

**OpenAI GPT Store**:
- Sela plugin release
- Target: 1M+ monthly active users

**Google Gemini / Anthropic Claude**:
- Native API-level integration
- Enterprise customer co-targeting

**Microsoft Copilot**:
- Office 365 integration
- Web research with verifiable sources

#### Projected Scale (2027)

```
Node operators: 100,000+
Marketplace developers: 10,000+
Published apps/parsers: 50,000+
Monthly API calls: 1B+
Enterprise customers: 1,000+
End users: 10M+
```

**Revenue Model Diversification**:

1. **API usage fees**: $10M-50M annually
2. **Enterprise subscriptions**: $20M-100M annually
3. **Marketplace commission**: $5M-20M annually
4. **Token utility**: Variable based on network activity

---

## Risk Management and Contingency Planning

### Technical Risks

**Risk 1: VLM Accuracy Below Target**

Current state-of-the-art vision language models achieve 72-74% accuracy on UI tasks. Specialized models like ScreenAI and enhanced approaches like OmniParser have demonstrated higher performance on specific benchmarks.

- **Mitigation**: Hybrid DOM + VLM approach maintains commercial viability at 80%+ accuracy
- **Alternative**: Continuous improvement of open-source VLM implementations

**Risk 2: zk-TLS Performance Issues**

Multi-party computation protocols exhibit latency sensitivity, which can affect consistency.

- **Mitigation**: Geographic distribution of notary nodes, exploration of VOLE-based protocols
- **Alternative**: Selective verification (zk-TLS only for high-trust requirements)

**Risk 3: Bot Detection Technology Advancement**

Bot detection systems continue to evolve with behavioral pattern analysis and advanced fingerprinting.

- **Response**: Real browser environments provide fundamental differentiation; machine learning-based human behavior modeling
- **Monitoring**: Continuous tracking of bypass success rates and adaptive countermeasures

### Market Risks

**Risk 4: Competitive Intensification**

Centralized browser automation providers continue to receive significant investment.

- **Response**: Decentralization combined with zk-TLS verification provides unique positioning; substantial cost advantages through token-based incentive model

**Risk 5: AI Agent Market Growth Deceleration**

Current projections indicate 45.8% CAGR for the AI agents market through 2030.

- **Conservative scenario**: Even at 30% CAGR, market reaches $30B+ by 2030
- **Response**: Parallel targeting of web scraping market ($2.87B by 2034)

**Risk 6: Token Price Volatility**

Cryptocurrency price volatility affects staking reward calculations and network economics.

- **Response**:
  - Real yield model emphasizing actual revenue distribution over token emission
  - Dynamic reward adjustment based on network utilization
  - Token burn mechanisms tied to transaction fees

### Regulatory Risks

**Risk 7: Web Scraping Regulation**

Many websites prohibit scraping in terms of service agreements. Legal precedents remain inconsistent.

- **Response**:
  - Clear guidelines restricting usage to lawful purposes
  - Optional robots.txt compliance enforcement
  - Legal counsel and appropriate insurance coverage

---

## Core Principles

### 1. Phased Validation

Each development phase depends on successful completion of prior phases. Delays are acceptable to ensure proper validation before progression.

### 2. Community-Centric Development

Quarterly incorporation of feedback from node operators, developers, and users into roadmap adjustments.

### 3. Transparent Operations

Quarterly progress reports including:

- Node count and geographic distribution
- API call volume
- Enterprise customer count (anonymized)
- Technical milestone completion status

### 4. Sustainable Economics

Prevention of excessive token inflation through real yield-based reward design.

---

## Milestone Summary

```
2024 Q4-2025 Q2 (Phase 1: Foundation)
    ↓
  Beta network (1,000-3,000 nodes)
  Semantic rendering engine
  AI framework integration
    ↓
2025 Q2-Q3 (Phase 2: Verification)
    ↓
  zk-TLS protocol integration
  Session Cloud
  50+ enterprise customers
    ↓
2025 Q4-2026 Q4 (Phase 3: Marketplace)
    ↓
  Agent application marketplace
  No-code builder
  Specialized VLM development
    ↓
2027-2030 (Phase 4: Global Standard)
    ↓
  100,000+ node network
  W3C/IEEE standardization
  Global partnerships
```

---

## Key Metrics for Stakeholders

### Total Addressable Market

**2024**:
- AI Agents: $5.4B
- Web Scraping: $754M
- Combined: ~$6.15B

**2030**:
- AI Agents: $50.31B
- Web Scraping: ~$2B
- Combined: ~$52B

**Sela TAM** (15-25% market share assumption):
- Conservative: $8B
- Optimistic: $13B

### Competitive Advantages

1. Only decentralized solution with cryptographic verification
2. Significant cost reduction compared to centralized alternatives
3. DePIN token economics enabling network effects
4. Open-source community preventing vendor lock-in

### Projected Growth Trajectory

```
Year | Nodes | API Calls/Month | Annual Revenue
2025 | 3K    | 10M             | $1-2M
2026 | 20K   | 100M            | $10-20M
2027 | 70K   | 500M            | $50-100M
2028 | 100K+ | 1B+             | $100-200M
```

These projections are forward-looking estimates subject to significant variation based on market conditions, competitive dynamics, and technological developments.

---

## Developer Participation

### Getting Started

**1. Node Operation**:
- Install Chrome extension (5 minutes)
- Stake 100 SELA tokens
- Earn 10-2,000 SELA monthly rewards

**2. Parser/Script Development**:
- Download SDK (Python/JavaScript)
- Publish to marketplace
- Receive 70% sales revenue plus bonuses

**3. Enterprise Solution Development**:
- API documentation
- Framework integration
- Customer resale opportunities

### Technology Stack

**Frontend**: React, TypeScript
**Backend**: Node.js, Python, Rust
**Blockchain**: Ethereum, Polygon, Solana
**AI/ML**: PyTorch, Transformers, LangChain
**Cryptography**: zk-SNARKs, MPC, TLS 1.3

---

## Conclusion

Sela Network represents a strategic approach to establishing decentralized infrastructure for AI-agent web interaction. This roadmap prioritizes validated market data, realistic technical objectives, and transparent risk management.

The network commits to:

- Quarterly transparent progress reporting
- Community feedback integration
- Conservative projections with delivery emphasis
- Sustainable token economics

Sela Network invites developers, node operators, and enterprises to participate in building the foundational infrastructure for AI agent interaction with the web.
