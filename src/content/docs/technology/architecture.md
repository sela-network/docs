---
title: 아키텍처 개요
description: Sela Network의 3계층 아키텍처
---

## The Three-Layer Stack

Sela Network의 아키텍처는 AI 에이전트가 웹과 안전하고 효율적으로 상호작용할 수 있도록 설계된 **3개의 독립적이면서도 통합된 계층**으로 구성됩니다. 각 계층은 특정한 역할을 담당하며, 함께 작동하여 완전한 웹 인터랙션 솔루션을 제공합니다.

### 계층별 역할

| 계층                                  | 역할                               | 핵심 기술                                       |
| ------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| **L1: Web Transport Layer**           | 분산 브라우저 실행, 웹 페이지 접근 | dBrowser Nodes, Residential Proxy               |
| **L2: Semantic Interpretation Layer** | HTML/화면 → JSON/Action 변환       | VLM, DOM-to-JSON Engine, Self-Healing Selectors |
| **L3: Verifiability Layer**           | 데이터 무결성 증명, 출처 인증      | zk-TLS, Notary Signatures                       |

---

## Layer 1: Web Transport Layer (웹 전송 계층)

### 목적과 역할

Web Transport Layer는 AI 에이전트가 실제 웹사이트에 접근하고 인터랙션할 수 있는 **물리적 인프라**를 제공합니다. 이 계층은 전 세계에 분산된 실제 브라우저 노드를 통해 중앙화된 서비스의 한계를 극복하고, 봇 탐지 시스템을 우회하며, 지역 제한 콘텐츠에 접근할 수 있게 합니다.

### 구성 요소

#### 1. dBrowser Nodes (분산 브라우저 노드)

**기술적 설명:**

dBrowser Node는 전 세계 사용자와 사업자가 운영하는 **실제 브라우저 인스턴스**입니다. 각 노드는 Chrome 확장 프로그램 또는 독립 실행형 애플리케이션으로 작동하며, Sela Network의 요청을 받아 웹사이트에 접속하고 데이터를 수집합니다.

**분산 아키텍처의 장점:**

[수평적 확장(Horizontal Scaling)](https://www.geeksforgeeks.org/system-design/scaling-distributed-systems/)은 노드를 추가함으로써 시스템의 처리 능력을 거의 선형적으로 증가시킬 수 있는 방식입니다. Sela Network는 이 원칙을 적용하여:

- **무제한 확장성**: 새로운 노드가 추가될 때마다 전체 네트워크의 처리 용량이 증가합니다.
- **단일 장애점 제거**: 중앙 서버에 의존하지 않으므로 특정 노드의 장애가 전체 시스템에 영향을 주지 않습니다.
- **지리적 분산**: 전 세계 150개 이상의 국가에 노드가 분산되어 있어 지역별 최적 라우팅이 가능합니다.

**노드 선택 알고리즘:**

Sela Gateway는 다음 기준에 따라 최적의 노드를 선택합니다:

1. **지리적 근접성**: 타겟 웹사이트와 가장 가까운 지역의 노드를 선택하여 레이턴시를 최소화합니다.
2. **노드 성능**: CPU, 메모리, 네트워크 대역폭 등의 리소스 가용성을 고려합니다.
3. **부하 분산**: 현재 처리 중인 요청 수를 기반으로 부하를 균등하게 배분합니다.

#### 2. Residential Proxy Network

**봇 탐지 우회의 핵심:**

[Residential Proxy](https://blog.cloudflare.com/residential-proxy-bot-detection-using-machine-learning/)는 실제 사용자의 가정용 인터넷 연결을 통해 트래픽을 라우팅하는 프록시 서비스입니다. 이는 데이터센터 IP를 사용하는 전통적인 프록시와 달리, 웹사이트 입장에서는 **일반 사용자의 접속과 구별할 수 없는** 트래픽을 생성합니다.

**데이터센터 프록시 vs Residential Proxy:**

| 항목                | 데이터센터 프록시           | Residential Proxy                 |
| ------------------- | --------------------------- | --------------------------------- |
| IP 출처             | AWS, GCP 등 클라우드 서버   | 실제 가정용 인터넷 연결           |
| 봇 탐지율           | 높음 (쉽게 탐지됨)          | 낮음 (84%의 웹사이트가 탐지 실패) |
| IP 평판             | 낮음 (공유 IP로 블랙리스트) | 높음 (실제 사용자 IP)             |
| 지역 제한 콘텐츠    | 우회 어려움                 | 우회 가능                         |
| 비용                | 저렴                        | 비쌈                              |
| Sela Network 전략   | 사용하지 않음               | 핵심 인프라로 활용                |

**봇 탐지 우회 메커니즘:**

현대 웹사이트는 다음과 같은 방법으로 봇을 탐지합니다:

1. **IP 평판 분석**: 데이터센터 IP 범위를 블랙리스트에 등록
2. **요청 패턴 분석**: 짧은 시간에 많은 요청을 보내는 IP 차단
3. **지리적 일관성 검사**: 동일 세션에서 여러 지역의 IP가 사용되면 의심

Sela의 Residential Proxy Network는 이 모든 탐지 메커니즘을 우회합니다:

- **깨끗한 IP 평판**: 실제 사용자의 IP이므로 블랙리스트에 없음
- **자연스러운 요청 패턴**: 각 노드가 독립적으로 작동하여 분산된 요청 패턴 생성
- **지리적 일관성**: 실제 사용자가 위치한 지역에서 일관되게 요청

#### 3. Session Manager

**복잡한 인증 상태 관리:**

현대 웹 애플리케이션은 로그인 세션을 유지하기 위해 다양한 메커니즘을 사용합니다. Session Manager는 이러한 복잡성을 처리하여 AI 에이전트가 인증이 필요한 작업을 수행할 수 있게 합니다.

**관리 대상:**

1. **쿠키 관리**:
   - HTTP 쿠키 (세션 ID, 인증 토큰)
   - Secure 및 HttpOnly 플래그 처리
   - SameSite 정책 준수

2. **로컬 스토리지 및 세션 스토리지**:
   - JavaScript를 통한 클라이언트 측 데이터 저장
   - 도메인별 격리

3. **인증 토큰**:
   - JWT (JSON Web Token) 관리
   - OAuth 2.0 토큰 갱신
   - API 키 및 Bearer 토큰

**멀티 세션 격리:**

각 요청은 독립된 **샌드박스 환경**에서 실행됩니다. 이는 [Chrome의 Site Isolation](https://www.chromium.org/Home/chromium-security/site-isolation/) 기술을 활용하여:

- 서로 다른 사용자의 세션이 섞이지 않도록 보장
- 메모리 격리를 통해 보안 취약점 방지
- 각 세션의 쿠키와 로컬 스토리지를 완전히 분리

### 주요 기능

#### 인간 브라우징 패턴 모방

봇 탐지 시스템은 다음과 같은 신호를 분석하여 봇을 식별합니다:

- **마우스 움직임 패턴**: 인간은 곡선 경로로 움직이지만 봇은 직선으로 이동
- **타이핑 속도**: 인간은 불규칙한 속도로 타이핑하지만 봇은 일정한 속도
- **스크롤 패턴**: 인간은 자연스럽게 스크롤하지만 봇은 기계적으로 이동
- **페이지 간 이동 시간**: 인간은 페이지를 읽는 시간이 필요하지만 봇은 즉시 이동

Sela Node는 이러한 인간 행동을 **머신러닝 모델**을 통해 학습하고 재현합니다.

#### WebGL, Canvas, AudioContext 지문 생성

[브라우저 핑거프린팅](https://www.zenrows.com/blog/browser-fingerprinting)은 봇 탐지의 핵심 기술입니다. 각 브라우저와 디바이스는 고유한 "지문"을 가지고 있으며, 이를 통해 봇과 실제 사용자를 구별할 수 있습니다.

**핑거프린팅 요소:**

1. **WebGL 핑거프린트**:
   - GPU 렌더링 특성을 기반으로 생성
   - 그래픽 카드 모델, 드라이버 버전에 따라 고유한 값
   - Sela는 실제 사용자의 GPU 정보를 사용하여 자연스러운 핑거프린트 생성

2. **Canvas 핑거프린트**:
   - HTML5 Canvas API를 사용하여 그래픽을 렌더링할 때 발생하는 미세한 차이
   - 동일한 그림을 그려도 디바이스마다 픽셀 수준에서 다른 결과 생성
   - Sela는 실제 브라우저에서 렌더링하므로 자연스러운 Canvas 핑거프린트 보유

3. **AudioContext 핑거프린트**:
   - 오디오 처리 하드웨어의 특성을 기반으로 생성
   - 사운드 카드, 오디오 코덱에 따라 고유한 신호

#### 동적 JavaScript 렌더링

현대 웹사이트의 대부분은 **Single Page Application (SPA)** 방식으로 구축되어 있습니다. React, Vue, Angular 등의 프레임워크를 사용하는 이러한 사이트는:

- 초기 HTML에는 거의 내용이 없음
- JavaScript가 실행되어야 실제 콘텐츠가 렌더링됨
- AJAX 요청으로 데이터를 비동기적으로 로드

Sela Node는 **실제 브라우저 엔진(Chromium)**을 사용하므로:

- JavaScript 실행 완료 대기
- AJAX 요청 자동 처리
- React/Vue의 가상 DOM 렌더링 결과 확인

#### 파일 업로드/다운로드 처리

웹 인터랙션에서 파일 처리는 복잡한 작업입니다:

**파일 업로드:**
- `<input type="file">` 요소 처리
- 드래그 앤 드롭 인터페이스 지원
- 멀티파트 폼 데이터 생성
- 업로드 진행률 모니터링

**파일 다운로드:**
- Blob URL 처리
- Content-Disposition 헤더 파싱
- 스트리밍 다운로드 지원
- 다운로드 완료 검증

---

## Layer 2: Semantic Interpretation Layer (의미 해석 계층)

### 목적과 역할

웹은 **인간의 눈**을 위해 설계되었습니다. HTML, CSS, JavaScript는 시각적으로 아름답고 직관적인 UI를 만들기 위한 도구이지, **AI가 이해하기 쉬운 데이터 구조**를 제공하기 위한 것이 아닙니다.

Semantic Interpretation Layer는 이 간극을 메웁니다. 시각적 웹 콘텐츠를 AI가 이해할 수 있는 **구조화된 데이터(JSON)**로 변환하고, 웹사이트의 UI가 변경되어도 자동으로 적응하는 **자가 복구** 기능을 제공합니다.

### 구성 요소

#### 1. Vision Language Model (VLM)

**VLM이란?**

[Vision Language Model](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)은 이미지와 텍스트를 동시에 이해할 수 있는 AI 모델입니다. Google의 ScreenAI와 같은 최신 VLM은 **UI 요소를 인식하고 이해**하는 데 특화되어 있습니다.

**Sela에서의 VLM 역할:**

1. **UI 요소의 시각적 인식**:
   - 버튼, 입력 필드, 드롭다운 메뉴 등의 위치 식별
   - 요소의 크기, 색상, 스타일 분석
   - 아이콘과 이미지의 의미 파악

2. **레이아웃 및 계층 구조 이해**:
   - 페이지의 시각적 계층 파악 (헤더, 본문, 사이드바 등)
   - 요소 간의 관계 분석 (어떤 버튼이 어떤 필드와 연결되어 있는지)
   - 시각적 그룹핑 인식 (카드형 레이아웃, 그리드 등)

**성능 벤치마크:**

[최신 VLM 모델](https://arxiv.org/html/2402.04615)의 UI 요소 탐지 정확도:

- Google ScreenAI: UI 기반 작업에서 state-of-the-art 성능
- Automotive UI 모델: 평균 **80.8% 정확도**
- Spotlight (Google): Widget captioning, command grounding에서 높은 성능

Sela는 이러한 최신 VLM 기술을 활용하여 복잡한 UI도 정확하게 해석합니다.

#### 2. DOM-to-JSON Engine

**DOM(Document Object Model)이란?**

DOM은 웹 페이지의 구조를 트리 형태로 표현한 것입니다. 브라우저는 HTML을 파싱하여 DOM을 생성하고, JavaScript는 이 DOM을 조작하여 동적인 웹 페이지를 만듭니다.

**DOM 파싱의 장점:**

VLM이 시각적 정보를 제공한다면, DOM 파싱은 **구조적 정보**를 제공합니다:

1. **정확한 요소 속성 추출**:
   - 요소의 ID, class, data 속성
   - href, src 등의 링크 정보
   - aria-label 등의 접근성 속성

2. **시맨틱 태그 활용**:
   - `<header>`, `<nav>`, `<article>`, `<footer>` 등의 HTML5 시맨틱 태그
   - 페이지의 논리적 구조 파악
   - SEO 메타데이터 추출

3. **폼 및 입력 필드 분석**:
   - `<form>` 요소의 action, method 속성
   - `<input>`의 type, name, required 속성
   - 유효성 검사 규칙 파악

**하이브리드 접근의 이점:**

VLM과 DOM 파싱을 결합하면:

```
VLM: "이 위치에 파란색 버튼이 있습니다"
DOM Parser: "이 버튼의 ID는 'submit-btn'이고, 클릭 시 '/api/order' 엔드포인트로 POST 요청을 보냅니다"

→ 통합 결과: AI 에이전트는 버튼의 위치, 시각적 특징, 기능을 모두 이해
```

#### 3. Self-Healing Selector System

**웹 스크래핑의 가장 큰 문제: UI 변경**

웹사이트는 지속적으로 UI를 개선합니다. 버튼의 위치가 바뀌고, CSS 클래스 이름이 변경되고, HTML 구조가 재편됩니다. 전통적인 웹 스크래핑 도구는 이러한 변경에 **즉시 중단**됩니다.

**Self-Healing의 원리:**

[Self-Healing Selector](https://stackoverflow.com/questions/55242301/self-healing-of-selectors-in-ui-automation)는 UI 변경을 자동으로 감지하고 새로운 선택자를 찾아내는 시스템입니다. Sela는 다음 단계로 작동합니다:

1. **초기 매핑**:
   - 첫 방문 시 VLM + DOM 파싱으로 모든 UI 요소 매핑
   - 각 요소에 대해 **여러 선택자 후보** 생성 (ID, class, XPath, 시각적 위치 등)
   - 선택자의 우선순위 결정 (안정성 기반)

2. **변경 감지**:
   - [MutationObserver API](https://github.com/josh/selector-observer)를 사용하여 DOM 변경 실시간 감지
   - 기존 선택자로 요소를 찾을 수 없을 때 변경 신호 발생
   - 변경된 영역의 스크린샷 캡처

3. **재매핑**:
   - VLM을 사용하여 시각적으로 동일한 요소 탐색
   - 새로운 DOM 구조 분석
   - 새로운 선택자 생성 및 검증

4. **검증 및 최적화**:
   - 새 선택자의 정확도 확인
   - 여러 번 테스트하여 안정성 검증
   - 선택자 우선순위 재조정

**실제 예시: 쿠팡 UI 변경**

```
변경 전:
<button class="buy-button primary-action">구매하기</button>
→ CSS Selector: button.buy-button

변경 후 (리뉴얼):
<button class="purchase-btn cta-button">구매하기</button>
→ 기존 선택자 작동 안 함

Self-Healing 작동:
1. VLM: "구매하기" 텍스트를 가진 버튼 시각적으로 탐지
2. DOM Parser: 새로운 class 이름 확인 (purchase-btn)
3. 새 선택자 생성: button.purchase-btn
4. 검증: 3회 테스트 → 성공
5. 자동 업데이트 완료

→ 서비스 중단 시간: 0초
```

**지원 사이트:**

Sela의 Self-Healing System은 다음과 같은 주요 사이트에서 검증되었습니다:

- 쿠팡 (한국 최대 e-커머스)
- 아마존 (글로벌 e-커머스)
- 네이버 (한국 포털)
- 배달의민족, 쿠팡이츠 (음식 배달)
- 그 외 수백 개의 웹사이트

#### 4. Schema Normalizer

**문제: LLM의 JSON 출력 불일치**

LLM(Large Language Model)을 사용하여 HTML을 JSON으로 변환하면 **매번 다른 스키마**가 생성됩니다:

```json
// 첫 번째 요청
{
  "productName": "AirPods",
  "cost": 199.99
}

// 두 번째 요청 (동일한 페이지)
{
  "name": "AirPods",
  "price": {
    "value": 199.99,
    "currency": "USD"
  }
}
```

이는 AI 에이전트 개발을 극도로 어렵게 만듭니다.

**Schema Normalizer의 역할:**

1. **정규화 규칙 정의**:
   - 도메인별 표준 스키마 정의 (e-커머스, 뉴스, 금융 등)
   - [Schema.org](https://schema.org)와 [JSON-LD](https://json-ld.org) 표준 준수
   - 필드 이름, 데이터 타입, 중첩 구조 표준화

2. **일관된 출력 보장**:
   ```json
   // Schema.org Product 스키마 기반
   {
     "@type": "Product",
     "name": "Apple AirPods Pro (2nd Gen)",
     "offers": {
       "@type": "Offer",
       "price": "199.99",
       "priceCurrency": "USD",
       "availability": "https://schema.org/InStock"
     },
     "aggregateRating": {
       "@type": "AggregateRating",
       "ratingValue": "4.7",
       "reviewCount": "12543"
     }
   }
   ```

3. **버전 관리**:
   - 스키마 변경 시 하위 호환성 유지
   - 점진적 업그레이드 경로 제공
   - 레거시 스키마 지원

**AI 에이전트 안정성 확보:**

일관된 스키마는 다음과 같은 이점을 제공합니다:

- **예측 가능한 데이터 구조**: AI 에이전트 코드가 단순해짐
- **에러 처리 간소화**: 예상치 못한 필드 이름으로 인한 에러 제거
- **빠른 통합**: 새로운 웹사이트 추가 시 즉시 사용 가능
- **유지보수 부담 감소**: 스키마 변경으로 인한 코드 수정 불필요

### 처리 플로우

```
HTML/CSS/JS 웹 페이지
    ↓
[Step 1] VLM 시각 분석
    → UI 요소 위치, 색상, 스타일 인식
    ↓
[Step 2] DOM 파싱
    → HTML 구조, 속성, 링크 추출
    ↓
[Step 3] 의미론적 요소 추출
    → VLM + DOM 정보 통합
    → 요소의 의미와 기능 파악
    ↓
[Step 4] JSON 스키마 생성
    → 구조화된 데이터 생성
    ↓
[Step 5] Schema 정규화
    → 표준 스키마에 맞게 변환
    → 필드 이름, 타입 정규화
    ↓
[Step 6] AI Agent로 전달
    → 일관된 JSON 데이터 제공
```

---

## Layer 3: Verifiability Layer (검증 가능성 계층)

### 목적과 역할

인터넷의 근본적인 문제는 **신뢰**입니다. AI 에이전트가 웹에서 가져온 데이터가 진짜인지, 조작되지 않았는지를 어떻게 증명할 수 있을까요?

Verifiability Layer는 [zk-TLS(Zero-Knowledge TLS)](https://arxiv.org/html/2409.17670v1) 기술을 사용하여 웹 데이터의 **출처와 무결성을 암호학적으로 증명**합니다. 이는 금융, 법률, 의료 등 신뢰가 중요한 분야에서 AI 에이전트가 활용될 수 있도록 하는 핵심 기술입니다.

### 구성 요소

#### 1. zk-TLS (Zero-Knowledge Transport Layer Security)

**TLS란?**

[TLS (Transport Layer Security)](https://tlsnotary.org/docs/faq/)는 웹 브라우저와 서버 간의 통신을 암호화하는 프로토콜입니다. HTTPS의 "S"가 바로 TLS를 의미합니다. TLS는 다음을 보장합니다:

- **암호화**: 데이터가 중간에서 도청되지 않음
- **무결성**: 데이터가 전송 중 변조되지 않음
- **인증**: 서버가 실제 해당 도메인의 소유자임을 증명

**zk-TLS의 혁신:**

[TLSNotary 프로토콜](https://medium.com/@mariotaning/getting-started-with-tls-notary-development-d905854cf4a4)은 TLS 세션의 데이터를 **제3자(Verifier)에게 증명**할 수 있게 합니다. 핵심 아이디어는:

1. **세션 키 분할**: 클라이언트(Prover)와 Verifier가 TLS 세션 키를 나눠 가짐
2. **MPC (Multi-Party Computation)**: 양측이 협력하여 암호화/복호화 수행
3. **증명 생성**: Verifier는 데이터가 실제 서버에서 왔음을 확인하고 서명

**기술적 프로세스:**

```
[1] TLS Handshake with MPC
Client (Prover) ↔ Notary (Verifier) ↔ Web Server
         ↓
    MPC Protocol
    - Garbled Circuits (복잡한 계산을 암호화된 상태로 수행)
    - Oblivious Transfer (정보 누출 없이 데이터 전송)
         ↓
    Session Key 분할
    - Prover는 Key Share 1 보유
    - Verifier는 Key Share 2 보유
    - 둘을 합쳐야 실제 Key 생성 가능

[2] Data Transmission
Web Server → Encrypted Data → Prover
         ↓
    MPC Decryption
    - Prover와 Verifier가 협력하여 복호화
    - Verifier는 평문 데이터 확인 가능
         ↓
    Notary Signature
    - Verifier가 데이터 출처를 서명으로 증명

[3] ZK Proof Generation
    - 실제 데이터는 공개하지 않음
    - "이 데이터는 amazon.com에서 왔다"는 증명만 생성
    - 블록체인 또는 오프체인에 저장
```

**증명 내용:**

zk-TLS 증명은 다음을 포함합니다:

- **서버 인증서 검증**: 데이터가 실제 도메인(예: amazon.com)에서 왔음을 증명
- **데이터 무결성**: 데이터가 전송 중 변조되지 않았음을 증명
- **타임스탬프**: 데이터를 언제 받았는지 증명
- **전송 경로**: 어떤 경로로 데이터가 왔는지 증명

#### 2. Notary Service

**독립적인 제3자 검증:**

Notary Service는 TLS 세션의 **Verifier 역할**을 수행하는 독립적인 서비스입니다. Sela Network는 분산된 Notary 노드를 운영하여:

- **탈중앙화**: 단일 Notary에 의존하지 않음
- **검열 저항성**: 특정 Notary가 서비스를 거부해도 다른 Notary 사용 가능
- **신뢰 분산**: 여러 Notary의 서명을 조합하여 신뢰성 향상

**Notary의 작업:**

1. **TLS 세션 참여**: Prover와 함께 MPC 프로토콜 수행
2. **데이터 검증**: 복호화된 데이터 확인
3. **타임스탬프 및 서명**: 검증 시점과 결과를 암호학적으로 서명
4. **감사 추적 (Audit Trail)**: 모든 검증 기록을 블록체인에 저장

#### 3. Proof Aggregation

**문제: 증명 데이터의 크기**

각 웹 요청마다 zk-TLS 증명을 생성하면 데이터 크기가 엄청나게 커집니다. 예를 들어:

- 아마존에서 상품 100개 검색 → 100개의 증명
- 각 증명 크기: ~10KB
- 총 크기: 1MB

블록체인에 이 모든 증명을 저장하면 비용이 매우 높아집니다.

**Proof Aggregation의 해결책:**

[zk-SNARK](https://chain.link/education/zero-knowledge-proof-zkp)와 같은 Zero-Knowledge Proof 기술을 사용하여:

1. **증명 결합**: 100개의 개별 증명을 하나의 증명으로 압축
2. **크기 축소**: 1MB → ~10KB (100배 축소)
3. **검증 효율화**: 하나의 증명만 검증하면 모든 데이터 검증 가능

**온체인 검증 최적화:**

블록체인에서 증명을 검증할 때:

- **가스 비용 절감**: 하나의 트랜잭션으로 여러 증명 검증
- **스토리지 비용 절감**: 작은 크기의 증명만 온체인 저장
- **검증 속도 향상**: 단순한 증명 구조로 빠른 검증

### 검증 가능한 요소

Sela의 zk-TLS는 다음을 증명할 수 있습니다:

#### 데이터 출처 (어느 서버에서 왔는가)

```
증명: "이 가격 정보는 실제 amazon.com 서버에서 왔습니다"
→ TLS 인증서 검증
→ 도메인 일치 확인
→ Notary 서명
```

#### 데이터 무결성 (조작되지 않았는가)

```
증명: "이 데이터는 서버에서 받은 그대로입니다"
→ TLS 암호화 메커니즘
→ Hash 검증
→ MPC를 통한 Verifier 확인
```

#### 시간 증명 (언제 데이터를 받았는가)

```
증명: "이 환율 정보는 2024-01-15 10:30:00 UTC에 받았습니다"
→ Notary의 타임스탬프 서명
→ 블록체인 블록 높이 기록
→ 시간 조작 불가능
```

#### 경로 증명 (어떤 경로로 데이터가 왔는가)

```
증명: "이 데이터는 다음 경로를 거쳤습니다:
  Client → Sela Node → amazon.com → Sela Node → Client"
→ 각 홉(hop)의 서명
→ 네트워크 경로 검증
```

---

## 통합 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                   AI Agent Application                  │
│   (LangChain, AutoGPT, Custom Agents)                  │
└────────────────────────┬────────────────────────────────┘
                         ↕
                   [REST API / SDK]
                         ↕
┌─────────────────────────────────────────────────────────┐
│              Sela Network Gateway API                   │
│   - 요청 라우팅 (API Gateway Pattern)                   │
│   - 인증 및 권한 관리                                   │
│   - Rate Limiting & Throttling                         │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Verifiability (zk-TLS + Notary)              │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │  zk-TLS   │  │  Notary   │  │ Proof Store  │       │
│  │  Engine   │  │  Service  │  │ (Blockchain) │       │
│  └───────────┘  └───────────┘  └──────────────┘       │
│  - MPC 기반 TLS 세션                                    │
│  - 데이터 출처 및 무결성 증명                           │
│  - Zero-Knowledge Proof 생성                           │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Semantic Interpretation                       │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │    VLM    │  │ DOM Parser│  │Self-Healing  │       │
│  │  (Vision) │  │ (Structure)│ │  Selectors   │       │
│  └───────────┘  └───────────┘  └──────────────┘       │
│  ┌─────────────────────────────────────────────┐       │
│  │         Schema Normalizer                   │       │
│  │    (Schema.org / JSON-LD 표준)               │       │
│  └─────────────────────────────────────────────┘       │
│  - HTML → JSON 변환                                     │
│  - UI 요소 의미 추출                                    │
│  - 자동 스키마 복구                                     │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Web Transport                                 │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │  dBrowser │  │Residential│  │   Session    │       │
│  │   Nodes   │  │   Proxy   │  │   Manager    │       │
│  │ (분산 실행)│  │  Network  │  │ (격리 실행)   │       │
│  └───────────┘  └───────────┘  └──────────────┘       │
│  - 실제 브라우저 인스턴스                               │
│  - 봇 탐지 우회                                         │
│  - 지역별 최적 노드 선택                                │
└────────────────────────┬────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│                    The Web (Internet)                   │
│   amazon.com, coupang.com, naver.com, ...              │
└─────────────────────────────────────────────────────────┘
```

---

## 확장성 및 성능

### 수평적 확장 (Horizontal Scaling)

Sela Network는 [분산 시스템의 수평적 확장](https://www.geeksforgeeks.org/system-design/scaling-distributed-systems/) 원칙을 따릅니다. 이는 **더 강력한 서버를 추가하는 것(수직 확장)**이 아니라 **더 많은 서버를 추가하는 것(수평 확장)**을 의미합니다.

**노드 추가의 이점:**

1. **선형적 성능 향상**:
   - 노드 2배 증가 → 처리 용량 약 2배 증가
   - 중앙화 시스템과 달리 병목 현상 없음

2. **무제한 확장 가능성**:
   - 누구나 노드를 추가하여 네트워크 확장에 기여
   - 초기 100개 노드 → 목표 100,000개 노드
   - 확장 한계 없음 (P2P 네트워크 원칙)

3. **비용 효율성**:
   - 소형 서버 여러 대가 대형 서버 1대보다 저렴
   - 사용자의 유휴 리소스 활용 (Airbnb for Computing)

**지역별 분산:**

전 세계 150개 이상의 국가에 노드가 분산되어:

- **레이턴시 최소화**: 한국 요청 → 한국 노드 (평균 <50ms)
- **지역 제한 우회**: 중국 웹사이트 → 중국 노드 사용
- **로드 밸런싱**: 시간대별 트래픽 분산 (아시아 낮 시간 → 아시아 노드 활용)

**로드 밸런싱 알고리즘:**

Sela Gateway는 [다양한 로드 밸런싱 알고리즘](https://www.cloudflare.com/learning/performance/types-of-load-balancing-algorithms/)을 사용합니다:

1. **Least Response Time**:
   - 최근 응답 시간이 가장 빠른 노드 선택
   - 실시간 성능 기반 라우팅

2. **Consistent Hashing**:
   - 동일 사용자의 요청을 동일 노드로 라우팅
   - 세션 일관성 유지
   - 노드 추가/제거 시 최소한의 재분배

3. **Geographic Load Balancing**:
   - 사용자와 타겟 웹사이트의 지리적 위치 고려
   - 최적의 경로 선택

### 성능 최적화

#### 캐싱 레이어

자주 요청되는 페이지와 데이터를 캐싱하여 성능 향상:

1. **HTML 캐싱**:
   - 정적 페이지는 최대 1시간 캐싱
   - CDN 스타일 분산 캐시

2. **JSON 스키마 캐싱**:
   - 동일 URL의 스키마는 재사용
   - VLM 처리 비용 90% 절감

3. **증명 캐싱**:
   - 최근 생성된 zk-TLS 증명 재사용
   - Notary 서명 비용 절감

#### 병렬 처리

여러 요청을 동시에 처리하여 처리 속도 향상:

- **멀티 노드 병렬 실행**: 100개 상품 검색 → 10개 노드가 10개씩 병렬 처리
- **비동기 I/O**: Node.js 기반 비동기 처리
- **스트리밍 응답**: 결과가 준비되는 대로 즉시 반환

#### 스마트 프리페칭

AI 에이전트의 다음 요청을 예측하여 미리 처리:

```
사용자 요청: "아마존에서 에어팟 검색"
→ Sela 예측: 다음 요청은 상품 상세 페이지일 가능성 높음
→ 검색 결과와 함께 상위 3개 상품의 상세 페이지 미리 로드
→ 사용자가 클릭 시 즉시 응답 (레이턴시 0초)
```

### 보안

#### 격리된 실행 (Isolation)

[Chrome의 Site Isolation](https://www.chromium.org/Home/chromium-security/site-isolation/) 기술을 활용하여:

1. **프로세스 격리**:
   - 각 요청은 독립적인 브라우저 프로세스에서 실행
   - 메모리 공유 없음
   - Spectre/Meltdown 공격 방어

2. **샌드박스 환경**:
   - 노드의 실제 시스템과 격리
   - 파일 시스템 접근 제한
   - 네트워크 접근 제어

3. **세션 격리**:
   - 각 사용자의 세션을 완전히 분리
   - 쿠키, 로컬 스토리지 공유 없음
   - 크로스 사이트 추적 방지

#### 암호화 통신

모든 데이터 전송은 암호화:

- **AI Agent ↔ Sela Gateway**: TLS 1.3
- **Sela Gateway ↔ Node**: End-to-End Encryption
- **Node ↔ Web Server**: TLS (HTTPS)

#### 접근 제어

토큰 기반 권한 관리:

1. **API Key 인증**: 각 사용자/에이전트에게 고유한 API Key 발급
2. **Rate Limiting**: API Key별 요청 제한 (DDoS 방지)
3. **권한 레벨**: 무료/유료 티어에 따른 기능 제한
4. **감사 로그**: 모든 API 요청 기록 및 추적

---

## 경쟁 우위

### 중앙화 솔루션 대비

| 항목              | Browserbase (중앙화)        | Sela Network (탈중앙)        |
| ----------------- | --------------------------- | ---------------------------- |
| **확장성**        | 서버 용량에 제한            | 노드 추가로 무제한 확장      |
| **SPOF**          | 중앙 서버 다운 시 전체 중단 | 노드 분산으로 단일 장애점 무 |
| **봇 탐지 우회**  | Stealth Mode (제한적)       | 실제 사용자 브라우저 (강력)  |
| **비용**          | $0.10/시간 + 프록시 별도    | 토큰 경제 기반 (장기 저렴)   |
| **데이터 검증**   | 로그만 제공                 | zk-TLS 암호학적 증명         |
| **검열 저항성**   | Provider 정책에 종속        | 탈중앙화로 검열 불가능       |
| **지역 커버리지** | 제한된 지역                 | 150+ 국가 글로벌 커버리지    |

### 기술적 혁신

1. **세계 최초 zk-TLS 웹 데이터 증명**: 웹 데이터의 출처를 증명할 수 있는 유일한 프로토콜
2. **하이브리드 VLM + DOM 파싱**: Vision과 구조 분석을 결합한 차세대 파싱
3. **Self-Healing Selector**: UI 변경에도 자동 적응하는 지능형 시스템
4. **분산 브라우저 네트워크**: P2P 원칙을 웹 스크래핑에 적용한 최초 사례

---

## Sources & References

### Horizontal Scaling and Distributed Systems
- [Scaling Distributed Systems - GeeksforGeeks](https://www.geeksforgeeks.org/system-design/scaling-distributed-systems/)
- [Scalability Patterns for Modern Distributed Systems](https://blog.bytebytego.com/p/scalability-patterns-for-modern-distributed)

### Load Balancing
- [What is load balancing? | Cloudflare](https://www.cloudflare.com/learning/performance/what-is-load-balancing/)
- [Types of load balancing algorithms | Cloudflare](https://www.cloudflare.com/learning/performance/types-of-load-balancing-algorithms/)

### Browser Security and Isolation
- [Site Isolation | Chromium](https://www.chromium.org/Home/chromium-security/site-isolation/)
- [Chrome Extensions Sandbox](https://developer.chrome.com/docs/extensions/reference/manifest/sandbox)

### Residential Proxies and Bot Detection
- [Using machine learning to detect bot attacks that leverage residential proxies](https://blog.cloudflare.com/residential-proxy-bot-detection-using-machine-learning/)
- [Datacenter vs Residential Proxies: 5 Crucial Differences](https://sslinsights.com/datacenter-proxy-vs-residential-proxy/)

### Vision Language Models for UI
- [ScreenAI: A Vision-Language Model for UI Understanding | Google Research](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
- [ScreenAI: A Vision-Language Model for UI and Infographics Understanding](https://ar5iv.labs.arxiv.org/html/2402.04615)

### Self-Healing Selectors
- [Self Healing of Selectors in UI Automation - Stack Overflow](https://stackoverflow.com/questions/55242301/self-healing-of-selectors-in-ui-automation)
- [selector-observer: Monitor DOM elements that match a CSS selector](https://github.com/josh/selector-observer)

### Zero-Knowledge Proofs and zkTLS
- [A Comprehensive Review of TLSNotary Protocol](https://arxiv.org/html/2409.17670v1)
- [zkTLS: Building A Verifiable and Private Web](https://oasis.net/blog/zktls-blockchain-security)
- [Getting Started with TLS Notary Development](https://medium.com/@mariotaning/getting-started-with-tls-notary-development-d905854cf4a4)

### API Gateway Pattern
- [API Gateway Pattern in Microservices](https://medium.com/design-microservices-architecture-with-patterns/api-gateway-pattern-8ed0ddfce9df)
- [Microservices Pattern: API Gateway](https://microservices.io/patterns/apigateway.html)

---

**Sela Network의 3계층 아키텍처는 확장성, 보안성, 검증 가능성을 모두 달성하며, AI 에이전트 시대의 웹 인프라 표준이 됩니다.**
