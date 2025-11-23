---
title: API 개요
description: Sela Network API 레퍼런스 가이드
---

## API 특징

### 🚀 핵심 기능

- **RESTful 아키텍처**: 표준 HTTP 메서드 (GET, POST, PUT, DELETE)
- **JSON 응답**: 모든 응답은 구조화된 JSON 형식
- **인증 시스템**: API Key 및 OAuth 2.0 지원
- **Rate Limiting**: 공정한 리소스 사용을 위한 제한
- **Webhook 지원**: 비동기 작업 결과 실시간 수신
- **SDK 제공**: Python, JavaScript, Go, Rust SDK

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
