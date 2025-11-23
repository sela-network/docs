---
title: zkTLS Verification System
description: Cryptographic proof of web data authenticity using Zero-Knowledge TLS
---

## The Fundamental Challenge: Verifying Web Data

Traditional web interactions suffer from an inherent trust problem. When an AI agent retrieves data from a website, there is no cryptographic mechanism to prove:

1. The data authentically originated from that specific server
2. The data was not modified in transit
3. The data existed at a particular timestamp
4. The data remains unaltered when presented to third parties

This verification gap prevents web data from being used in high-trust environments such as decentralized finance, legal proceedings, regulatory compliance, and cross-border transactions. Sela Network addresses this fundamental limitation through zkTLS, a protocol that combines [TLS cryptographic guarantees with zero-knowledge proofs](https://arxiv.org/html/2409.17670v1).

## zkTLS: Cryptographic Proof for the Web

zkTLS (Zero-Knowledge Transport Layer Security) transforms TLS from a purely confidentiality-focused protocol into a verifiable proof system. The protocol enables a client to prove that certain data authentically came from a particular HTTPS website while optionally concealing sensitive portions through [zero-knowledge proofs](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754).

Unlike traditional blockchain oracles that rely on trusted third parties to attest to off-chain data, zkTLS provides [cryptographic verification at the protocol level](https://www.shoal.gg/p/zktls-verifiable-data-composability), eliminating the need to trust intermediaries.

## Technical Architecture

### Three-Party Protocol Design

Sela's zkTLS implementation follows the [TLSNotary protocol](https://tlsnotary.org/zktls-day/), which extends standard TLS through multi-party computation. The protocol involves three actors:

**Server (S)**: The authoritative data source (e.g., bank website, government portal, exchange API)

**Prover (P)**: The entity requesting data and generating proofs (typically a browser node in Sela Network)

**Notary (V)**: An independent verifier that co-executes the TLS handshake without seeing plaintext data

The key innovation is that P and V collaboratively act as a single "client" from the server's perspective, while maintaining cryptographic separation that prevents either party from unilaterally forging data.

### Phase 1: Multi-Party TLS Handshake

Traditional TLS establishes a secure channel through [ECDH (Elliptic Curve Diffie-Hellman) key exchange](https://www.blocmates.com/articles/what-is-zktls-a-complete-guide). In zkTLS, this process is modified using secure multi-party computation:

```
Standard TLS:
Client ←→ Server
  |
  └─ Shared Secret Key

zkTLS:
Prover + Notary ←→ Server
      |
      ├─ Prover holds secret share a
      ├─ Notary holds secret share b
      └─ Combined share = Session Key (neither party knows full key)
```

The protocol employs [Garbled Circuits and Oblivious Transfer](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754) to ensure:

- Neither P nor V can independently decrypt server responses
- Neither party can forge TLS messages without detection
- The server perceives a standard TLS 1.3 connection

This approach solves the fundamental security requirement: [the Prover, Server, and Verifier all contribute to ensuring private data cannot be forged](https://www.shoal.gg/p/zktls-verifiable-data-composability).

### Phase 2: Authenticated Data Transmission

Once the TLS session is established, the Prover can request data while the Notary verifies authenticity without accessing plaintext:

1. **Request Phase**: P sends an HTTPS request (e.g., `GET /account/balance`)
2. **Encrypted Response**: Server returns encrypted response using the shared session key
3. **Commitment Generation**: P creates a cryptographic [commitment](https://brave.com/blog/distefano/) to the encrypted response
4. **Notary Attestation**: V verifies the TLS message authentication code (MAC) without decrypting content

The critical insight is that [TLS's built-in MAC mechanism proves data originated from the server](https://bwetzel.medium.com/tls-oracles-liberating-private-web-data-with-cryptography-e66e5fad7c34), while MPC prevents the Prover from tampering with this verification.

### Phase 3: Selective Disclosure via Zero-Knowledge Proofs

After obtaining verified data, the Prover can generate zero-knowledge proofs that selectively reveal information:

**Redaction Patterns**:
- Prove a bank balance exceeds $50,000 without revealing the exact amount
- Prove age is above 21 without disclosing birthdate
- Prove employment status without revealing salary details
- Prove credit score range without exposing full financial history

**Technical Implementation**:

```
Original Data (from TLS session):
{
  "name": "John Doe",
  "account_number": "4532-1234-5678-9012",
  "balance": 127543.32,
  "credit_score": 782,
  "employment": "Software Engineer"
}

ZK Proof Output:
{
  "statement": "balance > 50000",
  "proof": "0x7a4f3c2e...",  // cryptographic proof
  "notary_signature": "0x9b2e1d...",  // Notary attestation
  "timestamp": "2025-01-15T10:30:00Z",
  "server_domain": "api.chase.com"
}

Verification Result:
✓ Data originated from api.chase.com (TLS verified)
✓ Statement "balance > 50000" is true (ZK proof valid)
✓ Data existed at timestamp (Notary signed)
✗ Exact balance not revealed (privacy preserved)
```

The [Notary's signature proves data provenance](https://oasis.net/blog/zktls-blockchain-security) while zero-knowledge techniques prevent unwanted disclosure.

## Implementation Approaches

The zkTLS ecosystem has evolved two primary implementation strategies, each with distinct security and performance trade-offs.

### MPC-Based zkTLS (Sela's Approach)

Sela implements the [multi-party computation variant](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754) pioneered by TLSNotary. This approach:

**Advantages**:
- No hardware requirements beyond standard compute
- Fully auditable through open-source implementation
- Compatible with any TLS 1.2/1.3 server without modifications
- Strongest cryptographic guarantees against collusion

**Trade-offs**:
- [Network latency-sensitive](https://arxiv.org/html/2409.17670v1) due to interactive MPC rounds
- Proof generation time: 200-450ms (acceptable for most use cases)
- Requires coordination between Prover and Notary nodes

**Performance Characteristics** (based on [TLSNotary benchmarks](https://tlsnotary.org/)):

```
TLS Handshake:    ~300-400ms (vs ~100ms standard TLS)
Proof Generation: ~200-450ms
Proof Size:       <10KB
Verification:     <100ms
Network Overhead: 2-4x vs standard TLS
```

### TEE-Based zkTLS (Alternative Approach)

Some protocols use [Trusted Execution Environments](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754) such as Intel SGX or AMD SEV:

**Advantages**:
- Lower latency (no MPC coordination needed)
- Simpler implementation model
- Better performance for high-frequency use cases

**Trade-offs**:
- Requires specialized hardware
- Relies on manufacturer trust (Intel, AMD)
- Vulnerable to hardware-level attacks (e.g., Spectre, Meltdown)
- Less decentralized due to hardware constraints

Sela prioritizes the MPC approach because it aligns with the network's decentralization philosophy and eliminates hardware vendor trust assumptions.

## Real-World Applications

### Decentralized Finance: Undercollateralized Lending

Traditional DeFi lending requires over-collateralization (e.g., deposit $150 of ETH to borrow $100 USDC) because on-chain systems cannot verify off-chain creditworthiness. zkTLS enables a paradigm shift:

**Workflow**:
1. User generates zkTLS proof of bank balance >$50,000
2. Proof is verified by lending protocol smart contract
3. Protocol grants undercollateralized loan based on proven creditworthiness
4. User maintains privacy - exact balance never revealed

**Market Impact**: The [undercollateralized lending market represents a $3.5 trillion opportunity](https://www.shoal.gg/p/zktls-verifiable-data-composability) by bringing traditional credit assessment to blockchain.

### Legal & Compliance: Immutable Evidence

zkTLS proofs can serve as cryptographically verified evidence in legal proceedings:

**Use Case**: Trademark infringement lawsuit
```
Proof Statement: "Website example.com displayed this content at 10:30 UTC on Jan 15, 2025"
Evidence:
- Screenshot (visual record)
- TLS proof (cryptographic verification)
- Notary signature (timestamp attestation)
- On-chain storage (immutability guarantee)
```

Unlike traditional screenshots (easily fabricated), zkTLS proofs provide [non-repudiable evidence](https://www.vlayer.xyz/blog/web-proofs-for-web3-applications) that data existed at a specific time with specific content.

### Cross-Border Transactions: Regulatory Compliance

Financial institutions can verify customer credentials across jurisdictions without exposing sensitive data:

**Scenario**: European bank needs to verify US customer's accredited investor status

```
Traditional Flow:
Customer → Manual document submission → Weeks of verification → Privacy exposure

zkTLS Flow:
Customer → Generates proof from SEC database → Instant verification → Zero data exposure
```

The proof confirms accredited status without revealing net worth, income, or other confidential information.

### AI Agent Authentication

AI agents operating autonomously need to prove actions without exposing API keys or credentials:

**Example**: Trading agent proving it executed a transaction
```
Agent → Generates zkTLS proof from exchange API
Proof contains:
✓ Transaction occurred at timestamp T
✓ Order ID matches blockchain transaction
✓ Execution price within expected range
✗ API key not revealed
✗ Account details not disclosed
```

This enables [trustless verification of AI agent behavior](https://www.gate.com/learn/articles/zk-tls-unlocking-crypto-consumer-apps/7509) in multi-agent systems.

## Protocol Security Analysis

### Threat Model

zkTLS security assumes:
- **Server is honest**: The authoritative data source is not compromised
- **Notary is semi-honest**: Follows protocol but may attempt to learn private data
- **Prover may be malicious**: Could attempt to forge proofs

### Security Guarantees

[Comprehensive security analysis](https://arxiv.org/html/2409.17670v1) demonstrates zkTLS provides:

**Data Authenticity**: Computationally infeasible for Prover to forge server responses (relies on TLS cryptography)

**Privacy**: Notary learns nothing about plaintext data (guaranteed by MPC security)

**Non-repudiation**: Prover cannot later deny data content (cryptographic commitment)

**Timestamp Integrity**: Notary signature proves data existed at claimed time

### Limitations & Mitigations

**Network Latency Sensitivity**: [MPC performance degrades with geographic distance](https://arxiv.org/html/2409.17670v1) between Prover and Notary

*Mitigation*: Sela deploys regional Notary nodes to ensure <100ms latency

**Server Trust Assumption**: zkTLS cannot detect if the authoritative server itself is compromised

*Mitigation*: Multi-source verification for critical applications (e.g., cross-reference multiple banks)

**TLS Version Dependency**: Protocol currently supports TLS 1.2/1.3; newer versions require protocol updates

*Mitigation*: Active participation in zkTLS standards development

## On-Chain Integration

While zkTLS proof generation happens off-chain, verification can occur on-chain for smart contract integration:

### Solana Smart Contract Example

```rust
#[program]
pub mod credit_verification {
    pub fn verify_creditworthiness(
        ctx: Context<VerifyCredit>,
        zk_proof: Vec<u8>,
        notary_signature: Vec<u8>,
        claimed_balance_threshold: u64,
    ) -> Result<()> {
        // 1. Verify notary signature
        let notary_pubkey = ctx.accounts.notary.key();
        require!(
            verify_signature(notary_signature, notary_pubkey),
            ErrorCode::InvalidNotarySignature
        );

        // 2. Verify zero-knowledge proof
        let proof_valid = verify_zk_proof(
            zk_proof,
            claimed_balance_threshold,
        );
        require!(proof_valid, ErrorCode::InvalidProof);

        // 3. Grant credit
        ctx.accounts.lending_protocol.approve_loan(
            ctx.accounts.borrower.key(),
            calculate_loan_amount(claimed_balance_threshold),
        )?;

        Ok(())
    }
}
```

This architecture enables [Web2 data to trustlessly interact with Web3 smart contracts](https://oasis.net/blog/zktls-blockchain-security).

## Industry Standards & Ecosystem

### TLSNotary Protocol

Sela builds upon [TLSNotary](https://tlsnotary.org/), the most mature open-source zkTLS implementation. TLSNotary has undergone extensive [academic review](https://arxiv.org/html/2409.17670v1) and provides production-ready libraries.

**Key Milestones**:
- 2014: Initial protocol specification
- 2022: TLS 1.3 support added
- 2024: [zkTLS Day at Devconnect 2025](https://tlsnotary.org/zktls-day/) convened industry leaders
- 2025: Multiple protocols (TLSNotary, DECO, zkPass) pursuing standardization

### Ecosystem Projects

zkTLS is emerging as critical Web3 infrastructure:

- **[zkPass](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754)**: Privacy-preserving identity verification
- **[vlayer](https://www.vlayer.xyz/blog/web-proofs-for-web3-applications)**: Web proofs for smart contracts
- **[Oasis Network](https://oasis.net/blog/zktls-blockchain-security)**: Privacy-preserving DeFi applications

Sela differentiates by integrating zkTLS into browser automation infrastructure, making proofs accessible to AI agents at scale.

## Performance Optimization Strategies

### Proof Caching

Identical requests to the same endpoint can reuse proofs:

```
Request 1: Generate full zkTLS proof (~400ms)
Request 2-100: Verify cached proof (~50ms)
```

**Use Case**: AI agent checking stock price every 5 seconds - only first request requires full proof generation.

### Batch Verification

Multiple proofs can be verified together for efficiency:

```
Individual verification: 100 proofs × 100ms = 10 seconds
Batch verification: 100 proofs together = 1.2 seconds
Speedup: 8.3x
```

### Async Proof Generation

For non-critical paths, proofs can be generated asynchronously:

```python
# Synchronous (blocking)
data = await sela.browse_with_proof(url)  # 600ms total

# Asynchronous (non-blocking)
data = await sela.browse(url)  # 200ms - get data immediately
proof_task = sela.generate_proof_async(data)  # background task
# ... do other work ...
proof = await proof_task  # retrieve when needed
```

## Future Developments

### Post-Quantum zkTLS

Current zkTLS relies on elliptic curve cryptography, vulnerable to future quantum attacks. Research into [lattice-based zkTLS](https://arxiv.org/html/2409.17670v1) is ongoing to ensure long-term security.

### TLS 1.4 Compatibility

As TLS protocol evolves, zkTLS implementations must adapt. Sela actively participates in standards development to ensure forward compatibility.

### Hardware Acceleration

Dedicated cryptographic accelerators could reduce proof generation time from ~400ms to <100ms, enabling real-time verification scenarios.

## Conclusion

zkTLS represents a fundamental infrastructure upgrade for the internet, transforming web data from unverifiable information into cryptographically proven facts. By integrating zkTLS into browser automation infrastructure, Sela Network enables AI agents to operate in high-trust environments previously inaccessible to automated systems.

The protocol's combination of [TLS authentication, multi-party computation, and zero-knowledge proofs](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754) creates a verification layer that preserves privacy while establishing trust - precisely the properties required for AI agents to interact with sensitive web services at scale.

## Sources

- [A Comprehensive Review of TLSNotary Protocol](https://arxiv.org/html/2409.17670v1) - Academic analysis of security properties and implementation
- [zkTLS: The Cornerstone of Verifiable Internet](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754) - Technical overview of MPC and ZK proof integration
- [TLS Oracles: Liberating Private Web Data](https://bwetzel.medium.com/tls-oracles-liberating-private-web-data-with-cryptography-e66e5fad7c34) - Use cases for cryptographically verified web data
- [zkTLS: Verifiable Data Composability](https://www.shoal.gg/p/zktls-verifiable-data-composability) - DeFi applications and market analysis
- [zkTLS: Building A Verifiable and Private Web](https://oasis.net/blog/zktls-blockchain-security) - Blockchain integration strategies
- [zkTLS: Unlocking Crypto Consumer Apps](https://www.gate.com/learn/articles/zk-tls-unlocking-crypto-consumer-apps/7509) - Consumer application potential
- [Web Proofs for Web3 Applications](https://www.vlayer.xyz/blog/web-proofs-for-web3-applications) - Smart contract verification patterns
- [Understanding zkTLS: Zero-Knowledge Proofs](https://www.binance.com/en/square/post/2024-09-01-understanding-zktls-enhancing-web-security-with-zero-knowledge-proofs-12941846073018) - Educational overview
- [What is zkTLS? A Complete Guide](https://www.blocmates.com/articles/what-is-zktls-a-complete-guide) - Technical deep dive
- [zkTLS Day at Devconnect 2025](https://tlsnotary.org/zktls-day/) - Industry standardization efforts
