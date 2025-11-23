---
title: Node Operator Complete Guide
description: Comprehensive guide to operating Sela Network browser nodes and participating in decentralized web infrastructure
---

## Overview

Node operators provide the distributed physical infrastructure that powers this network, contributing browser compute resources in exchange for token-based compensation. Unlike cryptocurrency mining that requires specialized hardware, operating a Sela node utilizes standard computing devices through installed software.

This guide provides comprehensive instructions for establishing, operating, and optimizing Sela browser nodes.

---

## Node Operator Role

When operating a Sela node, you provide essential infrastructure components:

**Browser Compute Resources**: Your device executes browser automation tasks requested by AI agents, including page rendering, form interaction, data extraction, and multi-step web workflows.

**Geographic Distribution**: Your physical location enables AI agents to access region-restricted content and present as local users to target websites.

**Residential Network Connectivity**: Home and office internet connections provide authentic residential IP addresses that bypass anti-bot detection systems more effectively than datacenter IP ranges.

**Network Resilience**: Distributed nodes eliminate single points of failure, ensuring the network maintains operational continuity despite individual node unavailability.

---

## Economic Model

Node operators earn SELA tokens through a stake-based reward system. Higher stake amounts unlock greater earning potential, while performance metrics determine actual rewards received.

### Tier Structure

The network implements a tiered staking model that balances accessibility with incentive alignment:

| Tier         | Stake Required | Hardware Requirements                                |
| ------------ | -------------- | ---------------------------------------------------- |
| **Bronze**   | 100 SELA       | Standard laptop or desktop                           |
| **Silver**   | 500 SELA       | Reliable internet connection and consumer-grade CPU  |
| **Gold**     | 2,000 SELA     | Dedicated PC with stable broadband                   |
| **Platinum** | 10,000 SELA    | Server-grade hardware with high-bandwidth connection |
| **Diamond**  | 50,000 SELA    | Professional datacenter or colocation environment    |

### Earnings Calculation

Node rewards derive from multiple factors that incentivize reliability and performance:

```
Base Reward = Tier Multiplier × Tasks Completed × Task Value

Performance Bonus = Base Reward × (Uptime Percentage × 0.3 + Speed Percentile × 0.2 + Success Rate × 0.5)

Geographic Bonus = Base Reward × Regional Demand Factor

Total Earnings = Base Reward + Performance Bonus + Geographic Bonus
```

**Performance Factors**:

**Uptime**: Measures node availability. Consistent operation maximizes task allocation.

**Speed**: Task completion latency relative to network average. Faster nodes receive priority allocation.

**Success Rate**: Percentage of tasks completed successfully without errors or timeouts.

**Geographic Demand**: Regional multipliers based on current network demand for specific geographic locations.

### Economic Sustainability

The token economy aligns incentives across ecosystem participants through a self-reinforcing cycle:

**Developer demand** for browser automation services generates transaction fees paid in SELA tokens.

**Node operator supply** expands as token rewards compensate compute resource provision and operational overhead.

**Staking requirements** create capital commitment that secures network quality and discourages malicious behavior.

**Marketplace fees** from data templates and verification services support ongoing protocol development.

Increased AI agent adoption drives developer demand, attracting node operators through higher yields, which expands network capacity and reliability, further accelerating adoption.

---

## System Requirements

### Minimum Requirements

Entry-level node operation requires modest hardware specifications:

**Processor**: Dual-core CPU or equivalent

**Memory**: 4GB RAM minimum, 8GB recommended

**Storage**: 20GB available space, SSD preferred for performance

**Graphics**: Integrated graphics sufficient

**Network**: 5 Mbps download, 2 Mbps upload minimum

**Operating System**: Windows 10 or later, macOS 11 or later, modern Linux distribution

**Internet Service**: Stable residential connection with latency under 200ms to major network hubs

### Recommended Configuration

Higher-tier operation benefits from improved hardware:

**Processor**: Quad-core or better

**Memory**: 16GB RAM or greater

**Storage**: 50GB or more on SSD

**Graphics**: Dedicated GPU for accelerated rendering

**Network**: 25 Mbps download, 10 Mbps upload or higher

**Connection**: Wired Ethernet preferred over wireless for latency and stability

**Environment**: Stable power supply with UPS backup, dedicated device not shared with intensive personal use

### Professional Operation

Datacenter-grade infrastructure for maximum performance:

**Processor**: Server-class CPU with 8 or more cores

**Memory**: 32GB RAM minimum

**Storage**: 100GB or more on NVMe SSD

**Network**: Business-grade internet with 100 Mbps or greater symmetric bandwidth

**Infrastructure**: Professional hosting with redundant power, climate control, and high availability

---

## Installation and Configuration

### Acquiring Stake

Before operating a node, acquire the minimum SELA token stake for your target tier through decentralized exchanges, centralized exchange platforms, or direct purchase arrangements.

### Software Installation

**Browser Extension Method**:

Suitable for Bronze and Silver tiers requiring minimal configuration.

1. Install the Sela Network browser extension from your browser's extension marketplace
2. Activate the extension and grant necessary permissions
3. Connect your Web3 wallet through MetaMask or WalletConnect
4. Stake tokens by selecting your tier and confirming the transaction
5. Toggle node status to active to begin accepting tasks

**Desktop Application Method**:

Recommended for Gold tier and above for enhanced control and performance.

Download and install the Sela Node application appropriate for your operating system. Launch the application, connect your wallet, stake the required tokens, and configure operational parameters through the application interface.

**Container Deployment Method**:

Advanced deployment for Platinum and Diamond tier operators managing multiple nodes or requiring infrastructure automation.

Deploy Sela node containers using Docker or Kubernetes orchestration platforms. Configure environment variables for wallet address, tier selection, and resource allocation. Enable persistent storage volumes for configuration and state management.

### Configuration Parameters

**Essential Settings**:

```yaml
wallet_address: "0xYourWalletAddress"
tier: "silver"
max_concurrent_tasks: 3
geographic_preference: "auto"
bandwidth_limit: "100mbps"
```

**Performance Optimization**:

```yaml
render_mode: "gpu"
cache_strategy: "aggressive"
proof_generation: true
connection_pool: 10
firewall_mode: "strict"
auto_update: true
```

Configuration files typically reside in the user's home directory or application installation path. Modify parameters to match hardware capabilities and operational objectives.

### Verification

Confirm operational status through command-line interface or web dashboard:

```bash
sela-node status
```

Expected output displays active status, current tier, staked amount, uptime percentage, recent task completion count, and estimated earnings.

Access the web dashboard to monitor real-time earnings, performance metrics, and pending rewards.

---

## Optimization Strategies

### Maximizing Uptime

Earnings correlate directly with node availability. A node offline for one hour loses approximately 4.2% of potential daily earnings.

**Best Practices**:

- Operate nodes on dedicated hardware rather than devices used for other purposes
- Enable automatic restart on system boot
- Implement monitoring with alerting for downtime incidents
- Deploy uninterruptible power supplies to handle electrical disruptions
- Use automated health checks that restart failed processes

**Monitoring Implementation**:

Create monitoring scripts that periodically verify node process status and automatically restart if necessary. Schedule these checks to run at frequent intervals through system task schedulers.

### Geographic Positioning

Certain geographic regions experience higher demand for node services due to:

- Region-restricted content access requirements
- Regulatory compliance mandating local data collection
- Language and cultural specificity needs
- Market concentration in particular territories

Nodes located in high-demand regions receive geographic bonus multipliers that increase effective earnings. If you have access to infrastructure across multiple locations, distribute nodes to capitalize on regional demand variations.

### Hardware Performance

Task completion speed directly impacts earnings volume. Faster nodes complete more tasks per unit time, generating higher daily rewards.

**Performance Enhancements**:

- Deploy solid-state storage for reduced page load latency
- Allocate sufficient memory to prevent resource contention
- Enable GPU acceleration for rendering operations
- Use wired network connections to minimize latency variance
- Configure aggressive caching for frequently accessed sites

**Performance Benchmarking**:

Test node performance using the built-in benchmark utility to identify optimization opportunities. Target metrics include page load time under 500ms, element interaction latency under 50ms, and screenshot generation under 150ms.

### Premium Task Specialization

Certain task categories command premium reward rates:

**zkTLS Proof Generation**: Cryptographic verification tasks that generate zero-knowledge proofs of data provenance offer significantly higher compensation.

**Authenticated Workflows**: Multi-step processes requiring login and session management provide premium rewards.

**Financial Data Extraction**: High-value financial information retrieval pays enhanced rates but may require identity verification for regulatory compliance.

**Real-Time Trading Data**: Time-sensitive market data collection commands premium compensation.

Enable premium task categories in configuration to receive allocation of higher-value work. Some categories require identity verification to satisfy regulatory requirements.

### Multi-Node Operation

Operating multiple nodes compounds earnings potential through geographic diversification and capacity multiplication.

Distribute nodes across different physical locations to capture geographic bonuses while expanding total processing capacity. Centralized management tools enable monitoring and control of multiple node instances through unified interfaces.

Calculate optimal allocation between multiple lower-tier nodes versus single higher-tier nodes based on hardware availability, geographic access, and capital constraints.

---

## Security and Privacy

### Execution Isolation

Sela nodes execute browser tasks in isolated environments to protect operator privacy and system security:

**Technical Implementation**:

- Separate browser profiles for each task prevent state contamination
- Automatic data clearing after task completion removes persistent artifacts
- No access to operator's personal browser data or local files
- Sandboxed execution through browser-native isolation mechanisms prevents malicious code execution

Verify isolation status through the security diagnostic interface to confirm proper configuration.

### Data Privacy

**Operator Data Protection**:

The node software cannot access personal browsing history, saved passwords, bookmarks, browser extensions, or local files. Isolation mechanisms ensure task execution remains completely separate from operator's personal computing activities.

**Network Visibility**:

The network observes IP address for geographic routing, browser type and version for compatibility management, and task completion metrics for reward calculation. No other operator data is collected or transmitted.

### Network Security

Configure firewall rules to allow necessary network traffic while maintaining security:

Allow inbound connections on the node communication port and outbound HTTPS/HTTP traffic for web access. Block all other unnecessary ports to minimize attack surface.

Maintain system and application security updates to address vulnerabilities. Enable automatic updates in configuration for security patches.

---

## Monitoring and Maintenance

### Performance Metrics

Monitor key performance indicators through the dashboard interface:

**Uptime**: Current availability percentage and historical downtime incidents. Target 99% or higher for optimal earnings.

**Task Completion Rate**: Ratio of successful to total tasks attempted. Target 95% or higher to avoid performance penalties.

**Response Time**: Task execution latency including percentile distributions. Compare against network average to identify performance issues.

**Earnings**: Daily, weekly, and monthly reward trends showing pending and claimed amounts.

### Troubleshooting Common Issues

**Low Task Volume**:

Insufficient task allocation may result from low regional demand or tier oversaturation. Consider tier upgrades for priority allocation, enable premium task categories, or evaluate geographic repositioning.

**High Failure Rate**:

Excessive task failures typically indicate inadequate resources or connectivity issues. Verify internet speed meets requirements, update browser engine to latest version, increase resource allocation in configuration, and review diagnostic reports for specific error patterns.

**Delayed Rewards**:

Verify minimum withdrawal thresholds have been met. Confirm reward distribution schedule alignment. Validate wallet address accuracy in configuration.

**Unexpected Downtime**:

Enable automatic restart functionality in configuration. Review system logs to identify crash causes. Verify adequate system resources remain available. Report persistent issues through support channels.

### Diagnostic Tools

The node software includes comprehensive diagnostic utilities:

```bash
sela-node diagnostic --full
```

Diagnostic checks verify internet connectivity, browser engine status, wallet connection, firewall configuration, resource availability, and performance benchmarks. Generate diagnostic reports for troubleshooting or support requests.

---

## Reward Distribution

### Distribution Schedule

Rewards accumulate continuously based on task completion but distribute according to a fixed schedule:

Tasks completed throughout the week generate earned rewards. Weekly distribution snapshots calculate final amounts and transfer tokens to operator wallets. Rewards become available for withdrawal immediately after distribution.

### Withdrawal Process

Check pending reward balance through command-line interface or web dashboard. Initiate withdrawals once minimum threshold is met. Transaction fees are deducted from reward balance.

### Record Keeping

Export earnings reports for tax and accounting purposes. Generated reports include task completion dates, token amounts earned, market value at time of distribution, and transaction identifiers.

Consult qualified tax professionals regarding reporting requirements in your jurisdiction, as regulations vary significantly across countries and regions.

---

## Tier Upgrades

### Increasing Stake

Upgrade to higher tiers by increasing staked token amount:

```bash
sela-node stake increase --amount [additional_tokens]
```

Confirm the transaction through your wallet. New tier status activates immediately after blockchain confirmation. Higher tiers provide improved task priority, enhanced multipliers, access to premium task categories, and increased earnings potential.

### Hardware Migration

When upgrading physical hardware, export node configuration from the original device and import on the new system. Stake, tier, and operational history transfer seamlessly without requiring new staking transactions.

---

## Advanced Operations

### Enterprise-Scale Deployment

Organizations operating large node fleets benefit from infrastructure automation:

Deploy containerized nodes through Kubernetes orchestration for centralized management and scaling. Implement monitoring infrastructure using observability platforms. Automate provisioning and configuration through infrastructure-as-code tools. Distribute nodes geographically through multi-region cloud or colocation deployments.

### Penalty Mechanisms

The network implements stake-based penalties for malicious or negligent behavior:

**Slashable Violations**:

- Data tampering: Significant stake reduction
- Fraudulent cryptographic proofs: Major to complete stake loss
- Extended unavailability: Moderate stake penalty
- Security breaches: Substantial stake reduction

**Protection Mechanisms**:

Minor technical failures generate warnings without penalties. Unintentional errors exempt from slashing with available appeal processes. Governance mechanisms review disputed cases.

**Prevention Best Practices**:

Maintain current software versions, monitor node health proactively, never manipulate task data, sustain adequate uptime, and implement robust security practices.

---

## Support Resources

### Documentation

Comprehensive technical documentation covers all aspects of node operation, configuration, troubleshooting, and optimization.

### Community Channels

Node operator communities provide peer support, knowledge sharing, and real-time assistance through forum discussions and chat platforms.

### Technical Support

Official support channels address complex technical issues, account problems, and escalated concerns requiring development team involvement.

**Support Request Preparation**:

Generate diagnostic reports before contacting support. Include node identifier, tier level, operating system details, issue description, and diagnostic output in support requests for faster resolution.

---

## Conclusion

Operating a Sela Network node enables participation in decentralized infrastructure supporting the AI agent ecosystem while generating token-based compensation. The network's design provides accessible entry points through Bronze and Silver tiers while offering scaling opportunities for professional operators through Platinum and Diamond tiers.

Success as a node operator requires:

**Operational reliability** through consistent uptime and system maintenance

**Strategic tier selection** matching available resources and capital

**Performance optimization** to maximize task throughput and earnings efficiency

**Geographic awareness** of regional demand variations and positioning opportunities

**Security diligence** to protect operator privacy and maintain network integrity

As AI agent adoption expands, demand for decentralized web interaction infrastructure grows proportionally. Node operators providing reliable, high-performance infrastructure capture value from this fundamental technology transition enabling autonomous systems to interact with the web at scale.

The system's economic model creates sustainable incentives through developer demand for services, node operator supply of infrastructure, staking-based security mechanisms, and marketplace-driven value capture. This self-reinforcing cycle positions node operators to benefit from long-term growth in AI agent utilization across industries and applications.
