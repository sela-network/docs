---
title: API 개요 및 개발자 가이드
description: Sela Network API - 3줄로 시작하는 AI 웹 에이전트 개발
---

## 시작하기: 5분 안에 첫 AI 에이전트 만들기

당신이 LangChain이나 AutoGPT로 AI 에이전트를 만들고 있다면, 웹 인터랙션은 가장 어려운 부분입니다. Puppeteer로 200줄의 코드를 작성하고, 봇 탐지를 우회하고, CSS 셀렉터를 관리하는 대신:

**Sela API로 3줄이면 됩니다**:

```python
from sela_network import SelaClient
client = SelaClient(api_key="sk_test_your_key")
result = client.browse("https://amazon.com/s?k=laptop")
```

그게 전부입니다. 봇 탐지 우회, 데이터 파싱, 증명 생성 - 모든 것이 자동으로 처리됩니다.

---

## 핵심 설계 철학

### 1. 개발자 경험 우선 (Developer Experience First)

좋은 API는 **배우기 쉽고, 사용하기 간단하며, 강력한 기능**을 제공합니다. Sela API는 [Stripe의 API 디자인 철학](https://stripe.com/docs/api)에서 영감을 받았습니다:

**직관적 네이밍**:

```python
client.browse(url)           # 웹 페이지 방문
client.interact(url, actions) # 웹 사이트와 상호작용
client.extract(url, schema)  # 데이터 추출
client.verify(proof)         # zkTLS 증명 검증
```

**일관된 응답 구조**:

```python
# 모든 응답은 동일한 패턴
{
  "success": true,
  "data": {...},      # 실제 데이터
  "metadata": {...},  # 실행 정보
  "proof": {...}      # zkTLS 증명 (옵션)
}
```

**명확한 에러 메시지**:

```python
{
  "error": {
    "type": "rate_limit_exceeded",
    "message": "분당 요청 한도를 초과했습니다",
    "retry_after": 45,  # 45초 후 재시도 가능
    "doc_url": "https://docs.sela.network/errors/rate-limit"  # 해결 방법
  }
}
```

### 2. AI Agent 최적화

Sela API는 **처음부터 AI 에이전트를 위해** 설계되었습니다:

**LangChain 네이티브 통합**:

```python
from langchain.agents import create_sela_agent
from sela_network import SelaClient

client = SelaClient(api_key="...")
agent = create_sela_agent(
    llm="gpt-4",
    sela_client=client,
    tools=["browse", "extract", "interact", "verify"]
)

# 자연어로 명령
result = agent.run("Find the cheapest laptop on Amazon with 16GB RAM")
```

**AutoGPT 통합**:

```python
# AutoGPT가 Sela를 자동으로 사용
from autogpt import Agent

agent = Agent(
    ai_name="ShoppingBot",
    ai_role="Find best deals online",
    tools=["sela_browse", "sela_interact"]  # Sela 플러그인
)

agent.run("Compare prices for iPhone 15 Pro across 5 stores")
```

**Semantic Kernel (Microsoft)**:

```csharp
// C# / .NET 지원
using SelaNetwork.SDK;

var kernel = new KernelBuilder()
    .WithSelaPlugin(apiKey: "sk_test_...")
    .Build();

var result = await kernel.RunAsync("Browse Amazon and find AirPods");
```

### 3. 검증 가능성 (Verifiability)

모든 API 응답은 **옵션으로** zkTLS 증명을 포함할 수 있습니다:

```python
result = client.browse(
    "https://amazon.com/dp/B08X123",
    options={"proof": {"enabled": True, "type": "zk-tls"}}
)

# 증명 내용
proof = result.proof
assert proof.verified == True
assert proof.source == "amazon.com"
assert proof.timestamp == "2025-01-15T10:30:00Z"

# 증명을 블록체인에 기록 (옵션)
await blockchain.record_proof(proof.hash)

# 증명을 제3자에게 공유
proof_url = proof.public_url  # https://proofs.sela.network/0x1234...
```

이것은 단순한 로그가 아닙니다. 이것은:

- 🔒 **암호학적으로 안전**: 위조나 조작 불가능
- ⚖️ **법적 효력**: 법정 증거로 사용 가능
- 🔍 **완전 투명**: 누구나 검증 가능
- 📋 **감사 추적**: 모든 데이터의 출처 명확

---

## API 설계 원칙

### RESTful 아키텍처

Sela API는 [REST API 모범 사례](https://restfulapi.net/)를 완전히 준수합니다:

**리소스 기반 URL**:

```
GET    /v1/sessions          # 세션 목록
POST   /v1/sessions          # 새 세션 생성
GET    /v1/sessions/{id}     # 특정 세션 조회
DELETE /v1/sessions/{id}     # 세션 삭제

GET    /v1/proofs/{id}       # 증명 조회
POST   /v1/proofs/verify     # 증명 검증
```

**HTTP 메서드 의미론**:

- `GET`: 조회 (멱등성, 캐시 가능)
- `POST`: 생성 (비멱등성)
- `PUT`: 전체 업데이트 (멱등성)
- `PATCH`: 부분 업데이트
- `DELETE`: 삭제 (멱등성)

**올바른 HTTP 상태 코드**:

- `200 OK`: 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 클라이언트 요청 오류
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `429 Too Many Requests`: Rate Limit 초과
- `500 Internal Server Error`: 서버 오류

### 버전 관리 (API Versioning)

**URL 기반 버전 관리**:

```
https://api.sela.network/v1/browse
https://api.sela.network/v2/browse  (미래)
```

**호환성 보장**:

- v1 API는 **최소 2년 지원 보장**
- 새 버전 출시 **6개월 전 사전 공지**
- Deprecation 경고 헤더 제공:
  ```http
  Sunset: Sat, 31 Dec 2025 23:59:59 GMT
  Link: <https://docs.sela.network/migration/v2>; rel="deprecation"
  ```

### 페이지네이션 (Pagination)

대량 데이터 조회 시 커서 기반 페이지네이션:

```python
# 첫 페이지
response = client.parsers.list(limit=100)

# 다음 페이지 (있는 경우)
if response.has_more:
    next_page = client.parsers.list(
        limit=100,
        starting_after=response.data[-1].id
    )
```

**왜 커서 기반인가**:

- ✅ 새 데이터 추가되어도 일관성 유지
- ✅ 성능 우수 (오프셋 기반보다 빠름)
- ❌ 임의 페이지 점프 불가 (트레이드오프)

---

## 핵심 기능 상세

### 🚀 Feature 1: 통합 브라우징 (Unified Browsing)

**개념**: 하나의 API로 모든 웹사이트에 접근

```python
# 정적 웹사이트
result = client.browse("https://example.com")

# 복잡한 SPA (React, Vue)
result = client.browse(
    "https://app.complex-spa.com",
    options={"wait_for": "networkidle"}  # 모든 AJAX 완료 대기
)

# 무한 스크롤 페이지
result = client.browse(
    "https://pinterest.com/search/?q=design",
    options={
        "scroll": {"times": 5, "behavior": "smooth"},  # 5번 스크롤
        "wait_between_scrolls": 1000  # 1초 대기
    }
)

# 지역 제한 콘텐츠
result = client.browse(
    "https://bbc.co.uk/iplayer",  # 영국만 접근 가능
    options={"region": "UK"}  # 영국 노드 사용
)
```

### 🔧 Feature 2: 고급 인터랙션 (Advanced Interactions)

**복잡한 웹 작업도 간단하게**:

```python
# 로그인 + 데이터 추출
result = client.interact(
    "https://linkedin.com",
    actions=[
        {"type": "fill", "selector": "#username", "value": "user@example.com"},
        {"type": "fill", "selector": "#password", "value": "password123"},
        {"type": "click", "selector": "button[type='submit']"},
        {"type": "wait", "selector": ".feed-container"},  # 로그인 완료 대기
        {"type": "extract", "schema": "linkedin_profile"}
    ],
    session={"persist": True, "duration": "24h"}  # 세션 저장
)

# 다음번에는 로그인 없이 재사용
result2 = client.browse_with_session(
    "https://linkedin.com/feed",
    session_id=result.session_id
)
```

### 📊 Feature 3: 스마트 추출 (Smart Extraction)

**AI가 자동으로 올바른 데이터 추출**:

```python
# 간단한 방법: 타입만 지정
result = client.extract(
    "https://amazon.com/dp/B08X123",
    type="product"  # Sela가 자동으로 적절한 필드 추출
)

# 결과:
{
  "@type": "Product",
  "name": "Apple AirPods Pro (2nd Gen)",
  "price": {"amount": 199.99, "currency": "USD"},
  "rating": {"score": 4.7, "count": 12543},
  "availability": "InStock",
  ...
}

# 고급: 커스텀 스키마
result = client.extract(
    "https://custom-site.com",
    schema={
        "title": {"selector": "h1.product-name", "type": "string"},
        "price": {"selector": ".price", "type": "number", "transform": "parse_currency"},
        "images": {"selector": "img.product-img", "type": "array", "attribute": "src"}
    }
)
```

### 🔐 Feature 4: 증명 및 검증 (Proofs & Verification)

**데이터의 진위를 암호학적으로 증명**:

```python
# 증명 생성
result = client.browse(
    "https://bloomberg.com/quote/TSLA:US",
    options={
        "proof": {
            "type": "zk-tls",
            "selective_disclosure": {
                "show": ["price", "timestamp"],  # 공개할 필드
                "hide": ["user_session", "cookies"]  # 숨길 필드
            },
            "store_onchain": True,  # 블록체인에 기록
            "blockchain": "ethereum"  # 또는 "polygon", "arbitrum"
        }
    }
)

# 증명 내용
proof = result.proof
print(f"증명 해시: {proof.hash}")
print(f"증명 URL: {proof.public_url}")
print(f"검증 상태: {proof.verified}")

# 제3자 검증
verification = client.verify_proof(proof.hash)
assert verification.valid == True
assert verification.source == "bloomberg.com"
```

이것은 **게임 체인저**입니다:

- 금융 데이터를 법정에서 증거로 사용
- 컴플라이언스 보고서에 검증 가능한 데이터 첨부
- 감사 추적 완벽 보장

### 🎯 Feature 5: 세션 관리 (Session Management)

**한 번 로그인, 영원히 사용**:

```python
# 1. 처음에만 로그인 (수동 또는 자동)
session = client.create_session(
    "https://twitter.com",
    credentials={
        "username": "your_username",
        "password": "your_password",
        "2fa_method": "authenticator"  # Sela가 2FA 자동 처리
    },
    duration="7d"  # 7일간 유지
)

# 2. 이후에는 세션 재사용 (로그인 불필요)
for i in range(100):
    tweets = client.browse_with_session(
        "https://twitter.com/search?q=AI",
        session_id=session.id
    )
    # 매번 로그인할 필요 없음!
```

**보안**:

- 세션 데이터는 E2E 암호화
- 사용자만 복호화 가능
- Sela 서버는 비밀번호를 보지 못함
- [Zero-Knowledge 자격증명 처리](https://docs.browserbase.com/guides/authentication)

### 📡 Feature 6: Webhook으로 실시간 알림

**장시간 작업을 비동기로 처리**:

```python
# 1. Webhook 설정
client.set_webhook(
    url="https://your-server.com/webhook",
    events=["browse.completed", "browse.failed"],
    secret="whsec_your_secret"
)

# 2. 비동기 작업 시작
task = client.browse_async(
    "https://huge-website.com",
    timeout=300  # 최대 5분
)

print(f"Task ID: {task.id}")
# 즉시 반환, 백그라운드에서 실행 중

# 3. 완료 시 Webhook 수신
"""
POST https://your-server.com/webhook
{
  "event": "browse.completed",
  "task_id": "task_abc123",
  "data": {...},
  "proof": {...}
}
"""
```

**언제 사용하는가**:

- 대량 스크래핑 (100+ 페이지)
- 느린 웹사이트 (로딩 30초+)
- 정기 작업 (cron 스케줄)

---

## 인증 방식 (Authentication)

### 방법 1: API Key (권장, 가장 간단)

**발급 받기**:

1. https://dashboard.sela.network 로그인
2. "API Keys" → "Create New Key"
3. 키 복사 (한 번만 표시됨)

**사용**:

```python
from sela_network import SelaClient

client = SelaClient(api_key="sk_live_abc123xyz...")
```

**보안 팁**:

```python
# ❌ 나쁜 예: 코드에 하드코딩
client = SelaClient(api_key="sk_live_abc123...")

# ✅ 좋은 예: 환경 변수 사용
import os
client = SelaClient(api_key=os.environ["SELA_API_KEY"])
```

**키 타입**:

- `sk_test_...`: 테스트넷 (무료, 제한적)
- `sk_live_...`: 프로덕션 (과금, 전체 기능)

### 방법 2: OAuth 2.0 (웹 애플리케이션용)

**사용자를 대신하여 작동하는 앱**:

```javascript
// 1. 사용자를 Sela 인증 페이지로 리다이렉트
window.location.href = `https://sela.network/oauth/authorize?
  client_id=your_client_id&
  redirect_uri=https://your-app.com/callback&
  scope=browse:read interact:write&
  state=random_state_string`;

// 2. 사용자 승인 후 콜백 받기
// GET https://your-app.com/callback?code=auth_code_123&state=...

// 3. Authorization Code를 Access Token으로 교환
const response = await fetch("https://api.sela.network/oauth/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code: "auth_code_123",
    client_id: "your_client_id",
    client_secret: "your_client_secret",
    redirect_uri: "https://your-app.com/callback",
  }),
});

const { access_token, refresh_token } = await response.json();

// 4. Access Token으로 API 호출
const result = await fetch("https://api.sela.network/v1/browse", {
  headers: { Authorization: `Bearer ${access_token}` },
});
```

**OAuth Scopes**:

- `browse:read`: 웹 페이지 조회만
- `browse:write`: 데이터 추출 포함
- `interact:write`: 웹 사이트와 상호작용
- `proofs:read`: 증명 조회
- `sessions:write`: 세션 생성/관리

---

## Rate Limiting: 공정한 사용

### 왜 Rate Limit이 필요한가

[GitHub의 Rate Limit 가이드](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)처럼, Sela도 모든 사용자가 공정하게 리소스를 사용할 수 있도록 제한을 둡니다:

**목적**:

- 🛡️ **DDoS 방어**: 악의적 대량 요청 차단
- ⚖️ **공정성**: 한 사용자가 전체 리소스 독점 방지
- 💰 **비용 관리**: 의도하지 않은 무한 루프로 인한 과금 방지

### 제한 정책

| 플랜           | 분당   | 일일    | 월간      | Burst\* |
| -------------- | ------ | ------- | --------- | ------- |
| **Free**       | 10     | 1,000   | 10,000    | 20      |
| **Starter**    | 60     | 10,000  | 300,000   | 120     |
| **Pro**        | 300    | 100,000 | 3,000,000 | 600     |
| **Enterprise** | Custom | Custom  | Custom    | Custom  |

\*Burst: 짧은 시간 동안 허용되는 최대 요청 수

**Token Bucket 알고리즘**:

Sela는 [Token Bucket 알고리즘](https://restfulapi.net/rest-api-rate-limit-guidelines/)을 사용합니다:

```
Bucket에 토큰이 일정 속도로 충전됨 (예: 분당 60개)
API 호출 시 토큰 1개 소비
토큰이 없으면 429 에러 반환
Burst 허용: Bucket 크기가 60개보다 크면 짧은 시간 동안 더 많이 요청 가능
```

### Rate Limit 확인

**응답 헤더**:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 60          # 분당 최대 60개
X-RateLimit-Remaining: 45       # 남은 토큰 45개
X-RateLimit-Reset: 1640995200   # 리셋 시각 (Unix timestamp)
X-RateLimit-Reset-After: 25     # 25초 후 리셋
```

**Python에서 확인**:

```python
result = client.browse("https://example.com")

print(f"남은 요청: {result.rate_limit.remaining}/{result.rate_limit.limit}")
print(f"리셋까지: {result.rate_limit.reset_after}초")

# 거의 다 소진했으면 대기
if result.rate_limit.remaining < 5:
    time.sleep(result.rate_limit.reset_after)
```

### Rate Limit 초과 시

**429 Too Many Requests 응답**:

```json
{
  "error": {
    "type": "rate_limit_error",
    "message": "분당 API 호출 한도(60)를 초과했습니다",
    "retry_after": 45,  # 45초 후 재시도
    "doc_url": "https://docs.sela.network/errors/rate-limit"
  },
  "rate_limit": {
    "limit": 60,
    "remaining": 0,
    "reset": 1640995200
  }
}
```

**베스트 프랙티스 - 지수 백오프(Exponential Backoff)**:

```python
import time
import random

def call_api_with_retry(url, max_retries=3):
    for attempt in range(max_retries):
        try:
            return client.browse(url)
        except RateLimitError as e:
            if attempt == max_retries - 1:  # 마지막 시도
                raise

            # 지수 백오프: 1초, 2초, 4초, 8초...
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"Rate limit. 대기: {wait_time:.1f}초")
            time.sleep(wait_time)
```

---

## SDK: 당신의 언어로 개발하기

### Python SDK (가장 인기)

**설치**:

```bash
pip install sela-network

# 또는 전체 기능 (LangChain, AutoGPT 통합)
pip install sela-network[full]
```

**기본 사용**:

```python
from sela_network import SelaClient

# 클라이언트 초기화
client = SelaClient(
    api_key="sk_live_...",
    timeout=30,  # 기본 타임아웃 30초
    max_retries=3  # 실패 시 자동 재시도
)

# 동기 방식
result = client.browse("https://example.com")

# 비동기 방식 (권장, 더 빠름)
import asyncio

async def main():
    async with SelaAsyncClient(api_key="...") as client:
        result = await client.browse("https://example.com")

asyncio.run(main())
```

### JavaScript/TypeScript SDK

**설치**:

```bash
npm install @sela-network/sdk
# 또는
yarn add @sela-network/sdk
```

**사용 (TypeScript)**:

```typescript
import { SelaClient } from "@sela-network/sdk";

const client = new SelaClient({
  apiKey: process.env.SELA_API_KEY,
  network: "mainnet", // 또는 'testnet'
});

// Promise 기반
const result = await client.browse({
  url: "https://example.com",
  options: {
    extract: { type: "product" },
    proof: { enabled: true },
  },
});

// TypeScript 타입 안전성
interface Product {
  name: string;
  price: number;
  rating: number;
}

const products: Product[] = result.data.extracted.products;
```

### Go SDK

```go
import "github.com/sela-network/sela-go"

func main() {
    client := sela.NewClient("sk_live_...")

    result, err := client.Browse(&sela.BrowseRequest{
        URL: "https://example.com",
        Options: &sela.BrowseOptions{
            Extract: &sela.ExtractOptions{Type: "product"},
        },
    })

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Extracted: %+v\n", result.Data.Extracted)
}
```

### Rust SDK

```rust
use sela_network::{SelaClient, BrowseOptions};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = SelaClient::new("sk_live_...");

    let result = client.browse(
        "https://example.com",
        BrowseOptions::default()
            .with_extract("product")
            .with_proof(true)
    ).await?;

    println!("Data: {:?}", result.data);
    Ok(())
}
```

---

## 에러 처리: 견고한 애플리케이션 만들기

### 에러 타입 및 대응

**1. 인증 에러 (401 Unauthorized)**:

```python
try:
    result = client.browse("https://example.com")
except SelaAuthenticationError as e:
    print(f"API Key 오류: {e.message}")
    # 해결: API Key 재확인, 만료 여부 확인
```

**2. 권한 에러 (403 Forbidden)**:

```python
try:
    result = client.interact("https://example.com", actions=[...])
except SelaPermissionError as e:
    print(f"권한 없음: {e.message}")
    # 해결: 플랜 업그레이드 또는 권한 요청
```

**3. Rate Limit 에러 (429 Too Many Requests)**:

```python
try:
    result = client.browse("https://example.com")
except SelaRateLimitError as e:
    print(f"Rate Limit 초과. {e.retry_after}초 후 재시도")
    time.sleep(e.retry_after)
    result = client.browse("https://example.com")  # 재시도
```

**4. 타임아웃 (408 Request Timeout)**:

```python
try:
    result = client.browse("https://very-slow-site.com", timeout=10)
except SelaTimeoutError:
    # 해결: 타임아웃 증가 또는 더 빠른 노드 요청
    result = client.browse(
        "https://very-slow-site.com",
        timeout=60,
        options={"premium_node": True}  # 더 빠른 노드 사용
    )
```

**5. 봇 탐지 (403 Bot Detected)**:

```python
try:
    result = client.browse("https://heavily-protected-site.com")
except SelaBotDetectedError as e:
    # 자동 재시도 (다른 노드 사용)
    result = client.browse(
        "https://heavily-protected-site.com",
        options={"retry_with_different_node": True}
    )
```

### 통합 에러 처리

```python
from sela_network import SelaClient, SelaError

def safe_browse(url, max_retries=3):
    """견고한 브라우징 함수"""
    for attempt in range(max_retries):
        try:
            return client.browse(url)

        except SelaRateLimitError as e:
            if attempt < max_retries - 1:
                time.sleep(e.retry_after)
            else:
                raise

        except SelaTimeoutError:
            if attempt < max_retries - 1:
                # 타임아웃 증가
                timeout = 30 * (attempt + 2)
                return client.browse(url, timeout=timeout)
            else:
                raise

        except SelaBotDetectedError:
            # 다른 노드로 재시도
            return client.browse(url, options={"force_new_node": True})

        except SelaError as e:
            # 기타 에러
            logger.error(f"Sela Error: {e}")
            raise
```

---

## 베스트 프랙티스 (Best Practices)

### 1. 배치 처리로 성능 향상

**❌ 비효율적**:

```python
# 순차 처리: 100개 URL = 100초
for url in urls:
    result = client.browse(url)
    results.append(result)
```

**✅ 효율적**:

```python
# 병렬 처리: 100개 URL = 10초 (10개씩 동시)
results = client.browse_batch(
    urls,
    max_concurrent=10,  # 동시 10개씩
    show_progress=True  # 진행바 표시
)
```

### 2. 캐싱으로 비용 절감

**동일한 페이지를 자주 조회하는 경우**:

```python
# 첫 요청: 실제로 웹 접근 (1.5초, 0.02 SELA)
result1 = client.browse(
    "https://example.com",
    options={"cache": {"enabled": True, "ttl": 3600}}  # 1시간 캐시
)

# 두 번째 요청 (1시간 내): 캐시에서 반환 (50ms, 0 SELA)
result2 = client.browse("https://example.com")

# 비용 절감: 50% (두 번째부터 무료)
```

**캐시 전략**:

```python
# 정적 콘텐츠: 긴 TTL
client.browse("https://docs.example.com", cache_ttl=86400)  # 24시간

# 동적 콘텐츠: 짧은 TTL
client.browse("https://stockprice.com", cache_ttl=60)  # 1분

# 실시간 데이터: 캐시 없음
client.browse("https://live-crypto-price.com", cache_ttl=0)
```

### 3. 리소스 최적화

**필요한 것만 로딩**:

```python
# ❌ 비효율적: 모든 리소스 로딩
result = client.browse("https://heavy-site.com")
# 로딩: HTML + CSS + JS + 이미지 + 폰트 + 비디오 = 15MB, 8초

# ✅ 효율적: 필요한 것만
result = client.browse(
    "https://heavy-site.com",
    options={
        "block_resources": ["image", "media", "font"],  # 차단
        "wait_for": "domcontentloaded"  # networkidle 대신
    }
)
# 로딩: HTML + CSS + JS = 2MB, 2초
```

### 4. 지역 선택으로 속도 향상

```python
# 한국 사이트 → 한국 노드
result = client.browse(
    "https://coupang.com",
    options={"region": "KR"}  # 서울/부산 노드 사용
)
# 응답 시간: 180ms (vs 450ms from US node)

# 미국 사이트 → 미국 노드
result = client.browse(
    "https://amazon.com",
    options={"region": "US"}
)
```

### 5. 재시도 전략

**자동 재시도 설정**:

```python
client = SelaClient(
    api_key="...",
    max_retries=3,  # 최대 3번 재시도
    retry_on=[408, 429, 500, 502, 503, 504],  # 재시도할 상태 코드
    backoff_factor=2  # 2초, 4초, 8초...
)
```

---

## 고급 기능 (Advanced Features)

### 1. 조건부 추출 (Conditional Extraction)

**시나리오**: 가격이 특정 값 이하일 때만 상세 정보 추출

```python
result = client.browse(
    "https://amazon.com/dp/B08X123",
    options={
        "extract": {
            "type": "product",
            "conditions": {
                "if": "price.amount < 200",  # $200 미만일 때만
                "then": "extract_full_details",  # 전체 정보 추출
                "else": "extract_price_only"  # 아니면 가격만
            }
        }
    }
)
```

**비용 절감**: VLM은 비싸므로, 조건부로 사용하여 비용 30-50% 절감

### 2. 커스텀 대기 조건

**동적 페이지 처리**:

```python
result = client.browse(
    "https://dynamic-app.com",
    options={
        "wait_for": {
            "type": "custom",
            "condition": "() => document.querySelectorAll('.product-item').length >= 20"
            # JavaScript 조건: 상품이 최소 20개 로딩될 때까지 대기
        }
    }
)
```

### 3. 스크린샷 및 PDF 생성

```python
# 전체 페이지 스크린샷
screenshot = client.browse(
    "https://example.com",
    options={
        "screenshot": {
            "full_page": True,
            "format": "png",
            "quality": 90
        }
    }
)

# PDF로 저장
pdf = client.browse(
    "https://article.example.com",
    options={"format": "pdf"}
)

with open("article.pdf", "wb") as f:
    f.write(pdf.data)
```

---

## 모니터링 및 디버깅

### 대시보드

**실시간 사용량 확인**:

https://dashboard.sela.network/api-usage

제공 정보:

- 📊 시간별/일별 API 호출 그래프
- 💰 비용 사용량 (SELA)
- ⚡ 평균 응답 시간
- ❌ 에러율 및 에러 타입 분포
- 🌍 지역별 요청 분포

### 로깅

**Request ID로 디버깅**:

모든 API 응답에는 고유한 `request_id`가 포함됩니다:

```json
{
  "request_id": "req_abc123xyz",
  "data": {...}
}
```

문제 발생 시 이 ID를 support@sela.network로 보내면 즉시 추적 가능합니다.

**로그 조회**:

```python
# 최근 100개 요청 조회
logs = client.logs.list(limit=100)

for log in logs.data:
    print(f"{log.timestamp}: {log.url} → {log.status} ({log.duration}ms)")

# 특정 요청 상세 조회
detail = client.logs.get("req_abc123xyz")
print(detail.request)  # 원본 요청
print(detail.response)  # 응답
print(detail.proof)  # zkTLS 증명 (있는 경우)
```

---

## 다음 단계

### 🚀 튜토리얼

- [빠른 시작 가이드](/api/quickstart/) - 15분 안에 첫 Agent 만들기
- [LangChain 통합](/api/integrations/langchain/) - LangChain 완벽 가이드
- [AutoGPT 플러그인](/api/integrations/autogpt/) - AutoGPT와 연결

### 📖 API 레퍼런스

- [Browse API 상세](/api/endpoints/browse/) - 모든 옵션 및 파라미터
- [Interact API](/api/endpoints/interact/) - 웹 인터랙션 액션
- [Proofs API](/api/endpoints/proofs/) - zkTLS 증명 관리
- [Sessions API](/api/endpoints/sessions/) - 세션 및 로그인 관리

### 🎓 고급 가이드

- [성능 최적화](/api/guides/performance/) - 응답 시간 50% 단축
- [비용 최적화](/api/guides/cost-optimization/) - SELA 사용량 70% 절감
- [프로덕션 체크리스트](/api/guides/production/) - 배포 전 확인사항

---

## 지원 및 커뮤니티

**문제가 있으신가요?**

- 📚 [FAQ](/api/faq/) - 자주 묻는 질문
- 💬 [Discord](https://discord.gg/sela) - 실시간 커뮤니티 지원
- 🐛 [GitHub Issues](https://github.com/sela-network/sdk/issues) - 버그 리포트
- 📧 support@sela.network - 이메일 지원

**Enterprise 고객**:

- 📞 24/7 전화 지원
- 💼 전담 계정 매니저
- 🎯 커스텀 SLA

---

## API 상태 및 안정성

**실시간 상태**: https://status.sela.network

**SLA (Service Level Agreement)**:

| 플랜       | Uptime | 응답 시간 (P95) | 지원 응답         |
| ---------- | ------ | --------------- | ----------------- |
| Free       | 99%    | < 3초           | 커뮤니티 (72시간) |
| Pro        | 99.9%  | < 2초           | 이메일 (24시간)   |
| Enterprise | 99.95% | < 1초           | 전화 (1시간)      |

**다운타임 크레딧**:

- Uptime < 99.9% (Pro 이상): 월 비용의 10% 환불
- Uptime < 99%: 월 비용의 25% 환불
- Major Outage (> 1시간): 월 비용의 100% 환불

---

**프로젝트 시작**: 2024년  
**마지막 업데이트**: 2024년 11월 23일  
**API 버전**: v1 (stable)  
**SDK 버전**: Python 1.2.0, JavaScript 1.1.0, Go 1.0.0, Rust 0.9.0

---

## API 엔드포인트

### Base URL

```
Production: https://api.sela.network/v1
Testnet: https://testnet-api.sela.network/v1
```

### 버전 관리

```
현재 버전: v1
지원 종료: v1은 최소 2년 지원 보장
업그레이드: v2는 6개월 전 사전 공지
```

---

## 인증 (Authentication)

### API Key 방식

**헤더에 포함:**

```http
GET /browse HTTP/1.1
Host: api.sela.network
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**예시:**

```bash
curl -X GET "https://api.sela.network/v1/browse?url=amazon.com" \
  -H "Authorization: Bearer sk_live_abc123..."
```

### OAuth 2.0

**Grant Types:**

- Authorization Code (웹 애플리케이션)
- Client Credentials (서버 to 서버)
- Refresh Token (장기 세션)

**토큰 발급:**

```http
POST /auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET
```

**응답:**

```json
{
  "access_token": "eyJhbGc...iOiJI",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "browse:read browse:write"
}
```

---

## Rate Limiting

### 제한 정책

| 플랜           | 분당 요청 | 일일 요청 | 월간 요청 |
| -------------- | --------- | --------- | --------- |
| **Free**       | 10        | 1,000     | 10,000    |
| **Starter**    | 60        | 10,000    | 300,000   |
| **Pro**        | 300       | 100,000   | 3,000,000 |
| **Enterprise** | 1,000+    | 무제한    | 무제한    |

### Rate Limit 헤더

**응답 헤더:**

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640995200
X-RateLimit-Reset-After: 45
```

**초과 시 응답:**

```json
{
  "error": {
    "type": "rate_limit_error",
    "message": "Rate limit exceeded",
    "retry_after": 45
  }
}
```

---

## 에러 처리

### HTTP 상태 코드

| 코드 | 의미                  | 설명                 |
| ---- | --------------------- | -------------------- |
| 200  | OK                    | 요청 성공            |
| 201  | Created               | 리소스 생성 성공     |
| 400  | Bad Request           | 잘못된 요청 파라미터 |
| 401  | Unauthorized          | 인증 실패            |
| 403  | Forbidden             | 권한 없음            |
| 404  | Not Found             | 리소스 없음          |
| 429  | Too Many Requests     | Rate Limit 초과      |
| 500  | Internal Server Error | 서버 오류            |
| 503  | Service Unavailable   | 일시적 서비스 중단   |

### 에러 응답 형식

```json
{
  "error": {
    "type": "validation_error",
    "message": "Invalid URL format",
    "code": "INVALID_URL",
    "param": "url",
    "doc_url": "https://docs.sela.network/errors/INVALID_URL"
  },
  "request_id": "req_abc123"
}
```

### 에러 코드 목록

| 코드                  | 설명            | 해결 방법          |
| --------------------- | --------------- | ------------------ |
| INVALID_URL           | 잘못된 URL 형식 | URL 형식 확인      |
| AUTHENTICATION_FAILED | 인증 실패       | API Key 확인       |
| INSUFFICIENT_BALANCE  | 잔액 부족       | $SELA 충전         |
| RATE_LIMIT_EXCEEDED   | Rate Limit 초과 | 요청 속도 조절     |
| NODE_UNAVAILABLE      | 노드 부족       | 잠시 후 재시도     |
| TIMEOUT               | 요청 시간 초과  | 타임아웃 설정 증가 |
| BOT_DETECTED          | Bot 감지됨      | 파라미터 조정      |

---

## 요청 및 응답 형식

### 요청 예시

```http
POST /v1/browse HTTP/1.1
Host: api.sela.network
Authorization: Bearer sk_live_abc123...
Content-Type: application/json

{
  "url": "https://amazon.com/s?k=airpods",
  "options": {
    "wait_for": "networkidle",
    "screenshot": true,
    "extract": {
      "type": "product_list",
      "schema": "ecommerce_v1"
    },
    "proof": {
      "enabled": true,
      "type": "zk_tls"
    }
  }
}
```

### 응답 예시

```json
{
  "request_id": "req_abc123",
  "status": "completed",
  "data": {
    "url": "https://amazon.com/s?k=airpods",
    "title": "Amazon.com : airpods",
    "extracted": {
      "products": [
        {
          "id": "B08X4YZ123",
          "name": "Apple AirPods Pro (2nd Gen)",
          "price": 199.99,
          "currency": "USD",
          "rating": 4.7,
          "reviews": 12543
        }
      ]
    },
    "screenshot": "https://cdn.sela.network/screenshots/abc123.png",
    "proof": {
      "hash": "0x1234...",
      "notary": "https://notary.sela.network/proofs/abc123",
      "verified": true
    }
  },
  "metadata": {
    "node_id": "node_xyz789",
    "region": "us-west-1",
    "execution_time": 2.3,
    "tokens_used": 0.02
  }
}
```

---

## 주요 API 엔드포인트

### 1. Browse API

웹 페이지 접근 및 데이터 추출

```http
POST /v1/browse
```

[상세 문서 →](/api/browse/)

### 2. Actions API

웹 인터랙션 자동화

```http
POST /v1/actions
```

[상세 문서 →](/api/actions/)

### 3. Parsers API

커스텀 파서 관리

```http
GET /v1/parsers
POST /v1/parsers
```

[상세 문서 →](/api/parsers/)

### 4. Sessions API

로그인 세션 관리

```http
POST /v1/sessions
GET /v1/sessions/:id
```

[상세 문서 →](/api/sessions/)

### 5. Proofs API

zk-TLS 증명 조회

```http
GET /v1/proofs/:id
POST /v1/proofs/verify
```

[상세 문서 →](/api/proofs/)

---

## SDK 사용

### Python SDK

```python
from sela import SelaClient

client = SelaClient(api_key="sk_live_abc123...")

# 웹 페이지 브라우징
result = client.browse(
    url="https://amazon.com/s?k=airpods",
    options={
        "extract": {"type": "product_list"},
        "proof": {"enabled": True}
    }
)

print(result.data.extracted.products)
```

### JavaScript SDK

```javascript
import { SelaClient } from "@sela-network/sdk";

const client = new SelaClient({
  apiKey: "sk_live_abc123...",
});

// 웹 페이지 브라우징
const result = await client.browse({
  url: "https://amazon.com/s?k=airpods",
  options: {
    extract: { type: "product_list" },
    proof: { enabled: true },
  },
});

console.log(result.data.extracted.products);
```

---

## Webhook

### Webhook 설정

```http
POST /v1/webhooks HTTP/1.1

{
  "url": "https://your-server.com/webhook",
  "events": ["browse.completed", "browse.failed"],
  "secret": "whsec_abc123..."
}
```

### Webhook 이벤트

**browse.completed:**

```json
{
  "event": "browse.completed",
  "request_id": "req_abc123",
  "timestamp": 1640995200,
  "data": {
    "url": "https://amazon.com",
    "status": "completed",
    "extracted": {...}
  }
}
```

### Signature 검증

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

---

## API 베스트 프랙티스

### 1. 지수 백오프 (Exponential Backoff)

```python
import time

max_retries = 3
for attempt in range(max_retries):
    try:
        result = client.browse(url)
        break
    except RateLimitError:
        wait_time = (2 ** attempt) + random.random()
        time.sleep(wait_time)
```

### 2. 배치 요청

```python
# 비효율적
for url in urls:
    client.browse(url)

# 효율적
results = client.browse_batch(urls, max_concurrent=10)
```

### 3. 캐싱

```python
# 동일 URL 반복 요청 시 캐시 활용
result = client.browse(
    url="https://example.com",
    options={"cache": {"enabled": True, "ttl": 3600}}
)
```

---

## API 모니터링

### 대시보드

```
https://dashboard.sela.network/api-usage
```

**제공 정보:**

- 실시간 요청 통계
- Rate Limit 현황
- 비용 사용량
- 에러 로그
- 응답 시간 그래프

### 알림 설정

- Rate Limit 80% 도달 시 이메일
- 일일 예산 초과 시 Slack 알림
- API 에러 급증 시 SMS 알림

---

## 다음 단계

- [Browse API 상세 가이드](/api/browse/)
- [Actions API 상세 가이드](/api/actions/)
- [Parsers API 상세 가이드](/api/parsers/)
- [Python SDK 문서](https://github.com/sela-network/python-sdk)
- [JavaScript SDK 문서](https://github.com/sela-network/js-sdk)

---

## 지원

- [Discord 커뮤니티](https://discord.gg/sela)
- [API Status 페이지](https://status.sela.network)
- [이슈 트래커](https://github.com/sela-network/issues)
- [이메일 지원](mailto:support@sela.network)
