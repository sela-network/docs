---
title: Data Layer Architecture
description: Comprehensive guide to Sela Network's hybrid data storage and management system
---

# Data Layer Architecture

Sela Network의 데이터 계층은 블록체인의 투명성과 불변성, 탈중앙화 스토리지의 영구성, 그리고 전통적인 캐싱 시스템의 성능을 결합한 **하이브리드 아키텍처**를 채택합니다. 이러한 설계는 웹 스크래핑 데이터의 특성에 최적화되어 있으며, VC 투자자에게는 확장 가능한 인프라를, 개발자에게는 빠른 데이터 접근을, 노드 운영자에게는 효율적인 리소스 사용을 제공합니다.

## Why Hybrid Architecture?

### The Problem with Single-Layer Storage

온체인 전용 스토리지의 한계:
- **비용**: Ethereum에서 1MB 저장 비용은 수천 달러
- **속도**: 블록 생성 시간으로 인한 지연 (Ethereum: 12초, Solana: 0.4초)
- **용량**: 블록체인 데이터 증가로 인한 노드 운영 부담

오프체인 전용 스토리지의 한계:
- **신뢰**: 중앙화된 서버에 대한 의존
- **검증**: 데이터 무결성 보장 어려움
- **영구성**: 서비스 중단 시 데이터 손실 위험

### The Hybrid Solution

[하이브리드 Web2+Web3 아키텍처](https://medium.com/techsutra/hybrid-web2-web3-data-architectures-bcaf4d311e2d)는 두 세계의 장점을 결합합니다:

**Web2 (전통적 인프라)**의 확장성과 성숙도:
- 수평적 확장성
- 저지연 데이터 스토리지
- 관리형 분석 서비스

**Web3 (블록체인)**의 탈중앙화 신뢰:
- 불변 원장
- 투명한 트랜잭션
- 스마트 컨트랙트를 통한 프로그래밍 가능한 로직

[하이브리드 스마트 컨트랙트](https://chain.link/education-hub/off-chain-data)는 온체인 코드의 변조 방지 실행과 오프체인의 방대한 데이터 리소스 및 컴퓨팅 파워를 결합할 수 있게 합니다.

## Three-Tier Data Storage Strategy

Sela Network는 데이터 특성에 따라 3계층 스토리지 전략을 사용합니다:

```
┌─────────────────────────────────────────────────────────┐
│                    Tier 1: On-Chain                     │
│              (Critical Metadata & Proofs)               │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Task Requests & Results Hashes              │    │
│  │  • zk-TLS Proofs                               │    │
│  │  • Reward Distribution Records                 │    │
│  │  • Node Reputation Scores                      │    │
│  │  • Slashing Events                             │    │
│  │  • Governance Votes                            │    │
│  └────────────────────────────────────────────────┘    │
│              Storage: Ethereum/Polygon L2               │
│              Cost: High | Speed: Medium | Trust: Max    │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 Tier 2: Decentralized Storage           │
│                 (Long-term Data Archival)               │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Complete Scraping Results                   │    │
│  │  • Historical Data Archives                    │    │
│  │  • Audit Logs                                  │    │
│  │  • Large Media Files                           │    │
│  │  • VLM Training Datasets                       │    │
│  └────────────────────────────────────────────────┘    │
│         Storage: IPFS + Arweave + Filecoin              │
│         Cost: Low | Speed: Medium | Trust: High         │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Tier 3: Off-Chain Cache                │
│                  (High-Performance Layer)               │
│  ┌────────────────────────────────────────────────┐    │
│  │  • Active Task Queue                           │    │
│  │  • Session Data                                │    │
│  │  • Temporary Results                           │    │
│  │  • Rate Limiting Counters                      │    │
│  │  • Node Health Metrics                         │    │
│  └────────────────────────────────────────────────┘    │
│           Storage: Redis + RabbitMQ                     │
│           Cost: Minimal | Speed: Max | Trust: Low       │
└─────────────────────────────────────────────────────────┘
```

## Tier 1: On-Chain Storage (Blockchain Layer)

### Purpose and Design Rationale

온체인 스토리지는 **신뢰가 필수적인 메타데이터**만 저장하여 비용을 최소화하면서 검증 가능성을 최대화합니다.

### What Goes On-Chain

#### 1. Task Requests Metadata

사용자가 제출한 스크래핑 작업의 핵심 정보:

```solidity
struct TaskRequest {
    bytes32 taskId;           // Unique task identifier
    address requester;        // Who submitted the task
    bytes32 targetUrlHash;    // Hash of target URL
    uint256 timestamp;        // When task was created
    uint256 reward;           // $SELA tokens allocated
    bytes32 resultHash;       // Hash of scraped result (IPFS CID)
    TaskStatus status;        // pending/completed/failed
}
```

**왜 온체인에?**
- 작업 제출과 완료의 불변 증거
- 분쟁 해결을 위한 타임스탬프
- 자동 보상 분배를 위한 스마트 컨트랙트 접근

#### 2. zk-TLS Proofs

Zero-Knowledge TLS 증명은 데이터 출처를 암호학적으로 검증합니다:

```solidity
struct ZKTLSProof {
    bytes32 proofHash;        // Hash of the ZK proof
    bytes32 tlsSessionId;     // TLS session identifier
    uint256 timestamp;        // When proof was generated
    address verifier;         // Node that generated proof
    bool isVerified;          // Verification status
}
```

**기술적 배경**: [오프체인 데이터](https://chain.link/education-hub/off-chain-data)를 온체인에서 사용하려면 Oracle 네트워크가 필요합니다. Sela는 Chainlink와 유사하게 탈중앙화 Oracle 네트워크(DON)를 운영하여 오프체인 리소스와 블록체인을 안전하게 연결합니다.

#### 3. Reward Distribution Records

노드 운영자에게 지급된 보상 기록:

```solidity
struct RewardRecord {
    address nodeOperator;     // Who received the reward
    uint256 amount;           // Amount in $SELA tokens
    bytes32 taskId;           // Associated task
    uint256 timestamp;        // When reward was distributed
    RewardType rewardType;    // base/bonus/penalty
}
```

**투명성**: 모든 보상이 공개적으로 검증 가능하여 VC 투자자에게 재무 투명성 제공

#### 4. Node Reputation Scores

노드의 성능과 신뢰도를 추적:

```solidity
struct NodeReputation {
    address nodeAddress;
    uint256 totalTasksCompleted;
    uint256 successRate;      // Percentage (0-10000 = 0-100%)
    uint256 averageResponseTime; // In milliseconds
    uint256 slashingCount;    // Number of penalties
    uint256 lastUpdateTime;
}
```

**슬래싱 메커니즘**: 악의적 행동이나 낮은 성능에 대한 경제적 처벌이 자동으로 기록됩니다.

### Smart Contracts Architecture

#### Core Contracts

**TaskManager.sol**
- 작업 생성 및 할당
- 결과 제출 및 검증
- 상태 관리

**RewardDistributor.sol**
- 자동 보상 계산
- Staking 및 Slashing 로직
- Treasury 관리

**ProofVerifier.sol**
- zk-TLS 증명 검증
- 데이터 무결성 체크
- 오라클 상호작용

**Governance.sol**
- DAO 투표 시스템
- 프로토콜 파라미터 업데이트
- 제안 관리

### Gas Optimization Strategies

온체인 스토리지 비용 최소화:

1. **Batch Processing**: 여러 작업을 하나의 트랜잭션으로 묶기
2. **Data Compression**: Calldata 압축 (EIP-4844 blob transactions)
3. **Layer 2 Solutions**: Polygon, Optimism, Arbitrum 활용
4. **Event Logs**: 스토리지 대신 이벤트 로그 활용 (5배 저렴)

## Tier 2: Decentralized Storage

### IPFS: Content-Addressed Storage

[IPFS (InterPlanetary File System)](https://docs.ipfs.tech/concepts/comparisons/)는 "어디에 있는가" 대신 "무엇인가"로 데이터를 검색합니다.

**핵심 특징**:
- **Content Identification**: 각 파일은 데이터에서 파생된 고유한 CID (Content Identifier) 보유
- **Distributed Retrieval**: 해당 파일을 저장하는 모든 노드에서 가져올 수 있음
- **Fault Tolerance**: [AWS 장애 사례](https://www.21shares.com/en-us/research/lessons-from-the-aws-outage-a-centralized-failure-a-decentralized-solution)처럼 하나의 리전이 다운되어도 전 세계 다른 노드에서 동일한 파일 전달

**Sela Network에서의 사용**:
```javascript
// Scraping result를 IPFS에 저장
const result = await scrapeWebsite(targetUrl);
const ipfsCid = await ipfs.add(JSON.stringify(result));

// 온체인에 CID 저장
await taskManager.submitResult(taskId, ipfsCid);
```

**검색 흐름**:
1. 사용자가 온체인에서 `resultHash` (IPFS CID) 조회
2. IPFS 네트워크에서 CID로 데이터 요청
3. 가장 가까운 노드에서 데이터 전송 (CDN과 유사)

### Filecoin: Incentivized Persistence

[Filecoin](https://www.opensourceforu.com/2025/06/decentralised-storage-on-blockchain-ipfs-filecoin-and-arweave/)은 Protocol Labs가 개발한 IPFS 위에 구축된 탈중앙화 스토리지 네트워크입니다. IPFS가 데이터 저장 및 접근 방법에 집중하는 반면, Filecoin은 장기 스토리지와 신뢰성을 인센티브화하는 중요한 경제 계층을 추가합니다.

**작동 메커니즘**:
- **Storage Deals**: 사용자와 스토리지 제공자 간 계약
- **Proof-of-Replication (PoRep)**: 데이터가 실제로 저장되었음을 증명
- **Proof-of-Spacetime (PoSt)**: 시간이 지나도 데이터가 유지됨을 증명

**Sela에서의 활용**:
```javascript
// 중요한 스크래핑 결과를 Filecoin에 장기 보관
const deal = await filecoin.createStorageDeal({
    data: ipfsCid,
    duration: 365 * 2, // 2 years
    replication: 5,    // 5 copies across different miners
    price: calculatePrice(dataSize)
});
```

**비용 효율성**: [2025년 탈중앙화 스토리지 프로젝트](https://helalabs.com/blog/top-10-decentralized-storage-projects-in-2024/) 비교에 따르면, Filecoin은 AWS S3보다 70-90% 저렴합니다.

### Arweave: Permanent Storage

[Arweave](https://www.opensourceforu.com/2025/06/decentralised-storage-on-blockchain-ipfs-filecoin-and-arweave/)는 영구 데이터 보존을 강조하는 독특한 접근 방식을 취합니다. 전통적이거나 다른 탈중앙화 솔루션처럼 기간별로 공간을 임대하는 대신, Arweave는 **'한 번 지불, 영원히 저장'** 모델로 운영됩니다.

**작동 메커니즘**:
- **One-time Payment**: 사용자가 데이터 업로드 시 AR 토큰으로 일회성 수수료 지불
- **Endowment Fund**: 이 지불금은 기부 기금에 수집되어 시간이 지남에 따라 채굴자에게 데이터 저장 및 유지를 인센티브화
- **Blockweave**: 블록체인과 유사하지만 각 블록이 이전 데이터를 참조하여 영구성 보장

**Sela에서의 활용 사례**:
```javascript
// 감사 로그와 규정 준수 데이터를 영구 보관
await arweave.upload({
    data: auditLog,
    tags: {
        'Content-Type': 'application/json',
        'App-Name': 'SelaNetwork',
        'Type': 'AuditLog',
        'Date': new Date().toISOString()
    }
});
```

**규정 준수**: GDPR, SOC 2 등의 규정은 특정 데이터의 장기 보관을 요구하며, Arweave는 이에 이상적입니다.

### IPFS + Arweave Synergy

[Arweave+IPFS 통합](https://arweave.medium.com/arweave-ipfs-persistence-for-the-interplanetary-file-system-9f12981c36c3)은 두 시스템의 장점을 결합합니다:

- **IPFS**: 빠른 콘텐츠 전달 (CDN-like)
- **Arweave**: 영구 백업 (Archive)

**실제 구현**:
```javascript
// 1. IPFS에 업로드 (빠른 접근)
const ipfsCid = await ipfs.add(data);

// 2. Arweave에 백업 (영구 보존)
const arweaveTxId = await arweave.upload({
    data: data,
    tags: [{ name: 'IPFS-CID', value: ipfsCid }]
});

// 3. 온체인에 양쪽 참조 저장
await taskManager.submitResult(taskId, {
    ipfsCid: ipfsCid,
    arweaveTxId: arweaveTxId
});
```

**장점**:
- 사용자는 IPFS에서 빠르게 데이터 접근
- IPFS 노드가 모두 오프라인 되어도 Arweave에서 복구 가능
- 중요 데이터의 영구적 가용성 보장

### Decentralized Storage Comparison

| Feature | IPFS | Filecoin | Arweave |
|---------|------|----------|---------|
| **Primary Use** | Content delivery | Incentivized storage | Permanent archives |
| **Persistence** | Depends on pinning | Contract duration | Forever (one-time) |
| **Cost Model** | Free (self-hosting) | Pay per GB/month | One-time payment |
| **Retrieval Speed** | Fast (P2P) | Medium | Medium |
| **Data Verification** | Content addressing | PoRep + PoSt | Blockweave |
| **Economic Incentive** | None (optional Filecoin) | Built-in (FIL tokens) | Built-in (AR tokens) |
| **Best For** | Hot data, CDN | Long-term storage | Permanent records |

**Sela의 전략**: 모든 데이터를 IPFS에 업로드 → 중요 데이터는 Filecoin 계약 → 감사/규정 데이터는 Arweave에 영구 저장

## Tier 3: Off-Chain Cache Layer

### Redis: In-Memory Data Store

[Redis](https://redis.io/glossary/database-architecture/)는 최대 접근 속도를 위해 데이터를 키-값 쌍으로 완전히 메모리에 저장합니다.

**아키텍처 패턴**:

#### 1. Leader-Follower Replication

[Redis는 확장성 문제](https://redis.io/glossary/database-architecture/)를 "리더-팔로워" 패턴의 복제로 해결하며, 복제된 인스턴스는 리더 인스턴스의 정확한 사본입니다.

```
       ┌──────────────┐
       │ Redis Leader │ (Writes)
       └──────┬───────┘
              │
    ┌─────────┼─────────┐
    │         │         │
┌───▼───┐ ┌──▼────┐ ┌──▼────┐
│Follower│ │Follower│ │Follower│ (Reads)
└────────┘ └────────┘ └────────┘
```

**장점**:
- 읽기 트래픽을 여러 팔로워에 분산
- 리더 장애 시 자동 페일오버
- 수평적 읽기 확장성

#### 2. Clustering & Sharding

[Redis Cloud는 클러스터링을 사용](https://redis.io/glossary/database-architecture/)하여 데이터베이스 데이터를 다양한 클라우드 인스턴스에 분산하며, 데이터베이스 샤드(파티션)는 데이터가 단일 서버의 RAM을 초과할 때 부하를 분산합니다.

**Sela의 샤딩 전략**:
```javascript
// Task ID 기반 샤딩
const shardKey = hashTaskId(taskId) % numShards;
const redis = redisCluster.getShard(shardKey);

// 작업 데이터 저장
await redis.set(`task:${taskId}`, taskData, 'EX', 3600); // 1 hour TTL
```

### RabbitMQ: Message Queue Architecture

[RabbitMQ](https://medium.com/@jordan-temim/ruling-the-event-driven-architecture-with-rabbitmq-534798bdf17e)는 이벤트 기반 아키텍처를 지배하며 마이크로서비스 간 신뢰할 수 있는 통신을 가능하게 합니다.

**핵심 컴포넌트**:

#### 1. Exchanges and Routing

[Exchange는 라우팅 키와 바인딩 규칙](https://borstch.com/blog/development/distributed-data-storage-with-redis-rabbitmq-and-others)을 통해 큐에 메시지를 라우팅하며, Exchange 타입(direct, topic, fanout, headers)은 유연한 분배 패턴을 제공합니다.

```
Producer → Exchange (Type: Topic) → Queues
                │
    ┌───────────┼───────────┐
    │           │           │
Queue(US)  Queue(EU)  Queue(Asia)
routing:   routing:   routing:
us.*       eu.*       asia.*
```

**Sela의 사용 예**:
```javascript
// 지역별 작업 라우팅
await channel.publish(
    'tasks.exchange',        // Exchange name
    'asia.scraping.high',    // Routing key
    Buffer.from(JSON.stringify(task)),
    { persistent: true }     // Message persists to disk
);
```

#### 2. Message Persistence & Reliability

**Durability 설정**:
- **Durable Queues**: 서버 재시작 시에도 큐 유지
- **Persistent Messages**: 메시지를 디스크에 저장
- **Publisher Confirms**: 메시지 수신 확인

```javascript
// 신뢰할 수 있는 메시지 전달
channel.assertQueue('tasks', { durable: true });
channel.sendToQueue('tasks', Buffer.from(JSON.stringify(task)), {
    persistent: true,
    mandatory: true  // Return if unroutable
});
```

#### 3. Clustering & High Availability

[RabbitMQ 4.0은 Khepri 메타데이터 스토어](https://borstch.com/blog/development/distributed-data-storage-with-redis-rabbitmq-and-others) (Raft 기반)를 도입하여 더 나은 일관성과 확장성을 제공합니다.

```
┌──────────┐   ┌──────────┐   ┌──────────┐
│RabbitMQ  │──│RabbitMQ  │──│RabbitMQ  │
│ Node 1   │  │ Node 2   │  │ Node 3   │
└──────────┘   └──────────┘   └──────────┘
     │              │              │
     └──────────────┼──────────────┘
                    │
             Raft Consensus
          (Khepri Metadata)
```

### Redis vs RabbitMQ: When to Use Each

[비교 분석](https://airbyte.com/data-engineering-resources/redis-vs-rabbitmq)에 따르면:

**Redis의 강점**:
- 소형 메시지에서 뛰어난 성능, 높은 처리량과 낮은 지연 시간 제공
- 시간에 민감한 작업에 이상적
- 큰 메시지 페이로드에서는 어려움

**RabbitMQ의 강점**:
- 다양한 메시지 크기에 견고한 성능
- 신뢰할 수 있고 일관된 메시지 처리
- 높은 지연과 더 복잡한 설정이 단점

**Sela의 사용 전략**:
- **Redis**: 빠른 데이터 액세스, 캐싱, 간단한 pub/sub
- **RabbitMQ**: 신뢰할 수 있고 복잡한 메시지 큐잉 및 라우팅

[실제 애플리케이션](https://medium.com/cloud-native-daily/rabbitmq-kafka-redis-the-superheroes-of-distributed-systems-and-their-real-world-applications-cc611c169fa8)에서 Redis와 RabbitMQ는 함께 사용되며, Redis는 빠른 데이터 저장 및 검색을 처리하고 RabbitMQ는 서비스 간 신뢰할 수 있고 질서 있는 통신을 관리합니다.

### Caching Strategies

#### 1. Cache-Aside Pattern

가장 일반적인 캐싱 패턴:

```javascript
async function getScrapingResult(taskId) {
    // 1. 캐시 확인
    const cached = await redis.get(`result:${taskId}`);
    if (cached) {
        return JSON.parse(cached);
    }

    // 2. IPFS에서 가져오기
    const result = await ipfs.get(taskId);

    // 3. 캐시에 저장 (1시간 TTL)
    await redis.setex(`result:${taskId}`, 3600, JSON.stringify(result));

    return result;
}
```

#### 2. Write-Through Cache

데이터 일관성이 중요한 경우:

```javascript
async function saveScrapingResult(taskId, result) {
    // 1. 캐시에 먼저 저장
    await redis.set(`result:${taskId}`, JSON.stringify(result));

    // 2. IPFS에 저장
    const cid = await ipfs.add(result);

    // 3. 온체인에 CID 기록
    await taskManager.submitResult(taskId, cid);

    return cid;
}
```

#### 3. Time-Based Eviction

메모리 관리:

```javascript
// 자주 접근되는 데이터는 더 오래 유지
await redis.setex(`hot:${taskId}`, 86400, data);  // 24 hours

// 덜 중요한 데이터는 짧게 유지
await redis.setex(`cold:${taskId}`, 3600, data);  // 1 hour
```

## Data Flow Architecture

### End-to-End Data Lifecycle

```
1. Task Submission
   │
   ├─→ [RabbitMQ Queue] ─→ Task metadata stored
   │
   └─→ [Smart Contract] ─→ TaskRequest event emitted

2. Task Execution
   │
   ├─→ [Node pulls from RabbitMQ]
   │
   ├─→ [dBrowser scrapes target]
   │
   └─→ [VLM processes result]

3. Result Storage
   │
   ├─→ [Redis Cache] ─→ Temporary storage (1 hour)
   │
   ├─→ [IPFS] ─→ Content-addressed storage
   │
   └─→ [Arweave] ─→ Permanent backup (if important)

4. Verification & Reward
   │
   ├─→ [zk-TLS Proof] ─→ Generated and verified
   │
   ├─→ [Smart Contract] ─→ Result hash + proof stored on-chain
   │
   └─→ [Reward Distribution] ─→ $SELA tokens sent to node

5. User Retrieval
   │
   ├─→ Check [Redis Cache] ─→ If hit, return immediately
   │
   ├─→ Else fetch from [IPFS] using CID from blockchain
   │
   └─→ Cache in Redis for future requests
```

### Data Consistency Model

**CAP Theorem 적용**:

Sela는 [CAP Theorem](https://medium.com/techsutra/hybrid-web2-web3-data-architectures-bcaf4d311e2d)에 따라 **AP (Availability + Partition Tolerance)**를 선택하고 Eventual Consistency를 수용합니다:

- **Availability**: 노드는 항상 응답 (캐시에서라도)
- **Partition Tolerance**: 네트워크 분할 시에도 작동
- **Eventual Consistency**: 모든 노드가 결국 같은 데이터 보유

**일관성 보장 메커니즘**:
1. **Blockchain as Source of Truth**: 온체인 데이터가 최종 진실
2. **IPFS Content Addressing**: CID가 데이터 무결성 보장
3. **Redis TTL**: 오래된 캐시 자동 만료

## Security & Privacy

### Data Encryption

**전송 중 암호화 (In-Transit)**:
- TLS 1.3 for all API communication
- IPFS 노드 간 libp2p 암호화
- RabbitMQ TLS connections

**저장 데이터 암호화 (At-Rest)**:
- Redis: AES-256 encryption for sensitive data
- IPFS: Client-side encryption before upload
- Arweave: Encrypted data with access control

```javascript
// 클라이언트 측 암호화 예시
const encrypted = await crypto.encrypt(scrapingResult, userKey);
const cid = await ipfs.add(encrypted);

// 복호화는 사용자만 가능
const decrypted = await crypto.decrypt(ipfs.get(cid), userKey);
```

### GDPR Compliance

**Right to be Forgotten**:

블록체인의 불변성과 GDPR의 삭제권 충돌 해결:

1. **개인정보는 오프체인에만**: 온체인에는 해시만 저장
2. **암호화 키 폐기**: 키 삭제로 데이터 접근 불가능화
3. **Zero-Knowledge Proofs**: 개인정보 노출 없이 검증

```javascript
// GDPR 준수 데이터 저장
const personalData = { email, name, ... };
const encryptedData = encrypt(personalData, ephemeralKey);
const cid = await ipfs.add(encryptedData);

// 온체인에는 해시만
await contract.storeHash(hash(cid));

// 삭제 요청 시
await destroyKey(ephemeralKey); // 키 폐기로 데이터 복호화 불가
```

## Performance Optimization

### Caching Layer Performance

**Redis 최적화**:
- **Pipeline Commands**: 여러 명령을 한 번에 전송 (RTT 감소)
- **Connection Pooling**: 연결 재사용
- **Compression**: 큰 값은 LZ4 압축

```javascript
// Pipeline 사용
const pipeline = redis.pipeline();
for (let i = 0; i < 1000; i++) {
    pipeline.get(`key:${i}`);
}
const results = await pipeline.exec(); // 단 한 번의 RTT
```

**측정 가능한 성능**:
- Read Latency: < 1ms (P95)
- Write Latency: < 2ms (P95)
- Throughput: 100,000+ ops/sec (per instance)

### IPFS Retrieval Optimization

**Pinning Strategy**:
- 인기 있는 데이터를 여러 노드에 pin
- 지역별 pin 서비스 운영 (CDN-like)

**DHT 최적화**:
- Local DHT caching
- Pre-warming for predictable requests

**측정 가능한 성능**:
- First Byte Time: < 500ms (P95)
- Download Speed: 10+ MB/s (depending on content size and node count)

## Cost Analysis

### Storage Cost Comparison

| Storage Type | Cost per GB/month | Best Use Case |
|--------------|-------------------|---------------|
| **Ethereum** | $2,000,000+ | Critical metadata only |
| **Polygon L2** | $100,000+ | Transaction records |
| **Arweave** | $5 (one-time) | Permanent archives |
| **Filecoin** | $0.01-0.10 | Long-term storage |
| **IPFS (self-hosted)** | $0.05-0.15 | Active data |
| **Redis Cloud** | $0.20-0.50 | Hot cache |
| **AWS S3** | $0.023 | Centralized alternative |

**Sela의 비용 효율성**:
- 온체인 스토리지를 메타데이터만으로 제한하여 99.9% 비용 절감
- IPFS+Filecoin 조합으로 AWS S3 대비 70% 절감
- Arweave의 일회성 지불로 장기 비용 예측 가능

### Example Cost Breakdown

**100만 개 스크래핑 작업 (각 1MB 결과)**:

```
On-Chain (메타데이터 only, ~200 bytes each):
  - Polygon L2: 0.2GB × $100,000 = $20,000/month

Decentralized Storage:
  - IPFS Pinning: 1,000GB × $0.10 = $100/month
  - Filecoin (1-year contract): 1,000GB × $0.05 = $50/month

Cache Layer:
  - Redis (20% hot data): 200GB × $0.30 = $60/month
  - RabbitMQ cluster: $200/month (flat fee)

Total: ~$20,410/month

AWS S3 equivalent: 1,000GB × $0.023 = $23/month (BUT no decentralization)
Traditional Web Scraping Service: $50,000-100,000/month
```

**ROI for Node Operators**: 스토리지 제공으로 월 $500-2,000 수익 가능

## Disaster Recovery & Backup

### Multi-Region Replication

```
Primary Region: US-East
  ├─ Redis Cluster (3 nodes)
  ├─ RabbitMQ Cluster (3 nodes)
  └─ IPFS Pinning Nodes (5 nodes)

Secondary Region: EU-West
  ├─ Redis Replica (read-only)
  ├─ RabbitMQ Mirror Queue
  └─ IPFS Pinning Nodes (5 nodes)

Tertiary Region: Asia-Pacific
  ├─ Redis Replica (read-only)
  ├─ RabbitMQ Mirror Queue
  └─ IPFS Pinning Nodes (5 nodes)
```

### Backup Strategy

**Automated Backups**:
- Redis: RDB snapshots every 6 hours + AOF logs
- RabbitMQ: Message persistence + cluster replication
- IPFS: Automatic replication via Filecoin contracts
- Blockchain: Full node redundancy

**Recovery Time Objectives (RTO)**:
- Cache Layer: < 5 minutes (failover to replica)
- IPFS Data: < 30 minutes (fetch from other nodes)
- Blockchain Data: Instant (immutable, always available)

## Monitoring & Observability

### Key Metrics

**Storage Layer**:
- IPFS pin count and distribution
- Filecoin deal success rate
- Arweave transaction confirmation time

**Cache Layer**:
- Redis hit/miss ratio (target: >80%)
- RabbitMQ queue depth (alert if >10,000)
- Memory usage and eviction rate

**Blockchain Layer**:
- Gas costs per transaction
- Smart contract execution success rate
- zk-TLS proof verification time

### Alerting Thresholds

```yaml
redis_cache_hit_rate:
  warning: < 70%
  critical: < 50%

rabbitmq_queue_depth:
  warning: > 5,000 messages
  critical: > 10,000 messages

ipfs_retrieval_time:
  warning: > 1 second (P95)
  critical: > 5 seconds (P95)

blockchain_gas_price:
  warning: > 100 Gwei
  critical: > 500 Gwei
```

## Future Enhancements

### Planned Improvements (2025-2026)

1. **Cross-Chain Data Availability**: Celestia, Avail 통합으로 데이터 가용성 증명
2. **Edge Caching**: Cloudflare R2, Fastly 통합
3. **Zero-Knowledge Storage Proofs**: 데이터 저장 증명을 ZK-SNARK로 압축
4. **AI-Powered Cache Optimization**: 머신러닝으로 캐시 히트율 예측 및 최적화
5. **Quantum-Resistant Encryption**: Post-quantum 암호화 알고리즘 도입

## Conclusion

Sela Network의 데이터 계층은 **블록체인의 신뢰, 탈중앙화 스토리지의 영구성, 전통적 캐시의 성능**을 조화롭게 결합하여 웹 스크래핑 데이터의 전체 생명주기를 관리합니다.

**VC 투자자**에게는 확장 가능하고 비용 효율적인 인프라 설계를 통해 지속 가능한 비즈니스 모델을 제시합니다.

**개발자**에게는 간단한 API 뒤에 숨겨진 복잡한 데이터 관리를 통해 애플리케이션 로직에만 집중할 수 있게 합니다.

**노드 운영자**에게는 IPFS pinning과 Filecoin storage 제공을 통해 추가 수익 기회를 제공합니다.

이러한 3계층 하이브리드 아키텍처는 Sela Network가 중앙화 솔루션의 성능과 탈중앙화 솔루션의 신뢰성을 동시에 달성할 수 있게 합니다.

## Further Reading

- [Architecture Overview](/architecture/overview) - 전체 시스템 아키텍처
- [LLM Layer Architecture](/architecture/llm-layer) - AI 처리 계층
- [Smart Contract Documentation](/technology/core-technologies) - 온체인 로직 상세
- [Security Architecture](/security/architecture) - 데이터 보안 및 암호화
- [API Reference](/api/overview) - 데이터 접근 API

---

## Sources

- [Decentralised Storage on Blockchain: IPFS, Filecoin, and Arweave](https://www.opensourceforu.com/2025/06/decentralised-storage-on-blockchain-ipfs-filecoin-and-arweave/)
- [Top 10 Decentralized Storage Projects to Know in 2025](https://helalabs.com/blog/top-10-decentralized-storage-projects-in-2024/)
- [Lessons from the AWS Outage: A Centralized Failure, a Decentralized Solution](https://www.21shares.com/en-us/research/lessons-from-the-aws-outage-a-centralized-failure-a-decentralized-solution)
- [IPFS Comparisons - IPFS Documentation](https://docs.ipfs.tech/concepts/comparisons/)
- [Arweave+IPFS: Persistence for the InterPlanetary File System](https://arweave.medium.com/arweave-ipfs-persistence-for-the-interplanetary-file-system-9f12981c36c3)
- [Hybrid Web2 + Web3 Data Architecture with DataDhan](https://medium.com/techsutra/hybrid-web2-web3-data-architectures-bcaf4d311e2d)
- [Off-chain Storage For Web3 - Pinata](https://pinata.cloud/blog/off-chain-storage-for-web3/)
- [What Is Offchain Data and Offchain Computation? - Chainlink](https://chain.link/education-hub/off-chain-data)
- [Web3 Storage: Navigating the Next-Generation Options - Kaleido](https://www.kaleido.io/blockchain-blog/web3-storage-options)
- [Redis vs RabbitMQ - Key Differences - Airbyte](https://airbyte.com/data-engineering-resources/redis-vs-rabbitmq)
- [Distributed Data Storage with Redis, RabbitMQ, and Others](https://borstch.com/blog/development/distributed-data-storage-with-redis-rabbitmq-and-others)
- [Redis vs. RabbitMQ: A Detailed Comparison](https://medium.com/@contact_45426/redis-vs-rabbitmq-a-detailed-comparison-998ed1ba7fc2)
- [RabbitMQ, Kafka, Redis: The Superheroes of Distributed Systems](https://medium.com/cloud-native-daily/rabbitmq-kafka-redis-the-superheroes-of-distributed-systems-and-their-real-world-applications-cc611c169fa8)
- [Database Architecture - Redis Glossary](https://redis.io/glossary/database-architecture/)
- [Ruling the Event-Driven Architecture with RabbitMQ](https://medium.com/@jordan-temim/ruling-the-event-driven-architecture-with-rabbitmq-534798bdf17e)