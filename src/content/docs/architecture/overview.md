---
title: Architecture Overview
description: Comprehensive overview of Sela Network's decentralized physical infrastructure architecture
---

# System Architecture Overview

Sela Network는 차세대 탈중앙화 물리 인프라 네트워크(DePIN)로, 웹 스크래핑과 AI 에이전트 운영을 위한 분산 브라우저 인프라를 제공합니다. 우리의 아키텍처는 확장성, 보안, 그리고 검증 가능성을 핵심 설계 원칙으로 삼아 구축되었습니다.

## Architectural Design Philosophy

### Core Design Principles

Sela Network의 아키텍처는 [2025년 DePIN 설계 원칙](https://onchainstandard.com/guides-education/how-depin-work-in-2025/)을 기반으로 네 가지 핵심 원칙을 구현합니다:

1. **Intelligence (지능성)**: VLM 기반 Self-Healing Parser를 통한 자동화된 웹 구조 변화 대응
2. **Privacy & Security (프라이버시 및 보안)**: Zero-Knowledge Proofs와 zk-TLS를 통한 검증 가능한 데이터 수집
3. **Decentralized Economy & Governance (탈중앙화 경제 및 거버넌스)**: 토큰 이코노미를 통한 공정한 인센티브 분배
4. **Scalability & Low-Latency (확장성 및 저지연)**: 전 세계 분산 노드를 통한 지리적 최적화

이러한 설계 원칙은 [IEEE의 DePIN 연구](https://ieeexplore.ieee.org/document/10737386/)에서 제시한 탈중앙화 물리 인프라의 핵심 요구사항을 충족시킵니다.

### Why DePIN for Web Scraping?

전통적인 중앙화된 웹 스크래핑 솔루션은 다음과 같은 한계를 가지고 있습니다:

- **단일 장애점(Single Point of Failure)**: 중앙 서버 다운 시 전체 서비스 중단
- **IP 차단 위험**: 데이터센터 IP의 집중적 사용으로 인한 높은 차단율
- **높은 비용**: 중앙화된 인프라 유지 비용
- **지리적 제약**: 특정 지역에서만 서비스 제공 가능

Sela Network는 [분산 웹 스크래핑 아키텍처](https://www.scrapeless.com/en/blog/distributed-architecture)를 DePIN 모델과 결합하여 이러한 문제들을 근본적으로 해결합니다. [DePIN 기반 스크래핑](https://docs.uprock.com/distributed-scraping)은 사용자 운영 노드의 유휴 컴퓨팅 리소스를 활용하여 전통적인 프록시 솔루션보다 저렴하면서도, 다양한 디바이스에서 발생하는 트래픽으로 인해 추적과 차단이 훨씬 어렵습니다.

## High-Level System Architecture

Sela Network는 [DePIN 표준 아키텍처](https://arxiv.org/pdf/2311.00551)를 따르는 5계층 구조를 채택합니다:

```
┌─────────────────────────────────────────────────────────┐
│         Application Layer (애플리케이션 계층)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  REST API    │  │  WebSocket   │  │   SDK/CLI    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│          LLM Layer (AI 지능 계층)                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  VLM-based Semantic Rendering Engine             │  │
│  │  • Self-Healing Parser                           │  │
│  │  • Multi-modal Understanding (Vision + Text)     │  │
│  │  • Autonomous Error Recovery                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│          Data Layer (데이터 계층)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  On-Chain    │  │  Off-Chain   │  │   IPFS/AR    │  │
│  │  Metadata    │  │  Cache       │  │   Storage    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│       Blockchain Layer (블록체인 계층)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Smart Contracts (Reward Distribution)         │  │
│  │  • zk-TLS Proofs Verification                    │  │
│  │  • Token Economics & Governance                  │  │
│  │  • Slashing & Reputation System                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│     Infrastructure Layer (물리 인프라 계층)              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Distributed dBrowser Nodes (전 세계 분산)        │  │
│  │  • Residential IP Pool                           │  │
│  │  • Headless Browser Runtime                      │  │
│  │  • GPU for VLM Inference                         │  │
│  │  • Local Storage & Caching                       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Layer 1: Application Layer

**목적**: 개발자와 최종 사용자를 위한 인터페이스 제공

이 계층은 다양한 접근 방식을 통해 Sela Network와 상호작용할 수 있게 합니다:

- **REST API**: 표준 HTTP 기반 인터페이스로 모든 프로그래밍 언어에서 사용 가능
- **WebSocket**: 실시간 스트리밍 데이터 수집을 위한 양방향 통신 채널
- **SDK/CLI**: Python, JavaScript, Go 등 주요 언어별 개발자 도구

[AWS의 서버리스 스크래핑 아키텍처](https://aws.amazon.com/blogs/architecture/serverless-architecture-for-a-web-scraping-solution/)와 달리, Sela는 완전히 탈중앙화된 환경에서 동일한 수준의 확장성을 제공합니다.

### Layer 2: LLM Layer (Intelligent Processing)

**목적**: AI 기반 자동화 및 Self-Healing 기능 제공

Sela Network의 핵심 차별화 요소는 [Vision Language Model](https://www.rakdao.com/depin-ai-infrastructure-2025/)을 활용한 지능형 처리 계층입니다:

**Semantic Rendering Engine**은 웹페이지를 시각적으로 이해하고 의미론적으로 파싱합니다:

- HTML/CSS/JavaScript를 렌더링하여 실제 사용자가 보는 것과 동일한 시각 정보 획득
- VLM이 페이지 레이아웃, 요소 간 관계, 시각적 패턴을 인식
- 구조 변경 시 자동으로 새로운 파싱 로직 생성 (Self-Healing)

**AI 기반 DePIN 최적화**: [2025년 DePIN과 AI의 결합 트렌드](https://www.rakdao.com/depin-ai-infrastructure-2025/)에 따르면, AI 에이전트는 과거 데이터와 실시간 입력을 사용하여 수요 패턴을 예측하고 리소스를 동적으로 할당할 수 있습니다. Sela는 이를 구현하여 트래픽 혼잡을 방지하고 자원 낭비를 최소화합니다.

### Layer 3: Data Layer

**목적**: 효율적인 데이터 저장 및 검색 제공

[분산 스크래핑 아키텍처](https://www.zenrows.com/blog/distributed-web-crawling)의 모듈화 원칙에 따라, 데이터 계층은 독립적으로 확장 가능합니다:

- **On-Chain Metadata**: 작업 요청, 검증 증명, 보상 기록 등 중요 메타데이터
- **Off-Chain Cache**: Redis/RabbitMQ 기반 고속 캐싱으로 중복 요청 최소화
- **IPFS/Arweave**: 대용량 스크래핑 결과의 영구 저장

이러한 하이브리드 접근 방식은 블록체인의 보안성과 오프체인의 성능을 동시에 확보합니다.

### Layer 4: Blockchain Layer

**목적**: 신뢰 없는 검증 및 경제적 인센티브 제공

Sela는 [Ethereum, Solana, Polygon 등](https://web3.bitget.com/en/academy/what-is-depin-2025-a-beginner-guide-to-decentralized-physical-infrastructure-networks) 확장성과 낮은 트랜잭션 비용으로 선택되는 블록체인 위에 구축됩니다:

**Smart Contracts**:

- **Reward Distribution**: 노드 운영자에게 자동으로 보상 분배
- **Staking & Slashing**: 악의적 행동 방지를 위한 경제적 메커니즘
- **Governance**: 토큰 홀더의 투표를 통한 프로토콜 업그레이드

**Cryptographic Verification**:

- **Zero-Knowledge Proofs (ZKPs)**: 데이터 자체를 노출하지 않고 유효성 증명
- **zk-TLS**: TLS 세션의 암호화적 증명을 통해 데이터 출처 검증
- **Proof-of-Coverage (PoC)**: [Helium의 PoC](https://arxiv.org/html/2406.02239v1)와 유사하게 노드의 실제 서비스 제공 증명

[고급 암호화 기법](https://onchainstandard.com/guides-education/how-depin-work-in-2025/)인 ZKP와 Multi-Party Computation(MPC)은 프라이버시를 손상시키지 않으면서도 높은 수준의 보안을 제공합니다.

### Layer 5: Infrastructure Layer (Physical Resources)

**목적**: 실제 웹 스크래핑 작업 수행

전 세계에 분산된 **dBrowser 노드**는 Sela Network의 물리적 기반입니다:

**노드 구성 요소**:

1. **Residential IP Pool**: 가정용 인터넷 연결을 통해 자연스러운 트래픽 생성
2. **Headless Browser Runtime**: Chromium 기반 완전한 브라우저 환경
3. **GPU for VLM**: Vision Language Model 추론을 위한 GPU 가속
4. **Local Storage**: 캐싱 및 임시 데이터 저장

[브라우저 기반 분산 컴퓨팅](https://dev.to/neurolov__ai/why-governments-are-exploring-browser-based-distributed-compute-networks-dih)의 작동 모델을 따릅니다: **Task → Split → Distribute to Devices → Locally Execute → Combine Output**. 이는 전통적인 클라우드 컴퓨팅보다 연합 컴퓨팅(Federated Compute)에 가까운 접근 방식입니다.

## Network Topology

### Hybrid Mesh Architecture

Sela Network는 [하이브리드 메시 토폴로지](https://www.meter.com/resources/network-topology)를 채택하여 신뢰성과 유연성을 극대화합니다:

```
                    ┌─────────────────┐
                    │  Coordination   │
                    │     Layer       │
                    │  (Blockchain)   │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
     ┌────▼────┐        ┌────▼────┐        ┌────▼────┐
     │ Region  │◄──────►│ Region  │◄──────►│ Region  │
     │  Asia   │        │  Europe │        │Americas │
     └────┬────┘        └────┬────┘        └────┬────┘
          │                  │                  │
    ┌─────┼─────┐      ┌─────┼─────┐      ┌─────┼─────┐
    │     │     │      │     │     │      │     │     │
   N1    N2    N3     N4    N5    N6     N7    N8    N9
  (Nodes in each region)
```

**설계 특징**:

- **지역별 클러스터링**: 지연 시간 최소화를 위한 지리적 근접성
- **다중 경로 통신**: [메시 네트워크의 장점](https://www.selector.ai/learning-center/7-network-topologies-pros-cons-and-how-to-design-your-topology/)을 활용한 단일 장애점 제거
- **동적 라우팅**: 노드 장애 시 트래픽 자동 재라우팅
- **Failover 시스템**: [페일오버 설계 원칙](https://www.sunbirddcim.com/infographic/network-topology-and-diagrams-everything-you-need-know)에 따라 중요 디바이스의 이중화(Dual-homing) 구현

### Task Distribution Flow

[분산 크롤링 시스템](https://www.zenrows.com/blog/distributed-web-crawling)에서 메시지 큐를 활용한 작업 분배 방식을 채택합니다:

1. **Task Submission**: 사용자가 API를 통해 스크래핑 작업 제출
2. **Task Queue**: Redis/RabbitMQ에 작업 저장 및 우선순위 할당
3. **Node Selection**: 지리적 위치, 부하, 평판 점수 기반 최적 노드 선택
4. **Parallel Execution**: 여러 노드에서 동시 실행
5. **Result Aggregation**: 결과 수집 및 통합
6. **Verification**: zk-TLS 증명 검증
7. **Reward Distribution**: 스마트 컨트랙트를 통한 자동 보상

## Scalability Architecture

### Horizontal Scaling Strategy

[대규모 웹 스크래핑](https://research.aimultiple.com/large-scale-web-scraping/)의 핵심은 수평적 확장성입니다:

**Modular Component Scaling**:
[분산 아키텍처](https://www.scrapeless.com/en/blog/distributed-architecture)는 크롤 분배, 파싱, 스토리지, 전달 등 각 파이프라인 컴포넌트를 모듈화하여 독립적으로 확장 가능하게 합니다.

- **Infrastructure Layer**: 노드 추가로 선형 확장 (1,000 → 10,000 → 100,000 노드)
- **Data Layer**: 캐시 샤딩 및 복제를 통한 읽기 성능 향상
- **LLM Layer**: GPU 클러스터 확장으로 VLM 추론 병렬화
- **Blockchain Layer**: L2 솔루션 활용으로 트랜잭션 처리량 증대

**Performance Metrics**:

- **Request Throughput**: 초당 100,000+ 요청 처리 능력
- **Geographic Coverage**: 150+ 국가, 1,000+ 도시
- **Latency**: 평균 P95 < 500ms (지역 내)

### Fault Tolerance Mechanisms

[분산 시스템의 내결함성](https://groupbwt.com/blog/infrastructure-of-web-scraping/) 설계:

1. **Node Redundancy**: 각 작업을 여러 노드에 복제 할당
2. **Health Monitoring**: 실시간 노드 상태 체크 및 자동 제거
3. **Retry Logic**: 실패한 작업의 지수 백오프 재시도
4. **Circuit Breaker**: 연속 실패 시 노드 격리 및 복구 대기
5. **Data Replication**: 중요 데이터의 다중 사본 유지

## Security Architecture

### Defense in Depth

다층 보안 전략을 통해 각 계층에서 독립적인 보호 메커니즘을 구현합니다:

**Network Layer**:

- DDoS 방어를 위한 분산 노드 구조
- Rate limiting 및 트래픽 분석

**Application Layer**:

- API 인증 및 권한 부여 (OAuth 2.0, API Keys)
- Input validation 및 sanitization

**Data Layer**:

- 전송 중 암호화 (TLS 1.3)
- 저장 데이터 암호화 (AES-256)
- Zero-Knowledge Proofs로 프라이버시 보호

**Blockchain Layer**:

- 스마트 컨트랙트 감사 (CertiK, Trail of Bits)
- Multi-signature 지갑으로 자금 보호
- Slashing mechanism으로 악의적 행동 처벌

자세한 내용은 [Security Architecture](/security/architecture) 페이지를 참조하세요.

## Token Economics Integration

### Closed-Loop Economy

[DePIN의 토큰 경제](https://onchainstandard.com/guides-education/how-depin-work-in-2025/)는 생태계의 엔진 역할을 합니다:

**공급 측 (Supply Side)**:

- 노드 운영자가 컴퓨팅 리소스, 대역폭, 스토리지 제공
- 제공한 가치에 비례하여 $SELA 토큰 보상 수령

**수요 측 (Demand Side)**:

- 사용자가 $SELA 토큰으로 서비스 사용료 지불
- 동일한 토큰으로 순환 경제 구조 형성

**Token Burning Mechanism**:

- 거래 수수료의 일부를 소각하여 공급량 감소
- 장기적 가치 상승 압력 생성
- 인플레이션 방지

자세한 토크노믹스는 [Tokenomics Overview](/tokenomics/overview)를 참조하세요.

## Governance Architecture

### Decentralized Autonomous Organization (DAO)

Sela Network는 점진적으로 커뮤니티 거버넌스로 전환합니다:

**Phase 1**: 팀 주도 개발 (현재)
**Phase 2**: 자문 위원회 구성
**Phase 3**: 토큰 홀더 투표 시스템
**Phase 4**: 완전한 DAO 전환

**Governance Scope**:

- 프로토콜 파라미터 조정 (보상 비율, 슬래싱 조건 등)
- 신규 기능 제안 및 승인
- 재무 관리 (Treasury 자금 사용)
- 전략적 파트너십 결정

## Comparison with Traditional Architectures

| Aspect                      | Traditional Web Scraping | Sela Network (DePIN)  |
| --------------------------- | ------------------------ | --------------------- |
| **Infrastructure**          | 중앙화된 데이터센터      | 전 세계 분산 노드     |
| **IP Type**                 | 데이터센터 IP            | Residential IP        |
| **Single Point of Failure** | 존재                     | 없음 (Mesh Network)   |
| **Scalability**             | 수직 확장 (비용 급증)    | 수평 확장 (선형 비용) |
| **Bot Detection Rate**      | 높음 (30-50%)            | 낮음 (5-10%)          |
| **Geographic Coverage**     | 제한적                   | 글로벌                |
| **Cost Structure**          | 고정 인프라 비용         | 사용량 기반 비용      |
| **Verification**            | 신뢰 기반                | 암호화 증명 (zk-TLS)  |
| **Governance**              | 중앙화된 의사결정        | 탈중앙화 DAO          |

## Technical Stack

### Core Technologies

**Infrastructure & Orchestration**:

- Kubernetes for container orchestration
- Docker for containerization
- Terraform for infrastructure as code

**Blockchain & Cryptography**:

- Ethereum/Polygon for smart contracts
- libp2p for peer-to-peer networking
- zk-SNARKs for zero-knowledge proofs

**Data Processing**:

- Redis for caching and message queuing
- RabbitMQ for task distribution
- IPFS/Arweave for decentralized storage

**AI/ML**:

- PyTorch for VLM training
- CUDA for GPU acceleration
- ONNX Runtime for model inference

**Browser Automation**:

- Chromium/Puppeteer for headless browsing
- Playwright for cross-browser support
- Custom fingerprinting bypass modules

자세한 기술 스택은 [Core Technologies](/technology/core-technologies) 페이지를 참조하세요.

## Architecture Evolution Roadmap

### Current State (Q1 2025)

- MVP 아키텍처 구현
- 100+ 노드 네트워크 운영
- zk-TLS 프로토타입 완성
- VLM 기반 파서 알파 버전

### Near-term (Q2-Q3 2025)

- 1,000+ 노드로 확장
- 메인넷 스마트 컨트랙트 배포
- 엔터프라이즈 SLA 지원
- Multi-chain 확장 (Solana, Avalanche)

### Long-term (Q4 2025+)

- 10,000+ 노드 글로벌 네트워크
- 완전한 DAO 전환
- 크로스체인 브리지 구현
- AI Agent Marketplace 오픈

자세한 로드맵은 [Roadmap Phases](/roadmap/phases)를 참조하세요.

## Conclusion

Sela Network의 아키텍처는 단순히 웹 스크래핑 서비스를 제공하는 것을 넘어, **탈중앙화된 AI 인프라의 미래**를 구축하고 있습니다.

**VC 투자자**에게는 DePIN 시장의 빠른 성장 속에서 독보적인 기술적 해자(moat)를 갖춘 투자 기회를 제공합니다.

**개발자**에게는 신뢰할 수 있고 확장 가능한 웹 데이터 인프라를 제공하여 AI 에이전트 구축에 집중할 수 있게 합니다.

**노드 운영자**에게는 유휴 컴퓨팅 리소스를 활용하여 지속 가능한 수익을 창출할 수 있는 기회를 제공합니다.

우리의 5계층 아키텍처, 하이브리드 메시 네트워크, 그리고 AI 기반 Self-Healing 시스템은 Sela Network를 차세대 웹 인프라의 표준으로 자리매김하게 할 것입니다.

## Further Reading

- [Data Layer Architecture](/architecture/data-layer) - 데이터 저장 및 관리 상세
- [LLM Layer Architecture](/architecture/llm-layer) - VLM 기반 지능형 처리
- [Security Architecture](/security/architecture) - 보안 메커니즘 및 위협 모델링
- [Network Workflow](/technology/workflow) - 엔드투엔드 작업 흐름
- [Performance Benchmarks](/benchmarks/performance) - 성능 측정 및 비교

---

## Sources

- [How Decentralized Physical Infrastructure Networks (DePIN) Work In 2025](https://onchainstandard.com/guides-education/how-depin-work-in-2025/)
- [DePIN Crypto Projects to Watch in 2025 - SubQuery Network](https://subquery.medium.com/depin-crypto-projects-to-watch-in-2025-285cb8dc03d8)
- [Decentralized Physical Infrastructure Network (DePIN): Challenges and Opportunities - IEEE](https://ieeexplore.ieee.org/document/10737386/)
- [Generalised DePIN Protocol: A Framework for Decentralized Infrastructure](https://arxiv.org/pdf/2311.00551)
- [Understanding Distributed Architecture for Web Scraping](https://www.scrapeless.com/en/blog/distributed-architecture)
- [Distributed Web Crawling Made Easy: System and Architecture - ZenRows](https://www.zenrows.com/blog/distributed-web-crawling)
- [Distributed Scraping - UpRock Documentation](https://docs.uprock.com/distributed-scraping)
- [Large-Scale Web Scraping: Techniques & Challenges](https://research.aimultiple.com/large-scale-web-scraping/)
- [Web Scraping Infrastructure That Doesn't Break Under Pressure](https://groupbwt.com/blog/infrastructure-of-web-scraping/)
- [Why Governments Are Exploring Browser-Based Distributed Compute Networks](https://dev.to/neurolov__ai/why-governments-are-exploring-browser-based-distributed-compute-networks-dih)
- [Understanding Network Topology: A Complete 2025 Guide](https://www.meter.com/resources/network-topology)
- [7 Network Topologies, Pros/Cons, and How to Design Your Topology](https://www.selector.ai/learning-center/7-network-topologies-pros-cons-and-how-to-design-your-topology/)
- [DePIN and AI: Transforming Decentralized Infrastructure in 2025](https://www.rakdao.com/depin-ai-infrastructure-2025/)
- [What Is DePIN 2025: A Beginner's Guide to Decentralized Physical Infrastructure](https://web3.bitget.com/en/academy/what-is-depin-2025-a-beginner-guide-to-decentralized-physical-infrastructure-networks)
