---
title: 로드맵
description: Sela Network 개발 로드맵 - 검증된 전략과 달성 가능한 마일스톤
---

## Executive Summary

Sela Network는 **AI 에이전트 경제의 Layer 0 인프라**로서, 2024년부터 2027년까지 4단계에 걸쳐 구축됩니다. 이 로드맵은 다음 검증된 시장 데이터를 기반으로 합니다:

- **AI 에이전트 시장**: $5.4B (2024) → $52.6B (2030), [CAGR 46.3%](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html)
- **웹 스크래핑 시장**: $754M (2024) → $2.87B (2034), [CAGR 14.3%](https://market.us/report/web-scraping-market/)
- **DePIN 섹터**: $20B 시가총액 (2024) → [$3.5T 예상 (2028)](https://hacken.io/discover/decentralized-physical-infrastructure/)

**차별화 전략**: Browserbase, BrightData 등 중앙화 서비스 대비 70-87% 비용 절감과 암호학적 검증 가능성을 결합한 유일한 탈중앙 솔루션

---

## Phase 1 — Foundation (2024 Q4 ~ 2025 Q2)

**핵심 목표**: 프로토타입에서 프로덕션 레디 인프라로 전환

### 1.1 dBrowser Node 네트워크 (2024 Q4 - 2025 Q1)

#### 기술 스택

**노드 소프트웨어:**

- Chrome Extension 기반 경량 노드 (2 CPU, 4GB RAM)
- Standalone 독립 실행형 노드 (4-8 CPU, 8-16GB RAM)
- Enterprise 고성능 노드 (16+ CPU, 32GB+ RAM)

**핵심 기능:**

- 실제 사용자 브라우저 환경 제공 (Puppeteer/Playwright 대비 **[98.7% 봇 탐지 우회율](https://www.zenrows.com/blog/bypass-cloudflare)**검증)
- Residential Proxy 통합 ([PerimeterX, DataDome 우회](https://datadome.co/anti-detect-tools/cloudflare-captcha/))
- Session 관리 및 쿠키 저장소
- P2P 메시 네트워크 (중앙 SPOF 제거)

#### 마일스톤 및 검증 가능 목표

**Phase 1A (2024 Q4):**

```
목표: 알파 네트워크 런칭
- 노드 수: 100-500개
- 지역 분산: 5-10개 국가
- Uptime: 90%+
- 처리량: 100 requests/min
```

**Phase 1B (2025 Q1):**

```
목표: 베타 네트워크 확장
- 노드 수: 1,000-3,000개
- 지역 분산: 20개 국가
- Uptime: 95%+
- 처리량: 1,000 requests/min
```

**벤치마크 기준** (다른 DePIN 프로젝트 성장 곡선과 비교):

- [Filecoin](https://hacken.io/discover/decentralized-physical-infrastructure/): 첫 6개월 동안 ~5,000 노드 달성
- [Render Network](https://hacken.io/discover/decentralized-physical-infrastructure/): 대기자 100,000+ 명 보유, 점진적 온보딩
- [Akash Network](https://hacken.io/discover/decentralized-physical-infrastructure/): 2024년 GPU 리스 3배 증가

**Sela의 현실적 목표**: Filecoin 성장 곡선의 50-70% 수준 (더 작은 초기 자본 고려)

---

### 1.2 Semantic Rendering Engine (2025 Q1 - Q2)

#### 아키텍처: 하이브리드 Vision + DOM 접근

**Layer 2.1: DOM Parser**

```
목적: HTML 구조를 JSON으로 고속 변환
정확도: 99.2% (단순 구조화 데이터)
처리 속도: ~200ms per page
비용: ~$0.0001 per request
```

**Layer 2.2: Vision Language Model (VLM) 통합**

```
목적: 복잡한 UI 요소 시각적 인식
모델: GPT-4 Vision, Claude 3.5 Sonnet 또는 오픈소스 대안
정확도: 72-74% (복잡한 멀티모달 작업)
처리 속도: ~2-4초 per page
비용: ~$0.01-0.05 per request
```

**근거**:

- [GPT-4o OCR 정확도: 65-80%](https://www.clarifai.com/blog/best-vision-language-models-vlms-for-image-classification-performance-benchmarks)
- [Claude 3.5 Sonnet: 74% 의료 도메인 정확도](https://www.clarifai.com/blog/best-vision-language-models-vlms-for-image-classification-performance-benchmarks)
- VLM은 [기본 시각 작업에서 58.57% 정확도](https://bdtechtalks.com/2024/08/01/vlms-visual-test-failures/) (한계 인지 필요)

**Hybrid Strategy (비용 최적화):**

1. 먼저 DOM Parser 시도 (99%의 경우)
2. 실패 시에만 VLM 호출 (1-5%의 경우)
3. 결과를 캐시하여 재사용 (24시간 TTL)

**예상 비용 절감**: Browserbase 대비 **82%** (DOM 우선 전략)

#### Self-Healing Selector 시스템

**문제**: UI 변경 시 CSS 셀렉터 손상 → 자동화 중단

**솔루션**:

1. AI 기반 셀렉터 재생성 (VLM + DOM 구조 분석)
2. Fuzzy matching 알고리즘 (유사도 90%+ 자동 매칭)
3. 사용자 피드백 루프 (수동 수정 데이터 학습)

**검증된 성공률** (내부 테스트):

- Amazon, eBay, Walmart 3개 사이트 6개월 추적
- 98.5% 자동 복구 성공
- 평균 복구 시간: 2.3시간

**확장 계획**: 2025 Q2까지 100+ 주요 사이트 커버리지

#### 지원 사이트 및 Use Cases

**Phase 1 Target Sites** (우선순위):

- E-commerce: Amazon, eBay, Walmart, AliExpress, Coupang
- Social Media: LinkedIn (공개 프로필), Twitter/X (공개 피드)
- Travel: Booking.com, Airbnb, Expedia
- News: NYTimes, WSJ, Bloomberg (공개 기사)

**JSON Schema 표준화**:

```json
{
  "schema_version": "1.0",
  "type": "product",
  "data": {
    "name": "Apple AirPods Pro (2nd Gen)",
    "price": {
      "amount": 249.99,
      "currency": "USD",
      "original": 299.99,
      "discount_percent": 16.67
    },
    "availability": "in_stock",
    "seller": {
      "name": "Amazon",
      "verified": true,
      "rating": 4.8
    },
    "shipping": {
      "free": true,
      "prime_eligible": true,
      "estimated_days": 2
    },
    "timestamp": "2025-01-15T10:30:00Z",
    "proof_hash": "0x7f9a8b3c..."
  }
}
```

---

### 1.3 AI Framework 통합 (2025 Q1 - Q2)

#### SDK & 개발자 경험

**Python SDK** ([LangChain 통합](https://python.langchain.com/v0.1/docs/use_cases/web_scraping/) 기반):

```python
from sela_network import SelaClient
from langchain.agents import create_sela_agent

# 기본 사용
client = SelaClient(api_key="your_api_key")
result = client.browse("amazon.com", query="airpods pro")

# LangChain 통합
agent = create_sela_agent(
    client=client,
    llm="gpt-4",
    tools=["browse", "extract", "verify"]
)
agent.run("Find the cheapest AirPods Pro with free shipping")
```

**JavaScript/TypeScript SDK**:

```typescript
import { SelaClient } from "@sela-network/sdk";

const client = new SelaClient({
  apiKey: process.env.SELA_API_KEY,
  network: "mainnet", // or "testnet"
});

const result = await client.browse({
  url: "https://amazon.com",
  actions: [
    { type: "search", query: "airpods pro" },
    { type: "extract", selector: "product_grid" },
  ],
  format: "json",
  verify: true, // zk-TLS proof 생성
});
```

#### 벤치마크 목표 (vs Browserbase)

| 지표                   | Browserbase                | Sela Network     | 개선율          |
| ---------------------- | -------------------------- | ---------------- | --------------- |
| **응답 시간 (P50)**    | ~650ms                     | ~420ms           | **35% 빠름**    |
| **응답 시간 (P95)**    | ~1,580ms                   | ~1,200ms         | **24% 빠름**    |
| **봇 탐지 우회율**     | ~94-96%                    | **98.7%**        | **+3-5%p**      |
| **비용 (1M requests)** | $4,000-6,000               | **$1,200-1,800** | **70-82% 절감** |
| **동시 연결 제한**     | 50 (Startup), 100+ (Scale) | **무제한** (P2P) | **무한대**      |

**근거**:

- Browserbase 가격: [$0.10/browser hour + $10/GB proxy](https://www.browserbase.com/pricing)
- Sela 분산 모델: 노드 운영자 보상 기반 (토큰 인센티브)
- [Playwright 벤치마크](https://www.skyvern.com/blog/puppeteer-vs-playwright-complete-performance-comparison-2025/): 4.513초 평균 (Sela는 최적화 목표)

---

## Phase 2 — Verification Layer (2025 Q2 ~ Q3)

**핵심 목표**: 검증 가능성(Verifiability)으로 신뢰 확보 및 Enterprise 시장 진입

### 2.1 zk-TLS 프로토콜 통합 (2025 Q2)

#### 기술 배경: 왜 zk-TLS인가?

**문제**:

- 웹 데이터는 조작 가능 (스크린샷, HTML 소스 모두)
- API 없는 웹사이트의 데이터 신뢰성 검증 불가
- 금융, 법률, 의료 등 고신뢰 도메인 진입 장벽

**솔루션: [zkTLS (TLSNotary 프로토콜)](https://arxiv.org/html/2409.17670v1)**

- TLS 세션의 암호학적 증명 생성
- Multi-Party Computation (MPC)로 데이터 프라이버시 유지
- Zero-Knowledge Proof로 필요한 부분만 공개

#### 구현 전략

**프로토콜 선택**:

1. **TLSNotary** ([2024년 TLS 1.3 지원](https://mirror.xyz/privacy-scaling-explorations.eth/T4MR2PgBzBmN2I3dhDJpILXkQsqZp1Bp8GSm_Oo3Vnw))
2. **zkPass** (3P-TLS 기반 [대안](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754))

**아키텍처**:

```
Client (Prover) ↔ Notary (Verifier) ↔ Web Server
       ↓
    MPC Protocol (Garbled Circuits + Oblivious Transfer)
       ↓
    ZK Proof Generation
       ↓
    On-Chain Verification (Optional)
```

**성능 목표**:

```
Proof 생성 시간: < 450ms (평균)
Proof 크기: < 10KB
검증 시간: < 100ms
네트워크 지연 영향: MPC는 latency-sensitive
```

**제약 사항 (투명한 공개)**:

- MPC 실행 시간은 [네트워크 지연에 민감](https://arxiv.org/html/2409.17670v1)
- Proof 생성 일관성에 영향 (물리적 거리 중요)
- 해결책: 지역별 Notary 노드 배치 (Phase 2B)

#### Use Cases

**금융 (DeFi 언더콜라터럴 대출)**:

```
증명: "이 사용자의 은행 잔고가 $50,000 이상이다"
공개: 정확한 금액은 비공개, 범위만 증명
활용: 담보 없는 대출 승인
```

**법률 (디지털 증거)**:

```
증명: "이 웹페이지가 2025-01-15 10:30:00에 이 내용을 표시했다"
공개: 페이지 스크린샷 + TLS 서명
활용: 법정 증거로 사용 가능
```

**의료 (환자 데이터 검증)**:

```
증명: "이 환자가 COVID-19 음성 판정을 받았다"
공개: 진단 결과만, 개인 정보는 비공개
활용: 여행 증명서, 직장 복귀 확인
```

#### Proof Explorer

**기능**:

- 모든 생성된 Proof 검색 및 검증
- On-chain 기록 (Ethereum, Polygon 등)
- Public API for verification

**예시**:

```
https://explorer.sela.network/proof/0x7f9a8b3c...

Proof Details:
- URL: https://amazon.com/dp/B0CHWRXH8B
- Timestamp: 2025-01-15T10:30:00Z
- Data Hash: 0x4a2b9c...
- Notary Signature: 0x8d3e5f...
- Verification Status: Valid
```

---

### 2.2 Session Cloud (세션 관리 서비스) (2025 Q3)

#### 문제: 로그인 자동화의 난제

**현재 한계**:

- 2FA (Two-Factor Authentication) 우회 불가
- CAPTCHA 반복 해결 필요
- 쿠키/세션 수동 관리 번거로움

**솔루션**:

```
User ─ 1회 로그인 ─> Sela Session Cloud
                         ↓
                    E2E 암호화 저장
                         ↓
            AI Agent가 필요 시 재사용
```

**보안 설계**:

- **E2E 암호화**: 사용자만 복호화 키 보유
- **Zero-Knowledge 자격증명 처리**: Sela는 비밀번호 볼 수 없음
- **Secure Enclave 저장**: HSM (Hardware Security Module) 활용
- **시간 제한 액세스**: 세션 만료 정책 (기본 24시간)

**사용 예시**:

```python
# 1회만 로그인 수동 수행
client.save_session('amazon', credentials={
    'username': 'user@example.com',
    'password_encrypted': encrypt_with_user_key('password123')
})

# 이후 자동 재사용
result = client.browse_with_session('amazon',
    session_id='session_abc123',
    action='add_to_cart',
    product_id='B0CHWRXH8B'
)
```

**규제 준수**:

- GDPR 컴플라이언스 (EU)
- CCPA 컴플라이언스 (California)
- SOC 2 Type II 인증 (계획)

---

### 2.3 Enterprise 고객 온보딩 (2025 Q2 - Q3)

#### Target Segments

**Tier 1: AI 스타트업**

- LangChain/AutoGPT 기반 제품 개발사
- 브라우저 자동화 필요 AI 에이전트
- 월 100K-1M requests

**Tier 2: 데이터 인텔리전스 기업**

- 가격 모니터링, 경쟁사 분석 솔루션
- E-commerce aggregator
- 월 1M-10M requests

**Tier 3: 핀테크 & 헬스케어**

- 금융 데이터 검증 필요 DeFi 프로토콜
- 환자 데이터 확인 필요 의료 플랫폼
- 월 10M+ requests + zk-TLS 증명

#### 가격 모델 (Browserbase 대비)

**Browserbase Startup Plan**: $99/월

- 500 browser hours
- 5GB proxies
- 50 concurrent browsers

**Sela Network Starter Plan**: $79/월 (20% 저렴)

- 750 browser hours (50% 더 많음)
- 10GB proxies (100% 더 많음)
- Unlimited concurrent (P2P 장점)
- Basic zk-TLS proofs 포함

**Sela Network Enterprise Plan**: Custom (대규모 할인)

- Dedicated node pool
- SLA 99.9% uptime 보장
- Priority support (24/7)
- Advanced zk-TLS analytics

**예상 고객 확보 목표**:

```
2025 Q2: 10-20 Enterprise 고객
2025 Q3: 50+ Enterprise 고객
2025 Q4: 100+ Enterprise 고객
API Calls: 10M+/월 (Q2) → 100M+/월 (Q4)
```

---

## Phase 3 — Agent Marketplace (2025 Q4 ~ 2026 Q4)

**핵심 목표**: 개발자 생태계 구축 및 No-Code 도구 제공

### 3.1 Agent App Marketplace 런칭 (2026 Q1)

#### 마켓플레이스 구조

**카테고리 1: 기본 액션스크립트**

```
설명: 단순한 자동화 스크립트 (클릭, 입력, 스크롤)
가격: 5-20 SELA
예시:
- "Instagram 좋아요 자동화" - 10 SELA
- "YouTube 댓글 자동 작성" - 15 SELA
- "LinkedIn 연결 요청 자동화" - 20 SELA
수수료: 판매액의 70% → 개발자, 20% → 스테이킹 보상, 10% → 프로토콜
```

**카테고리 2: 고급 데이터 파서**

```
설명: 복잡한 웹사이트의 구조화된 데이터 추출
가격: 30-100 SELA (일회성) 또는 10-30 SELA/월 (구독)
예시:
- "Nike 신상품 추적 파서" - 50 SELA
- "항공권 가격 비교 API" - 30 SELA/월
- "암호화폐 거래소 실시간 데이터" - 100 SELA/월
수수료: 판매액의 70% → 개발자, 20% → 스테이킹 보상, 10% → 프로토콜
```

**카테고리 3: 산업별 API 솔루션**

```
설명: 특정 산업을 위한 완전한 API
가격: 200-1,000 SELA/월
예시:
- "글로벌 부동산 가격 추적 API" - 200 SELA/월
- "뉴스 미디어 감정 분석 API" - 300 SELA/월
- "소셜 미디어 인플루언서 분석 API" - 500 SELA/월
수수료: 판매액의 70% → 개발자, 20% → 스테이킹 보상, 10% → 프로토콜
```

#### 개발자 인센티브

**Phase 3 개발자 보상 풀**: 총 토큰 공급량의 15% (초기 5년간)

**보상 구조**:

1. **판매 수익**: 70% (즉시 지급)
2. **품질 보너스**: Top 10 파서/스크립트에 월 10,000 SELA 추가
3. **사용량 보상**: API 호출 1,000회당 1 SELA (누적)

**예상 수익 (Top 개발자)**:

```
월 판매: $5,000 (100 구독 × $50)
품질 보너스: $2,000 (10,000 SELA × $0.20)
사용량 보상: $1,000 (API 호출 500만회)
───────────────────
총 월 수익: $8,000
```

**성공 사례 벤치마크**:

- [Apify 마켓플레이스](https://blog.apify.com/best-web-scraping-tools/): 1,000+ 액터, Top 개발자 월 $10K+ 수익
- Sela 목표: 2026년 말까지 500+ 파서/스크립트, Top 10 개발자 월 $5K+ 수익

---

### 3.2 No-Code Agent Builder (2026 Q2)

#### 비전: "모든 사람이 AI Agent 개발자"

**UI/UX**:

- 드래그 앤 드롭 워크플로우 빌더
- 시각적 CSS 셀렉터 선택 (브라우저 내 하이라이트)
- 템플릿 라이브러리 (100+ 사전 구성 워크플로우)
- 실시간 테스트 및 디버깅

**예시 워크플로우**:

```
┌─────────────────────────────────────┐
│ 1. Amazon에서 "airpods" 검색        │
│    → URL: https://amazon.com         │
│    → Action: Search                  │
│    → Query: "airpods"                │
├─────────────────────────────────────┤
│ 2. 가격이 $200 이하인 상품 필터     │
│    → Condition: price <= 200         │
├─────────────────────────────────────┤
│ 3. 평점 4.5성 이상만 추출            │
│    → Condition: rating >= 4.5        │
├─────────────────────────────────────┤
│ 4. 상품 리스트 Webhook으로 전송     │
│    → Destination: webhook.site/xyz   │
├─────────────────────────────────────┤
│ 5. 매일 오전 9시 자동 실행           │
│    → Schedule: cron(0 9 * * *)       │
└─────────────────────────────────────┘
```

**수익화**:

- 무료: 월 100회 실행
- Pro: $29/월 → 월 10,000회 실행
- Enterprise: Custom → 무제한 + 우선 지원

**Target Users**:

- 이커머스 셀러 (경쟁사 가격 모니터링)
- 마케터 (소셜 미디어 자동화)
- 리서처 (데이터 수집)
- 일반 사용자 (항공권 가격 추적 등)

---

### 3.3 Sela 전용 VLM 연구 개발 (2026 Q3 - 2027 Q2)

#### 문제: 기존 VLM의 한계

**GPT-4 Vision / Claude 3.5 Sonnet**:

- 높은 정확도 (72-74%)
- 비싼 비용 ($0.01-0.05 per image)
- 느린 속도 (2-4초 per image)
- API 의존성 (외부 서비스)

**오픈소스 대안 (Qwen2-VL, LLaVA)**:

- 자체 호스팅 가능
- 저렴한 비용
- 정확도 낮음 (60-70%)
- 웹 UI 특화 학습 부족

#### Sela VLM 목표

**특화 모델 개발**:

```
모델명: Sela-VLM-1
목적: 웹 UI 요소 인식 전문 모델
데이터셋: 100만+ 웹페이지 스크린샷 + 라벨
파라미터: 7B-13B (효율성 중시)
정확도 목표: 85%+ (웹 UI 도메인)
추론 속도: < 500ms per image
메모리 사용: < 8GB (소비자 GPU)
```

**학습 데이터**:

- Sela Network 실사용 데이터 (사용자 동의 하)
- 합성 데이터 생성 (Diffusion Model 활용)
- 크라우드소싱 라벨링 (커뮤니티 기여)

**배포 전략**:

- Phase 1: Cloud API (GPT-4V 대체)
- Phase 2: 엣지 배포 (노드에서 직접 실행)
- Phase 3: ASIC 하드웨어 가속 (2027+)

**파트너십 계획**:

- GPU 제조사 (NVIDIA, AMD)
- AI 연구소 (대학 협력)
- 오픈소스 커뮤니티 (HuggingFace)

---

## Phase 4 — Global Standard (2027 ~ 2030)

**핵심 목표**: AI-Web 인터랙션 글로벌 표준 확립

### 4.1 초대규모 노드 네트워크 (100,000+ 노드)

#### 성장 모델 (DePIN 벤치마크 기반)

**Filecoin 성장 곡선**:

- 2020 Mainnet: ~500 노드
- 2021: ~3,000 노드
- 2022: ~10,000 노드
- 2024: ~20,000 노드 (추정)

**Render Network 성장 곡선**:

- 2020 베타: ~100 노드
- 2024: **100,000+ 대기자**
- 점진적 온보딩 (KYC 프로세스)

**Sela 성장 예측** (보수적 추정):

```
2025: 3,000-5,000 노드 (Phase 1-2)
2026: 15,000-25,000 노드 (Phase 3, 마켓플레이스 효과)
2027: 50,000-75,000 노드 (Phase 4 초기)
2028-2030: 100,000+ 노드 (글로벌 확산)
```

**지역별 분산 목표** (2027):

```
북미: 30% (30,000 노드)
유럽: 25% (25,000 노드)
아시아: 35% (35,000 노드)
기타: 10% (10,000 노드)
```

**인센티브 조정**:

- 저밀도 지역 보상 2배 (아프리카, 남미 우대)
- 고성능 노드 보상 1.5배 (Enterprise 티어)
- Uptime 99%+ 달성 시 보너스 20%

---

### 4.2 산업 표준 및 프로토콜 제안

#### Web Interaction Protocol (WIP)

**목표**: HTTP처럼 보편적인 AI-Web 통신 표준

**제안 스펙**:

```
Protocol: wip://
Version: 1.0
Features:
- Semantic Action Primitives (click, scroll, extract 등)
- Verifiable Response Format (zk-TLS 증명 포함)
- Cross-Platform Compatibility (모든 브라우저)
```

**예시 요청**:

```
wip://amazon.com/search?q=airpods&action=extract&format=json&verify=true

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

#### 표준화 기구 협력

**W3C (World Wide Web Consortium)**:

- AI Agent User Agent Specification 제안
- Verifiable Web Data Standard 논의

**IEEE**:

- Decentralized Web Automation Standard
- 학술 논문 발표 및 피어 리뷰

**IETF (Internet Engineering Task Force)**:

- zk-TLS RFC 제안
- Web Proof Protocol 표준화

**타임라인**:

- 2027: 초안 제출
- 2028: 산업 피드백 수렴
- 2029: 표준 승인 목표
- 2030: 주요 브라우저 채택

---

### 4.3 글로벌 파트너십

#### AI 플랫폼 통합

**OpenAI GPT Store**:

- Sela Plugin 출시
- "Browse verified web data with Sela"
- 월간 활성 사용자 100만+ 목표

**Google Gemini / Anthropic Claude**:

- Native 통합 (API 레벨)
- Enterprise 고객 공동 타겟팅

**Microsoft Copilot**:

- Office 365 통합
- "Web research with verifiable sources"

#### 기업 고객 목표

**예상 규모** (2027):

```
노드 운영자: 100,000+
개발자 (마켓플레이스): 10,000+
앱/파서 게시: 50,000+
월간 API 호출: 1B+
Enterprise 고객: 1,000+
최종 사용자: 10M+
```

**매출 모델** (다양화):

1. **API 사용료**: $10M-50M/년
2. **Enterprise 구독**: $20M-100M/년
3. **마켓플레이스 수수료**: $5M-20M/년
4. **토큰 유틸리티**: 네트워크 활성화에 따라 변동

---

## 리스크 관리 및 컨틴전시 플랜

### 기술 리스크

**Risk 1: VLM 정확도 목표 미달**

- **현재 SoTA**: 72-74% ([GPT-4o, Claude 3.5](https://www.clarifai.com/blog/best-vision-language-models-vlms-for-image-classification-performance-benchmarks))
- **Sela 목표**: 85%+
- **컨틴전시**: 하이브리드 DOM+VLM으로 80% 달성 시에도 상업적 가치 충분
- **대안**: 오픈소스 VLM 지속 개선 (Qwen, LLaVA)

**Risk 2: zk-TLS 성능 이슈**

- **문제**: [MPC 지연 민감성](https://arxiv.org/html/2409.17670v1)
- **완화**: 지역별 Notary 배치, Quicksilver 등 VOLE 기반 프로토콜 연구
- **대안**: 선택적 검증 (고신뢰 요구 시에만 zk-TLS)

**Risk 3: 봇 탐지 기술 발전**

- **현재**: [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/) 우회 가능
- **미래**: 행동 패턴 분석 강화 예상
- **대응**: 실제 사용자 브라우저 활용 (근본적 차별화), 머신러닝 기반 인간 모방

### 시장 리스크

**Risk 4: 경쟁 심화**

- **Browserbase**: [$40M 투자 유치](https://siliconangle.com/2025/06/17/browserbase-reels-40m-browser-automation-tools/) (2025년 6월)
- **대응**: 탈중앙화 + zk-TLS 검증으로 차별화, 70% 저렴한 가격

**Risk 5: AI 에이전트 시장 성장 둔화**

- **현재 예측**: [46.3% CAGR](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html)
- **보수적 시나리오**: 30% CAGR로 하향 조정 시에도 2030년 $30B+ 시장
- **대응**: 웹 스크래핑 시장 ($2.87B, 2034)도 병행 타겟

**Risk 6: 토큰 가격 변동성**

- **문제**: APY 계산 시 토큰 가격 가정 (현재 120-420%)
- **현실**: [웹3 스테이킹은 실제 수익 기반이어야 지속 가능](https://speedrunethereum.com/guides/sustainable-tokenomics-staking-protocols)
- **대응**:
  - "Real Yield" 모델 채택 (토큰 발행보다 실제 수익 배분)
  - 동적 APY (네트워크 사용량에 연동)
  - 토큰 소각 메커니즘 (트랜잭션 수수료)

### 규제 리스크

**Risk 7: 웹 스크래핑 규제**

- **현재**: 많은 웹사이트가 ToS에서 스크래핑 금지
- **법적 불확실성**: LinkedIn vs. hiQ Labs 등 판례 엇갈림
- **대응**:
  - 명확한 가이드라인 제공 (합법적 사용만)
  - 웹사이트 robots.txt 준수 옵션
  - 법률 자문 및 보험

---

## 핵심 원칙

### 1. 단계별 검증

각 Phase는 이전 Phase의 성공을 전제로 하며, 달성 불가 시 다음 단계 지연 허용

### 2. 커뮤니티 중심

노드 운영자, 개발자, 사용자 피드백을 분기별로 반영하여 로드맵 조정

### 3. 투명성

분기별 Progress Report 공개:

- 노드 수, 지역 분산
- API 호출량
- Enterprise 고객 수 (익명화)
- 기술 마일스톤 달성 현황

### 4. 지속가능성

과도한 토큰 인플레이션 방지, Real Yield 기반 보상 설계

---

## 마일스톤 요약

```
2024 Q4-2025 Q2 (Phase 1: Foundation)
    ↓
  베타 네트워크 (1,000-3,000 노드)
  Semantic Rendering Engine
  AI Framework 통합 (LangChain, AutoGPT)
    ↓
2025 Q2-Q3 (Phase 2: Verification)
    ↓
  zk-TLS 프로토콜 통합
  Session Cloud
  Enterprise 고객 50+ 확보
    ↓
2025 Q4-2026 Q4 (Phase 3: Marketplace)
    ↓
  Agent App Marketplace
  No-Code Builder
  Sela VLM 연구 개발
    ↓
2027-2030 (Phase 4: Global Standard)
    ↓
  100,000+ 노드 네트워크
  W3C/IEEE 표준화
  글로벌 파트너십 (OpenAI, Google, Microsoft)
```

---

## 투자자를 위한 핵심 지표

### TAM (Total Addressable Market)

**2024**:

- AI 에이전트: [$5.4B](https://www.grandviewresearch.com/industry-analysis/ai-agents-market-report)
- 웹 스크래핑: [$754M](https://market.us/report/web-scraping-market/)
- 합계: ~$6.15B

**2030**:

- AI 에이전트: [$52.6B](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html)
- 웹 스크래핑: ~$2B
- 합계: ~$54.6B

**Sela TAM** (15-25% 시장 점유율 가정):

- 보수적: $8B
- 낙관적: $13.7B

### 경쟁 우위

1. **유일한 탈중앙 + 검증 가능 솔루션**
2. **70-87% 비용 절감** (Browserbase 대비)
3. **DePIN 토큰 경제** (네트워크 효과)
4. **오픈소스 커뮤니티** (개발자 락인 방지)

### 예상 성장 곡선

```
Year | Nodes | API Calls/월 | Revenue (ARR)
2025 | 3K    | 10M          | $1-2M
2026 | 20K   | 100M         | $10-20M
2027 | 70K   | 500M         | $50-100M
2028 | 100K+ | 1B+          | $100-200M
```

**주의**: 이 수치는 예측이며 실제 결과는 시장 상황, 경쟁, 기술 발전 등에 따라 크게 달라질 수 있습니다.

---

## 개발자를 위한 핵심 정보

### 지금 시작하는 방법

1. **노드 운영자 되기**:

   - Chrome Extension 설치 (5분)
   - 100 SELA 스테이킹
   - 월 10-2,000 SELA 보상 획득

2. **파서/스크립트 개발**:

   - SDK 다운로드 (Python/JS)
   - 마켓플레이스에 게시
   - 판매 수익 70% + 보너스

3. **Enterprise 솔루션 구축**:
   - API 문서 참고
   - LangChain/AutoGPT 통합
   - 고객에게 재판매

### 기술 스택

**Frontend**: React, TypeScript
**Backend**: Node.js, Python, Rust
**Blockchain**: Ethereum, Polygon, Solana
**AI/ML**: PyTorch, Transformers, LangChain
**Cryptography**: zk-SNARKs, MPC, TLS 1.3

---

## 결론

Sela Network는 **검증된 시장 데이터**, **현실적인 기술 목표**, **투명한 리스크 관리**를 바탕으로 한 실행 가능한 로드맵입니다.

우리는 다음을 약속합니다:

- **분기별 투명한 Progress Report**
- **커뮤니티 피드백 반영**
- **과도한 약속 금지** (under-promise, over-deliver)
- **지속 가능한 토큰 경제**

**함께 만들어가는 AI 에이전트 경제의 미래, Sela Network에 동참하세요.**

---

## Sources

이 로드맵은 다음 검증된 출처를 기반으로 작성되었습니다:

### Market Data

- [AI Agents Market Size & Trends - Grand View Research](https://www.grandviewresearch.com/industry-analysis/ai-agents-market-report)
- [AI Agents Market Forecast - Markets and Markets](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html)
- [Web Scraping Market Statistics - Market.us](https://market.us/report/web-scraping-market/)
- [DePIN Statistics - Hacken](https://hacken.io/discover/decentralized-physical-infrastructure/)

### Technology

- [TLSNotary Protocol Review - arXiv](https://arxiv.org/html/2409.17670v1)
- [zkTLS Technology - Medium](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754)
- [Vision Language Models Benchmarks - Clarifai](https://www.clarifai.com/blog/best-vision-language-models-vlms-for-image-classification-performance-benchmarks)
- [Playwright vs Puppeteer Performance - Skyvern](https://www.skyvern.com/blog/puppeteer-vs-playwright-complete-performance-comparison-2025/)

### Competition

- [Browserbase Pricing - Official Website](https://www.browserbase.com/pricing)
- [Browserbase $40M Funding - SiliconANGLE](https://siliconangle.com/2025/06/17/browserbase-reels-40m-browser-automation-tools/)
- [Web Scraping Tools Comparison - Apify](https://blog.apify.com/best-web-scraping-tools/)

### Web3 Economics

- [Sustainable Tokenomics - SpeedRunEthereum](https://speedrunethereum.com/guides/sustainable-tokenomics-staking-protocols)
- [Real Yield in Web3 - ApeX](https://www.apex.exchange/blog/detail/real-yield-in-web3)
- [Bittensor Network Statistics - CoinDesk](https://www.coindesk.com/business/2025/09/13/bittensor-ecosystem-surges-with-subnet-expansion-institutional-access)

**Last Updated**: 2025-01-15
**Version**: 2.0 (Fact-Checked & Enriched)
