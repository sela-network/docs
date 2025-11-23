---
title: 토크노믹스
description: SELA 토큰 경제 모델 및 유틸리티
---

## 토큰 정보

**Ticker**: `$SELA`
**네트워크**: Ethereum (추후 다중 체인 확장)
**토큰 타입**: Utility + Governance

---

## 핵심 철학: 실사용 중심 설계

대부분의 Web3 프로젝트가 투기적 토큰에 의존하는 반면, **$SELA는 실제 사용이 곧 가치**입니다.

### DeFi의 가치 환원 패러다임 전환

2024-2025년, DeFi 프로토콜들은 [실질적인 가치 환원(value accrual) 메커니즘](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)을 적극적으로 채택하고 있습니다. Aave, Ethena, Hyperliquid와 같은 주요 프로토콜들은 토큰 홀더에게 **실제 수익을 분배**하는 방향으로 전환하여, 투기가 아닌 실질적 가치 창출에 집중하고 있습니다.

[Aave는 2024년 토크노믹스 대대적 개편을 통해](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368) 주당 100만 달러(월 약 400만 달러)의 바이백 프로그램을 시작했으며, Hyperliquid는 [이중 디플레이션 전략(바이백 + 소각)](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)을 통해 HYPE 토큰의 장기 가치를 보존하고 있습니다.

### 토큰 유틸리티의 중요성

[2024년 토큰노믹스 모범 사례 연구](https://www.rapidinnovation.io/post/tokenomics-guide-mastering-blockchain-token-economics-2024)에 따르면, 지속 가능한 토큰 경제를 위한 핵심은 **깊고 필수불가결한 유틸리티(deep, indispensable utility)** 입니다:

> "플랫폼에 토큰이 필수적일수록 수요의 지속 가능성이 높아집니다. 투기가 아닌 깊은 유틸리티가 유기적 수요와 네트워크 효과를 창출하여 장기적 가치를 견인합니다."

[Nextrope의 DeFi 토크노믹스 가이드](https://nextrope.com/how-to-design-a-sustainable-tokenomics-model-in-a-defi-project/)는 성공적인 토큰 모델의 핵심 요소로 다음을 강조합니다:

- 실제 유틸리티 (단순한 투자자 부양 수단이 아님)
- 투명성과 공정한 분배 메커니즘
- 생태계 내 합리적인 거버넌스 구조

MakerDAO는 [이중 토큰 모델과 디플레이션 바이백을 통합](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)하여 유틸리티와 가치 환원의 강력함을 입증한 대표적 사례입니다.

```
AI Agent 사용 증가
    ↓
더 많은 웹 접근 요청
    ↓
더 많은 $SELA 소비
    ↓
토큰 수요 증가 + 공급 감소 (소각)
    ↓
가치 상승
    ↓
더 많은 노드 참여
    ↓
네트워크 성능 향상
    ↓
더 많은 AI Agent 유입
```

---

## 토큰 유틸리티

### 1. 네트워크 사용료 (Gas)

Sela Network의 모든 연산에는 $SELA가 필요합니다.

#### 가격 구조

| 서비스               | 기본 비용     | 설명                       |
| -------------------- | ------------- | -------------------------- |
| **기본 페이지 로딩** | 0.01 SELA     | HTML 가져오기, 기본 렌더링 |
| **VLM 파싱**         | 0.005 SELA    | Vision Language Model 추론 |
| **복잡한 인터랙션**  | 0.008 SELA    | 로그인, 폼 작성, 다중 단계 |
| **zk-TLS 증명 생성** | 0.003 SELA    | 데이터 출처 암호학적 증명  |
| **프리미엄 노드**    | +0.002 SELA   | 지연시간 < 100ms 보장      |
| **세션 저장**        | 0.001 SELA/일 | 로그인 상태 유지           |

#### 실제 비용 예시

**사용 사례 1: 이커머스 가격 비교**

```
Amazon 접속 (0.01)
+ 상품 검색 (0.01)
+ VLM 파싱 (0.005)
+ 20개 상품 정보 추출 (0.01)
────────────────────────
총 비용: 0.035 SELA/검색

월 10,000회 검색 = 350 SELA
기존 솔루션 대비 90% 비용 절감
```

**사용 사례 2: 자동 거래 봇**

```
거래소 로그인 (0.018, 세션 유지)
+ 실시간 가격 조회 (0.01 × 100회/일 = 1 SELA)
+ 거래 실행 (0.018)
+ zk-TLS 증명 (0.003)
────────────────────────
일 비용: ~1.04 SELA
월 비용: ~31 SELA

기존 중앙화 솔루션: $200-500/월
Sela: SELA 가격 $1 가정 시 $31/월
```

---

### 2. 노드 스테이킹 (Proof of Contribution)

#### 왜 스테이킹이 필요한가?

노드 운영자는 Sela 네트워크의 신뢰를 책임집니다:

- 정확한 데이터 제공
- 99%+ 업타임 유지
- 빠른 응답 속도
- 보안 유지

스테이킹은 이 신뢰를 담보하는 장치입니다.

#### 스테이킹의 가치 환원 메커니즘

[2024년 DeFi 트렌드 분석](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)에 따르면, 스테이킹 기반 수익 분배는 **측정 가능한 현금흐름**을 창출하여 토큰에 표준화된 밸류에이션 프레임워크를 제공합니다. 이는 인플레이션 기반 인센티브가 아닌 **실제 수익 분배**에 집중하는 지속 가능한 모델입니다.

[Multicoin Capital의 스테이킹 연구](https://multicoin.capital/2018/02/13/new-models-utility-tokens/)는 스테이킹이 토큰 속도(velocity) 문제를 해결하는 핵심 메커니즘임을 강조합니다:

> "스테이킹 함수를 프로토콜에 내장하면 자산을 락업하게 되어 토큰 속도가 감소합니다. 특히 일정 기간 토큰을 락업해야 하는 스테이킹은 토큰 속도를 줄이는 데 매우 효과적입니다."

이는 [Work Token 모델](https://multicoin.capital/2018/02/13/new-models-utility-tokens/)로 알려져 있으며, 서비스 제공자가 네트워크의 네이티브 토큰을 스테이킹하여 네트워크를 위한 작업을 수행할 권리를 얻는 방식입니다. 이 모델은 단순 결제 화폐 모델 대비 **약 100배 더 많은 가치를 포착**합니다.

#### 노드 티어 시스템 (Realistic APY: 15-35%)

| 티어         | 스테이킹    | 월 예상 수익     | APR      | 요구사항      |
| ------------ | ----------- | ---------------- | -------- | ------------- |
| **Bronze**   | 100 SELA    | 1.25-3 SELA       | 15-36% | 기본 브라우저 |
| **Silver**   | 500 SELA    | 7-15 SELA      | 17-36% | 안정적 연결   |
| **Gold**     | 2,000 SELA  | 30-60 SELA     | 18-36% | 고성능 PC     |
| **Platinum** | 10,000 SELA | 175-300 SELA | 21-36% | 전용 서버     |
| **Diamond**  | 50,000 SELA | 900-1,500 SELA | 22-36% | 데이터센터 |

**성능 가산점:**

- Uptime 99.9%+ → +10% 보상
- 응답 속도 < 500ms → +5% 보상
- 지역 수요 높음 → +15% 보상

#### ROI 계산

**Bronze 노드 예시:**

```
초기 투자: 100 SELA ($100 가정)
월 보상: 2 SELA 평균
ROI: 2% / 월
회수 기간: 50개월
연 수익률: 24% (aligned with DePIN industry standards)
```

**Platinum 노드 예시:**

```
초기 투자: 10,000 SELA ($10,000 가정)
월 보상: 240 SELA 평균
ROI: 2.4% / 월
회수 기간: 42개월
연 수익률: 29% (competitive with Filecoin, Helium)
```

**Note**: These APY figures (15-36%) align with [established DePIN projects like Filecoin and Helium](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024) and represent sustainable, long-term yields rather than unsustainable high-APY ponzi-nomics. Actual returns depend on network utilization, geographic demand, and node performance.

#### 슬래싱 (Slashing)

악의적 행동 시 스테이킹 토큰의 일부가 소각됩니다. Sela Network의 슬래싱 메커니즘은 [Ethereum의 검증된 3단계 슬래싱 모델](https://figment.io/insights/staking-penalties/)을 기반으로 설계되었습니다.

##### Ethereum 슬래싱 모델 (참고 사례)

[Figment의 연구](https://figment.io/insights/staking-penalties/)에 따르면, Ethereum의 슬래싱은 다음 3단계로 진행됩니다:

**1단계: 즉시 페널티**

- 유효 잔액의 약 1/32 (약 1 ETH) 즉시 차감
- 검증자는 강제 종료 대기열에 진입

**2단계: 종료 대기 기간**

- 약 36일간 지속
- 이 기간 동안 보상을 받지 못함
- 6.4분마다 페널티 발생

**3단계: 상관관계 페널티**

- 동시에 슬래싱된 검증자 수에 따라 규모 조정
- 최대 페널티: 전체 스테이크 손실
- 동시 슬래싱이 많을수록 개별 페널티 증가

[Ethereum 슬래싱의 100%는 동일한 검증자 키를 여러 노드에서 실행하여 발생](https://www.attestant.io/posts/exploring-eth2-slashing/)했으며, 이는 네트워크 보안을 위한 강력한 억제책임이 입증되었습니다.

##### Sela Network 슬래싱 구조

| 위반 사항           | 슬래싱 비율 | 예시                       | 근거                           |
| ------------------- | ----------- | -------------------------- | ------------------------------ |
| **데이터 조작**     | 30-50%      | HTML을 의도적으로 변조     | 네트워크 신뢰 훼손             |
| **거짓 증명**       | 50-100%     | 가짜 zk-TLS 증명 생성 시도 | Ethereum 최고 수준 위반에 준함 |
| **심각한 다운타임** | 5-15%       | 24시간 이상 오프라인       | 서비스 품질 저하               |
| **보안 위반**       | 20-40%      | 사용자 데이터 유출         | 개인정보 보호 위반             |

**슬래싱된 토큰의 운명:**

- 100% 소각 처리 (프로토콜 수익으로 전환하지 않음)
- 온체인 투명성 보장
- 디플레이션 압력 기여

**보호 장치:**

- 경미한 실수 (1-2회): 경고만
- 기술적 오류: 슬래싱 면제 가능
- 이의 제기 시스템: DAO 투표로 최종 결정
- [Ethereum과 유사하게](https://www.attestant.io/posts/exploring-eth2-slashing/) 슬래싱된 검증자는 네트워크 재진입 불가 (새 키와 스테이크 필요)

---

### 3. 마켓플레이스 화폐

Sela 생태계 내 모든 거래는 $SELA로 이루어집니다.

#### 판매 가능한 자산

##### A. Parser (파서)

웹사이트별 맞춤 데이터 추출 로직

**인기 카테고리:**

- 이커머스 파서 (Amazon, 쿠팡, 알리)
- 소셜 미디어 파서 (Twitter/X, Instagram, LinkedIn)
- 금융 파서 (거래소, 은행, 핀테크)
- 뉴스 파서 (블룸버그, Reuters, TechCrunch)

**가격 예시:**

```
쿠팡 상품 검색 파서: 5 SELA
Instagram 프로필 크롤러: 15 SELA
Binance 실시간 가격 파서: 20 SELA
LinkedIn 채용 공고 파서: 25 SELA
```

**개발자 수익:**

- 판매 가격의 70% → 개발자
- 20% → 프로토콜 (SELA 바이백)
- 10% → 검증자 (품질 보증)

**월 수익 예측:**

```
인기 파서 (100 판매/월)
→ 5 SELA × 100 × 70% = 350 SELA/월
→ SELA @ $1 = $350/월

베스트셀러 (1,000 판매/월)
→ 20 SELA × 1,000 × 70% = 14,000 SELA/월
→ SELA @ $1 = $14,000/월
```

##### B. Automation Script (자동화 스크립트)

복잡한 워크플로우를 패키지로 판매

**예시:**

- 쿠팡 자동 주문 (최저가 상품 찾기 + 구매): 50 SELA
- 항공권 최저가 알림 (실시간 모니터링): 30 SELA/월
- 크로스보더 차익거래 봇: 200 SELA
- LinkedIn 자동 네트워킹: 40 SELA/월

##### C. Data API

수집한 데이터를 실시간 API로 판매

**예시:**

- 실시간 가격 비교 API (10개 쇼핑몰): 200 SELA/월
- 뉴스 감성 분석 API: 300 SELA/월
- SNS 트렌드 데이터: 500 SELA/월
- 암호화폐 거래소 통합 데이터: 800 SELA/월

---

## 토큰 공급 및 분배

### 총 공급량: 10,000,000,000 SELA (100억)

#### 배분 구조

| 카테고리            | 비율 | 수량          | 언락 일정                  |
| ------------------- | ---- | ------------- | -------------------------- |
| **노드 보상**       | 40%  | 4,000,000,000 | 8년간 점진적               |
| **초기 투자자**     | 20%  | 2,000,000,000 | 6개월 락업, 24개월 베스팅  |
| **팀 & 어드바이저** | 15%  | 1,500,000,000 | 12개월 락업, 36개월 베스팅 |
| **에코시스템 펀드** | 15%  | 1,500,000,000 | 프로토콜 DAO 관리          |
| **유동성 제공**     | 5%   | 500,000,000   | TGE 시                     |
| **마케팅 & 성장**   | 3%   | 300,000,000   | 3년간 사용                 |
| **리저브**          | 2%   | 200,000,000   | 비상 자금                  |

#### 노드 보상 일정 (4년)

```
Year 1: 1,600M SELA (40% of node rewards)
Year 2: 1,200M SELA (30%)
Year 3: 800M SELA (20%)
Year 4: 400M SELA (10%)
```

**디플레이션 모델:**

- 초기 높은 보상 → 노드 빠른 확보
- 점진적 감소 → 희소성 증가
- 네트워크 성숙 → 사용 수수료가 주 수입원

---

## 토큰 소각 메커니즘

토큰 소각(burning)은 [장기적 관점에서 토큰노믹스와 가격에 긍정적 영향](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6)을 미치는 검증된 메커니즘입니다. 지속 가능한 프로젝트에서 토큰 소각은 공급을 줄여 희소성을 높이고 장기 가치를 보존합니다.

### 산업 소각 메커니즘 사례 연구

#### BNB (Binance Coin) 자동 소각

[BNB는 최종 목표 1억 BNB까지 자동 소각 메커니즘을 운영](https://plisio.net/blog/bnb-auto-burn-what-it-is-and-how-it-works)하고 있으며, 소각량은 BNB 가격과 분기당 BNB Smart Chain 생성 블록 수에 따라 투명하고 예측 가능하게 조정됩니다.

**2024년 BNB 소각 실적:**

- [27차 분기별 소각(Q1 2024)](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6): 약 200만 BNB 소각 (약 12억 달러 가치)
- [28차 분기별 소각(2024년 7월)](https://www.binance.com/en/square/post/2024-07-22-bnb-foundation-completes-28th-quarterly-bnb-burn-11130310123249): 1,643,698.8 BNB 소각 (약 9.71억 달러)
- [29차 소각(2024년 10월)](https://www.bnbchain.org/en/blog/29th-bnb-burn): Auto-Burn으로 1,772,712.43 BNB 제거

**누적 성과:**

- 출시 이후 총 5,400만 BNB 이상 소각
- 유통 공급량을 약 1억 4,700만 BNB로 감소
- [BEP-95 가스비 소각](https://plisio.net/blog/bnb-auto-burn-what-it-is-and-how-it-works)을 통해 2021년부터 일일 약 1,200 BNB를 지속적으로 소각

#### Ethereum EIP-1559 소각

[2021년 8월 London Hard Fork의 일부로 구현된 EIP-1559](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6)는 각 트랜잭션마다 기본 수수료를 소각하여 Ethereum 토큰노믹스에 디플레이션 측면을 도입했습니다. 이는 수수료 모델을 재구성하여 거래마다 ETH를 소각함으로써 장기적 가치 보존을 가능하게 했습니다.

#### 기타 성공 사례 (2024)

- **Injective (INJ)**: [2024년 6월 12일 토큰 소각 이벤트 후 18% 이상 급등](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6)
- **Shiba Inu**: [2024년 총 공급량의 41% 소각](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6)

### 1. 사용료 소각 (Usage Burn)

모든 네트워크 사용료의 **20%는 즉시 소각**됩니다. 이는 [Ethereum의 EIP-1559 모델](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6)과 유사하게 사용량이 증가할수록 소각량도 증가하는 구조입니다.

**예시:**

```
AI Agent가 0.02 SELA 지불
→ 0.016 SELA는 노드에게
→ 0.004 SELA는 영구 소각
```

**연간 소각 예측:**

```
2025년: 일 100만 요청 → 연 14.6M SELA 소각 (0.146%)
2027년: 일 1,000만 요청 → 연 146M SELA 소각 (1.46%)
2030년: 일 1억 요청 → 연 1,460M SELA 소각 (14.6%)
```

네트워크 사용이 증가함에 따라 소각률도 기하급수적으로 증가하여, [BNB의 일일 1,200 BNB 지속 소각](https://plisio.net/blog/bnb-auto-burn-what-it-is-and-how-it-is)과 유사한 디플레이션 압력을 생성합니다.

### 2. 마켓플레이스 바이백 & 번

프로토콜 수익의 **50%는 SELA 바이백 후 소각**합니다. 이는 [2024년 DeFi 프로토콜들이 채택한 가치 환원 전략](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)을 따릅니다.

#### 산업 바이백 & 소각 사례

**Aave 바이백 프로그램 (2024)**
[Aave는 6개월간 주당 100만 달러(월 약 400만 달러)의 바이백 프로그램을 시작](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)하여 AAVE 배출을 커버하고 프로토콜을 더 지속 가능하게 만들었습니다. 이는 수익 기반 바이백이 토큰 가치를 보존하는 강력한 메커니즘임을 증명합니다.

**Hyperliquid 이중 디플레이션 전략**
[Hyperliquid는 수익의 일부를 사용하여 시장에서 HYPE 토큰을 재구매](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)하는 바이백과 소각을 결합한 이중 디플레이션 전략을 구현했습니다.

#### Sela 바이백 & 소각 메커니즘

**메커니즘:**

```
마켓플레이스 수익 (Parser/Script 판매 20%)
    ↓
주간 누적
    ↓
DEX에서 SELA 바이백
    ↓
소각 주소로 전송
    ↓
투명한 온체인 기록
```

**가치 환원 효과:**

- 바이백 = 시장 매수 압력 증가
- 소각 = 유통 공급 영구 감소
- [Burn-and-Mint 조합은 안정적인 토큰 속도 유지에 최적](https://outlierventures.io/research/essential-strategies-to-manage-velocity/)임이 연구로 검증됨

### 3. 슬래싱 소각

노드 위반 시 슬래싱된 토큰은 100% 소각됩니다.

---

## 플라이휠 효과

### 공급 측면 (Supply Side)

#### 노드 운영자 유입 경로

1. **저진입 장벽**

   - 크롬 확장 프로그램 설치만으로 시작
   - 최소 100 SELA만 있으면 참여 가능
   - 기술 지식 불필요

2. **즉각적 수익**

   - 설치 후 몇 분 내 첫 보상 획득
   - 실시간 대시보드로 수익 확인
   - 주간 자동 출금

3. **확장 가능**
   - 여러 기기에서 동시 운영
   - 티어 업그레이드로 수익 증대
   - 추천 프로그램 (10% 보너스)

#### 개발자 유입 경로

1. **마켓플레이스 기회**

   - 한 번 만들고 계속 판매
   - 수동적 소득 창출
   - 포트폴리오 구축

2. **낮은 진입 장벽**

   - Python/JavaScript SDK 제공
   - 풍부한 문서 및 예제
   - 커뮤니티 지원

3. **즉각적 시장**
   - 출시 즉시 수백만 AI Agent에게 노출
   - 프로토콜 레벨 마케팅
   - 평가 시스템으로 품질 보증

---

### 수요 측면 (Demand Side)

#### AI Agent 개발자

**사용 패턴:**

```python
# 개발 단계 (월 $10)
monthly_requests = 1,000
cost = 1,000 × 0.02 = 20 SELA/월

# 성장 단계 (월 $200)
monthly_requests = 10,000
cost = 10,000 × 0.02 = 200 SELA/월

# 규모화 단계 (월 $2,000)
monthly_requests = 100,000
cost = 100,000 × 0.02 = 2,000 SELA/월
```

#### 기업 고객

**실제 사례:**

```
중형 이커머스 회사
- 경쟁사 가격 모니터링: 일 10,000회
- 고객 리뷰 분석: 일 5,000회
- 재고 추적: 일 3,000회
───────────────────────────────────
총: 일 18,000회 = 월 540,000회
비용: 10,800 SELA/월

기존 솔루션: $5,000-8,000/월
Sela (SELA @ $1): $10,800/월
→ 하지만 API 없는 사이트도 접근 가능
→ zk-TLS 증명으로 법적 효력
→ 총 가치는 훨씬 높음
```

---

## 장기 가치 보존 전략

### 1. 실사용 기반 수요

투기가 아닌 **실제 필요**에서 수요가 발생합니다:

- AI Agent는 웹 접근을 위해 SELA 필수
- 노드 운영을 위해 스테이킹 필수
- 마켓플레이스 거래를 위해 SELA 필수

### 2. 디플레이션 압력

- 소각: 공급 지속적 감소
- 스테이킹: 유통 공급 감소
- 네트워크 성장: 수요 증가

### 3. 네트워크 효과

```
더 많은 노드 → 더 나은 성능
더 나은 성능 → 더 많은 사용자
더 많은 사용자 → 더 높은 수익
더 높은 수익 → 더 많은 노드
```

### 4. DAO 거버넌스

커뮤니티가 프로토콜의 미래를 결정합니다. $SELA는 Utility와 Governance를 결합한 토큰으로, 보유자에게 네트워크 의사결정 권한을 부여합니다.

#### 거버넌스 토큰 모델 개요

[거버넌스 토큰은 투표권과 의사결정 권한을 부여](https://www.hord.fi/blog/most-common-governance-token-models-for-2023)하며, 토큰 가중 투표(token-weighted voting), 이차 투표(quadratic voting), 평판 가중 투표(reputation-weighted voting) 등의 메커니즘을 포함합니다.

#### 주요 거버넌스 메커니즘

##### 1. 스테이크 가중 투표 (Stake-Weighted Voting)

[투표의 가중치는 일반적으로 보유한 토큰 수에 비례](https://www.hord.fi/blog/most-common-governance-token-models-for-2023)합니다. 즉, 토큰을 더 많이 보유한 사람이 더 큰 영향력을 갖습니다. 이 모델은 일반적으로 "1 토큰, 1 투표" 기반으로 작동합니다.

**Sela 적용:**

- 노드 스테이킹 수량에 비례한 투표권
- 장기 스테이커에게 추가 가중치 부여 가능

##### 2. 이차 투표 (Quadratic Voting)

[이차 투표는 각 추가 투표의 비용을 더 많은 토큰으로 설정하여 토큰 고래의 과도한 권력 문제를 해결](https://limechain.tech/blog/dao-voting-mechanisms-explained-2022-guide)합니다. 대규모 보유자는 여전히 목소리를 내지만, 소규모 토큰 보유자의 집단적 힘이 무시되지 않습니다.

**장점:**

- 소수 고래의 독점 방지
- 커뮤니티 전체의 의견 반영
- [평등주의적 거버넌스 실현](https://limechain.tech/blog/dao-voting-mechanisms-explained-2022-guide)

##### 3. 위임 투표 (Delegated Voting)

[위임 거버넌스는 토큰 보유자가 신뢰할 수 있는 대표자에게 투표권을 위임](https://www.hord.fi/blog/most-common-governance-token-models-for-2023)할 수 있도록 합니다. 이는 모든 구성원이 모든 문제에 투표할 시간이나 전문성이 없는 대규모 DAO에서 유용하며, 정보에 입각한 대표자에게 투표를 집중시켜 의사결정을 간소화합니다.

#### 2024-2025 거버넌스 트렌드

[2024년에서 2025년으로 넘어가는 기간은 명확한 전환점](https://blog.humanode.io/daos-after-token-governance-where-governance-goes-when-capital-stops-leading/)을 나타냅니다. 여러 네트워크와 DAO가 단순히 토큰 가중 거버넌스를 개선하는 것이 아니라, 의사결정 방식, 권한 보유자, 정당성 구성 방식을 적극적으로 재설계하고 있습니다.

**멀티 하우스 거버넌스:**
[2024-2025 거버넌스의 특징은 멀티 하우스 또는 이중 거버넌스 아키텍처의 등장](https://blog.humanode.io/daos-after-token-governance-where-governance-goes-when-capital-stops-leading/)입니다. 이는 서로 다른 이해관계자의 이익을 의도적으로 분리하고 때로는 견제하는 시스템입니다.

#### Sela Network 거버넌스 영역

$SELA 토큰 보유자는 다음 사항에 대해 투표할 수 있습니다:

- **수수료 구조 조정**: 네트워크 사용료, 마켓플레이스 수수료율 변경
- **신규 기능 투표**: 프로토콜 업그레이드, 새로운 기술 통합
- **에코시스템 펀드 사용**: 개발자 그랜트, 마케팅 예산, 파트너십 투자
- **파트너십 승인**: 전략적 제휴, 통합 승인
- **슬래싱 이의 제기**: 노드 페널티에 대한 최종 결정
- **토큰노믹스 조정**: 소각률, 보상 분배 구조 변경

**투표 메커니즘:**

- 스테이크 가중 + 이차 투표 하이브리드
- 최소 7일간 제안 검토 기간
- 최소 정족수: 유통 공급량의 4%
- 승인 기준: 찬성 66% 이상

---

## 투자자 관점

### TAM (Total Addressable Market)

```
AI Agent 시장 (2030): $100B
× Sela 점유율 (보수적 15%): $15B
× Token Capture Rate (30%): $4.5B

총 SELA 공급: 10B
유통 SELA (70%): 7B
소각 후 남은 SELA (5B)

→ 목표 시가총액: $4.5B
→ 토큰당 가격: $0.9
→ 현재 가격 $0.1 가정 시 9x 잠재력
```

### 밸류에이션 비교

#### DePIN 시장 현황 (2024-2025)

[DePIN 섹터는 2025년 기준 시가총액 500억 달러를 초과](https://zypto.com/blog/top-7-depin-coins-tokens-2025/)했으며, [350개 이상의 토큰이 컴퓨팅 파워, 스토리지, 무선 연결, 에너지 그리드를 대표](https://zypto.com/blog/top-7-depin-coins-tokens-2025/)합니다. [2024년 11월 기준으로 DePIN 섹터는 320억 달러 이상의 시가총액](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)을 보여주며 엄청난 성장 잠재력을 입증했습니다.

#### 주요 DePIN 프로젝트 비교

**Filecoin (FIL) - 분산 스토리지**

- [시가총액: 53.5억 달러](https://www.aicoin.com/en/article/429069), 유통 공급량 30%
- [현재 시가총액: 15.3억 달러, 일일 거래량: 3.6466억 달러](https://zypto.com/blog/top-7-depin-coins-tokens-2025/)
- 연간 인플레이션율: 최대 27%
- [2,050명의 활성 채굴자가 약 1억 4,970만 FIL 커밋 (총 공급량의 7.49%)](https://www.aicoin.com/en/article/429069)
- 토큰노믹스: 70%는 채굴 보상, 30%는 Protocol Labs와 Filecoin Foundation 보유

**Render Network (RNDR) - 분산 렌더링**

- [RENDER 토큰은 지난 1년간 150% 이상 상승](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)
- [2024년 평균 가격 $7.51 전망](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)
- [2024년 1분기 렌더 프레임 17.7% 증가](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)

**Helium (HNT) - 분산 무선 네트워크**

- [HNT 토큰 가격: 약 $2.89](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)
- [시가총액: 5.1962억 달러, 거래량: 755만 달러](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)
- [강세 패턴으로 30% 급등하여 $8.5 도달 가능성](https://coingape.com/best-depin-projects/amp/)
- 네트워크 제공자는 핫스팟 장치의 커버리지 수준에 따라 HNT 토큰으로 보상받음

#### 비교 표

| 프로젝트     | 카테고리         | 시가총액 (2024-2025) | 주요 특징                    | Sela 대비           |
| ------------ | ---------------- | -------------------- | ---------------------------- | ------------------- |
| **Filecoin** | 분산 스토리지    | $1.5B - $5.35B       | 2,050 채굴자, 27% 인플레이션 | 유사 규모           |
| **Render**   | 분산 렌더링      | $1-2B (예상 $7.51)   | 150% 성장, GPU 렌더링        | 더 큰 AI 시장       |
| **Helium**   | 분산 통신        | $519M                | IoT 무선, $8.5 목표          | Sela가 더 큰 TAM    |
| **Sela**     | **분산 웹 접근** | **목표 $4-5B**       | **AI Agent 인프라**          | **AI 붐 직접 수혜** |

**Sela의 경쟁 우위:**

- AI Agent 시장은 2030년까지 1,000억 달러 규모로 성장 예상
- 기존 DePIN은 스토리지/컴퓨팅/무선에 집중, Sela는 **웹 접근**이라는 새로운 카테고리 개척
- zk-TLS 증명은 법적 효력을 갖춘 데이터 제공 (경쟁자 대비 차별화)

### 투자 리스크 & 완화

| 리스크               | 완화 전략                          |
| -------------------- | ---------------------------------- |
| **경쟁**             | 기술적 해자 (zk-TLS, Self-Healing) |
| **규제**             | 탈중앙화로 검열 저항               |
| **채택**             | 주요 AI 플랫폼과 파트너십          |
| **토큰 가격 변동성** | 실사용 기반 수요, 소각 메커니즘    |

---

## 시작하기

### 노드 운영자

1. [노드 판매 페이지 방문](/node-sale/introduction/what-is-sela-node/)
2. 티어 선택 및 SELA 구매
3. 확장 프로그램 설치
4. 즉시 보상 수령 시작

### 개발자

1. SDK 다운로드
2. 첫 Parser 개발
3. 마켓플레이스 출시
4. 수동적 소득 획득

### 투자자

1. 토크노믹스 심층 분석
2. 커뮤니티 Discord 참여
3. Private Sale 참여 (조건 충족 시)

---

**$SELA는 단순한 토큰이 아닙니다.
AI 에이전트 경제의 연료이자,
차세대 웹 인프라의 지분입니다.**

---

## Sources & References

### 토큰 소각 메커니즘

- [Everything You Need To Know About Token Burning in 2024 | Medium](https://medium.com/coinmonks/everything-you-need-to-know-about-token-burning-in-2024-fd83640154e6)
- [BNB Auto-Burn: What It Is and How It Works | Plisio](https://plisio.net/blog/bnb-auto-burn-what-it-is-and-how-it-works)
- [BNB Foundation Completes 28th Quarterly BNB Burn | Binance News](https://www.binance.com/en/square/post/2024-07-22-bnb-foundation-completes-28th-quarterly-bnb-burn-11130310123249)
- [29th BNB Burn | BNB Chain Blog](https://www.bnbchain.org/en/blog/29th-bnb-burn)
- [Token Burning Mechanisms | Bitcoin Suisse](https://www.bitcoinsuisse.com/research/decrypt/season-2019/token-burning-mechanisms)
- [What Does It Mean To Burn Crypto? Token Burning Explained | Transak](https://transak.com/blog/what-does-it-mean-to-burn-crypto-token-burning-explained)
- [Tokenomics in Crypto: Understanding Token Burn Explained | BlockApps](https://blockapps.net/blog/tokenomics-in-crypto-understanding-token-burn-explained/)
- [Everything About Token Burning | Tatum](https://tatum.io/blog/what-is-token-burning)

### DeFi 토큰노믹스 & 가치 환원

- [DeFi's Growing Focus on Token Value Accrual | Gate.io](https://www.gate.com/learn/articles/de-fi-s-growing-focus-on-token-value-accrual/7368)
- [Tokenomics Guide: Mastering Blockchain Token Economics 2024 | RapidInnovation](https://www.rapidinnovation.io/post/tokenomics-guide-mastering-blockchain-token-economics-2024)
- [How to Design a Sustainable Tokenomics Model in a DeFi Project | Nextrope](https://nextrope.com/how-to-design-a-sustainable-tokenomics-model-in-a-defi-project/)
- [Sustainable ERC20 Supply Models: Tokenomics Best Practices | Speed Run Ethereum](https://speedrunethereum.com/guides/sustainable-erc20-supply-models)
- [Token Distribution Guide 2025 (with Models and Examples) | TokenMinds](https://tokenminds.co/blog/token-sales/token-distribution)
- [Tokenomics — A Business Guide to Token Usage, Utility and Value | Medium](https://medium.com/@wmougayar/tokenomics-a-business-guide-to-token-usage-utility-and-value-b19242053416)
- [Tokenomics Design: An Ultimate Guide for Crypto Founders | 4ire Labs](https://4irelabs.com/articles/tokenomics-design-guide/)
- [Rethinking DeFi Tokenomics | Shima Capital](https://medium.com/shimacapital/rethinking-defi-tokenomics-4d1508ef814f)

### 스테이킹 & Work Token 모델

- [New Models for Utility Tokens | Multicoin Capital](https://multicoin.capital/2018/02/13/new-models-utility-tokens/)
- [Understanding Token Velocity | Multicoin Capital](https://multicoin.capital/2017/12/08/understanding-token-velocity/)
- [Staking Penalties | Figment](https://figment.io/insights/staking-penalties/)
- [Exploring Eth2 Slashing | Attestant](https://www.attestant.io/posts/exploring-eth2-slashing/)

### 토큰 속도 & 가치 포착

- [The Blockchain Token Velocity Problem | CoinDesk](https://www.coindesk.com/markets/2017/12/08/the-blockchain-token-velocity-problem)
- [Tokenomics in Crypto: Understanding Token Velocity and Its Implications | BlockApps](https://blockapps.net/blog/tokenomics-in-crypto-understanding-token-velocity-and-its-implications/)
- [Understanding Tokenomics in Crypto: Effective Velocity Measurement Methods | BlockApps](https://blockapps.net/blog/understanding-tokenomics-in-crypto-effective-velocity-measurement-methods/)
- [Velocity of Tokens | Newtown Partners](https://medium.com/newtown-partners/velocity-of-tokens-26b313303b77)
- [Essential Strategies To Manage Token Velocity | Outlier Ventures](https://outlierventures.io/research/essential-strategies-to-manage-velocity/)
- [Another big problem with token models: Medium of Exchange tokens and the velocity problem | freeCodeCamp](https://www.freecodecamp.org/news/single-biggest-problem-with-token-models-part-2-52c0eca2115c)
- [Cryptoasset Valuation #2: Debunking the Velocity Problem | Logos Network](https://medium.com/logos-network/cryptoasset-valuation-2-the-velocity-problem-8bbb4111c9c7)

### DAO 거버넌스 모델

- [Most Common Governance Token Models for 2024 | Hord](https://www.hord.fi/blog/most-common-governance-token-models-for-2023)
- [DAO Governance Models 2024: Ultimate Guide | RapidInnovation](https://www.rapidinnovation.io/post/dao-governance-models-explained-token-based-vs-reputation-based-systems)
- [DAOs after token governance: Where governance goes when capital stops leading? | Humanode](https://blog.humanode.io/daos-after-token-governance-where-governance-goes-when-capital-stops-leading/)
- [DAO Voting Mechanisms Explained [2022 Guide] | LimeChain](https://limechain.tech/blog/dao-voting-mechanisms-explained-2022-guide)
- [How to set your DAO governance | Aragon](https://www.aragon.org/how-to/set-your-dao-governance)
- [DAO Governance: Effectively Create And Manage Governance Tokens | Bitbond](https://www.bitbond.com/resources/dao-governance-effectively-create-and-manage-governance-tokens/)
- [Balancing Security and Liquidity: A Time-Weighted Snapshot Framework for DAO Governance Voting | arXiv](https://arxiv.org/html/2505.00888)
- [Decoding DAO Governance: Models in Action | RIF](https://rif.technology/content-hub/dao-governance-models/)
- [Analyzing Voting Power in Decentralized Governance: Who controls DAOs? | ResearchGate](https://www.researchgate.net/publication/381214311_Analyzing_Voting_Power_in_Decentralized_Governance_Who_controls_DAOs)

### DePIN 프로젝트 & 시장 분석

- [What are the core elements of the DePIN economic model? | AiCoin](https://www.aicoin.com/en/article/429069)
- [Top 5 DePIN Cryptocurrencies for 2024 | RapidInnovation](https://www.rapidinnovation.io/post/top-depin-cryptocurrencies-to-watch-in-2024)
- [Top 7 DePIN Coins & Tokens to Keep an Eye on in 2025 | Zypto](https://zypto.com/blog/top-7-depin-coins-tokens-2025/)
- [Top DePIN Crypto Projects to Know in 2025 | KuCoin Learn](https://www.kucoin.com/learn/crypto/top-depin-crypto-projects)
- [10 Best DePIN Crypto Projects & Coins to Invest in 2025 | CryptoNews](https://cryptonews.com/cryptocurrency/best-depin-coins/)
- [Top DePIN Projects Driving Web3: Helium, Filecoin, Render Network | Crypto News Flash](https://www.crypto-news-flash.com/top-depin-projects-driving-web3-helium-filecoin-render-network/)
- [The 4 Best DePIN Crypto Tokens in 2025 | ValueWalk](https://www.valuewalk.com/cryptocurrency/best-depin-tokens/)
- [DePIN Token Launches - Upcoming & Pre-Launch Projects | DePINscan](https://depinscan.io/token-launch)
- [Top 10 DePIN Coins to Invest in 2025 | DePIN Scan](https://depinscan.io/news/2024-12-30/top-10-depin-coins-to-invest-in-2025)
- [8 Best DePIN Crypto Projects To Invest in 2025 | CoinGape](https://coingape.com/best-depin-projects/amp/)
