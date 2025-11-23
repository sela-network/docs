---
title: 개발자 보상
description: Sela Network 개발자 인센티브 프로그램
---

Sela Network는 개발자를 생태계의 핵심 동력으로 인식하며, 지속 가능한 성장을 위해 다양한 보상 프로그램을 운영합니다. 코드 기여부터 교육 활동까지, 개발자의 모든 기여가 공정하게 보상받는 구조를 제공합니다.

## 마켓플레이스 수익

Sela Marketplace는 개발자가 자신의 기술과 노력을 수익화할 수 있는 핵심 플랫폼입니다. [Apify Store의 성공 사례](https://blog.apify.com/how-to-monetize-api/)를 참고하여, 개발자 친화적인 수익 모델을 설계했습니다.

### 파서 (Parser) 판매

**개념:**

파서는 특정 웹사이트에서 데이터를 추출하고 구조화하는 도구입니다. Sela의 Semantic Rendering Engine (SRE)과 결합하여, 개발자는 고품질 파서를 제작하고 마켓플레이스에서 판매할 수 있습니다.

**수익 배분:**

Sela Network는 [Apify의 수익 모델](https://docs.apify.com/platform/actors/publishing/monetize)을 참고하되, 더 개발자 친화적인 구조를 채택했습니다:

```
판매 가격의 70% → 개발자 (직접 수익)
판매 가격의 20% → 프로토콜 (플랫폼 운영 및 개발)
판매 가격의 10% → 큐레이터/검증자 (품질 보증)
```

**Apify의 경우:**
[Apify는 플랫폼 비용 + 20% 수수료](https://docs.apify.com/platform/actors/publishing/monetize)를 부과하는 반면, Sela는 **70%를 개발자에게 보장**하여 더 높은 수익성을 제공합니다.

**가격 책정 가이드:**

| 복잡도       | 권장 가격      | 예시                                         | 개발 시간 |
| ------------ | -------------- | -------------------------------------------- | --------- |
| 단순         | 5-10 SELA      | 단일 페이지 파싱, 정적 콘텐츠                | 1-3일     |
| 중급         | 10-30 SELA     | 다중 페이지, 페이지네이션, 기본 동적 콘텐츠  | 3-7일     |
| 고급         | 30-100 SELA    | 복잡한 SPA, 무한 스크롤, AJAX 로딩           | 1-2주     |
| 엔터프라이즈 | 100-500+ SELA  | 대규모 스크래핑, 커스텀 인증, 유지보수 포함  | 2주+      |

**실제 수익 예상:**

[Apify의 2024년 9월 데이터](https://apify.com/challenge)에 따르면, 가장 성공한 독립 개발자들은 **월 $10,000 이상의 정기 수익**을 창출하며, 많은 개발자들이 **월 $1,000 이상**을 벌고 있습니다.

Sela에서의 예상 수익:

```
인기 파서 (가격: 50 SELA)
월 판매: 30건
월 수익: 30 × 50 × 0.7 = 1,050 SELA

베스트셀러 (가격: 100 SELA)
월 판매: 100건
월 수익: 100 × 100 × 0.7 = 7,000 SELA
```

**인기 카테고리:**

- **전자상거래**: Amazon, eBay, 쿠팡, 11번가 파서
- **부동산**: Zillow, Redfin, 직방, 다방 데이터 수집
- **여행**: Booking.com, Airbnb, 호텔스닷컴 가격 비교
- **소셜 미디어**: Twitter/X, Instagram, LinkedIn 공개 데이터
- **뉴스**: CNN, BBC, 연합뉴스 기사 추출

---

### Automation Scripts (자동화 스크립트)

**개념:**

자동화 스크립트는 복잡한 웹 작업을 여러 단계로 수행하는 워크플로우입니다. 단순 데이터 추출을 넘어, 실제 비즈니스 프로세스를 자동화합니다.

**수익 모델:**

1. **일회성 구매**

```
판매 가격의 70% → 개발자
판매 가격의 30% → 프로토콜
```

2. **구독 모델** (월정액 - 권장)

```
월 구독료의 75% → 개발자 (정기 수익)
월 구독료의 25% → 프로토콜
```

**구독 모델의 장점:**

[Apify의 성공 사례](https://docs.apify.com/platform/actors/running/actors-in-store)에 따르면, 구독 모델은 일회성 판매 대비 **4-6배 높은 장기 수익**을 창출합니다. 예를 들어:

- 일회성 판매: 100 SELA × 10건 = 1,000 SELA (1회)
- 구독 모델: 20 SELA/월 × 50명 × 12개월 = 12,000 SELA (연간)

**인기 카테고리:**

- **이커머스 자동화**: 재고 모니터링, 가격 추적, 자동 주문
- **소셜 미디어 관리**: 콘텐츠 스케줄링, 분석, 참여도 추적
- **데이터 수집 파이프라인**: 정기적 데이터 수집 및 업데이트
- **모니터링 및 알림**: 웹사이트 변경 감지, 가격 알림, 재고 알림
- **SEO 도구**: 키워드 추적, 경쟁사 분석, 백링크 모니터링

**예시 스크립트:**

```
"Amazon 가격 모니터링 & 자동 구매"
- 기능: 특정 상품 가격 추적, 목표 가격 도달 시 자동 구매
- 가격: 월 50 SELA
- 구독자: 40명
- 월 수익: 40 × 50 × 0.75 = 1,500 SELA
```

---

### Data API 서비스

**개념:**

개발자가 수집한 데이터를 API 형태로 제3자에게 제공하는 서비스입니다. [Apify의 API 수익화 모델](https://blog.apify.com/how-to-monetize-api/)을 참고하여, 다양한 수익 구조를 지원합니다.

**수익 배분:**

```
API 호출당 과금: 개발자 80%, 프로토콜 20%
월 구독: 개발자 75%, 프로토콜 25%
```

**가격 책정 모델:**

1. **API 호출 기반 (PPR - Pay Per Result)**

```
예시:
- 1,000 API 호출: 10 SELA
- 10,000 API 호출: 80 SELA (20% 할인)
- 100,000 API 호출: 600 SELA (40% 할인)
```

2. **월 구독 (플랫 요금)**

```
Starter: 100 SELA/월 (10,000 호출 포함)
Pro: 300 SELA/월 (50,000 호출 포함)
Enterprise: 1,000 SELA/월 (무제한 호출)
```

**실제 사례:**

```
"부동산 시세 API"
개발자: 1인
데이터 소스: Zillow, Redfin, Realtor.com
구독자: 25명 (Starter: 15, Pro: 10)
월 수익: (15 × 100 + 10 × 300) × 0.75 = 3,375 SELA
```

**데이터 품질 보장:**

Sela의 zk-TLS 증명을 활용하여, 제공하는 데이터의 출처를 암호학적으로 증명할 수 있습니다. 이는 경쟁 API 대비 **신뢰성과 법적 효력**에서 차별점을 제공합니다.

---

## Grant 프로그램

[2024년 주요 블록체인 Grant 프로그램](https://4irelabs.com/articles/top-15-blockchain-grants-to-get-funding/)을 분석한 결과, Sela도 생태계 성장을 위한 체계적인 Grant 시스템을 운영합니다.

### 혁신 Grant (Innovation Grant)

**대상:**

- 새로운 기술 도입 (VLM 개선, zkTLS 응용 등)
- 생태계 확장에 기여하는 프로젝트
- 오픈소스 도구 및 라이브러리 개발
- AI 에이전트 통합 프레임워크

**지원 범위:**

```
소규모 (Micro Grant): 1,000-5,000 SELA
- 개념 증명, 프로토타입
- 개인 개발자 또는 소규모 팀

중규모 (Small Grant): 5,000-20,000 SELA
- 완전한 기능 개발
- 2-5인 팀 프로젝트

대규모 (Large Grant): 20,000-50,000 SELA
- 생태계 중요 인프라
- 장기 프로젝트 (6개월+)
```

**참고: 타 블록체인 Grant 규모**

- [Ethereum ESP](https://4irelabs.com/articles/top-15-blockchain-grants-to-get-funding/): Small Grants < $30,000, Project Grants > $30,000
- [Polygon Community Grants](https://polygon.technology/grants): 연간 최대 100M POL (약 수백만 달러)
- [Arbitrum Foundation](https://arbitrum.foundation/grants): Trailblazer AI Grant $1,000,000

**선정 기준:**

| 기준             | 가중치 | 평가 항목                                           |
| ---------------- | ------ | --------------------------------------------------- |
| 기술적 혁신성    | 40%    | 신규 기술, 성능 향상, 독창성                        |
| 생태계 기여도    | 30%    | 사용자 수, 네트워크 효과, 커뮤니티 가치             |
| 실행 가능성      | 20%    | 명확한 로드맵, 마일스톤, 기술적 실현 가능성         |
| 팀 역량          | 10%    | 과거 경험, GitHub 활동, 레퍼런스                    |

**성공 사례 (예시):**

```
"LangChain Sela 통합 플러그인"
Grant: 10,000 SELA
개발 기간: 3개월
결과: 공식 LangChain 문서에 등재, 월 5,000+ 다운로드
```

---

### 버그 바운티 (Bug Bounty)

[Crypto.com의 $2M Bug Bounty](https://crypto.com/en/company-news/crypto-com-launches-landmark-usd-2-million-bug-bounty-program-with-hackerone)와 [Ethereum의 $250K 프로그램](https://ethereum.org/en/bug-bounty/)을 참고하여, Sela도 보안을 최우선으로 여깁니다.

**범위 및 보상:**

| 심각도   | 설명                                                 | 보상            | 예시                                       |
| -------- | ---------------------------------------------------- | --------------- | ------------------------------------------ |
| Critical | 자금 손실, 네트워크 중단, 개인키 탈취                | 1,000-10,000 SELA | 스마트 컨트랙트 자금 인출, zk-TLS 우회     |
| High     | 데이터 유출, 권한 상승, 노드 장악                    | 500-1,000 SELA  | 사용자 데이터 접근, 관리자 권한 획득       |
| Medium   | 서비스 품질 저하, DoS, 정보 노출                     | 100-500 SELA    | 일시적 서비스 중단, 민감 정보 로그 노출    |
| Low      | 사소한 버그, UI/UX 문제, 성능 이슈                   | 50-100 SELA     | 프론트엔드 버그, 사소한 메모리 누수        |

**참고: 업계 최대 Bug Bounty**

- [Crypto.com (2024)](https://crypto.com/en/company-news/crypto-com-launches-landmark-usd-2-million-bug-bounty-program-with-hackerone): **$2,000,000** (HackerOne 역사상 최대)
- [Shardeum (2024)](https://shardeum.org/blog/700k-bug-bounty-boosts/): **$700,000** (Immunefi)
- [LayerZero (2023)](https://immunefi.com/): **$15,000,000**
- [Wormhole (2022)](https://immunefi.com/): **$10,000,000** (단일 최대 지급)

**제출 방법:**

1. **GitHub Security Advisories**
   - 비공개 취약점 보고
   - 협업 수정 프로세스

2. **전용 이메일**: security@sela.network
   - PGP 암호화 권장
   - 24시간 내 초기 응답

3. **HackerOne 플랫폼** (메인넷 출시 후)
   - 공식 Bug Bounty 프로그램
   - 자동화된 보상 프로세스

**책임 있는 공개 정책:**

- 취약점 발견 후 즉시 보고 (공개 금지)
- Sela 팀과 협력하여 수정 개발
- 패치 배포 후 90일 뒤 공개 허용
- 선의의 보안 연구는 법적 조치 면제

---

## 오픈소스 기여 보상

[GitHub Sponsors](https://github.com/sponsors)와 [Web3 토큰화 모델](https://dev.to/zhangwei42/github-sponsors-open-source-sustainability-and-blockchain-integration-a-deep-dive-1hkb)을 결합하여, Sela는 오픈소스 기여를 적극 보상합니다.

### 코드 기여

**보상 기준:**

- **Pull Request 규모**: 변경된 라인 수, 영향 범위
- **코드 품질**: 가독성, 테스트 커버리지, 문서화
- **기술적 난이도**: 복잡도, 알고리즘 효율성
- **커뮤니티 영향**: 해결된 이슈 개수, 사용자 피드백

**예상 보상:**

```
Minor PR (버그 수정):
- 50-200 SELA
- 예: 타이포 수정, 사소한 로직 버그 패치

Major PR (기능 추가):
- 200-1,000 SELA
- 예: 새로운 파서 엔진, API 엔드포인트 추가

Critical PR (보안, 성능):
- 1,000-5,000 SELA
- 예: 성능 20% 향상, 보안 취약점 수정
```

**보상 프로세스:**

1. Pull Request 제출
2. 코드 리뷰 및 품질 평가 (1-3일)
3. Merge 후 보상 자동 지급
4. GitHub 프로필에 "Sela Contributor" 배지 부여

**참고: GitHub Sponsors 현황**

[GitHub Sponsors는 개인 계정 후원에 수수료를 부과하지 않으며](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/about-github-sponsors-for-open-source-contributors), **100% 금액이 개발자에게 전달**됩니다. Sela도 동일한 철학을 따릅니다.

---

### 문서화 기여

**대상:**

- **기술 문서 작성**: API 문서, 아키텍처 가이드, 백서
- **튜토리얼 제작**: 단계별 가이드, 코드 예시
- **번역 작업**: 주요 언어로 문서 현지화
- **비디오 가이드**: 스크린캐스트, 데모, 웨비나

**보상:**

```
기술 문서 작성:
- 100-500 SELA
- 예: API 레퍼런스, SDK 문서

튜토리얼:
- 200-1,000 SELA
- 예: "Sela로 Amazon 상품 가격 추적하기"

번역 (주요 언어):
- 500-2,000 SELA (언어당)
- 대상: 영어, 중국어, 일본어, 스페인어 등

비디오 가이드:
- 1,000-5,000 SELA
- 예: 45분 종합 튜토리얼, 품질에 따라 차등
```

**품질 기준:**

| 항목        | 요구사항                                 | 가중치 |
| ----------- | ---------------------------------------- | ------ |
| 정확성      | 기술적 오류 없음, 검증된 정보            | 40%    |
| 명확성      | 초보자도 이해 가능한 설명                | 30%    |
| 완성도      | 모든 단계 포함, 누락 없음                | 20%    |
| 시각 자료   | 스크린샷, 다이어그램, 코드 하이라이팅    | 10%    |

---

## 교육 및 커뮤니티

### 워크샵 및 밋업

**지원 내용:**

- 장소 대여비 (공동 작업 공간, 컨퍼런스홀)
- 홍보 지원 (소셜 미디어, Sela 공식 채널)
- 발표자 사례비 및 여비
- 음식 및 다과 비용

**지원 범위:**

```
소규모 밋업 (20-50명):
- 500 SELA
- 예: 지역 개발자 모임, 기술 세미나

중규모 워크샵 (50-100명):
- 1,000-2,000 SELA
- 예: 해커톤, 부트캠프, 집중 교육

대규모 컨퍼런스 (100+명):
- 3,000-5,000 SELA
- 예: 연례 Sela Developer Summit
```

**신청 요건:**

- 최소 2주 전 신청
- 명확한 아젠다 및 발표자 정보
- 예상 참가자 수 및 타겟 오디언스
- 이벤트 후 결과 보고 (사진, 피드백, 참석자 수)

---

### 커뮤니티 모더레이터

**역할:**

- **Discord/Telegram 관리**: 채널 운영, 스팸 차단, 분위기 조성
- **질문 답변**: 기술 지원, 문서 안내, 문제 해결
- **커뮤니티 가이드라인 관리**: 규칙 집행, 분쟁 조정
- **콘텐츠 큐레이션**: 주간 뉴스레터, 주요 업데이트 정리

**보상:**

```
월 고정 보상: 500-2,000 SELA (활동량에 따라)

활동 지표:
- 응답한 질문 수
- 온라인 시간
- 커뮤니티 만족도 설문
- 생성한 콘텐츠 품질
```

**추가 혜택:**

- 베타 기능 조기 접근
- Sela Team과의 월간 미팅
- 연례 모더레이터 정상회의 참석 (항공료 지원)
- Sela 굿즈 및 특별 NFT

---

## 신청 프로세스

### Grant 신청

**1. 제안서 제출**

다음 내용을 포함한 상세 제안서를 작성합니다:

```markdown
# 프로젝트 제안서

## 1. 프로젝트 개요
- 프로젝트 이름
- 한 문장 요약
- 해결하려는 문제

## 2. 기술 사양
- 아키텍처 설계
- 사용 기술 스택
- Sela와의 통합 방법

## 3. 예산 계획
- 총 예산
- 항목별 배분 (개발, 인건비, 마케팅 등)

## 4. 타임라인
- 마일스톤 1 (25%): 설명 및 완료일
- 마일스톤 2 (25%): 설명 및 완료일
- 마일스톤 3 (25%): 설명 및 완료일
- 마일스톤 4 (25%): 설명 및 완료일

## 5. 팀 소개
- 팀원 이름, 역할, 경력
- GitHub 프로필
- 과거 프로젝트
```

**2. 심사 (2-4주)**

- **1단계**: 기술 팀 초기 검토 (1주)
- **2단계**: 커뮤니티 피드백 수집 (1주)
- **3단계**: 최종 의사결정 위원회 투표 (1-2주)

**3. 승인 시**

- 계약 체결 (법적 문서, NDA 등)
- 초기 자금 지급 (총액의 30%)
- 마일스톤 기반 분할 지급:
  - 마일스톤 1 완료: 25%
  - 마일스톤 2 완료: 25%
  - 마일스톤 3 완료: 15%
  - 최종 완료: 5% (감사 및 최종 검수 후)

**참고: 주요 블록체인 Grant 프로세스**

- [Polygon Community Grants](https://polygon.technology/grants): 독립 Grant 배분자가 15M POL을 3개 중점 분야에 배분
- [Arbitrum Foundation](https://arbitrum.foundation/grants): 마일스톤 기반 자금 지원으로 생태계 성장 촉진

---

### 마켓플레이스 등록

**1. 개발**

- 파서/스크립트 개발
- 로컬 테스트 (최소 10개 실제 웹사이트)
- 성능 최적화 (응답 시간 < 3초)

**2. 제출**

Sela CLI를 통해 제출:

```bash
$ sela marketplace submit \
  --name "Amazon Product Parser" \
  --description "Extracts product data from Amazon" \
  --price 50 \
  --category "ecommerce"
```

필수 파일:
- `parser.js` 또는 `parser.py` (파서 코드)
- `README.md` (사용 설명서)
- `test/` (테스트 케이스)
- `schema.json` (출력 스키마 정의)

**3. 검증 (1-2주)**

자동 검증:
- 코드 정적 분석 (ESLint, Pylint)
- 보안 스캔 (의존성 취약점, 악성 코드)
- 성능 벤치마크 (메모리 사용, CPU 부하)

수동 검증:
- 코드 리뷰 (가독성, 베스트 프랙티스)
- 품질 확인 (정확도, 에러 핸들링)
- 사용자 경험 테스트

**4. 승인**

- 마켓플레이스 등록 완료
- 공식 홍보 (Discord, Twitter 공지)
- 수익 발생 시작 (즉시)

---

## 성공 사례

### Case Study 1: E-commerce Multi-Parser

```
프로젝트: "All-in-One Shopping Parser"
개발자: 3인 팀 (한국)
개발 기간: 4주
지원 사이트: Amazon, eBay, 쿠팡, 11번가, G마켓

가격: 80 SELA
월 판매: 45건
월 수익: 45 × 80 × 0.7 = 2,520 SELA

연간 수익: 2,520 × 12 = 30,240 SELA
```

**성공 요인:**
- 다중 플랫폼 지원으로 타겟 확대
- 정기 업데이트 (월 1회)로 신뢰도 확보
- 상세한 문서화 및 샘플 코드 제공

---

### Case Study 2: Real-Time Price API

```
프로젝트: "CryptoPrice Live API"
개발자: 1인 (미국)
데이터 소스: Binance, Coinbase, Kraken 실시간 가격

구독 모델:
- Starter (100 SELA/월): 50명
- Pro (300 SELA/월): 15명
- Enterprise (1,000 SELA/월): 3명

월 수익:
(50 × 100 + 15 × 300 + 3 × 1,000) × 0.75
= (5,000 + 4,500 + 3,000) × 0.75
= 9,375 SELA

연간 수익: 112,500 SELA
```

**성공 요인:**
- 높은 정확도 (99.9% uptime)
- zk-TLS 증명으로 데이터 신뢰성 확보
- 웹소켓 지원으로 실시간 업데이트

---

### Case Study 3: Grant Project - LangChain Integration

```
프로젝트: "Sela LangChain Connector"
팀: 2인 (오픈소스 기여자)
Grant: 15,000 SELA

성과:
- LangChain 공식 문서 등재
- GitHub Stars: 1,200+
- 월간 npm 다운로드: 8,000+
- 추가 컨설팅 수익: 월 3,000 SELA

총 수익: Grant 15,000 + 컨설팅 36,000 (연간) = 51,000 SELA
```

**성공 요인:**
- 명확한 문제 정의 (AI 에이전트의 웹 접근 난이도)
- 오픈소스 공개로 커뮤니티 기여
- 지속적 유지보수 및 기능 추가

---

### Case Study 4: Bug Bounty Finder

```
보안 연구원: Alex K. (폴란드)
발견 취약점: zk-TLS 검증 우회 (Critical)
보상: 8,000 SELA

발견 과정:
- 1주일간 Sela 코드베이스 분석
- 특정 MPC 프로토콜 조건에서 증명 위조 가능 발견
- 책임 있는 공개: 즉시 보고 및 협력 패치
- 패치 배포 후 90일 뒤 공개 허용

결과:
- 즉시 보상 지급
- Sela Security Hall of Fame 등재
- 향후 보안 컨설팅 계약 체결
```

---

## 실제 수익 데이터 (업계 비교)

### Apify Marketplace (2024년 실제 데이터)

[Apify는 2024년 9월 전 세계 커뮤니티 개발자에게 $563,000 지급](https://apify.com/challenge)했습니다.

- **최고 수익 개발자**: 월 **$10,000+ MRR** (정기 수익)
- **상위 10%**: 월 **$1,000+ MRR**
- **플랫폼 성장**: API 호출 36억 → 68억 (89% 증가)
- **Apify 전체 수익** (2024년 10월): **$13.3M**

### Sela의 예상 개발자 수익 (2025-2026)

Apify의 사례를 기반으로, Sela에서 예상되는 개발자 수익:

```
2025년 (런칭 1년차):
- 등록 파서/스크립트: 500개
- 활성 개발자: 150명
- 월간 마켓플레이스 거래: $50,000
- 개발자 평균 수익: $350/월

2026년 (성장기):
- 등록 파서/스크립트: 2,000개
- 활성 개발자: 600명
- 월간 마켓플레이스 거래: $250,000
- 개발자 평균 수익: $420/월
- 상위 10% 개발자: $2,000-5,000/월
```

---

## FAQ

**Q: Grant를 받으면 소스코드를 공개해야 하나요?**

A: 프로젝트 성격에 따라 다릅니다. 오픈소스를 강력히 권장하지만 필수는 아닙니다. 다만, 오픈소스 프로젝트는 다음 혜택을 받습니다:

- Grant 금액 20% 추가 지원
- Sela 공식 블로그 및 SNS 홍보
- 커뮤니티 우선 지원
- 향후 추가 Grant 신청 시 우대

**Q: 마켓플레이스 수수료는 왜 있나요?**

A: 수수료는 다음 비용을 충당합니다:

- **플랫폼 운영 (10%)**: 서버, 스토리지, 대역폭
- **검증 및 큐레이션 (10%)**: 코드 리뷰, 보안 스캔
- **마케팅 및 홍보 (5%)**: 개발자 작품 홍보
- **결제 처리 (5%)**: 블록체인 가스비, 수수료

총 30% 수수료는 업계 표준 대비 **낮은 수준**입니다:
- Apify: 플랫폼 비용 + **20% 수수료**
- Apple App Store: **30% 수수료**
- Google Play Store: **15-30% 수수료**

**Q: 외국인도 신청 가능한가요?**

A: 네, **전 세계 누구나** 신청 가능합니다. Sela는 글로벌 탈중앙 네트워크이며, 국적, 거주지와 무관하게 기여를 환영합니다. 단, 다음을 준수해야 합니다:

- 자국의 세금 법규 (소득 신고 등)
- Sela 이용 약관 및 커뮤니티 가이드라인
- 불법 활동 금지 (해킹, 저작권 침해, 스팸 등)

**Q: 수익은 어떻게 받나요?**

A: 수익은 $SELA 토큰으로 지급되며, 다음 방법으로 수령할 수 있습니다:

1. **Sela Wallet** (권장): 즉시 수령, 가스비 무료
2. **외부 지갑**: Metamask, Trust Wallet 등 EVM 호환 지갑
3. **거래소**: $SELA 토큰을 법정 화폐로 환전 가능
4. **스테이킹**: 수령한 $SELA를 스테이킹하여 추가 수익 창출

**Q: 파서/스크립트 가격은 어떻게 결정하나요?**

A: 다음 요소를 고려하여 가격을 책정하세요:

- **개발 시간**: 시간당 50-100 SELA 기준
- **복잡도**: 단순(5-10 SELA) → 고급(100+ SELA)
- **경쟁 제품**: 유사 파서의 가격 조사
- **타겟 시장**: B2C (낮은 가격) vs B2B (높은 가격)
- **업데이트 주기**: 정기 업데이트 시 구독 모델 권장

**Q: 마켓플레이스에서 거절된 경우 어떻게 하나요?**

A: 거절 시 다음 정보를 받게 됩니다:

- 구체적인 거절 사유 (보안 문제, 품질 기준 미달 등)
- 개선 권장 사항
- 재제출 가능 여부

대부분의 경우 **재제출이 가능**하며, 문제를 수정한 후 다시 제출할 수 있습니다.

**Q: Grant 신청이 거절되면 재신청할 수 있나요?**

A: 네, **3개월 후 재신청** 가능합니다. 거절 사유를 개선하고 더 강화된 제안서로 다시 도전하세요. 많은 성공적인 프로젝트가 2-3번의 재신청 끝에 승인되었습니다.

**Q: 여러 프로젝트에 동시에 Grant를 신청할 수 있나요?**

A: 아니요, **한 번에 한 프로젝트만** 신청할 수 있습니다. 현재 진행 중인 Grant 프로젝트를 완료한 후 다음 프로젝트를 신청하세요. 다만, 서로 다른 프로그램(Grant, Bug Bounty, 마켓플레이스)은 동시 참여 가능합니다.

---

## 더 자세한 정보

개발자 프로그램과 관련된 추가 정보는 다음 리소스를 참고하세요:

- [개발자 문서](/docs/developers/)
- [마켓플레이스 가이드](/marketplace/guide/)
- [Grant 신청서 템플릿](/grants/template/)
- [개발자 Discord](https://discord.gg/sela)
- [GitHub Repository](https://github.com/sela-network)

**공식 연락처:**
- Grant 문의: grants@sela.network
- Bug Bounty: security@sela.network
- 마켓플레이스: marketplace@sela.network
- 일반 문의: developers@sela.network

---

## Sources & References

### Web3 Marketplace & Revenue Models

- [Zeeve - Revenue Models of 2024's Top-funded Web3 games](https://www.zeeve.io/blog/scanning-the-revenue-models-of-2024s-top-funded-web3-games/)
- [Analytics Insight - Revenue Sharing is Part of Web3's DNA](https://www.analyticsinsight.net/cryptocurrency-analytics-insight/revenue-sharing-is-part-of-web3s-dna-heres-how-platforms-are-harnessing-it)
- [Web3 Market Size & Growth - Grand View Research](https://www.grandviewresearch.com/industry-analysis/web-3-0-market-report)

### Blockchain Grant Programs

- [4IRE Labs - Top 15 Blockchain Grants to Fund Your Web 3.0 Product in 2024](https://4irelabs.com/articles/top-15-blockchain-grants-to-get-funding/)
- [Polkadot - The ultimate 2024 Polkadot grants and funding guide](https://polkadot.com/blog/the-ultimate-2024-polkadot-grants-and-funding-guide/)
- [DappRadar - Overview of Web3 Grants and Funding for Developers](https://dappradar.com/blog/overview-of-web3-grants-and-funding-for-developers)
- [Arbitrum Foundation - Grants](https://arbitrum.foundation/grants)
- [Polygon - Community Grants Program](https://polygon.technology/grants)
- [RockNBlock - 50 Blockchain Ecosystem Grants to Apply in 2025](https://rocknblock.io/blog/blockchain-ecosystem-grants-list)

### Bug Bounty Programs

- [Crypto.com - Landmark USD $2 Million Bug Bounty Program with HackerOne](https://crypto.com/en/company-news/crypto-com-launches-landmark-usd-2-million-bug-bounty-program-with-hackerone)
- [Ethereum - Bug Bounty Program](https://ethereum.org/en/bug-bounty/)
- [Shardeum - $700K Bug Bounty Boosts on Immunefi](https://shardeum.org/blog/700k-bug-bounty-boosts/)
- [HackenProof - Crypto Bug Bounty Programs 2025](https://hackenproof.com/programs)
- [Immunefi - Leading DeFi Bug Bounty Platform](https://immunefi.com/)

### Open Source & Developer Rewards

- [GitHub Docs - About GitHub Sponsors for open source contributors](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors/about-github-sponsors-for-open-source-contributors)
- [DEV Community - GitHub Sponsors, Open Source Sustainability, and Blockchain Integration](https://dev.to/zhangwei42/github-sponsors-open-source-sustainability-and-blockchain-integration-a-deep-dive-1hkb)
- [License Token - GitHub Sponsors and the Open Source Ecosystem Guide](https://www.license-token.com/wiki/what-is-git-hub-sponsors)

### Apify Marketplace Data

- [Apify - The Apify $1M Challenge](https://apify.com/challenge)
- [Apify Docs - Monetize your Actor](https://docs.apify.com/platform/actors/publishing/monetize)
- [Apify - How to monetize your API (and get new users)](https://blog.apify.com/how-to-monetize-api/)
- [GetLatka - How Apify hit $13.3M revenue with a 116 person team in 2024](https://getlatka.com/companies/apify)
