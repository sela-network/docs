---
title: 데이터 및 인터랙션 흐름
description: Sela Network의 실제 동작 워크플로우
---

## 전체 워크플로우

### 예시 시나리오

**AI Agent 요청:**

> "Amazon에서 에어팟 최저가 검색 후 주문해줘."

---

## 단계별 프로세스

### Step 1: 요청 접수 및 노드 선정

**Agent → Sela Gateway**

```
POST /api/v1/execute
{
  "task": "Amazon에서 에어팟 최저가 검색 후 주문",
  "target": "amazon.com",
  "region": "US"
}
```

**Sela Gateway 작업:**

- 최적 위치의 Node 선정
- 지역: 미국 (amazon.com)
- 레이턴시 최소화
- 부하 분산

---

### Step 2: 브라우저 실행 및 페이지 접근

**Node 작업:**

1. **브라우저 초기화**

   ```
   - Chrome 인스턴스 실행
   - Fingerprint 설정 (WebGL, Canvas 등)
   - Residential IP 할당
   ```

2. **Amazon 접속**

   ```
   - URL: https://amazon.com
   - Bot 탐지 우회
   - JavaScript 렌더링 완료 대기
   ```

3. **검색 수행**
   ```
   - 검색창 찾기
   - "에어팟" 입력
   - 검색 버튼 클릭
   ```

---

### Step 3: Semantic Engine - 상품 가격 JSON 구조화

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
