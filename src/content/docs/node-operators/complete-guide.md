---
title: Node Operator Complete Guide
description: Step-by-step guide to running a Sela Network browser node and earning rewards
---

## Overview

Sela Network operates as a [Decentralized Physical Infrastructure Network (DePIN)](https://www.iex.ec/academy/depin-sector-trends-market-cap), where individuals contribute browser compute resources in exchange for token rewards. Unlike mining operations that require specialized hardware, running a Sela node simply involves installing software on devices you already own.

This guide provides comprehensive instructions for setting up, operating, and optimizing a Sela browser node to maximize earnings while contributing to the AI agent infrastructure ecosystem.

## What Node Operators Provide

When you run a Sela node, you provide:

**Browser Compute**: Your device executes browser automation tasks requested by AI agents, rendering web pages, filling forms, and extracting data.

**Geographic Diversity**: Your location enables AI agents to access region-locked content and appear as local users to websites.

**Residential IP**: Your home/office internet connection provides authentic residential IP addresses that bypass bot detection more effectively than datacenter IPs.

**Network Resilience**: Distributed nodes eliminate single points of failure, ensuring the network remains operational even if individual nodes go offline.

## Economic Model

Node operators earn $SELA tokens through a [stake-based reward system](https://multicoin.capital/2018/02/13/new-models-utility-tokens/). Higher stake unlocks higher earning potential, while performance metrics determine actual rewards received.

### Tier Structure (Realistic APY: 15-35%)

| Tier | Stake Required | Est. Monthly Earnings | APY Range | Hardware Req |
|------|----------------|----------------------|-----------|--------------|
| **Bronze** | 100 SELA | 1.25-3 SELA | 15-36% | Standard laptop/desktop |
| **Silver** | 500 SELA | 7-15 SELA | 17-36% | Reliable internet + CPU |
| **Gold** | 2,000 SELA | 30-60 SELA | 18-36% | Dedicated PC, >10 Mbps |
| **Platinum** | 10,000 SELA | 175-300 SELA | 21-36% | Server-grade, >50 Mbps |
| **Diamond** | 50,000 SELA | 900-1,500 SELA | 22-36% | Datacenter environment |

**Note**: APY figures assume $SELA price stability and represent *potential* earnings based on network utilization. Actual returns depend on uptime, geographic demand, and overall network activity. These rates align with [established DePIN projects](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024) like Helium and Filecoin.

### Earnings Calculation

```
Base Reward = Tier Multiplier × Tasks Completed × Task Value
Performance Bonus = Base Reward × (Uptime% × 0.3 + Speed% × 0.2 + Success% × 0.5)
Geographic Bonus = Base Reward × Regional Demand Factor (1.0-2.5x)

Total Earnings = Base Reward + Performance Bonus + Geographic Bonus
```

**Example (Silver Node, High Performance)**:
```
Tasks/day: 500
Avg task value: 0.02 SELA
Base: 500 × 0.02 × 1.2 (Silver multiplier) = 12 SELA/day

Performance:
- Uptime: 99.5% → +30% × 0.995 = +29.85%
- Speed: <400ms → +20%
- Success: 98% → +50% × 0.98 = +49%
Performance Bonus: 12 × 0.9885 = +11.86 SELA

Geographic (High Demand Region): 12 × 1.5 = +6 SELA

Total: 12 + 11.86 + 6 = 29.86 SELA/day (~900 SELA/month)
Monthly APY: (900/500) × 12 = 21.6%
```

## System Requirements

### Minimum Requirements (Bronze/Silver)

**Hardware**:
- CPU: Dual-core processor (Intel i3/Ryzen 3 or better)
- RAM: 4GB (8GB recommended)
- Storage: 20GB free space (SSD preferred)
- GPU: Integrated graphics sufficient

**Network**:
- Download: 5 Mbps minimum
- Upload: 2 Mbps minimum
- Latency: <200ms to major hubs
- Data cap: Unlimited or >500GB/month

**Operating System**:
- Windows 10/11
- macOS 11+ (Big Sur or later)
- Ubuntu 20.04+, Debian 11+, or other modern Linux distros

### Recommended Requirements (Gold/Platinum)

**Hardware**:
- CPU: Quad-core or better (Intel i5/i7, Ryzen 5/7)
- RAM: 16GB+
- Storage: 50GB+ SSD
- GPU: Dedicated GPU for faster rendering (optional but beneficial)

**Network**:
- Download: 25+ Mbps
- Upload: 10+ Mbps
- Latency: <100ms
- Data cap: Unlimited

**Environment**:
- Stable power supply (UPS recommended)
- Wired Ethernet connection (more reliable than Wi-Fi)
- Dedicated device (not shared with heavy personal use)

### Enterprise Requirements (Diamond)

**Hardware**:
- Server CPU: 8+ cores
- RAM: 32GB+
- Storage: 100GB+ NVMe SSD
- GPU: Optional rendering acceleration

**Network**:
- Business-grade internet: 100+ Mbps symmetric
- Static IP preferred
- Redundant connection optional

**Environment**:
- Datacenter or professional hosting
- 99.9%+ power uptime
- Climate-controlled

## Setup Guide

### Step 1: Acquire SELA Tokens

Before running a node, you must acquire the minimum stake for your desired tier.

**Option A: DEX Purchase (Decentralized)**
```bash
# Example: Uniswap via terminal
# 1. Connect wallet (MetaMask, WalletConnect)
# 2. Swap ETH/USDC for SELA
# 3. Confirm transaction
```

**Option B: CEX Purchase (Centralized Exchange)**
- Available on [list of supported exchanges TBD]
- Lower fees for large purchases
- Simpler for non-crypto-native users

**Option C: Private Sale / OTC**
- For large stakes (>10,000 SELA)
- Contact partnerships@sela.network

### Step 2: Install Sela Node Software

**Method A: Browser Extension (Easiest - Bronze/Silver)**

1. Download extension for your browser:
   - [Chrome/Edge Extension](https://chrome.google.com/webstore/sela-network)
   - [Firefox Add-on](https://addons.mozilla.org/firefox/sela-network)

2. Install and activate:
   ```
   Click "Add to Browser" → Grant permissions → Sign in with wallet
   ```

3. Connect wallet and stake:
   ```
   Extension → Settings → Connect Wallet (MetaMask/WalletConnect)
   → Stake Tokens → Select Tier → Confirm Transaction
   ```

4. Start earning:
   ```
   Toggle "Active" → Node begins accepting tasks automatically
   ```

**Method B: Desktop Application (Recommended - Gold+)**

Download the Sela Node application:

```bash
# macOS
curl -O https://download.sela.network/sela-node-macos.dmg
open sela-node-macos.dmg
# Drag to Applications folder

# Windows
# Download: https://download.sela.network/sela-node-windows.exe
# Run installer, follow prompts

# Linux (Ubuntu/Debian)
wget https://download.sela.network/sela-node-linux.deb
sudo dpkg -i sela-node-linux.deb
sudo systemctl start sela-node
```

**Method C: Docker (Advanced - Platinum/Diamond)**

```bash
# Pull Sela node image
docker pull selanetwork/browser-node:latest

# Run with persistent storage
docker run -d \
  --name sela-node \
  --restart unless-stopped \
  -v sela-data:/data \
  -e SELA_WALLET_ADDRESS=your_wallet_address \
  -e SELA_TIER=platinum \
  -p 9090:9090 \
  selanetwork/browser-node:latest

# Check logs
docker logs -f sela-node
```

### Step 3: Configuration

**Basic Settings (All Tiers)**:

```yaml
# config.yaml (located in ~/.sela/ or installation directory)
wallet_address: "0xYourWalletAddress"
tier: "silver"  # bronze, silver, gold, platinum, diamond
max_concurrent_tasks: 3  # Adjust based on hardware (1-10)
geographic_preference: "auto"  # or specific: "US", "EU", "APAC"
bandwidth_limit: "100mbps"  # Optional: cap usage
```

**Advanced Settings (Gold+)**:

```yaml
# Performance optimizations
render_mode: "gpu"  # Use GPU acceleration
cache_strategy: "aggressive"  # Pre-cache common sites
proof_generation: true  # Enable zkTLS (extra rewards)

# Network settings
use_ipv6: true  # If available
connection_pool: 10  # Max simultaneous connections

# Security
firewall_mode: "strict"  # Isolate task execution
auto_update: true  # Automatic security patches
```

### Step 4: Verify Operation

**Check node status**:

```bash
# CLI
sela-node status

# Expected output:
# Status: ACTIVE
# Tier: Silver
# Stake: 500 SELA
# Uptime: 99.8%
# Tasks completed (24h): 487
# Estimated earnings (24h): 11.2 SELA
```

**Dashboard access**:
Navigate to [https://dashboard.sela.network](https://dashboard.sela.network)
- Connect wallet
- View real-time earnings
- Monitor performance metrics
- Check pending rewards

## Maximizing Earnings

### Strategy 1: Optimize Uptime

Earnings are directly proportional to availability. A node offline for 1 hour loses 4.2% of potential daily earnings.

**Best Practices**:
- Run node on a dedicated device (not your daily laptop)
- Enable auto-restart on system boot
- Set up monitoring with uptime alerts
- Use UPS (uninterruptible power supply) for power stability

**Monitoring Script**:
```bash
#!/bin/bash
# check_sela_node.sh - Run via cron every 5 minutes

if ! pgrep -x "sela-node" > /dev/null; then
    echo "Node offline, restarting..."
    systemctl restart sela-node
    curl -X POST https://api.your-alert-service.com/alert \
      -d "Sela node was offline, auto-restarted at $(date)"
fi
```

Add to crontab:
```bash
*/5 * * * * /path/to/check_sela_node.sh
```

### Strategy 2: Geographic Arbitrage

Certain regions have higher demand for browser nodes due to:
- Region-locked content (streaming services, e-commerce)
- Regulatory requirements (financial services needing local presence)
- Language/culture-specific data collection

**High-Value Regions (as of 2025)**:
- North America: 1.8x multiplier (especially US East Coast)
- Western Europe: 1.6x multiplier (UK, DE, FR)
- East Asia: 2.2x multiplier (JP, KR, SG - highest demand)
- South America: 1.4x multiplier (emerging markets)
- Africa/Middle East: 1.3x (growing demand)

**Strategy**:
If you have access to devices in multiple locations (e.g., home + office + relatives abroad), run nodes in high-demand regions for maximum earnings.

### Strategy 3: Hardware Optimization

**Speed = Earnings**. Faster task completion means more tasks per day.

**Optimizations**:
```bash
# Increase browser performance
# 1. Use SSD for faster page loads
# 2. Allocate more RAM to browser processes
# 3. Enable GPU acceleration
# 4. Use wired Ethernet (30-50ms faster than Wi-Fi)

# Example: Configure for maximum performance
sela-node config set performance.priority high
sela-node config set cache.size 2GB  # Pre-cache frequent sites
sela-node config set gpu.enabled true  # GPU rendering
```

**Benchmark your setup**:
```bash
sela-node benchmark

# Target scores:
# Page load: <500ms (Good), <300ms (Excellent)
# Element interaction: <50ms
# Screenshot: <150ms
# Overall score: >85/100 for competitive earnings
```

### Strategy 4: Specialize in High-Value Tasks

Certain task types pay premium rates:

**High-Value Tasks**:
- zkTLS proof generation (+50% reward)
- Multi-step authenticated workflows (+30%)
- Financial data extraction (+40%)
- Real-time trading data (+35%)

**Enable premium features**:
```yaml
# config.yaml
premium_tasks:
  zktls_proofs: true  # +50% earnings
  auth_workflows: true  # +30% earnings
  financial_data: true  # +40% earnings (requires KYC)
```

**KYC for Financial Tier**:
Some high-value tasks require identity verification to comply with regulations. Complete KYC to unlock:
```bash
sela-node kyc start
# Follow prompts for identity verification
# Approval typically takes 24-48 hours
```

### Strategy 5: Multi-Node Operation

[Similar to Helium hotspot networks](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024), running multiple nodes compounds earnings:

**Example**:
- 3× Silver nodes (different locations) = 3 × ~10 SELA/day = ~900 SELA/month
- 1× Gold node = ~40 SELA/day = ~1,200 SELA/month
- **Total**: ~2,100 SELA/month (vs ~1,200 for single Gold node)

**Management**:
```bash
# Centralized dashboard for multi-node operators
sela-node-manager add --name home-node-1 --ip 192.168.1.100
sela-node-manager add --name office-node-2 --ip 192.168.1.101
sela-node-manager add --name datacenter-node-3 --ip 10.0.50.25

# Monitor all nodes from single interface
sela-node-manager status --all
```

## Security & Privacy

### Isolation

Sela nodes run browser tasks in isolated environments to protect your data:

**Technical Implementation**:
- Separate browser profiles for each task
- Automatic cookie clearing after task completion
- No access to your personal browser data
- Sandboxed execution prevents malicious code

**Verification**:
```bash
# Check isolation status
sela-node security status

# Expected output:
# Isolation: ACTIVE
# Profile separation: ENABLED
# Auto-cleanup: ENABLED
# Sandbox: Enabled (Chrome/Chromium)
```

### Data Privacy

**What Sela CAN'T access**:
- Your personal browsing history
- Your saved passwords
- Your bookmarks or extensions
- Your files or documents

**What Sela CAN see**:
- IP address (necessary for geolocation)
- Browser type and version (for compatibility)
- Task completion metrics (for rewards calculation)

### Firewall Configuration

Allow Sela node traffic:

```bash
# Linux (ufw)
sudo ufw allow 9090/tcp  # Node communication
sudo ufw allow 443/tcp   # HTTPS traffic
sudo ufw allow 80/tcp    # HTTP traffic

# macOS
# System Preferences → Security & Privacy → Firewall → Firewall Options
# Add "Sela Node" to allowed applications

# Windows Firewall
# Allow "Sela Node" in Windows Defender Firewall settings
```

## Monitoring & Troubleshooting

### Dashboard Metrics

Key Performance Indicators (KPIs) to monitor:

**Uptime**: Target 99%+
- Current uptime percentage
- Downtime incidents (last 30 days)
- Availability trend

**Task Completion Rate**: Target 95%+
- Successful vs failed tasks
- Failure reasons (timeout, selector not found, etc.)
- Retry rate

**Response Time**: Target <500ms
- P50, P95, P99 latencies
- Comparison to network average
- Speed ranking

**Earnings**:
- Daily/weekly/monthly trends
- Pending rewards
- Claimed rewards
- Estimated next payout

### Common Issues

**Issue**: Low task volume
**Cause**: Low demand in your region or tier oversaturation
**Solution**:
- Upgrade tier for priority task assignment
- Enable premium features (zkTLS, financial data)
- Consider geographic arbitrage if possible

**Issue**: High failure rate
**Cause**: Slow internet, outdated browser, insufficient resources
**Solution**:
```bash
# Update browser engine
sela-node update browser

# Increase resource allocation
sela-node config set resources.cpu_cores 4
sela-node config set resources.memory_mb 4096

# Check network speed
sela-node diagnostic network
```

**Issue**: Rewards not appearing
**Cause**: Minimum withdrawal threshold not met, or reward distribution delay
**Solution**:
- Check minimum withdrawal: Typically 10 SELA
- Rewards distribute weekly on Sundays at 00:00 UTC
- Verify wallet address is correct in config

**Issue**: Node offline unexpectedly
**Cause**: System crash, network disruption, software bug
**Solution**:
- Enable auto-restart: `sela-node config set auto_restart true`
- Check logs: `sela-node logs --tail 100`
- Report persistent issues: support@sela.network

### Diagnostic Tools

```bash
# Comprehensive diagnostic check
sela-node diagnostic --full

# Checks:
# ✓ Internet connectivity
# ✓ Browser engine status
# ✓ Wallet connection
# ✓ Firewall configuration
# ✓ Resource availability
# ✓ Performance benchmark

# Network testing
sela-node test --duration 60s
# Simulates real tasks for 60 seconds, reports performance
```

## Reward Distribution & Withdrawal

### Distribution Schedule

Rewards accumulate in real-time but distribute on a weekly basis:

**Timeline**:
- **Monday-Sunday**: Earn rewards for completed tasks
- **Sunday 00:00 UTC**: Snapshot of earned rewards
- **Sunday 02:00 UTC**: Distribution to wallets
- **Available for withdrawal**: Immediately after distribution

### Withdrawal Process

```bash
# Check pending rewards
sela-node rewards pending
# Output: 127.5 SELA pending

# Withdraw to wallet (minimum: 10 SELA)
sela-node rewards withdraw --amount 127.5
# Confirmation: Transaction submitted, hash: 0xabc...def

# Or withdraw via dashboard
# https://dashboard.sela.network → Rewards → Withdraw
```

**Fees**:
- Minimum withdrawal: 10 SELA
- Network fee: Standard gas (paid from reward balance)
- No platform withdrawal fee

### Tax Considerations

Node operation earnings may be taxable in your jurisdiction.

**Consult a tax professional**, but general guidance:

**United States**:
- Earned tokens are taxable as ordinary income (fair market value at receipt)
- Token value changes are capital gains/losses when sold

**European Union**:
- Varies by country; often treated as self-employment income
- VAT may apply in some jurisdictions

**Record Keeping**:
```bash
# Export earnings report for tax purposes
sela-node reports tax --year 2025 --format csv
# Generates: sela_earnings_2025.csv
# Columns: Date, Tasks, Earnings (SELA), USD Value, Tx Hash
```

## Upgrading Your Node

### Increasing Stake (Tier Upgrade)

To upgrade tiers, increase your staked SELA:

```bash
# Check current stake
sela-node stake status
# Output: Current stake: 500 SELA (Silver tier)

# Upgrade to Gold (requires 2,000 SELA total)
sela-node stake increase --amount 1500  # Add 1,500 to reach 2,000
# Confirm transaction in wallet
# New tier active immediately after blockchain confirmation
```

**Benefits of Upgrading**:
- Higher task priority
- Better multipliers
- Access to premium tasks
- Increased earnings potential

### Hardware Upgrades

When upgrading hardware, transfer your node:

```bash
# On old device: Export configuration
sela-node export --output sela-config-backup.json

# On new device: Import configuration
sela-node import --input sela-config-backup.json
# Your stake, tier, and history transfer seamlessly
```

## Community & Support

### Resources

**Documentation**: [https://docs.sela.network](https://docs.sela.network)

**Node Operator Forum**: [https://forum.sela.network/node-operators](https://forum.sela.network/node-operators)

**Discord**: Join #node-operators channel for real-time help

**Telegram**: Node operator chat for quick questions

**GitHub**: [https://github.com/sela-network/node-software](https://github.com/sela-network/node-software) (report bugs, suggest features)

### Getting Help

**Support Channels** (in order of response time):
1. **Discord/Telegram**: 10-30 min average response (community-driven)
2. **Forum**: 2-24 hours (detailed technical discussions)
3. **Email** (support@sela.network): 24-48 hours (official support)

**Before asking for help**:
```bash
# Generate diagnostic report
sela-node diagnostic --export diagnostic-report.json

# Include in support request:
# - Node ID
# - Tier
# - Operating system
# - Description of issue
# - Diagnostic report
```

## Advanced Topics

### Running Nodes at Scale (100+ Nodes)

For operators managing large node fleets:

**Infrastructure**:
- Kubernetes deployment for containerized nodes
- Centralized monitoring (Prometheus + Grafana)
- Automated provisioning with Terraform/Ansible
- Load balancer for geographic distribution

**Contact**: enterprise@sela.network for dedicated support and custom SLAs.

### Slashing & Penalties

[Following Ethereum's slashing model](https://figment.io/insights/staking-penalties/), Sela implements penalties for malicious behavior:

**Slashable Offenses**:
- Data tampering: 30-50% stake slashed
- Fake zkTLS proofs: 50-100% stake slashed
- Prolonged downtime: 5-15% stake slashed
- Security violations: 20-40% stake slashed

**Protection**:
- Minor issues (1-2 failures): Warning only
- Technical errors: Exempt from slashing (appeal process available)
- DAO governance review for disputes

**Best practices to avoid slashing**:
- Keep software updated
- Monitor node health
- Don't tamper with task data
- Maintain adequate uptime

## Conclusion

Operating a Sela Network node provides an opportunity to participate in the AI agent infrastructure revolution while earning passive income. With realistic APYs of 15-35%, minimal hardware requirements for entry-level tiers, and a growing market ([$30B DePIN sector in 2025](https://www.iex.ec/academy/depin-sector-trends-market-cap)), node operation represents a sustainable income stream aligned with long-term technological trends.

Success as a node operator depends on:
- Consistent uptime (99%+ target)
- Strategic tier selection matching your resources
- Geographic positioning in high-demand regions
- Performance optimization (faster = more tasks = higher earnings)
- Multi-node diversification for advanced operators

As the [AI agent market grows to $105.6B by 2034](https://www.gminsights.com/industry-analysis/ai-agents-market), demand for browser automation infrastructure will expand proportionally, creating sustained earning opportunities for node operators who build reliable, high-performance infrastructure.

## Sources

- [DePIN Sector Trends & Market Cap 2025](https://www.iex.ec/academy/depin-sector-trends-market-cap) - Market overview
- [Top 5 DePIN Cryptocurrencies for 2024](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024) - Helium, Filecoin case studies
- [New Models for Utility Tokens](https://multicoin.capital/2018/02/13/new-models-utility-tokens/) - Work token model economics
- [Staking Penalties - Figment](https://figment.io/insights/staking-penalties/) - Ethereum slashing mechanisms
- [AI Agents Market Growth 2025-2034](https://www.gminsights.com/industry-analysis/ai-agents-market) - Demand projections
