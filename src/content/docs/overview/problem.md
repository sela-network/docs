---
title: 문제 정의
description: AI 에이전트가 직면한 마지막 장벽
---

## AI 에이전트의 '라스트 마일 문제'

AI 에이전트 시장은 연 40% 이상 성장하고 있지만, 여전히 '마지막 단계'에서 멈춰 있습니다.

### 현재 AI 에이전트의 능력

| 단계                 | 현재 상태  |
| -------------------- | ---------- |
| 정보 검색            | **가능**   |
| 정보 요약            | **가능**   |
| 의사결정             | **가능**   |
| **웹에서 실제 행동** | **불가능** |

## 핵심 문제점

### 1. 구조적 실명 (Structural Blindness)

웹은 HTML/CSS 기반 시각 구조로 설계되었지만, AI는 JSON/Schema 기반 데이터를 필요로 합니다.

**문제점:**

- LLM 기반 DOM 해석은 느리고 비일관적
- 환각(Hallucination) 발생
- 매번 다른 출력 스키마로 인한 불안정성

### 2. 인터랙션 능력 부족

현대 웹의 복잡한 UI 요소들은 AI 에이전트에게 극복하기 어려운 장벽입니다:

- **로그인 시스템**: 복잡한 인증 과정
- **2FA (이중 인증)**: 추가 보안 단계
- **동적 UI**: JavaScript 기반 동적 콘텐츠
- **무한 스크롤**: 끝없는 페이지 로딩
- **봇 탐지**: 강력한 봇 차단 시스템

### 3. 중앙화된 웹 API 독과점

현재 웹 스크래핑 시장은 소수의 업체에게 집중되어 있습니다.

**결과:**

- 비용 폭증
- 검열 위험
- 단일 장애점(SPOF) 위험

## 기술적 현실

### 기존 솔루션의 한계

#### 1. Puppeteer/Selenium 기반 솔루션의 근본적 취약점

전통적인 헤드리스 브라우저 자동화 도구는 최신 봇 탐지 시스템에 대응하지 못하고 있습니다.

**탐지 메커니즘:**

[Castle.io의 안티-디텍트 프레임워크 분석](https://blog.castle.io/from-puppeteer-stealth-to-nodriver-how-anti-detect-frameworks-evolved-to-evade-bot-detection/)과 [ZenRows의 Puppeteer 탐지 회피 연구](https://www.zenrows.com/blog/puppeteer-avoid-detection)에 따르면, 봇 탐지는 다음 세 가지 주요 기술로 이루어집니다:

1. **User Agent 탐지**: 수정되지 않은 헤드리스 Chrome은 명백한 "HeadlessChrome" User Agent를 전송
2. **Navigator 속성 분석**: `navigator.webdriver` 플래그, 누락된 브라우저 기능, Canvas/WebGL 핑거프린트 불일치
3. **CDP 탐지**: Chrome DevTools Protocol 사용을 탐지하는 새로운 기술

**우회 성공률:**

[BrightData의 2025 Puppeteer 안티-봇 가이드](https://brightdata.com/blog/web-data/puppeteer-real-browser)에 따르면, 전통적인 Puppeteer Stealth 플러그인은 더 이상 효과적이지 않으며, 차세대 프레임워크(nodriver, selenium-driverless)도 **완벽한 우회를 보장하지 못합니다**. [Bot Detection Tests](https://bot.incolumitas.com/)에서는 다양한 탐지 테스트를 통해 대부분의 자동화 도구가 여전히 식별 가능함을 보여줍니다.

**확장성 문제:**

중앙화된 헤드리스 브라우저 서비스(Browserbase, Browserless)는:

- 동시성 제한 (Startup 플랜: 50 세션)
- 높은 비용 ($0.10/브라우저 시간)
- 단일 장애점(SPOF) 위험

#### 2. LLM 기반 HTML→JSON 변환의 불안정성

AI를 활용한 웹 파싱은 비용과 일관성 문제로 실용성이 제한됩니다.

**스키마 불일치 문제:**

[OpenAI의 Structured Outputs 발표](https://openai.com/index/introducing-structured-outputs-in-the-api/)에 따르면, 초기 GPT-4 모델은 JSON 스키마 준수율이 **40% 미만**이었습니다. [Workflow.ing의 ChatGPT HTML→JSON 변환 연구](https://workflow.ing/blog/articles/prompting-chat-gpt-to-generate-json-from-html)는 매 요청마다 다른 구조의 JSON을 생성하는 문제를 지적합니다.

[arXiv의 LLM 스키마 준수 연구](https://arxiv.org/html/2502.14905v1)에서는 최첨단 모델도 형식 지시를 일관되게 따르지 못하며, 작업 복잡도에 따라 **성공률이 0%에서 100%까지 변동**한다고 보고했습니다.

**비용 구조:**

[LiteLLM의 Structured Outputs 문서](https://docs.litellm.ai/docs/completion/json_mode)에 따르면:

- GPT-4o (2024-08-06): $2.50/1M 입력 토큰, $10.00/1M 출력 토큰
- 평균 웹페이지 (50KB HTML): 약 12,000 토큰 소비
- 페이지당 비용: 약 **$0.03 ~ $0.15**
- 대규모 스크래핑 시 월 수천 달러 비용 발생

**처리 시간:**

복잡한 HTML 구조 파싱 시 평균 **5-15초** 소요, 실시간 응답이 필요한 AI 에이전트에게는 치명적 지연

#### 3. 데이터 검증 불가능의 심각성

현재 웹 스크래핑 솔루션은 데이터 출처를 증명할 방법이 없습니다.

**검증 부재의 결과:**

[Blockchain Today의 데이터 검증 분석](https://blockchain-today.medium.com/unlocking-the-truth-exploring-data-verification-in-the-blockchain-ecosystem-45c30c68b90c)과 [Dock.io의 블록체인 검증 가이드](https://www.dock.io/post/blockchain-verification)에 따르면, 전통적인 웹 데이터는:

- **출처 증명 불가**: 데이터가 실제 서버에서 왔는지 확인 불가능
- **변조 탐지 불가**: 중간자 공격이나 데이터 조작 여부를 검증할 수 없음
- **타임스탬프 신뢰 불가**: 데이터 수집 시점을 암호학적으로 증명할 수 없음

**실제 영향:**

- **금융**: AI가 수집한 주가 정보의 진위를 법적으로 증명 불가
- **의료**: 임상 데이터 출처를 감사 기관에 입증 불가
- **법률**: 디지털 증거로서의 법적 효력 없음
- **컴플라이언스**: 규제 보고서에 활용 제한

[IBM의 블록체인 위조 방지 솔루션](https://www.ibm.com/think/topics/blockchain-for-anti-counterfeit)과 [Alibaba Cloud의 문서 진위 보장 기술](https://www.alibabacloud.com/blog/how-to-use-blockchain-to-ensure-the-authenticity-of-documents_599875)은 블록체인 기반 검증의 필요성을 강조하지만, 웹 데이터에 적용된 사례는 극히 드뭅니다.

#### 4. 중앙화된 시장 구조의 문제

**과점 가격 책정:**

[ScraperAPI의 웹 스크래핑 가격 가이드](https://www.scraperapi.com/blog/web-scraping-pricing-and-choosing-the-right-solution/)와 [BrightData 가격 정책](https://brightdata.com/pricing/web-scraper)에 따르면:

- **BrightData**: 월 $499 (Growth), $999 (Business)
- **Oxylabs**: 엔터프라이즈급 가격 (월 수천 달러)
- **ScraperAPI**: 비교적 저렴하지만 여전히 성공 요청당 과금

[Apify의 BrightData vs Oxylabs 비교](https://blog.apify.com/oxylabs-vs-bright-data/)는 두 주요 업체가 "고가 프리미엄 기능"으로 시장을 지배한다고 분석합니다.

**비용 사례:**

[ScraperAPI의 BrightData 대안 분석](https://www.scraperapi.com/blog/brightdata-alternatives-for-amazon-scraping/)에 따르면, BrightData 대신 ScraperAPI를 사용하면 Amazon 스크래핑에서 **연간 최대 $70,000 절약** 가능 - 이는 중앙화된 서비스의 비용 구조가 얼마나 비효율적인지를 보여줍니다.

**종속 위험:**

- Provider 정책 변경 시 갑작스런 서비스 차단
- 단일 업체 장애 시 전체 비즈니스 중단
- 가격 인상에 대한 협상력 부재

## 기회: 수백억 달러 규모의 시장

이러한 문제들은 곧 **거대한 시장 기회**를 의미합니다.

### AI 에이전트 시장의 폭발적 성장

[MarketsandMarkets의 AI 에이전트 시장 보고서](https://www.marketsandmarkets.com/PressReleases/ai-agents.asp)와 [Grand View Research의 산업 분석](https://www.grandviewresearch.com/industry-analysis/ai-agents-market-report)에 따르면:

**시장 규모 전망:**

- **2024년**: $5.4B (54억 달러)
- **2025년**: $7.84B (78.4억 달러)
- **2030년**: $50.31B ~ $52.62B (503억 ~ 526억 달러)
- **CAGR**: 45.8% ~ 46.3% (2025-2030)

### Sela의 TAM (Total Addressable Market)

AI 에이전트가 웹과 상호작용하려면 반드시 Sela와 같은 인프라를 거쳐야 합니다. [MarkNtel Advisors의 시장 전망](https://finance.yahoo.com/news/ai-agent-market-forecast-reach-135600682.html)은 북미 시장이 전체의 40%를 차지한다고 분석합니다.

**Sela의 시장 기회:**

- AI 에이전트 시장의 **15-25%** = 웹 인터랙션 인프라 수요
- 2030년 예상 TAM: **$7.5B ~ $13.2B** (75억 ~ 132억 달러)
- 연간 성장률 **40%+ 지속**

### 더 큰 맥락: 조 단위 AI 경제

[StartupHub.AI의 AI 에이전트 보안 분석](https://www.startuphub.ai/ai-news/market-research/2025/ai-agents-unleashed-the-trillion-dollar-race-for-security/)과 [Warmly.ai의 AI 에이전트 통계](https://www.warmly.ai/p/blog/ai-agents-statistics)에 따르면:

- **B2B 경제 전환**: 향후 10년간 **$25조 규모**의 새로운 수익 흐름 생성
- **AI 인프라 투자**: 2030년까지 연간 **$4-5조** (Nvidia 전망)
- **자율 AI 에이전트 생태계**: 전체 경제 영향 **수조 달러 규모**

### 문제 해결 = 시장 잠금 해제

현재 AI 에이전트가 직면한 문제들:

1. **웹 접근 불가** → Sela의 분산 브라우저 네트워크로 해결
2. **데이터 구조화 실패** → Sela의 Semantic Rendering Engine으로 해결
3. **검증 불가능** → Sela의 zk-TLS 프로토콜로 해결
4. **중앙화 독점** → Sela의 탈중앙 아키텍처로 해결

### Web3와 AI의 완벽한 접점

Sela Network는 두 가지 메가트렌드가 만나는 지점에 위치합니다:

**Web3 인프라:**

- 탈중앙화된 노드 네트워크
- 토큰 이코노미로 지속 가능한 인센티브
- 검열 저항성과 탄력성

**AI 에이전트 경제:**

- GPT Store, Gemini Agent, Claude Agent의 핵심 인프라
- 85% 기업의 AI 에이전트 도입 (2025년 예상)
- 실제 웹 작업 수행 능력 제공

Sela Network는 이 모든 문제를 **탈중앙 인프라**와 **검증 가능한 프로토콜**로 해결하며, **AI 시대의 필수 레이어 0 인프라**가 됩니다.

---

## Sources & References

### AI Agent Market Statistics

- [MarketsandMarkets - AI Agents Market worth $52.62 billion by 2030](https://www.marketsandmarkets.com/PressReleases/ai-agents.asp)
- [PR Newswire - AI Agents Market Report](https://www.prnewswire.com/news-releases/ai-agents-market-worth-52-62-billion-by-2030---exclusive-report-by-marketsandmarkets-302435486.html)
- [Grand View Research - AI Agents Market Size & Trends](https://www.grandviewresearch.com/industry-analysis/ai-agents-market-report)
- [MarkNtel Advisors - AI Agent Market Forecast](https://finance.yahoo.com/news/ai-agent-market-forecast-reach-135600682.html)
- [StartupHub.AI - The Trillion-Dollar Race for Security](https://www.startuphub.ai/ai-news/market-research/2025/ai-agents-unleashed-the-trillion-dollar-race-for-security/)
- [Warmly.ai - 35+ Powerful AI Agents Statistics](https://www.warmly.ai/p/blog/ai-agents-statistics)

### Bot Detection & Security

- [DataDome - 2025 Global Bot Security Report](https://datadome.co/threat-research/key-findings-2025-global-bot-security-report/)
- [Castle.io - From Puppeteer Stealth to Nodriver](https://blog.castle.io/from-puppeteer-stealth-to-nodriver-how-anti-detect-frameworks-evolved-to-evade-bot-detection/)
- [BrightData - Puppeteer Real Browser Guide 2025](https://brightdata.com/blog/web-data/puppeteer-real-browser)
- [ZenRows - 6 Tricks to Avoid Detection With Puppeteer](https://www.zenrows.com/blog/puppeteer-avoid-detection)
- [Bot Detection Tests - Incolumitas](https://bot.incolumitas.com/)
- [DeviceAndBrowserInfo - Detecting Headless Chrome Puppeteer 2024](https://deviceandbrowserinfo.com/learning_zone/articles/detecting-headless-chrome-puppeteer-2024)

### API Rate Limiting

- [RESTful API - Rate Limit Guidelines](https://restfulapi.net/rest-api-rate-limit-guidelines/)
- [GitHub Docs - Rate Limits for REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

### LLM & Structured Outputs

- [OpenAI - Introducing Structured Outputs in the API](https://openai.com/index/introducing-structured-outputs-in-the-api/)
- [LiteLLM - Structured Outputs (JSON Mode)](https://docs.litellm.ai/docs/completion/json_mode)
- [arXiv - Think Inside the JSON: LLM Schema Adherence](https://arxiv.org/html/2502.14905v1)
- [Workflow.ing - Prompting ChatGPT to Generate JSON from HTML](https://workflow.ing/blog/articles/prompting-chat-gpt-to-generate-json-from-html)
- [GitHub Discussions - Models JSON Schema Support](https://github.com/orgs/community/discussions/162495)

### Data Verification & Blockchain

- [Blockchain Today - Data Verification in Blockchain Ecosystem](https://blockchain-today.medium.com/unlocking-the-truth-exploring-data-verification-in-the-blockchain-ecosystem-45c30c68b90c)
- [Dock.io - Blockchain Verification: What is it and how does it work?](https://www.dock.io/post/blockchain-verification)
- [IBM - Blockchain for Counterfeit Detection](https://www.ibm.com/think/topics/blockchain-for-anti-counterfeit)
- [Alibaba Cloud - How to Use Blockchain to Ensure Document Authenticity](https://www.alibabacloud.com/blog/how-to-use-blockchain-to-ensure-the-authenticity-of-documents_599875)
- [MDPI - Secure and Verifiable Blockchain Framework for Personal Data](https://www.mdpi.com/2073-431X/13/9/240)
- [Rapid Innovation - Future of Identity Verification](https://www.rapidinnovation.io/post/the-future-of-identity-verification-blockchain-and-biometric-integration-in-2024)

### Web Scraping Market & Pricing

- [ScraperAPI - Web Scraping Pricing Guide](https://www.scraperapi.com/blog/web-scraping-pricing-and-choosing-the-right-solution/)
- [BrightData - Web Scraper API Pricing](https://brightdata.com/pricing/web-scraper)
- [ScraperAPI - 6 Best Bright Data Alternatives](https://www.scraperapi.com/blog/brightdata-alternatives-for-amazon-scraping/)
- [Apify - Oxylabs vs. Bright Data](https://blog.apify.com/oxylabs-vs-bright-data/)
- [ScrapingDog - 5 Economical Bright Data Alternatives](https://www.scrapingdog.com/blog/bright-data-alternatives-for-web-scraping/)
- [ScraperAPI - The 8 Best Web Scraping APIs in 2024](https://www.scraperapi.com/web-scraping/best-web-scraping-apis/)
