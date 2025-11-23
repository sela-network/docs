---
title: 데이터 및 인터랙션 흐름
description: Sela Network의 실제 동작 워크플로우 - 요청부터 검증까지 완전한 여정
---

## 개요: 하나의 요청이 만드는 여정

AI 에이전트가 "Amazon에서 에어팟 최저가를 찾아서 주문해줘"라고 요청하면 무슨 일이 벌어질까요? 이 단순해 보이는 요청 뒤에는 분산 네트워크, 고급 AI 모델, 암호학적 증명이 조화롭게 작동합니다.

이 페이지에서는 하나의 API 요청이 Sela Network를 통과하며 어떻게 처리되는지, 그리고 각 단계에서 어떤 기술이 사용되는지 상세히 설명합니다. 이것은 단순한 기술 문서가 아니라, **Sela가 어떻게 AI 에이전트에게 웹의 힘을 부여하는지에 대한 이야기**입니다.

---

## 시나리오: 실제 사용 사례

### 배경 상황

**사용자**: 개인 금융 AI 비서를 사용하는 직장인  
**AI Agent**: LangChain 기반 자율 쇼핑 에이전트  
**목표**: 크리스마스 선물로 Apple AirPods Pro 구매 (예산 $200)  
**제약**: 최저가, Prime 배송, 평점 4.5 이상

**전통적 방식의 문제**:

- 사용자가 직접 Amazon, eBay, Walmart를 일일이 방문
- 각 사이트의 가격, 배송비, 리뷰를 수동으로 비교
- 시간 소요: 30-45분
- 놓친 프로모션이나 더 나은 딜이 있을 수 있음

**Sela + AI Agent 방식**:

- AI 에이전트에게 한 번 요청
- 3분 내에 최적의 옵션 찾기 + 자동 주문
- 모든 거래 내역이 검증 가능한 증명과 함께 저장

이제 이것이 어떻게 가능한지 단계별로 살펴보겠습니다.

---

## 전체 아키텍처 흐름도

```
┌────────────────────────────────────────────────┐
│  AI Agent (LangChain)                         │
│  "Amazon에서 에어팟 최저가 검색 후 주문"        │
└──────────────────┬─────────────────────────────┘
                   │ HTTP POST /v1/execute
                   ↓
┌────────────────────────────────────────────────┐
│  Sela Gateway API                             │
│  - 요청 파싱 및 검증                          │
│  - 사용자 인증 (API Key)                      │
│  - 작업 분해 (Task Decomposition)             │
└──────────────────┬─────────────────────────────┘
                   │ Task Queue
                   ↓
┌────────────────────────────────────────────────┐
│  Node Selection Engine                        │
│  - 지역 선택 (미국)                           │
│  - 성능 기반 노드 선별                        │
│  - 부하 분산 알고리즘                         │
└──────────────────┬─────────────────────────────┘
                   │ WebSocket Connection
                   ↓
┌────────────────────────────────────────────────┐
│  Selected dBrowser Node (뉴욕)                │
│  - 실제 Chrome 브라우저                       │
│  - Residential IP                             │
│  - 고유 핑거프린트                            │
└──────────────────┬─────────────────────────────┘
                   │ HTTPS GET
                   ↓
┌────────────────────────────────────────────────┐
│  Amazon.com                                   │
│  - Bot 탐지 시스템 통과 ✓                     │
│  - HTML 응답 반환                             │
└──────────────────┬─────────────────────────────┘
                   │ HTML + Screenshot
                   ↓
┌────────────────────────────────────────────────┐
│  Semantic Rendering Engine (SRE)              │
│  - Vision Parser: UI 요소 시각 인식           │
│  - DOM Parser: HTML 구조 분석                 │
│  - JSON-LD Generator: 표준 스키마 생성        │
└──────────────────┬─────────────────────────────┘
                   │ Structured JSON
                   ↓
┌────────────────────────────────────────────────┐
│  zkTLS Proof Generator                        │
│  - TLS 세션 캡처                              │
│  - MPC 프로토콜 실행                          │
│  - Zero-Knowledge Proof 생성                  │
└──────────────────┬─────────────────────────────┘
                   │ JSON + Proof
                   ↓
┌────────────────────────────────────────────────┐
│  AI Agent (LangChain)                         │
│  - 데이터 분석 및 의사결정                    │
│  - 최저가 상품 선택                           │
│  - 다음 액션 결정: "구매 진행"                │
└────────────────────────────────────────────────┘
```

이제 각 단계를 깊이 있게 탐구해봅시다.

---

## 단계별 프로세스 (Deep Dive)

### Step 1: 요청 접수 및 지능형 라우팅

#### 1.1 AI Agent의 요청 생성

AI 에이전트(LangChain 기반)는 사용자의 자연어 명령을 구조화된 API 요청으로 변환합니다:

**사용자 입력**:

> "Amazon에서 에어팟 최저가 검색해서 주문해줘"

**LangChain의 작업**:

```python
from langchain.agents import create_sela_agent

agent = create_sela_agent(
    llm="gpt-4",
    sela_client=sela_client
)

# 자연어 → 구조화된 요청
result = agent.run(
    "Amazon에서 에어팟 최저가 검색 후 주문",
    constraints={"budget": 200, "shipping": "prime"}
)
```

**Sela Gateway로 전송되는 요청**:

```json
POST /api/v1/execute
Content-Type: application/json
Authorization: Bearer sk_live_abc123...

{
  "task": {
    "type": "search_and_purchase",
    "query": "Apple AirPods Pro",
    "constraints": {
      "max_price": 200,
      "shipping_type": "prime",
      "min_rating": 4.5
    }
  },
  "target": {
    "domain": "amazon.com",
    "region": "US",
    "language": "en"
  },
  "options": {
    "extract_format": "json-ld",
    "proof_required": true,
    "proof_type": "zk-tls",
    "screenshot": true,
    "session_persistence": true
  },
  "webhook": {
    "url": "https://agent.example.com/callback",
    "events": ["task.completed", "task.failed"]
  }
}
```

#### 1.2 Sela Gateway의 요청 처리

**인증 및 권한 검증**:

Sela Gateway는 [API Gateway 패턴](https://microservices.io/patterns/apigateway.html)을 구현하여 모든 들어오는 요청을 처리합니다:

1. **API Key 검증**:

   - HMAC-SHA256으로 서명 확인
   - Rate Limit 체크 (현재 사용자: 45/60 요청/분)
   - 잔액 확인 (필요 SELA: ~0.05, 보유: 10.5 SELA ✓)

2. **요청 파싱**:

   - JSON 스키마 검증
   - 필수 필드 확인
   - 안전하지 않은 입력 필터링 (XSS, SQL Injection 방지)

3. **작업 분해 (Task Decomposition)**:
   ```
   주 작업: "검색 후 주문"
   → 하위 작업 1: "Amazon 검색"
   → 하위 작업 2: "결과 JSON 변환"
   → 하위 작업 3: "최저가 선택"
   → 하위 작업 4: "장바구니 추가"
   → 하위 작업 5: "주문 완료"
   → 하위 작업 6: "모든 단계의 zkTLS 증명 생성"
   ```

#### 1.3 지능형 노드 선택 알고리즘

**노드 선택은 단순한 랜덤이 아닙니다.** Sela Gateway는 다음 다차원 기준으로 최적의 노드를 선택합니다:

**기준 1: 지리적 근접성 (가중치 40%)**

Amazon.com은 미국 기반 웹사이트이므로:

- 미국 노드 우선 (레이턴시 최소화)
- CDN 엣지 서버와 동일한 리전 선택
- 예상 레이턴시: 서울 노드 450ms vs 뉴욕 노드 155ms

**기준 2: 노드 성능 등급 (가중치 30%)**

[Render Network의 노드 평가 시스템](https://medium.com/render-token/compute-client-node-reward-mechanism-update-6b867e348030)처럼, Sela도 노드를 지속적으로 평가합니다:

| 등급 | 성능 점수 | 가동시간 | 평균 응답 | 봇 우회율 |
| ---- | --------- | -------- | --------- | --------- |
| S    | 95+       | 99.9%    | < 300ms   | 99.5%     |
| A    | 90-94     | 99.5%    | < 500ms   | 98.5%     |
| B    | 85-89     | 99%      | < 800ms   | 97%       |
| C    | 80-84     | 98%      | < 1200ms  | 95%       |

**기준 3: 현재 부하 (가중치 20%)**

[Consistent Hashing](https://www.cloudflare.com/learning/performance/types-of-load-balancing-algorithms/) 알고리즘을 사용하여:

- 특정 노드에 요청 집중 방지
- 노드별 동시 실행 작업 수 모니터링
- 과부하 노드 자동 제외

**기준 4: 비용 효율성 (가중치 10%)**

일부 노드는 프리미엄 서비스를 제공합니다 (더 빠른 네트워크, 더 높은 신뢰도):

- 예산 내에서 최고 성능 노드 선택
- 사용자가 프리미엄 옵션 선택 시 우선 배정

**선택 결과**:

```
선택된 노드: node_ny_003
위치: 뉴욕, 미국
등급: A (93 점)
현재 부하: 35/100 (여유 있음)
예상 응답 시간: 280ms
비용: 기본 요율
```

---

## 단계별 프로세스 (완전 분해)

---

### Step 2: 브라우저 노드의 실제 실행

#### 2.1 격리된 브라우저 환경 초기화

선택된 뉴욕의 노드(`node_ny_003`)는 즉시 작업을 시작합니다. 하지만 일반 브라우저를 그대로 사용하는 것이 아닙니다.

**샌드박스 환경 생성**:

[Chrome의 Site Isolation 기술](https://www.chromium.org/Home/chromium-security/site-isolation/)을 활용하여 완전히 격리된 실행 환경을 만듭니다:

```javascript
// Sela Node Controller
const session = await createIsolatedSession({
  userData: "/tmp/sela-session-abc123", // 임시 프로필
  isolate: true, // 사용자 데이터와 완전 분리
  extensions: [], // 사용자 확장 프로그램 비활성화
  cookies: "isolated", // 독립적인 쿠키 저장소
  localStorage: "isolated", // 독립적인 로컬 스토리지
  fingerprint: await generateNaturalFingerprint(), // 실제 사용자 패턴
});
```

이것이 중요한 이유:

- ✅ 노드 운영자의 개인 정보 보호 (로그인 세션, 쿠키 등)
- ✅ 작업 간 격리 (다른 사용자의 요청과 섞이지 않음)
- ✅ 보안 (악의적인 웹사이트로부터 노드 보호)

**브라우저 핑거프린트 생성**:

[브라우저 핑거프린팅](https://fingerprint.com/blog/browser-fingerprinting-techniques/)은 수십 가지 속성의 조합입니다:

```javascript
{
  // Canvas Fingerprint
  canvas: renderCanvasSignature(),  // 하드웨어 고유값

  // WebGL Fingerprint
  webgl: {
    vendor: "Intel Inc.",
    renderer: "Intel Iris Plus Graphics 640"
  },

  // Audio Fingerprint
  audio: generateAudioSignature(),  // 오디오 처리 고유값

  // User Agent
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",

  // 기타
  screen: { width: 1920, height: 1080, colorDepth: 24 },
  timezone: "America/New_York",
  languages: ["en-US", "en"],
  fonts: [...],  // 설치된 폰트 목록
  plugins: [...]  // 브라우저 플러그인
}
```

Sela의 장점: 실제 사용자 브라우저를 사용하므로 **합성 핑거프린트가 아닌 진짜 핑거프린트**입니다. [DataDome 같은 최신 봇 탐지](https://datadome.co/threat-research/key-findings-2025-global-bot-security-report/)도 이를 구별할 수 없습니다.

#### 2.2 Amazon.com 접속 - 봇 탐지 우회

**첫 번째 장벽: Cloudflare Turnstile**

Amazon은 Cloudflare를 사용하여 봇을 차단합니다. [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/)은 다음을 분석합니다:

1. **초기 연결 패턴**: TLS 핑거프린트, HTTP/2 헤더 순서
2. **JavaScript 실행**: `navigator.webdriver` 플래그, CDP 탐지
3. **행동 패턴**: 마우스 움직임, 스크롤 속도, 클릭 타이밍

**Sela Node의 우회 전략**:

```javascript
// 인간처럼 행동하기
await page.goto("https://amazon.com", {
  waitUntil: "networkidle2", // 모든 네트워크 요청 완료 대기
});

// 봇은 즉시 검색하지만, 인간은 페이지를 둘러봄
await randomDelay(800, 1500); // 0.8~1.5초 랜덤 대기

// 인간처럼 스크롤 (페이지 살펴보기)
await smoothScroll(page, {
  distance: 300, // 300px 스크롤
  duration: 1200, // 1.2초에 걸쳐
  easing: "easeInOutQuad", // 자연스러운 가속/감속
});
```

**결과**: Cloudflare는 이를 정상 사용자로 인식 ✓

#### 2.3 검색 수행 - 자연스러운 인간 시뮬레이션

**검색창 찾기 (Vision + DOM 결합)**:

Vision Parser가 먼저 작동:

```
VLM 분석 결과: "페이지 상단 중앙에 큰 검색창이 있습니다.
                흰색 배경에 검은색 테두리, 플레이스홀더 텍스트는 'Search Amazon'"
```

DOM Parser가 정확한 요소 찾기:

```javascript
const searchBox = await page.$("#twotabsearchtextbox");
// 또는 fallback: await page.$('input[type="text"][name="field-keywords"]');
```

**인간처럼 타이핑**:

```javascript
// 봇처럼: await searchBox.type('airpods', {delay: 0});
// 인간처럼:
await humanLikeTyping(searchBox, "airpods pro", {
  minDelay: 80, // 최소 80ms/문자
  maxDelay: 220, // 최대 220ms/문자
  variance: 0.3, // 30% 무작위 변동
  mistakes: 0.02, // 2% 확률로 오타 발생 후 수정
});
// 실제 입력: "airppods pro" → 백스페이스 → "airpods pro"
```

[Kameleo의 DataDome 우회 연구](https://kameleo.io/blog/guide-to-bypassing-datadome)에 따르면, 이러한 미세한 타이핑 패턴이 봇과 인간을 구별하는 핵심입니다.

**검색 버튼 클릭**:

```javascript
// 버튼 위로 마우스 이동 (곡선 경로, ghost-cursor 라이브러리)
await page.mouse.move(buttonX, buttonY, { steps: 10 });

// 짧은 호버 (인간은 클릭 전 0.2-0.5초 호버)
await randomDelay(200, 500);

// 클릭 (정확히 버튼 중심이 아닌 약간 벗어난 지점)
const offset = { x: random(-5, 5), y: random(-3, 3) };
await page.mouse.click(buttonX + offset.x, buttonY + offset.y);
```

**결과**: Amazon은 이를 정상적인 인간 사용자 검색으로 인식 ✓

**검색 결과 로딩 대기**:

Amazon은 React 기반 SPA이므로 JavaScript 렌더링을 대기해야 합니다:

```javascript
// 상품 목록이 나타날 때까지 대기 (최대 10초)
await page.waitForSelector(".s-result-item", {
  timeout: 10000,
  visible: true, // 화면에 실제로 보여야 함
});

// 이미지 로딩까지 대기
await page.waitForFunction(
  () => {
    const images = document.querySelectorAll(".s-image");
    return Array.from(images).every((img) => img.complete);
  },
  { timeout: 5000 }
);

// 동적 가격 업데이트 완료 대기
await page.waitForNetworkIdle({ timeout: 3000 });
```

**무한 스크롤 처리**:

Amazon 검색 결과는 스크롤 시 더 많은 상품이 로드됩니다:

```javascript
let previousHeight = 0;
let currentHeight = await page.evaluate("document.body.scrollHeight");

while (previousHeight < currentHeight) {
  // 부드럽게 스크롤 다운
  await smoothScroll(page, { distance: 800, duration: 1500 });

  // 새 콘텐츠 로딩 대기
  await page.waitForTimeout(1000);

  // 높이 변화 확인
  previousHeight = currentHeight;
  currentHeight = await page.evaluate("document.body.scrollHeight");

  // 최대 3페이지까지만 (약 60개 상품)
  if (loadedPages >= 3) break;
}
```

**페이지 스크린샷 캡처**:

```javascript
const screenshot = await page.screenshot({
  fullPage: false, // 현재 뷰포트만 (용량 절약)
  type: "jpeg",
  quality: 85,
});

// S3에 업로드 (zkTLS 증명 시 필요)
await uploadToS3(screenshot, "screenshots/req_abc123.jpg");
```

---

### Step 3: 의미론적 렌더링 - HTML을 AI가 이해하는 JSON으로

**SRE (Semantic Rendering Engine) 작업:**

1. **페이지 분석**

   ```
   - VLM: 상품 이미지, 가격 위치 인식
   - DOM Parser: HTML 구조 분석
   ```

2. **JSON 변환**

   ```json
   {
     "products": [
       {
         "id": "B08X4YZ123",
         "name": "Apple AirPods Pro (2nd Gen)",
         "price": 199.99,
         "currency": "USD",
         "rating": 4.7,
         "reviews": 12543,
         "availability": true,
         "prime": true,
         "image": "https://..."
       },
       {
         "id": "B09JQL1234",
         "name": "Apple AirPods (3rd Gen)",
         "price": 149.99,
         "currency": "USD",
         "rating": 4.6,
         "reviews": 8932,
         "availability": true,
         "prime": true,
         "image": "https://..."
       }
     ]
   }
   ```

3. **Schema 정규화**
   - 일관된 스키마 보장
   - AI Agent 호환성 확인

---

### Step 4: Agent - 의사결정

**AI Agent 분석:**

```python
# Agent의 의사결정 로직
products = sela_response['products']
best_deal = min(products, key=lambda x: x['price'])

if best_deal['availability'] and best_deal['price'] < 200:
    decision = "구매 진행"
    selected_product = best_deal
else:
    decision = "대기"
```

**결정:**

- 선택된 상품: AirPods (3rd Gen)
- 가격: $149.99
- 다음 단계: 장바구니 추가

---

### Step 5: Node - 주문 프로세스 자동화

**자동화 액션:**

1. **장바구니 추가**

   ```
   - "Add to Cart" 버튼 찾기
   - 클릭 실행
   - 확인 메시지 대기
   ```

2. **결제 페이지 이동**

   ```
   - "Proceed to Checkout" 버튼 클릭
   - 로그인 세션 확인
   - 결제 페이지 로딩 대기
   ```

3. **배송지 입력**

   ```
   - 주소 필드 찾기
   - 배송지 정보 입력
   - 자동 완성 처리
   ```

4. **결제 정보 확인**
   ```
   - 저장된 결제 수단 선택
   - 최종 가격 확인
   - 주문 검토
   ```

---

### Step 6: zk-TLS - 각 단계의 출처 검증

**검증 증명 생성:**

#### 검색 결과 증명

```
Proof #1: 검색 결과
- 출처: amazon.com (TLS 인증서 검증)
- 시간: 2024-01-15 10:30:15 UTC
- 데이터: 상품 목록 20개
- 무결성: 검증됨
```

#### 가격 정보 증명

```
Proof #2: 가격 정보
- 출처: amazon.com
- 상품 ID: B09JQL1234
- 가격: $149.99
- 시간: 2024-01-15 10:30:18 UTC
- 무결성: 검증됨
```

#### 주문 내역 증명

```
Proof #3: 주문 완료
- 출처: amazon.com
- 주문 번호: 111-1234567-8901234
- 총액: $149.99
- 배송지: [ZK로 보호]
- 시간: 2024-01-15 10:32:45 UTC
- 무결성: 검증됨
```

---

### Step 7: 결과 보고

**Agent로 최종 응답:**

```json
{
  "status": "success",
  "action": "purchase_completed",
  "product": {
    "name": "Apple AirPods (3rd Gen)",
    "price": 149.99,
    "order_id": "111-1234567-8901234"
  },
  "proofs": [
    {
      "type": "search_result",
      "proof_hash": "0x1234...",
      "verified": true
    },
    {
      "type": "price_data",
      "proof_hash": "0x5678...",
      "verified": true
    },
    {
      "type": "order_confirmation",
      "proof_hash": "0x9abc...",
      "verified": true
    }
  ],
  "timestamp": "2024-01-15T10:32:45Z"
}
```

---

## 워크플로우 다이어그램

```
┌─────────────────────────────────────────────────────┐
│  Step 1: AI Agent Request                          │
│  "Amazon에서 에어팟 최저가 검색 후 주문"                │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 2: Sela Gateway - Node Selection             │
│  - 지역: US                                         │
│  - 최적 노드 선택                                    │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 3: dBrowser Node - Web Access                │
│  - Amazon 접속                                      │
│  - "에어팟" 검색                                     │
│  - Bot 탐지 우회                                    │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 4: Semantic Engine - JSON 변환                │
│  - VLM + DOM 파싱                                   │
│  - 상품 정보 구조화                                  │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 5: zk-TLS - 데이터 증명 생성                   │
│  - 검색 결과 증명                                    │
│  - 가격 정보 증명                                    │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 6: AI Agent - 의사결정                        │
│  - 최저가 상품 선택                                  │
│  - 구매 결정                                        │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 7: dBrowser Node - 주문 자동화                │
│  - 장바구니 추가                                     │
│  - 배송지 입력                                      │
│  - 주문 완료                                        │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 8: zk-TLS - 주문 증명 생성                     │
│  - 주문 번호 증명                                    │
│  - 결제 내역 증명                                    │
└───────────────────┬─────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────┐
│  Step 9: Response to AI Agent                      │
│  - 주문 완료 응답                                    │
│  - 검증 가능한 증명 첨부                             │
└─────────────────────────────────────────────────────┘
```

---

## 핵심 특징

### 1. 완전 자동화

- 사람의 개입 없이 전체 프로세스 자동 실행
- 복잡한 UI 인터랙션 완벽 처리

### 2. 검증 가능

- 모든 단계에서 zk-TLS 증명 생성
- 데이터 출처 및 무결성 보장

### 3. 안정성

- Self-Healing으로 UI 변경 대응
- 일관된 JSON 스키마

### 4. 확장성

- 분산 노드로 무한 확장
- 병렬 처리 가능

---

이 워크플로우를 통해 AI 에이전트는 복잡한 웹 작업을 안전하고 효율적으로 수행할 수 있습니다.
