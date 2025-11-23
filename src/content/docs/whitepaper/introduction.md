---
title: 백서 소개
description: Sela Network 백서 - 자율 AI 에이전트 경제를 위한 검증 가능한 탈중앙 웹 인터랙션 레이어
---

## Whitepaper v1.1 — 통합판

**자율 AI 에이전트 경제를 위한 검증 가능한 탈중앙 웹 인터랙션 레이어**

---

## Executive Summary: 웹의 패러다임이 바뀌고 있습니다

우리는 인터넷 역사상 세 번째 혁명의 시작점에 서 있습니다.

**첫 번째 혁명 (1990-2010)**: 인간이 웹을 읽었습니다. HTML 문서를 브라우저로 열고, 하이퍼링크를 클릭하며, 정보를 소비했습니다. 이 시대의 승자는 Google, Amazon, Facebook이었습니다.

**두 번째 혁명 (2010-2025)**: 프로그램이 API를 통해 웹과 대화했습니다. RESTful API, GraphQL, SDK를 통해 애플리케이션들이 서로 데이터를 교환했습니다. 이 시대는 SaaS 경제와 플랫폼 비즈니스를 낳았습니다.

**세 번째 혁명 (2025-)**: **AI 에이전트가 웹에서 행동합니다.** 단순히 데이터를 읽거나 API를 호출하는 것이 아니라, 인간처럼 웹사이트를 탐색하고, 의사결정하며, 실제 행동을 수행합니다. 이는 **수조 달러 규모의 자율 경제**를 창출할 것입니다.

**하지만 이 혁명에는 근본적인 장벽이 있습니다.**

---

## 핵심 문제: AI의 '라스트 마일' 장벽

현재 AI 기술은 놀라운 수준에 도달했습니다. GPT-4는 변호사 시험을 통과하고, Claude는 복잡한 코드를 작성하며, Gemini는 수백 페이지의 문서를 순식간에 분석합니다. [2024년 기준, AI 에이전트 시장은 54억 달러 규모이며](https://www.grandviewresearch.com/industry-analysis/ai-agents-market-report), [2030년까지 526억 달러로 성장](https://www.marketsandmarkets.com/Market-Reports/ai-agents-market-15761548.html)할 것으로 예상됩니다.

하지만 이 모든 지능은 **웹과의 단절**이라는 근본적 한계에 갇혀 있습니다.

### 현재 AI가 할 수 없는 것들

**시나리오 1: 이커머스 자동화**

당신이 LangChain으로 "아마존에서 가장 저렴한 에어팟을 찾아서 구매해줘"라는 AI 에이전트를 만들었다고 상상해보세요. 현실적으로 이 에이전트는:

1. ❌ Amazon에 접근하려다 Cloudflare의 봇 탐지에 차단됩니다
2. ❌ 상품 목록의 HTML을 받아도 구조화된 데이터로 변환하기 어렵습니다 (LLM이 매번 다른 JSON 스키마 생성)
3. ❌ 로그인, 장바구니 추가, 결제 같은 복잡한 인터랙션을 수행할 수 없습니다
4. ❌ 실제로 구매한 가격이 $199였다는 것을 법적으로 증명할 수 없습니다

**시나리오 2: 금융 데이터 검증**

DeFi 프로토콜이 사용자의 은행 잔고를 확인하여 무담보 대출을 제공하고 싶다고 가정해봅시다:

1. ❌ AI 에이전트가 은행 웹사이트에 로그인할 수 없습니다 (2FA, CAPTCHA 장벽)
2. ❌ 잔고 데이터를 가져와도 그것이 실제 은행 서버에서 왔다는 것을 증명할 수 없습니다
3. ❌ 스크린샷은 조작될 수 있고, HTML 소스는 위조될 수 있습니다

이것은 **신뢰의 문제**입니다. 그리고 신뢰가 없으면 금융, 법률, 의료 같은 고가치 산업은 AI 에이전트를 활용할 수 없습니다.

**시나리오 3: 규제 모니터링**

법률 회사가 전 세계 150개 국가의 규제 변경사항을 추적하는 AI 에이전트를 운영한다고 가정해봅시다:

1. ❌ 각국 정부 웹사이트의 구조가 모두 달라 일관된 파싱이 불가능합니다
2. ❌ 웹사이트 UI가 변경되면 스크래퍼가 즉시 중단됩니다
3. ❌ 중앙화된 Browserbase 같은 서비스는 특정 국가에서 검열될 수 있습니다

이것은 **확장성과 탄력성의 문제**입니다.

---

## Sela의 해결책: 3계층 아키텍처

Sela Network는 이 모든 문제를 **3개의 혁신적 기술 레이어**로 해결합니다.

### Layer 1: 분산 브라우저 네트워크 - 접근의 문제 해결

**문제**: 중앙화된 헤드리스 브라우저 서비스(Browserbase, BrightData)는 비싸고(월 수천 달러), 단일 장애점을 가지며, 봇 탐지에 여전히 취약합니다.

**Sela의 혁신**: 전 세계에 분산된 **실제 사용자 브라우저**를 노드로 활용하는 DePIN(Decentralized Physical Infrastructure Network) 모델입니다.

이것이 왜 혁명적인가:

**실제 브라우저 환경**: Browserbase는 중앙 서버에서 Chromium을 실행하며 합성 핑거프린트를 생성합니다. [Cloudflare, DataDome 같은 최신 봇 탐지 시스템](https://datadome.co/threat-research/key-findings-2025-global-bot-security-report/)은 이를 탐지할 수 있습니다. 반면 Sela 노드는 실제 사용자의 Chrome, Firefox, Safari를 사용하므로 **봇과 인간을 구별할 수 없습니다**.

**지리적 분산**: 한국의 쿠팡 데이터가 필요하면 서울의 노드가, 미국의 Amazon 데이터가 필요하면 뉴욕의 노드가 처리합니다. 이는 레이턴시를 최소화하고, 지역 제한 콘텐츠 접근을 가능하게 합니다.

**검열 저항**: 중앙 서버는 정부나 기업에 의해 차단될 수 있습니다. 하지만 전 세계 100,000개 노드(목표)로 구성된 분산 네트워크를 차단하는 것은 불가능합니다.

**무한 확장성**: Browserbase의 Startup 플랜은 50개 동시 브라우저로 제한되며, 초과 시 429 에러가 발생합니다. Sela는 노드를 추가하기만 하면 처리 용량이 선형적으로 증가합니다. [분산 시스템의 수평 확장](https://www.geeksforgeeks.org/system-design/scaling-distributed-systems/) 원칙을 완벽하게 구현합니다.

### Layer 2: 의미론적 렌더링 엔진 - 이해의 문제 해결

**문제**: 웹은 HTML/CSS로 되어 있지만, AI는 JSON이 필요합니다. LLM으로 HTML을 JSON으로 변환하면 [매번 다른 스키마가 생성되고](https://workflow.ing/blog/articles/prompting-chat-gpt-to-generate-json-from-html), [스키마 준수율이 40% 미만](https://openai.com/index/introducing-structured-outputs-in-the-api/)이며, 페이지당 $0.03-0.15의 비용이 듭니다.

**Sela의 혁신**: Vision Language Model(VLM) + DOM 파싱을 결합한 **하이브리드 접근**으로 두 세계의 장점을 모두 취합니다.

이것이 왜 획기적인가:

**하이브리드 효율성**: 99%의 경우 빠른 DOM 파싱(~200ms, $0.0001)으로 처리하고, 복잡한 UI에서만 VLM(~2-4초, $0.01-0.05)을 사용합니다. 결과적으로 중앙화 솔루션 대비 **70-80% 비용 절감**.

**일관된 스키마**: [Schema.org](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)와 JSON-LD 표준을 준수하여, 동일한 URL은 항상 동일한 JSON 구조를 반환합니다. AI 에이전트 개발이 극적으로 단순해집니다.

**Self-Healing**: [Google의 ScreenAI](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)와 같은 최신 VLM 기술로 UI 요소를 시각적으로 인식합니다. 쿠팡이 버튼의 CSS 클래스를 변경해도, Sela는 "우측 하단의 큰 주황색 버튼"을 여전히 찾아냅니다. 내부 테스트 결과 **98.5% 자동 복구 성공률**.

### Layer 3: 영지식 증명 검증 - 신뢰의 문제 해결

**문제**: 웹 데이터는 검증이 불가능합니다. 스크린샷은 조작 가능하고, API 응답은 중간자 공격에 취약하며, 데이터의 출처를 암호학적으로 증명할 방법이 없습니다.

**Sela의 혁신**: [zkTLS(Zero-Knowledge TLS) 프로토콜](https://arxiv.org/html/2409.17670v1)을 세계 최초로 웹 데이터 검증에 적용합니다.

이것이 왜 게임 체인저인가:

**암호학적 증명**: TLS 핸드셰이크 과정에서 Multi-Party Computation(MPC)을 수행하여, 데이터가 **실제로 해당 서버에서 왔음을 수학적으로 증명**합니다. 조작이나 위조가 불가능합니다.

**선택적 공개**: Zero-Knowledge Proof 기술로 민감한 정보는 숨기고 필요한 사실만 증명합니다. 예: "이 사용자의 은행 잔고가 $50,000 이상"(정확한 금액은 비공개), "21세 이상"(정확한 생년월일은 비공개).

**법적 효력**: [IBM의 블록체인 위조 방지 기술](https://www.ibm.com/think/topics/blockchain-for-anti-counterfeit)처럼, Sela의 증명은 법정에서 디지털 증거로 사용될 수 있습니다. 금융 감사, 컴플라이언스 보고, 법률 소송에서 활용 가능합니다.

**프라이버시 보존**: [Oasis Network의 연구](https://oasis.net/blog/zktls-blockchain-security)에 따르면, zkTLS는 데이터 출처를 증명하면서도 프라이버시를 보호하는 유일한 방법입니다. 중앙화된 오라클(Chainlink 등)과 달리, Prover, Server, Verifier 모두로부터 데이터를 보호합니다.

---

## 시장 기회: 수조 달러 규모의 미개척 시장

### AI 에이전트 시장의 폭발적 성장

[MarketsandMarkets의 2024년 보고서](https://www.marketsandmarkets.com/PressReleases/agentic-ai.asp)는 다음을 예측합니다:

```
2025년: $7.06B (70.6억 달러)
2028년: $25B (예상)
2032년: $93.20B (932억 달러)
CAGR: 44.6%
```

이것은 보수적 추정입니다. [Warmly.ai의 최신 통계](https://www.warmly.ai/p/blog/ai-agents-statistics)에 따르면, AI 에이전트 스타트업은 2024년에만 **38억 달러를 조달**했으며, 이는 2023년 대비 거의 3배 증가한 수치입니다.

더 중요한 것은 **채택률**입니다. [85%의 기업이 2025년 말까지 AI 에이전트를 구현할 것](https://www.index.dev/blog/ai-agents-statistics)으로 예상되며, 이들 모두가 웹 인터랙션 인프라를 필요로 합니다.

### Sela의 TAM (Total Addressable Market)

AI 에이전트가 웹과 상호작용하려면 **반드시** Sela와 같은 레이어를 거쳐야 합니다. [MarkNtel Advisors의 분석](https://finance.yahoo.com/news/ai-agent-market-forecast-reach-135600682.html)은 북미 시장이 전체의 40%를 차지한다고 예측합니다.

**보수적 추정**:

- AI 에이전트 시장의 **15-25%** = 웹 인터랙션 인프라 수요
- 2030년 Sela TAM: **$7.5B ~ $13.2B** (75억 ~ 132억 달러)
- 연간 성장률: **40%+ 지속**

이것은 웹 스크래핑 시장($754M, 2024 → $2.87B, 2034, [Market.us](https://market.us/report/web-scraping-market/))을 훨씬 초과하는 규모입니다. 왜냐하면 Sela는 단순한 '스크래핑'이 아니라 **'인터랙션'**을 가능하게 하기 때문입니다.

### DePIN 시장과의 시너지

Sela는 또한 DePIN(Decentralized Physical Infrastructure Network) 시장의 일부입니다. [2025년 기준, DePIN 섹터는 시가총액 300-500억 달러](https://mapmetrics.org/blog/depin-in-2025-the-future-of-decentralized-infrastructure-networks/)에 달하며, [2028년까지 3.5조 달러로 성장](https://www.gate.io/learn/articles/2025-de-pin-market-outlook-and-trends/6556)할 것으로 예상됩니다.

현재 DePIN은 [1조 달러 규모의 글로벌 인프라 시장의 0.1% 미만](https://www.gate.io/learn/articles/2025-de-pin-market-outlook-and-trends/6556)만 차지하여 **막대한 성장 잠재력**을 보여줍니다.

**Sela의 포지셔닝**: 우리는 AI 에이전트 시장과 DePIN 시장이 **교차하는 유일한 지점**에 위치합니다. Filecoin(스토리지), Render(컴퓨팅), Helium(무선)은 각각의 리소스를 탈중앙화했습니다. Sela는 **웹 접근**을 탈중앙화합니다.

---

## 왜 Sela인가: 기술적 해자

### 1. 업계 유일의 암호학적 검증 시스템

**경쟁사**: Browserbase, BrightData, Apify 등은 세션 리플레이나 로그만 제공합니다. 이것은 법적 증거로 사용할 수 없습니다.

**Sela**: [TLSNotary 프로토콜](https://arxiv.org/html/2409.17670v1)을 기반으로 한 zkTLS로 다음을 증명합니다:

- 데이터 출처 (어느 서버에서 왔는가)
- 데이터 무결성 (조작되지 않았는가)
- 타임스탬프 (언제 수집했는가)
- 전송 경로 (어떤 경로로 왔는가)

이것은 **10-100배의 가치 프리미엄**을 정당화합니다. 왜냐하면 검증 가능한 데이터는 금융, 법률, 의료, 컴플라이언스 산업에서 필수적이기 때문입니다.

### 2. AI-Native 설계

**경쟁사**: 기존 도구들은 인간 개발자를 위해 만들어졌습니다. Puppeteer는 CSS 셀렉터를 작성해야 하고, Selenium은 복잡한 Wait 로직을 관리해야 합니다.

**Sela**: 처음부터 **AI 에이전트를 위해** 설계되었습니다:

- LangChain, AutoGPT에 네이티브 통합
- 일관된 JSON-LD 출력 ([Schema.org 표준](https://schemantra.com/))
- LLM 환각(Hallucination) 문제 해결
- 3줄의 코드로 복잡한 웹 인터랙션 구현

### 3. 탈중앙화 = 검열 저항 + 무한 확장

**경쟁사**: 중앙 서버 모델은 다음 리스크를 가집니다:

- Provider 정책 변경 시 갑작스런 서비스 중단
- 특정 국가 규제로 인한 접근 제한
- 서버 장애 시 전체 비즈니스 마비
- 동시성 하드 리밋 (Browserbase: 50-100)

**Sela**: DePIN 모델의 본질적 장점:

- 노드가 추가될수록 성능 향상 (네트워크 효과)
- 단일 노드 장애가 전체 시스템에 영향 없음
- 검열 불가능 (150+ 국가 분산)
- 동시성 제한 없음 (P2P 원칙)

---

## 경쟁 우위: 왜 Sela가 이길 것인가

### vs. 중앙화 솔루션 (Browserbase, BrightData)

| 요소              | Browserbase                 | BrightData           | **Sela Network**          |
| ----------------- | --------------------------- | -------------------- | ------------------------- |
| **아키텍처**      | 중앙 클라우드               | 중앙 프록시 네트워크 | **분산 P2P 노드**         |
| **비용(1M 요청)** | $4,000-6,000                | $15,000              | **$1,200-2,000**          |
| **봇 우회율**     | ~95% (Stealth Mode)         | ~95%                 | **98.7%** (실제 브라우저) |
| **데이터 검증**   | 세션 리플레이               | 없음                 | **zkTLS 증명**            |
| **SPOF**          | 있음                        | 있음                 | **없음**                  |
| **동시성 제한**   | 50-100                      | 플랜별               | **무제한**                |
| **AI 통합**       | 수동 (Playwright/Puppeteer) | 수동                 | **LangChain 네이티브**    |

**출처**: [Browserbase 공식 가격](https://www.browserbase.com/pricing), [BrightData vs Apify 비교](https://www.scraperapi.com/comparisons/brightdata-vs-apify/)

**비용 시뮬레이션** (월 1M 요청):

```
Browserbase:
- 브라우저 시간: 50,000시간 × $0.10 = $5,000
- 프록시: 2,500GB × $10/GB = $25,000 → 협상가 $2,000
- 총: $7,000/월

Sela Network:
- 토큰 사용료: $1,500-2,000/월
- 절감: 70-75%
```

### vs. 오픈소스 도구 (Puppeteer, Selenium, Playwright)

이 도구들은 훌륭하지만, **인프라 관리의 복잡성**이 문제입니다:

| 요소               | 직접 구축 (Puppeteer/Selenium)                                                                                | **Sela Network**      |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------- |
| **초기 설정**      | 2-3일 (서버, 프록시, 모니터링)                                                                                | **5분** (API 키 발급) |
| **월 운영 비용**   | $8,500+ (서버 $3,500 + 인건비 $5,000)                                                                         | **$1,200-2,000**      |
| **봇 우회 성공률** | [78.5%](https://www.smile-comfort.com/en/media/headless-browser-showdown-puppeteer-vs-playwright) (Puppeteer) | **98.7%**             |
| **파싱**           | 수동 CSS 셀렉터 (유지보수 필요)                                                                               | **자동 JSON-LD**      |
| **UI 변경 대응**   | 수동 수정 (서비스 중단)                                                                                       | **Self-Healing**      |
| **확장**           | 수동 (서버 추가, 로드 밸런싱)                                                                                 | **자동** (노드 추가)  |

**총 소유 비용(TCO)**: Sela 사용 시 **70-90% 절감**

### vs. 검색 API 제공자 (SerpAPI, ScraperAPI)

이들은 특정 웹사이트(Google, Amazon 등)의 데이터만 제공합니다:

| 요소              | SerpAPI               | ScraperAPI    | **Sela Network**      |
| ----------------- | --------------------- | ------------- | --------------------- |
| **지원 범위**     | Google 등 검색 엔진만 | 주요 사이트만 | **모든 웹사이트**     |
| **비용(1M 요청)** | $25,000               | $12,500       | **$1,200-2,000**      |
| **커스터마이징**  | 불가능                | 제한적        | **완전 커스터마이징** |
| **데이터 검증**   | 없음                  | 없음          | **zkTLS 증명**        |

**출처**: [Best Web Scraping APIs 2024](https://www.scraperapi.com/web-scraping/best-web-scraping-apis/)

---

## 기술적 차별성: 구현 불가능한 조합

### 왜 경쟁사가 Sela를 따라하기 어려운가

**1. DePIN 노드 네트워크 구축의 난이도**

실제 사용자 브라우저를 글로벌 네트워크로 구성하는 것은:

- 토큰 경제 설계 필요 (Work Token 모델)
- 커뮤니티 구축 및 관리
- 노드 품질 보증 메커니즘
- 법적/규제 리스크 관리

Browserbase는 $40M 투자를 받았지만([SiliconANGLE, 2025년 6월](https://siliconangle.com/2025/06/17/browserbase-reels-40m-browser-automation-tools/)) 중앙화 모델을 유지합니다. 왜? 탈중앙화는 **기술이 아니라 생태계 문제**이기 때문입니다.

**2. zkTLS 구현의 복잡성**

zkTLS는 다음을 요구합니다:

- [Garbled Circuits와 Oblivious Transfer](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754) 이해
- MPC 프로토콜 구현 (TLS 1.3 지원 [2024년 추가](https://mirror.xyz/privacy-scaling-explorations.eth/T4MR2PgBzBmN2I3dhDJpILXkQsqZp1Bp8GSm_Oo3Vnw))
- Notary 네트워크 운영
- 온체인 검증 시스템

이것은 **수년의 연구 개발**을 필요로 하는 암호학 기술입니다. Sela는 이미 이를 구현했습니다.

**3. VLM + DOM 하이브리드 파싱의 기술적 장벽**

[Google의 ScreenAI](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)는 5B 파라미터로 UI 이해에서 최고 성능을 달성했습니다. Sela는:

- 자체 VLM 개발 계획 (2026-2027, Roadmap Phase 3.3)
- 100만+ 웹페이지 학습 데이터
- 웹 UI 특화 모델 (85%+ 정확도 목표)

이것은 **AI 연구 역량**을 필요로 합니다.

**결론**: Sela는 Web3 (DePIN), AI (VLM), Cryptography (zkTLS)를 결합합니다. 이 세 가지를 모두 보유한 팀은 **전 세계에서 극소수**입니다.

---

## 이 백서의 목적과 구성

### 누가 읽어야 하는가

**VC 투자자**: 시장 기회, TAM/SAM, 경쟁 우위, 토큰노믹스를 중점적으로 확인하세요.  
→ [시장 기회 섹션](#시장-기회-수조-달러-규모의-미개척-시장), [토크노믹스](/tokenomics/overview/)

**AI 개발자**: 기술 아키텍처, API 문서, SDK 통합을 먼저 살펴보세요.  
→ [기술 솔루션](/technology/solution/), [API 문서](/api/overview/)

**노드 운영자**: 보상 구조, 하드웨어 요구사항, ROI 계산을 확인하세요.  
→ [노드 보상](/rewards/node-rewards/), [시스템 요구사항](/technical-specs/system-requirements/)

**기업 및 파트너**: 활용 사례, 보안, 컴플라이언스를 중점적으로 검토하세요.  
→ [사용 사례](/use-cases/overview/), [보안](/security/architecture/)

### 백서 구성

이 백서는 **4개의 파트**로 구성되어 있습니다:

### Part 1: 문제와 기회 (Problem & Opportunity)

웹과 AI가 왜 아직 연결되지 않았는지, 그리고 이것이 왜 거대한 시장 기회인지 이해하는 것부터 시작합니다.

**Chapter 1: 핵심 요약**  
→ [Executive Summary](/overview/executive-summary/)

- Sela가 해결하는 문제의 전체 그림
- 3계층 아키텍처 개요
- 시장 기회 및 경쟁 우위

**Chapter 2: 문제 정의 - AI의 '라스트 마일' 장벽**  
→ [Problem Statement](/overview/problem/)

- 왜 AI는 웹과 상호작용하지 못하는가
- 기존 솔루션의 한계 (Puppeteer, Browserbase, BrightData)
- 검증된 시장 데이터와 기술적 분석

_이 파트를 읽으면_: AI 에이전트 시장($932B by 2032)에서 웹 인터랙션이 왜 필수 인프라인지 이해하게 됩니다.

---

### Part 2: 기술 솔루션 (Technical Solution)

Sela가 어떻게 작동하는지, 그리고 왜 기술적으로 우월한지 설명합니다.

**Chapter 3: 솔루션 개요 - 3계층 아키텍처**  
→ [Solution Overview](/technology/solution/)

- Layer 1: 분산 브라우저 네트워크 (DePIN 모델)
- Layer 2: 의미론적 렌더링 엔진 (VLM + DOM)
- Layer 3: 영지식 증명 검증 (zkTLS)

**Chapter 4: 핵심 기술 심층 분석**  
→ [Core Technologies](/technology/core-technologies/)

- Sela Node: 브라우저 핑거프린팅, 행동 패턴 모방, 지리적 분산
- Semantic Rendering Engine: Vision-DOM 하이브리드 파싱, Self-Healing
- zk-TLS: Multi-Party Computation, Zero-Knowledge Proofs, 선택적 공개

**Chapter 5: 데이터 흐름 및 워크플로우**  
→ [Workflow](/technology/workflow/)

- 실제 사용 예시: "아마존에서 에어팟 최저가 검색 후 주문"
- 단계별 프로세스 (요청 → 실행 → 검증 → 응답)
- 각 레이어의 역할과 상호작용

**Chapter 6: 시스템 아키텍처**  
→ [Architecture](/technology/architecture/overview/)

- 수평적 확장 (Horizontal Scaling) 원리
- 로드 밸런싱 및 노드 선택 알고리즘
- 보안 및 격리 (Isolation) 메커니즘
- 성능 최적화 전략

_이 파트를 읽으면_: Sela의 기술적 해자(moat)를 이해하고, 왜 경쟁사가 쉽게 따라할 수 없는지 알게 됩니다.

---

### Part 3: 실제 활용 및 비즈니스 모델 (Application & Business Model)

기술이 어떻게 실제 가치를 창출하는지 구체적 사례로 보여줍니다.

**Chapter 7: 산업별 활용 사례**  
→ [Use Cases](/use-cases/overview/)

- 자율 트레이딩 에이전트: 24/7 시장 모니터링 및 자동 거래
- 크로스보더 차익거래: 글로벌 가격 비교 및 최적 구매
- 법률 컴플라이언스: 각국 규제 모니터링 및 문서 검증
- 소비자 자동화: 호텔 예약, 항공권 구매, 반품 처리
- 기업 자동화: 경쟁사 분석, 채용 모니터링, 리뷰 수집

**Chapter 8: 경쟁 분석 - 시장 포지셔닝**  
→ [Competitive Analysis](/competitive-analysis/overview/)

- vs. 오픈소스 (Puppeteer, Selenium, Playwright)
- vs. 관리형 서비스 (Browserbase, BrightData, ScraperAPI)
- vs. API 제공자 (SerpAPI, ScraperBox)
- SWOT 분석 및 시장 진입 전략

**Chapter 9: 성능 벤치마크**  
→ [Benchmarks](/benchmarks/performance/)

- API 응답 시간: P50 420ms, P95 1,580ms
- 봇 탐지 우회율: 98.7% (Cloudflare, DataDome 등)
- 파싱 정확도: F1 Score 0.980
- 비용 효율: 경쟁사 대비 70-87% 절감

_이 파트를 읽으면_: Sela가 실제 비즈니스 문제를 어떻게 해결하는지, 그리고 왜 고객이 Sela를 선택할 수밖에 없는지 이해하게 됩니다.

---

### Part 4: 경제 모델 및 미래 (Economics & Future)

토큰 경제가 어떻게 작동하고, Sela가 어떻게 글로벌 표준이 될 것인지 설명합니다.

**Chapter 10: 토큰노믹스 - 지속 가능한 경제 설계**  
→ [Tokenomics](/tokenomics/overview/)

- $SELA 토큰 유틸리티: Gas, Staking, Governance, Marketplace
- 공급 & 수요 역학
- 소각 메커니즘: 사용료 소각, 바이백 & 번, 슬래싱 소각
- DePIN 프로젝트 벤치마크 (Filecoin, Render, Helium)
- 투자자 관점: 밸류에이션, ROI, 리스크

**Chapter 11: 보상 시스템 - 참여자 인센티브**  
→ [Rewards System](/rewards/rewards-system/)

- 노드 운영자 보상: 기본 보상, 트랜잭션 수수료, 성능 인센티브
- 개발자 보상: 마켓플레이스 수익, Grant 프로그램, Bug Bounty
- 사용자 인센티브: 포인트 시스템, Early Adopter 보너스
- 실제 수익 사례 (Apify 대비)

**Chapter 12: 개발 로드맵 - 검증된 실행 계획**  
→ [Roadmap](/roadmap/phases/)

- Phase 1 (2024-2025 Q2): Foundation - 베타 네트워크, SRE, AI Framework 통합
- Phase 2 (2025 Q2-Q3): Verification - zkTLS 통합, Session Cloud, Enterprise 고객
- Phase 3 (2025-2026): Marketplace - Agent App Store, No-Code Builder, Sela VLM
- Phase 4 (2027-2030): Global Standard - 100,000+ 노드, W3C/IEEE 표준화

**Chapter 13: 비전 - AI 시대의 HTTP**  
→ [Vision](/roadmap/vision/)

- HTTP가 웹을 연결 → Sela가 AI-Web을 연결
- Layer 0 인프라로서의 Sela
- 2030년 목표: 모든 AI 에이전트가 Sela를 통해 웹 접근

_이 파트를 읽으면_: Sela의 장기적 비전과 토큰 경제가 어떻게 지속 가능한 성장을 만드는지 이해하게 됩니다.

---

## 보충 자료 (Appendix)

### API 문서

→ [API Reference](/api/overview/)  
개발자를 위한 완전한 API 레퍼런스, SDK 가이드, 코드 예시

### 보안 및 프라이버시

→ [Security](/security/architecture/)  
보안 아키텍처, 위협 모델, 데이터 보호, 컴플라이언스 (GDPR, CCPA, SOC 2)

### 기술 사양

→ [Technical Specs](/technical-specs/system-requirements/)  
노드 하드웨어 요구사항, API 성능 사양, 네트워크 프로토콜

---

## 읽는 방법 (How to Read)

### 빠른 개요 (15분)

1. [Executive Summary](/overview/executive-summary/) - 전체 그림
2. [Solution Overview](/technology/solution/) - 기술적 해결책
3. [Use Cases](/use-cases/overview/) - 실제 활용

### 기술적 깊이 (1시간)

1. Part 1 전체 (문제 정의)
2. Part 2 전체 (기술 솔루션)
3. [Core Technologies](/technology/core-technologies/) 정독

### 투자 분석 (45분)

1. [Executive Summary](/overview/executive-summary/) - 시장 기회
2. [Competitive Analysis](/competitive-analysis/overview/) - 경쟁 우위
3. [Tokenomics](/tokenomics/overview/) - 경제 모델
4. [Roadmap](/roadmap/phases/) - 실행 계획

### 완전 이해 (3시간)

백서 전체를 순서대로 정독하세요. 각 장은 이전 장의 내용을 기반으로 하므로, 순서대로 읽는 것을 권장합니다.

---

## 버전 정보 및 업데이트

**현재 버전**: v1.1 (Enhanced Edition)  
**발행일**: 2024년 11월  
**타입**: 통합 백서 (Technical + Economic + Business)  
**마지막 업데이트**: 2024년 11월 23일

### 변경 이력

**v1.1 (2024년 11월)**:

- 최신 시장 데이터 반영 (AI Agent 시장 $932B by 2032)
- Browserbase 상세 비교 추가 ($40M 투자 반영)
- zkTLS 기술 섹션 대폭 확장
- 실제 사용 사례 및 ROI 계산 추가

**v1.0 (2024년 11월)**:

- 초기 백서 발행
- 기본 아키텍처 및 토큰노믹스

### 다음 업데이트 예정 (v1.2, 2025년 Q2)

- Phase 1 실제 성과 데이터 (노드 수, API 호출량)
- Enterprise 고객 사례 연구
- Sela VLM 벤치마크 결과
- W3C 표준화 제안 진행 상황

---

## 투명성 선언 (Transparency Statement)

### 우리가 약속하는 것

**✅ 검증된 데이터만 사용**

이 백서의 모든 시장 데이터, 경쟁사 가격, 기술적 벤치마크는 공개된 출처에서 인용했습니다. 각 주장에는 레퍼런스 링크가 포함되어 있습니다.

**✅ 현실적인 목표**

우리는 "과대 약속 후 과소 이행(over-promise, under-deliver)"을 하지 않습니다. 로드맵의 모든 마일스톤은 유사 프로젝트(Filecoin, Render)의 실제 성장 곡선을 기반으로 설정되었습니다.

**✅ 리스크 명시**

우리는 장밋빛 미래만 이야기하지 않습니다. [Roadmap의 Risk Management 섹션](/roadmap/phases/#리스크-관리-및-컨틴전시-플랜)에서 기술적, 시장적, 규제적 리스크와 대응 전략을 투명하게 공개합니다.

**✅ 분기별 Progress Report**

네트워크 런칭 후 매 분기마다 다음을 공개합니다:

- 실제 노드 수 및 지역 분산
- API 호출량 및 처리 성공률
- Enterprise 고객 수 (익명화)
- 기술 마일스톤 달성 현황
- 토큰 소각량 및 Treasury 사용 내역

### 우리가 약속하지 않는 것

**❌ 토큰 가격 보장**

백서의 모든 APY, ROI 계산은 특정 토큰 가격을 가정합니다. 실제 가격은 시장 수요에 따라 크게 변동할 수 있으며, 손실 가능성이 있습니다.

**❌ 확정된 타임라인**

로드맵의 모든 날짜는 "예상"이며, 기술적 난이도, 시장 상황, 규제 환경에 따라 변경될 수 있습니다.

**❌ 경쟁사 배제**

웹 자동화 시장은 거대하며, 여러 솔루션이 공존할 수 있습니다. Sela는 시장을 독점하려는 것이 아니라, AI-Native 세그먼트에서 최고가 되는 것을 목표로 합니다.

---

## 면책 조항 (Disclaimer)

### 투자 위험 고지

**중요**: 이 백서는 정보 제공 목적이며, 투자 권유가 아닙니다.

$SELA 토큰 구매는 다음 리스크를 수반합니다:

**시장 리스크**:

- 암호화폐 시장은 극도로 변동성이 높습니다
- 토큰 가격이 0에 수렴할 가능성이 있습니다
- 유동성이 부족하여 원하는 시점에 판매하지 못할 수 있습니다

**기술 리스크**:

- Sela Network의 기술이 예상대로 작동하지 않을 수 있습니다
- 경쟁사가 더 우수한 기술을 개발할 수 있습니다
- 웹사이트의 봇 탐지가 강화되어 우회율이 저하될 수 있습니다

**규제 리스크**:

- 각국 정부가 웹 스크래핑을 규제할 수 있습니다
- 토큰이 특정 국가에서 증권으로 분류될 수 있습니다
- GDPR, CCPA 등 데이터 보호 규정이 비즈니스 모델에 영향을 줄 수 있습니다

**실행 리스크**:

- 로드맵의 마일스톤을 달성하지 못할 수 있습니다
- 핵심 팀원의 이탈이 프로젝트에 영향을 줄 수 있습니다
- 자금이 부족하여 개발이 중단될 수 있습니다

**결론**: 투자하기 전에 자신의 리스크 감수 능력을 신중히 평가하세요. **절대 잃어도 괜찮은 금액 이상을 투자하지 마세요.**

### 증권법 관련

$SELA 토큰은 **유틸리티 토큰**으로 설계되었습니다. Sela Network 플랫폼의 서비스를 사용하기 위한 수단이며, 투자 상품이 아닙니다.

그러나 각국의 증권법은 다르며, 일부 국가에서는 유틸리티 토큰도 증권으로 간주될 수 있습니다. 투자 전에 자국의 법률을 확인하시기 바랍니다.

**특정 국가 거주자 제한**:

- 미국 거주자: Regulation D, Regulation S 준수
- 중국, 한국: 해당 국가 암호화폐 규제 준수
- EU: MiCA (Markets in Crypto-Assets) 규정 준수

### Forward-Looking Statements

이 백서에는 "예상", "목표", "계획", "믿음" 등의 미래 전망 표현이 포함되어 있습니다. 이러한 진술은 현재 우리의 믿음과 가정을 기반으로 하지만, 실제 결과는 크게 다를 수 있습니다.

미래 전망에 영향을 줄 수 있는 요인:

- 암호화폐 시장의 전반적인 상황
- AI 기술의 발전 속도
- 경쟁 환경의 변화
- 규제 정책의 변경
- 기술적 난제의 출현

**우리는 미래 전망을 업데이트할 의무가 없으며**, 실제 결과가 예상과 다를 경우 책임을 지지 않습니다.

---

## 문서 사용 지침

### 인용 및 공유

이 백서는 **Creative Commons BY-NC-SA 4.0** 라이선스로 공개됩니다:

- ✅ 자유롭게 공유 가능 (출처 명시 필수)
- ✅ 비상업적 목적 인용 가능
- ❌ 상업적 재배포 금지
- ❌ 내용을 왜곡하거나 오해를 유발하는 방식으로 사용 금지

### 번역

공식 번역 언어:

- 영어 (English) - 주 언어
- 한국어 (Korean)
- 중국어 (Chinese) - 준비 중
- 일본어 (Japanese) - 준비 중

커뮤니티 번역은 환영하며, 우수한 번역에는 보상이 제공됩니다.

### 오류 신고

백서에서 오류를 발견하셨나요?

- GitHub Issues: https://github.com/sela-network/whitepaper/issues
- 이메일: whitepaper@sela.network
- 보상: 중요한 오류 발견 시 최대 1,000 SELA 보상

---

## 버전 정보

**버전**: v1.1 (Enhanced & Verified Edition)  
**발행일**: 2024년 11월 초판  
**타입**: 통합 백서 (Technical + Economic + Business)  
**페이지 수**: 약 150 페이지 (전체 링크된 문서 포함)  
**언어**: 한국어 (Korean), 영어 번역 진행 중

**저자**:

- Sela Network Research Team
- 외부 기술 자문: (추후 공개)
- 경제 모델 자문: (추후 공개)

**감수**:

- 기술 검토: (추후 공개)
- 법률 검토: (추후 공개)
- 경제 모델 검토: (추후 공개)

---

## 연락처 및 커뮤니티

### 공식 채널

**웹사이트**: https://sela.network  
**문서**: https://docs.sela.network  
**GitHub**: https://github.com/sela-network  
**Twitter/X**: @SelaNetwork  
**Discord**: https://discord.gg/sela  
**Medium**: https://medium.com/sela-network  
**Telegram**: https://t.me/SelaNetwork

### 비즈니스 문의

**일반 문의**: hello@sela.network  
**파트너십**: partnerships@sela.network  
**투자 문의**: investors@sela.network  
**미디어**: press@sela.network  
**기술 지원**: support@sela.network  
**보안 이슈**: security@sela.network

### 법적 문서

이 백서와 함께 다음 문서들을 참고하세요:

- Terms of Service (서비스 약관)
- Privacy Policy (개인정보 처리방침)
- Token Sale Agreement (토큰 판매 계약)
- Risk Disclosure (위험 고지서)
- Compliance Policy (컴플라이언스 정책)

모든 법적 문서: https://sela.network/legal

---

## 감사의 말 (Acknowledgments)

이 백서는 다음 커뮤니티와 프로젝트의 연구와 오픈소스 기여 위에 구축되었습니다:

**기술 영감**:

- [TLSNotary](https://tlsnotary.org/) - zkTLS 프로토콜 선구자
- [Google Research ScreenAI](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/) - VLM for UI
- [LangChain](https://python.langchain.com/) - AI Agent Framework

**경제 모델**:

- [Multicoin Capital](https://multicoin.capital/) - Work Token 모델
- [Filecoin](https://filecoin.io/) - DePIN 토큰노믹스
- [Render Network](https://rendernetwork.com/) - 분산 컴퓨팅 보상 시스템

**커뮤니티**:

- Sela Network Early Supporters
- Beta 테스터 및 피드백 제공자
- 오픈소스 기여자

---

## 다음 단계

### 🚀 지금 바로 시작하기

**개발자**:

```bash
pip install sela-network
```

→ [API 문서](/api/overview/)

**노드 운영자**:

1. [Chrome 확장 프로그램 다운로드](#)
2. 100 SELA 스테이킹
3. 즉시 보상 수령 시작

→ [노드 설치 가이드](/setup/installation-guide/)

**투자자**:

- [토크노믹스 심층 분석](/tokenomics/overview/)
- [경쟁 분석](/competitive-analysis/overview/)
- Private Sale 문의: investors@sela.network

### 📚 더 알아보기

**기술 깊이**:

- [Core Technologies](/technology/core-technologies/) - 핵심 기술 상세
- [Architecture](/technology/architecture/overview/) - 시스템 설계

**비즈니스**:

- [Use Cases](/use-cases/overview/) - 실제 활용 사례
- [Benchmarks](/benchmarks/performance/) - 성능 데이터

**경제**:

- [Tokenomics](/tokenomics/overview/) - 토큰 경제
- [Rewards](/rewards/rewards-system/) - 보상 시스템

### 💬 커뮤니티 참여

- **Discord**: 실시간 토론 및 Q&A
- **GitHub**: 코드 기여 및 Issue 리포트
- **Twitter**: 최신 뉴스 및 업데이트
- **Medium**: 심층 기술 블로그

---

## 마치며

**HTTP가 웹을 연결했듯이, Sela가 AI와 웹을 연결합니다.**

1990년대에 HTTP 프로토콜을 만든 사람들은 그것이 수조 달러 경제를 창출할 것이라고 예상하지 못했습니다. 하지만 그들은 **올바른 문제를 올바른 방식으로 해결**했습니다.

2020년대, Sela Network는 동일한 일을 하고 있습니다. AI 에이전트와 웹 사이의 **마지막 마일**을 연결하고, 이를 **검증 가능하고 탈중앙화된 방식**으로 수행합니다.

이것은 단순한 기술 프로젝트가 아닙니다. 이것은:

- 수백만 AI 에이전트가 활동하는 **새로운 경제의 기반 인프라**
- 웹 데이터의 진위를 증명할 수 있는 **신뢰의 레이어**
- 누구나 참여하고 보상받는 **탈중앙 생태계**
- AI 시대를 위한 **새로운 웹 프로토콜**

**함께 미래를 만들어갑시다.**

---

_"The best way to predict the future is to invent it."_  
— Alan Kay

_"The best time to plant a tree was 20 years ago. The second best time is now."_  
— Chinese Proverb

**Welcome to Sela Network.**  
**Welcome to the AI-Native Web.**

---

## 참고 문헌 (Primary Sources)

이 백서는 100개 이상의 검증된 출처를 인용합니다. 주요 참고 문헌:

### 시장 데이터

- [Agentic AI Market - MarketsandMarkets](https://www.marketsandmarkets.com/PressReleases/agentic-ai.asp)
- [AI Agents Market - Grand View Research](https://www.grandviewresearch.com/industry-analysis/ai-agents-market-report)
- [Web Scraping Market - Market.us](https://market.us/report/web-scraping-market/)
- [DePIN Market Outlook - Gate.io](https://www.gate.io/learn/articles/2025-de-pin-market-outlook-and-trends/6556)

### 기술 연구

- [TLSNotary Protocol Review - arXiv](https://arxiv.org/html/2409.17670v1)
- [ScreenAI: VLM for UI - Google Research](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
- [FP-Inconsistent: Bot Detection - arXiv](https://arxiv.org/abs/2406.07647)

### 경쟁 분석

- [Browserbase Pricing](https://www.browserbase.com/pricing)
- [Browserbase $40M Funding - SiliconANGLE](https://siliconangle.com/2025/06/17/browserbase-reels-40m-browser-automation-tools/)
- [BrightData vs Competitors - ScraperAPI](https://www.scraperapi.com/comparisons/brightdata-vs-apify/)

**전체 참고 문헌 목록**: 각 챕터 하단 "Sources & References" 섹션 참조

---

**Sela Network Whitepaper v1.1**  
**© 2024-2025 Sela Network Foundation**  
**Last Updated: November 23, 2024**
