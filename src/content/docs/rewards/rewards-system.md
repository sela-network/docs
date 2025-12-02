---
title: Rewards System Overview
description: Comprehensive overview of Sela Network's incentive and rewards architecture
---

## Design Principles

Sela Network's rewards system is designed to ensure sustainable network growth and equitable value distribution among participants in a decentralized infrastructure.

### Core Principles

**Contribution-Proportional Rewards**

Rewards are distributed in proportion to network contribution. Node operators receive differentiated compensation based on request volume processed, performance tier, and uptime. Developers earn revenue based on ecosystem tool usage and quality.

**Long-Term Participation Incentives**

Vesting mechanisms are applied to encourage long-term contribution over short-term speculation. Staking requirements and performance-based reward structures ensure stable network operation.

**Transparency**

All reward distributions are recorded on-chain and verifiable by anyone. Smart contracts execute automatically according to predefined rules, implementing a trustless reward system.

**Sustainability**

The system maintains a virtuous cycle where the reward pool expands naturally as network usage increases. Token burn mechanisms and treasury management ensure long-term economic stability.

---

## Participant Roles and Rewards

### Node Operators

Node operators provide web access infrastructure to AI agents by operating distributed browser nodes within the network.

**Reward Components:**

- Base network rewards: Distributed per epoch proportional to staking ratio
- API request processing fees: Direct compensation for processed requests (70% of fees)
- Performance incentives: Bonuses based on response time, uptime, and success rate (up to +30%)
- Staking rewards: Base yield on tokens provided as network security collateral

**Tier Structure:**

Node operators are classified into tiers based on staking amount: Bronze (100 SELA), Silver (500 SELA), Gold (2,000 SELA), Platinum (10,000 SELA), and Diamond (50,000 SELA). Higher tiers receive priority task assignment, governance participation rights, and dedicated support.

---

### Developers

Developers extend network functionality by creating ecosystem tools, parsers, scripts, and SDKs.

**Reward Components:**

- Marketplace sales revenue: 70% of parser and script sales proceeds
- Grant program: Funding for projects contributing to ecosystem development
- Bug bounty: Rewards for security vulnerability discovery and reporting
- Open-source contribution rewards: Incentives for core protocol improvement contributions

**Marketplace Revenue Distribution:**

```
Parser sale price: Developer-determined
  ├─ 70% → Developer
  ├─ 20% → Protocol treasury
  └─ 10% → Token burn
```

---

### Users

Individual and enterprise users who utilize the platform and participate in the community.

**Incentive Structure:**

- Points system: Earn Sela Points proportional to API usage
- Early adopter bonus: Additional points and token rewards for initial users
- Referral program: Rewards for both referrer and referee upon new user acquisition
- Governance participation: Token holders participate in network policy decisions through voting

**Points-to-Token Conversion:**

Sela Points is an off-chain point system convertible to $SELA tokens upon meeting certain conditions. Points can be used for API discounts, premium feature access, and other purposes.

---

## Token Economics

### $SELA Token Functions

$SELA is the native utility token of Sela Network, serving the following functions:

**Network Fees**

AI agents pay fees in $SELA when calling APIs or requesting zk-TLS proofs. Fees are dynamically adjusted based on network congestion, request complexity, and region.

**Staking Collateral**

Node operators must stake a minimum of 100 SELA to acquire network participation eligibility. Staking acts as security collateral and is subject to slashing (partial or full forfeiture) for malicious behavior.

**Governance**

$SELA holders possess voting rights on network policies, protocol upgrades, and treasury expenditures. Voting power is proportional to holdings and staking duration.

**Marketplace Payments**

Parsers, scripts, and datasets created by developers are purchased with $SELA. The marketplace is a core mechanism for network ecosystem expansion.

---

## Reward Distribution Mechanisms

### Automated Distribution

**Smart Contract-Based Execution**

All rewards are distributed automatically through blockchain smart contracts. Execution is fair according to predefined rules without human intervention, with all transactions transparently recorded on-chain.

**Distribution Cycles**

| Reward Type          | Distribution Cycle | Method    | Description                                               |
| -------------------- | ------------------ | --------- | --------------------------------------------------------- |
| API fees             | Real-time          | Automatic | Paid to node operators immediately upon processing        |
| Base network rewards | Per epoch          | Automatic | Periodic distribution proportional to staking ratio       |
| Performance bonuses  | Weekly             | Automatic | Bonuses paid by tier after performance metric aggregation |
| Grant program        | Upon milestone     | Manual    | Approval and payment after project progress review        |

### Fee Structure

**API Usage Fees**

Per-request cost varies dynamically based on network demand, request complexity, and node region. Expected range is 0.001~0.1 SELA.

**Fee Distribution:**

```
User-paid fee: 100%
  ├─ 70% → Request processing node operator
  ├─ 20% → Protocol treasury (development, operations, grant program)
  └─ 10% → Burn (deflationary mechanism)
```

**Variable Factors:**

- Network congestion: Fees increase with rising demand
- Request complexity: Additional fees for VLM analysis and zk-TLS proof generation
- Node region: Fees increase in regions with rising node demand

---

## Slashing

### Purpose and Principles

Slashing is an economic penalty mechanism in Proof of Stake networks designed to prevent malicious or negligent behavior. Staked tokens serve as collateral to ensure honest node operator conduct.

### Violation Types and Penalties

**Severe Violations (Immediate Full Forfeiture):**

- Data manipulation: Providing false data in API responses
- Fraudulent proof generation: Forgery or manipulation of zk-TLS proofs
- Network attacks: Participation in DDoS, Sybil attacks, etc.
- Double signing: Simultaneous execution of identical validator keys on multiple nodes

**Minor Violations (Warnings and Progressive Penalties):**

| Violation Type          | 1st Violation | 2nd Violation        | 3rd Violation        |
| ----------------------- | ------------- | -------------------- | -------------------- |
| Low performance (< 80%) | Warning       | 10% reward reduction | 30% reward reduction |
| Downtime (< 95%)        | Warning       | Warning              | 20% reward reduction |
| SLA violation           | Warning       | 5% reward reduction  | Temporary suspension |

**Penalty Structure:**

Slashing consists of three stages: immediate penalty, exit waiting period, and correlation penalty (penalties increase when multiple nodes simultaneously violate). Slashed nodes cannot rejoin the network and require new validator keys and staking.

---

## Ecosystem Fund

### Treasury Management

**Revenue Sources:**

- Protocol fees: 20% of API fees
- Marketplace fees: 20% of parser sales revenue
- Partnership revenue: Corporate partnerships and licensing agreements

**Expenditure Allocation:**

```
Total treasury income: 100%
  ├─ 40% → Grant program (ecosystem development support)
  ├─ 30% → Marketing and growth (user acquisition, partnerships)
  ├─ 20% → R&D (protocol improvement, new technology research)
  └─ 10% → Emergency reserves (network crisis response)
```

**Governance:**

Treasury expenditures are determined through $SELA token holder voting. All proposals are published on-chain, with voting results and expenditure details transparently recorded.

---

## Points Program

### Sela Points

**Concept:**

Sela Points is an off-chain point system earned through API usage, community participation, and network contributions. Points are convertible to $SELA tokens upon meeting certain conditions.

**Earning Methods:**

- API usage: Points accrual per request
- Early adopter bonus: Multiplier bonuses for initial users
- Referral: Points awarded to both referrer and referee
- Community contribution: Bug reports, documentation contributions, educational content creation

**Utilization Methods:**

- $SELA token exchange: Conversion to tokens upon point accumulation
- API discounts: Fee discounts when using points
- Premium features: Access to advanced analysis tools and priority support
- Marketplace purchases: Point usage for parser and script purchases

[Points System Details →](/rewards/points/)

---

## Getting Started

### Node Operator Participation

**Requirements:**

- Minimum 100 SELA staking (varies by tier)
- Recommended hardware: Dual-core CPU, 8GB RAM, 128GB SSD, 10 Mbps network
- Browser extension or standalone node software installation

**Startup Procedure:**

1. Create Sela Network account and complete KYC
2. Connect wallet and deposit minimum staking amount
3. Install and configure node software
4. Begin network participation and request processing

### Developer Participation

**Requirements:**

- Developer account creation
- SDK and API documentation familiarity
- Parser or script development capability

**Startup Procedure:**

1. Create account on developer portal
2. Download SDK and configure local development environment
3. Develop and test parser or script
4. Register on marketplace and begin sales

### User Participation

**Requirements:**

- Email or social account
- API usage purpose and expected usage volume

**Startup Procedure:**

1. Sign up on Sela Network website
2. Issue API key
3. Begin API calls and point accrual
4. Exchange points for tokens or utilize discount benefits

---

## Reward Calculation Examples

### Node Operator Revenue Projection

**Silver Node (S-tier Performance):**

```
Staking: 500 SELA
Monthly requests processed: 5,000
Average fee per request: 0.02 SELA
Performance tier: S (98% uptime, excellent response time)

Monthly projected revenue:
  Base network rewards: 50 SELA
  API fees: 5,000 × 0.02 × 0.7 = 70 SELA
  Performance bonus: 50 × 0.30 = 15 SELA
  Total revenue: 135 SELA

Operating costs:
  Electricity: $5/month (home PC)
  Internet: $0 (existing internet usage)
  Total cost: $5/month

Net revenue: 135 SELA - $5 equivalent
Monthly yield: 27% (assuming stable token price)
```

### Developer Revenue Projection

**Popular Parser Creator:**

```
Parser price: 30 SELA
Monthly sales: 15 units
Developer revenue ratio: 70%

Monthly revenue:
  Sales revenue: 15 × 30 × 0.7 = 315 SELA

Additional revenue (optional):
  Grant program: 500 SELA (one-time)
  Bug bounty: 100 SELA (upon vulnerability discovery)

Total revenue: 315 SELA (recurring) + 600 SELA (non-recurring)
```

**Disclaimer:**

All figures are examples and do not guarantee actual returns. Actual rewards vary based on network usage, token market price, competing node count, performance tier, and other factors. Cryptocurrency investment is high-risk with possibility of principal loss.

---

## FAQ

**Q: When are rewards received?**

A: Varies by reward type. API fees accumulate in real-time and are automatically paid upon reaching threshold. Base network rewards are distributed per epoch, and performance bonuses are distributed weekly.

**Q: What is the minimum staking amount?**

A: Bronze Node requires 100 SELA, Silver Node 500 SELA, Gold Node 2,000 SELA, Platinum Node 10,000 SELA, and Diamond Node 50,000 SELA.

**Q: Can revenue be predicted?**

A: Network usage and token price fluctuate based on market demand, making accurate prediction difficult. Past returns do not guarantee future returns.

**Q: What is the slashing risk level?**

A: Slashing risk is very low when operating nodes honestly and adhering to recommended specifications. Most slashing results from intentional malicious behavior or critical errors such as running identical validator keys on multiple nodes.

**Q: How are taxes handled?**

A: Tax treatment of cryptocurrency rewards varies by country. Verify local tax laws and consult tax professionals as needed. Sela Network does not provide tax advice.

---

**Disclaimer:**

All figures and examples in this document are for illustrative purposes and do not guarantee actual rewards. Cryptocurrency investment is high-risk with possibility of principal loss. Conduct thorough research and risk assessment before investing.
