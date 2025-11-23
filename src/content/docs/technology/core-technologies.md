---
title: 핵심 기술
description: Sela Network의 핵심 기술 상세 설명
---

## 1. Sela Node (dBrowser Node)

전 세계 사용자 또는 사업자가 운영하는 **분산 브라우저 인프라**입니다. Sela Node는 실제 사용자 브라우저를 활용하여 봇 탐지 시스템을 우회하고, 안전한 웹 인터랙션 환경을 제공합니다.

### 주요 특징

#### Fingerprint Mimicking (브라우저 지문 모방)

브라우저 핑거프린팅은 웹사이트가 사용자의 하드웨어, 소프트웨어, 설정을 식별하기 위해 사용하는 추적 기술입니다. Sela Node는 실제 인간 브라우징 패턴을 완벽하게 재현하여 봇 탐지 시스템을 우회합니다.

**핑거프린팅 기술 상세:**

[Multilogin의 Canvas Fingerprinting 분석](https://multilogin.com/blog/the-great-myth-of-canvas-fingerprinting/)과 [OctoBrowser의 핑거프린팅 기술 연구](https://blog.octobrowser.net/canvas-audio-and-webgl-an-in-depth-analysis-of-fingerprinting-technologies)에 따르면, 현대 봇 탐지는 다음 요소들을 결합하여 사용자를 식별합니다:

**1. Canvas Fingerprinting**
- Canvas API가 그래픽을 렌더링할 때, 각 디바이스는 하드웨어와 소프트웨어 차이로 인해 미세한 픽셀 변화를 생성합니다
- 스크립트가 보이지 않는 캔버스 요소를 생성하고, 텍스트와 도형을 그린 뒤, 결과 이미지를 픽셀 배열로 읽어 해시값을 생성합니다
- 연구에 따르면 Canvas 핑거프린팅만으로 **60% 이상의 사용자를 고유하게 식별** 가능합니다

**2. WebGL Fingerprinting**
- Canvas가 2D 렌더링 차이를 드러낸다면, WebGL은 GPU 자체를 깊이 탐색합니다
- `WEBGL_debug_renderer_info` 확장을 통해 GPU 제조사와 모델 정보를 수집합니다 (예: Intel Inc., Intel Iris Plus Graphics 640)
- [WebBrowserTools의 WebGL 핑거프린트 분석](https://webbrowsertools.com/webgl-fingerprint/)에 따르면, WebGL은 Canvas보다 더 고유한 데이터를 제공하지만 안정성은 낮습니다
- 대부분의 웹사이트는 정확도를 극대화하기 위해 **Canvas와 WebGL을 함께** 사용합니다

**3. AudioContext Fingerprinting**
- 스크립트가 숨겨진 오디오 컨텍스트(주로 OfflineAudioContext)를 생성합니다
- 발진기(oscillator)가 고정 주파수 톤(예: 1,000Hz 삼각파)을 생성합니다
- 하드웨어 차이를 확대하기 위해 신호가 컴프레서 같은 오디오 효과를 거칩니다
- 오디오 처리 파이프라인(하드웨어, OS, 드라이버, 브라우저 구현)이 작은 차이를 도입하며, 최종 해시된 오디오 출력이 핑거프린트로 사용됩니다
- [Coronium.io의 2025 브라우저 핑거프린트 가이드](https://www.coronium.io/blog/browser-fingerprint-detection-guide)에 따르면, Safari 17은 Private 모드에서 AudioContext API에 의도적으로 무작위성을 주입하여 대응합니다

**4. 기타 핑거프린팅 요소**
- **User Agent**: 브라우저 및 OS 정보
- **Screen Resolution**: 화면 해상도 및 픽셀 밀도
- **Timing Patterns**: 마우스 움직임, 타이핑 속도, 클릭 간격
- **설치된 폰트**: 시스템에 설치된 글꼴 목록
- **플러그인 및 확장**: navigator.plugins를 통한 플러그인 탐지
- **CPU 코어 수**: navigator.hardwareConcurrency

**Sela Node의 우회 전략:**

[Multilogin의 브라우저 핑거프린팅 가이드](https://multilogin.com/blog/browser-fingerprinting-the-surveillance-you-can-t-stop/)와 [ZenRows의 핑거프린팅 우회 방법](https://www.zenrows.com/blog/browser-fingerprinting)에 따르면, 2025년 현재 핑거프린팅은 **머신러닝 분석, 행동 패턴 인식, 하드웨어 레벨 서명을 결합한 다층 식별 시스템**으로 진화했으며, 제어된 환경에서 **80-90% 정확도**를 달성합니다.

Sela Node는 실제 사용자 브라우저를 활용하므로:
- 합성 핑거프린트가 아닌 **진짜 브라우저 환경** 제공
- 하드웨어 다양성으로 자연스러운 핑거프린트 분포 생성
- 실제 사용자 행동 패턴과 구별 불가능

**우회 성공률:**

[ZenRows의 Akamai 우회 가이드](https://www.zenrows.com/blog/bypass-akamai)와 [Kameleo의 DataDome 우회 분석](https://kameleo.io/blog/guide-to-bypassing-datadome)에 따르면:
- 표준 Selenium, Puppeteer, Playwright는 **명백한 봇 신호** 노출 (HeadlessChrome 플래그, 누락된 플러그인)
- DataDome과 Akamai는 JavaScript 핑거프린팅, JA3 핑거프린팅, TLS 핑거프린트 분석을 조합합니다
- [ScrapFly의 Cloudflare 우회 가이드](https://scrapfly.io/blog/posts/how-to-bypass-cloudflare-anti-scraping)에 따르면, Cloudflare는 여러 신호를 결합하여 세션이 진짜인지 자동화인지 판단합니다

Sela의 실제 브라우저 네트워크는 이러한 모든 탐지 메커니즘을 **근본적으로 우회**합니다.

#### Isolation Sandbox (격리 샌드박스)

Sela Node는 사용자의 개인 브라우저에서 실행되지만, 민감한 정보에는 접근할 수 없도록 설계되었습니다. 이는 노드 운영자의 프라이버시를 보호하면서도 네트워크에 기여할 수 있게 합니다.

**보안 격리 메커니즘:**

Sela Node는 브라우저의 샌드박스 기술을 활용하여 작업을 독립된 환경에서 실행합니다:

- **쿠키 및 세션 정보 격리**: Sela 작업은 사용자의 로그인 세션과 완전히 분리된 별도의 쿠키 저장소 사용
- **로컬 스토리지 분리**: localStorage, sessionStorage, IndexedDB 등 모든 브라우저 저장소가 독립적으로 운영
- **계정 정보 보호**: 사용자의 저장된 비밀번호, 결제 정보, 개인 설정에 접근 불가
- **독립된 실행 컨텍스트**: 사용자의 브라우징 히스토리, 북마크, 확장 프로그램 데이터와 격리

이러한 격리는 [Web Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)의 권한 모델을 따르며, 최소 권한 원칙(Principle of Least Privilege)을 준수합니다.

**노드 운영자 보호:**

- 작업 실행 중에도 사용자는 일반 브라우징 가능
- Sela 작업은 백그라운드에서 격리되어 실행
- 민감한 웹사이트(뱅킹, 의료 등)는 자동으로 제외 목록에 추가

#### Geo-Distributed Execution (지역 분산 실행)

Sela Network는 전 세계에 분산된 노드를 활용하여 지역별 최적화된 웹 접근을 제공합니다. 이는 지역 제한 콘텐츠 접근, 레이턴시 감소, 정확한 현지화 데이터 수집에 필수적입니다.

**지역별 노드 선택 알고리즘:**

Sela Gateway는 다음 기준으로 최적 노드를 선택합니다:

1. **지리적 근접성**: 대상 웹사이트와 같은 국가/지역의 노드 우선 선택
2. **레이턴시**: 평균 응답 시간이 가장 낮은 노드 선택
3. **노드 성능**: CPU 사용률, 메모리 가용성, 네트워크 대역폭 고려
4. **부하 분산**: 특정 노드에 작업이 집중되지 않도록 분산

**지역별 최적화 예시:**

```
한국 쿠팡 데이터 요청 → 서울/부산 노드 실행
미국 Amazon 데이터 요청 → 뉴욕/캘리포니아 노드 실행
일본 라쿠텐 데이터 요청 → 도쿄/오사카 노드 실행
유럽 GDPR 준수 데이터 → EU 지역 노드만 사용
```

**구체적 이점:**

**1. 지역 제한 콘텐츠 접근**
- 넷플릭스, BBC iPlayer 등 지역 제한 스트리밍 서비스의 메타데이터 수집
- 중국 내 웹사이트(Baidu, Taobao)에 중국 노드로 접근
- 정부 규제로 인한 접근 제한 우회

**2. 낮은 레이턴시**
- 물리적 거리 최소화로 왕복 시간(RTT) 감소
- 평균 레이턴시: 동일 대륙 내 50-100ms, 대륙 간 200-300ms
- 실시간 데이터 수집 시 응답 속도 향상

**3. 정확한 지역 맞춤 콘텐츠**
- 동일 웹사이트도 지역별로 다른 가격, 재고, 프로모션 표시
- 예: Amazon.com은 미국 IP에서 접근 시와 한국 IP에서 접근 시 배송 옵션 및 가격이 다름
- 현지화된 검색 결과 및 추천 알고리즘 데이터 수집

**4. CDN 비용 절감**
- 웹사이트 서버와 같은 CDN 엣지 서버에서 데이터 다운로드
- 대역폭 비용 최소화 (동일 리전 내 데이터 전송은 무료 또는 저렴)

#### Action Automation (액션 자동화)

Sela Node는 복잡한 웹 인터랙션을 사람처럼 자연스럽게 수행할 수 있도록 설계되었습니다. 단순한 클릭을 넘어, 현대 웹 애플리케이션의 모든 상호작용을 지원합니다.

**지원 액션 상세:**

**1. 클릭 (Click)**
- 좌클릭, 우클릭, 더블클릭, 중간 버튼 클릭
- 인간처럼 무작위 지점 클릭 (요소 중심이 아닌 자연스러운 위치)
- 클릭 전 마우스 움직임 시뮬레이션 (직선이 아닌 곡선 경로)

**2. 스크롤 (Scroll)**
- 부드러운 스크롤 애니메이션 (급격한 점프 방지)
- 무한 스크롤 페이지 자동 감지 및 로딩 대기
- 특정 요소가 보일 때까지 스크롤 (예: 페이지 하단 "더 보기" 버튼)

**3. 텍스트 입력 (Type)**
- 인간 타이핑 속도 모방 (150-300ms/문자, 무작위 변동)
- 가끔 오타 발생 후 백스페이스로 수정 (더 자연스러운 패턴)
- 폼 자동 완성 트리거 대기

**4. 파일 다운로드 (Download)**
- 브라우저 다운로드 대화상자 자동 처리
- 다운로드 완료 대기 및 검증
- 파일명 및 경로 관리

**5. 파일 업로드 (Upload)**
- `<input type="file">` 요소 자동 탐지
- 드래그 앤 드롭 업로드 지원
- 여러 파일 동시 업로드

**6. 드래그 앤 드롭 (Drag & Drop)**
- Trello, Asana 같은 칸반 보드 조작
- 이미지 크롭 도구 조작
- 커스텀 UI 요소 재배치

**7. 대기 (Wait)**
- JavaScript 로딩 완료 대기
- AJAX 요청 완료 대기
- 특정 DOM 요소 출현 대기 (최대 타임아웃 설정 가능)
- 네트워크 Idle 상태 감지 (모든 요청 완료)

**8. 요소 검색 (Find Element)**
- CSS Selector, XPath, 텍스트 내용으로 요소 탐색
- 동적 요소 재시도 로직 (요소가 나타날 때까지 반복)
- Shadow DOM 내부 요소 접근
- iframe 경계를 넘어 요소 탐색

**행동 패턴 모방:**

[Kameleo의 DataDome 우회 분석](https://kameleo.io/blog/guide-to-bypassing-datadome)에 따르면, 고급 봇 탐지는 **행동 패턴**을 분석합니다:
- 마우스 움직임의 가속도 및 감속도
- 클릭 전 호버(hover) 시간
- 페이지 체류 시간 및 스크롤 패턴
- 키 입력 간격의 자연스러운 변동

Sela Node는 이러한 모든 패턴을 실제 사용자처럼 재현하기 위해 **ghost-cursor** 같은 라이브러리를 활용하여 현실적인 마우스 움직임을 생성합니다.

---

## 2. Semantic Rendering Engine (SRE)

Semantic Rendering Engine은 HTML 파싱을 넘어 UI의 **"의미(semantic)"**를 이해하는 차세대 웹 데이터 추출 엔진입니다. 전통적인 CSS Selector 기반 스크래핑과 달리, SRE는 Vision Language Model과 DOM 분석을 결합하여 웹 페이지의 의도와 구조를 파악합니다.

### Hybrid Parsing (하이브리드 파싱)

Vision과 DOM 파싱을 결합한 업계 최초의 통합 접근 방식입니다. 이는 단순 HTML 태그 분석의 한계를 넘어, 인간이 웹페이지를 이해하는 방식을 모방합니다.

#### Vision-Based Parsing (시각 기반 파싱)

**Vision Language Model (VLM) 활용:**

[Google Research의 ScreenAI](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)는 UI 및 인포그래픽 이해를 위해 특별히 설계된 Vision-Language 모델로, **5B 파라미터만으로 UI 기반 작업(WebSRC, MoTIF)에서 최고 성능**을 달성했습니다. ScreenAI는 화면에서 UI 요소 정보(유형, 위치, 설명)를 식별하는 Screen Annotation 작업으로 훈련되었습니다.

[MobileVLM (2024년 9월-10월)](https://arxiv.org/abs/2409.14818)은 모바일 UI 이해를 향상시키기 위해 개발되었으며, 300만 개의 정적 UI 페이지와 실제 UI 전환 액션으로 형성된 방향 그래프 구조를 포함하는 **Mobile3M**이라는 대규모 중국어 모바일 UI 코퍼스를 구축했습니다.

**Sela SRE의 VLM 기능:**

[Hugging Face의 VLM 가이드](https://huggingface.co/blog/vlms)와 [Apple ML Research의 FastVLM](https://machinelearning.apple.com/research/fast-vision-language-models)에 따르면, 최신 VLM은 다음을 수행할 수 있습니다:

- **버튼 위치 인식**: 화면에서 클릭 가능한 요소의 정확한 좌표 탐지
- **색상 및 스타일 인식**: 시각적 계층 구조 파악 (Primary/Secondary 버튼 구분)
- **레이블 텍스트 인식**: OCR 없이 UI 요소 내 텍스트 직접 읽기
- **레이아웃 구조 이해**: 헤더, 사이드바, 메인 콘텐츠, 푸터 등 페이지 구조 파악

**정확도 및 성능:**

[App VLM (2025년 2월)](https://arxiv.org/html/2502.06395v1)은 효율성과 분포 외 작업에 대한 강력한 일반화를 달성하는 경량 앱 에이전트로, 실시간 실행을 위한 빠르고 비용 효율적인 추론을 가능하게 합니다.

FastVLM은 다른 비전 인코더 대비 **최고의 정확도-레이턴시 트레이드오프**를 달성하며, ViT-L/14 대비 **약 8배 작고 20배 빠릅니다**. VLM 정확도는 일반적으로 높은 이미지 해상도에서 향상되며, 특히 **문서 분석 및 UI 인식** 같은 세밀한 이해가 필요한 작업에서 두드러집니다.

#### DOM-Based Parsing (DOM 기반 파싱)

**구조적 의미 추출:**

[SerpAPI의 AI 기반 HTML 파싱 연구](https://serpapi.com/blog/web-scraping-with-ai-parsing-html-to-structured-data/)와 [WebScraping.AI의 LLM 구조화 데이터 추출](https://webscraping.ai/faq/scraping-with-llms/how-do-i-extract-structured-data-from-html-using-llms)에 따르면, AI 모델은 파서를 작성하지 않고도 웹 스크래핑에 필요한 데이터를 수집할 수 있으며, 이는 웹사이트가 레이아웃을 자주 업데이트할 때 특히 유용합니다.

Sela SRE의 DOM Parser는 다음을 추출합니다:

- **HTML 태그 계층 구조**: 부모-자식 관계를 통한 데이터 컨텍스트 파악
  ```html
  <article>
    <h2>제목</h2>
    <p>내용</p>
  </article>
  ```
  → SRE 해석: "이 제목과 내용은 하나의 기사를 구성함"

- **시맨틱 태그 (Semantic HTML5)**: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` 등
  - 시맨틱 태그는 페이지의 의도를 명확히 전달
  - 예: `<nav>` 안의 링크는 내비게이션, `<article>` 안의 텍스트는 주요 콘텐츠

- **링크 및 참조 관계**: `<a href>`, `<link>`, `rel` 속성을 통한 페이지 간 관계
  - Canonical URL 식별
  - 관련 페이지 탐색 경로 구축

- **폼 및 입력 필드**: `<form>`, `<input>`, `<select>`, `<textarea>` 요소
  - 로그인 폼, 검색 폼, 결제 폼 자동 식별
  - 필수 입력 필드 및 유효성 검사 규칙 파악

#### 결합 효과: Vision + DOM의 시너지

[OakHeartLab의 AI 시대 웹 스크래핑 재구상](https://www.oakheartlab.com/p/reimagining-web-scraping-in-the-age)과 [WebScraping.AI의 Claude AI 텍스트 추출](https://webscraping.ai/faq/scraping-with-claude/how-do-i-extract-text-from-html-using-claude-ai)에 따르면, Claude AI는 **DOM 조작이 아닌 의미론적 이해를 기반으로** HTML 문서를 처리하고 텍스트를 추출합니다. 이 접근 방식은 DOM 요소 ID나 클래스가 아닌 의미론적 이해를 사용하여 변경에 대한 복원력을 제공합니다.

**통합 프로세스:**

```
Vision Parser                  +                 DOM Parser
     ↓                                                 ↓
"화면 우측 상단에                        <button class="checkout-btn">
파란색 버튼이 있음"                        Proceed to Checkout
                                             </button>
     ↓                                                 ↓
         ========================================
                      통합 분석
         ========================================
                          ↓
              완벽한 의미 추출
                          ↓
         {
           "element_type": "button",
           "action": "proceed_to_checkout",
           "visual_prominence": "primary",
           "location": "top_right",
           "text": "Proceed to Checkout"
         }
```

**실제 예시:**

Amazon 상품 페이지에서:
- **Vision**: "오른쪽에 큰 주황색 버튼"
- **DOM**: `<button id="buy-now-button">Buy Now</button>`
- **통합 결과**: "이것은 구매 액션을 트리거하는 주요 CTA 버튼"

쿠팡 검색 결과에서:
- **Vision**: "상품 이미지, 가격, 별점이 카드 형태로 배열됨"
- **DOM**: `<li class="product-item">...</li>` 반복
- **통합 결과**: "이것은 상품 목록이며, 각 아이템은 동일한 구조를 가짐"

### Self-Healing Selector Engine

웹사이트는 끊임없이 UI를 업데이트합니다. 전통적인 CSS Selector 기반 스크래핑은 웹사이트가 클래스 이름이나 DOM 구조를 변경하면 즉시 실패합니다. Sela의 Self-Healing Engine은 이 문제를 근본적으로 해결합니다.

#### 동작 원리

**1. 초기 매핑 (Initial Mapping)**
- 첫 방문 시 웹 페이지의 모든 주요 UI 요소를 다중 속성으로 식별합니다
- 단일 Selector가 아닌 **다중 식별자 조합** 저장:
  ```javascript
  {
    "primary": "button.buy-now",
    "fallbacks": [
      "button[data-action='purchase']",
      "button:contains('Buy Now')",
      "div#product-actions > button:first-child"
    ],
    "visual_signature": {
      "color": "#FF9900",
      "position": "right_sidebar",
      "size": "large"
    }
  }
  ```

**2. 변경 감지 (Change Detection)**
- 매 요청마다 DOM 구조의 해시값 계산
- 이전 방문 대비 구조 변경 감지 시 재분석 트리거
- 타겟 요소 미발견 시 fallback Selector 순차 시도

**3. 재매핑 (Remapping)**
- Vision Parser가 화면을 다시 분석하여 동일한 **시각적 특징**을 가진 요소 탐색
- 예: "우측 사이드바의 큰 주황색 버튼"
- DOM Parser가 의미론적으로 동일한 요소 탐색
- 예: `<button>` 태그 중 "Buy", "Purchase", "Order" 등 유사 텍스트 포함

**4. 검증 및 학습 (Validation & Learning)**
- 새로 탐지한 요소가 예상 데이터 타입과 일치하는지 검증
- 예: 가격 필드는 숫자 + 통화 기호여야 함
- 검증 성공 시 새 Selector를 primary로 업데이트
- 네트워크 전체에 업데이트 배포

#### 실제 예시

**쿠팡 UI 변경 시:**

```
[ 2024년 1월 ]
쿠팡이 클래스 이름 변경
변경 전: button.rocket-buy-button
변경 후: button.quick-purchase-btn

[ 전통적 스크래퍼 ]
→ 에러 발생: "Element not found"
→ 개발자가 수동으로 코드 수정 필요
→ 서비스 중단 (수 시간 ~ 수일)

[ Sela Self-Healing ]
→ Primary selector 실패 감지
→ Fallback 시도: button[data-purchase='rocket']
→ Fallback도 실패
→ Vision Parser 작동: "우측 하단 큰 로켓 배송 버튼"
→ 새 selector 탐지: button.quick-purchase-btn
→ 검증: 클릭 시 장바구니 추가 확인
→ 네트워크에 업데이트 전파
→ 총 소요 시간: 5초 미만, 서비스 중단 없음
```

**Amazon 가격 변경 시:**

```
[ 변경 사항 ]
Amazon이 가격 표시 HTML 구조 변경
변경 전: <span class="price">$19.99</span>
변경 후: <div class="new-price-box">
           <span class="amount">19</span>
           <span class="cents">99</span>
         </div>

[ Sela Self-Healing ]
→ 기존 selector 실패
→ Vision Parser: "상품 이미지 우측의 큰 검은색 숫자"
→ DOM Parser: 숫자 패턴 탐색 (\d+\.\d+)
→ 새 구조 인식 및 조합: amount + "." + cents
→ JSON 출력은 동일하게 유지: {"price": 19.99}
→ 사용자 측 코드 변경 불필요
```

#### 지원 범위

Self-Healing Engine은 모든 주요 전자상거래 및 콘텐츠 사이트를 지원합니다:

- **한국**: 쿠팡, 네이버 쇼핑, 11번가, G마켓, 쿠팡이츠, 배달의민족, 요기요
- **글로벌**: Amazon, eBay, Walmart, AliExpress, Shopify 기반 스토어
- **소셜 미디어**: Twitter/X, Instagram, Facebook (공개 데이터)
- **뉴스**: 주요 뉴스 사이트의 기사 본문 및 메타데이터

### Schema Normalization (스키마 정규화)

LLM 기반 HTML→JSON 변환의 가장 큰 문제는 **매번 다른 출력 스키마**입니다. 같은 Amazon 상품 페이지를 10번 파싱하면 10개의 다른 JSON 구조가 나올 수 있습니다. Sela SRE는 이를 완전히 해결합니다.

#### 정규화 메커니즘

**1. 도메인별 스키마 템플릿**

Sela는 각 도메인 유형(전자상거래, 뉴스, 소셜 미디어 등)에 대해 사전 정의된 스키마 템플릿을 유지합니다:

```json
// E-commerce Product Schema (Amazon, 쿠팡, eBay 등)
{
  "$schema": "https://schema.sela.network/v1/product",
  "product": {
    "id": "string",           // 상품 고유 ID
    "name": "string",          // 상품명
    "brand": "string",         // 브랜드
    "price": {
      "amount": "number",      // 가격
      "currency": "string",    // 통화 (USD, KRW, etc.)
      "original": "number",    // 할인 전 가격 (선택)
      "discount_percentage": "number"  // 할인율 (선택)
    },
    "availability": "boolean",  // 재고 여부
    "rating": {
      "score": "number",       // 평점 (0-5)
      "count": "number"        // 리뷰 수
    },
    "images": ["string"],      // 이미지 URL 배열
    "specifications": {        // 스펙 (키-값 쌍)
      "key": "value"
    }
  }
}
```

**2. 자동 필드 매핑**

SRE는 추출한 데이터를 템플릿에 자동으로 매핑합니다:

```
웹페이지에서 추출:
- "Product: Apple AirPods Pro"
- "$249.99 (was $299.99)"
- "★★★★☆ 4.7 (12,543 reviews)"

↓ 자동 매핑 ↓

정규화된 JSON:
{
  "product": {
    "name": "Apple AirPods Pro",
    "price": {
      "amount": 249.99,
      "currency": "USD",
      "original": 299.99,
      "discount_percentage": 16.67
    },
    "rating": {
      "score": 4.7,
      "count": 12543
    }
  }
}
```

**3. 타입 강제 (Type Enforcement)**

- 가격은 항상 `number` (문자열 "$249.99" → 숫자 249.99)
- 날짜는 ISO 8601 형식 ("Jan 15, 2024" → "2024-01-15T00:00:00Z")
- 불리언은 true/false ("In Stock" → true)

**AI 에이전트 안정성 확보:**

[이전에 언급한 OpenAI Structured Outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/)에서 GPT-4o-2024-08-06 모델이 **100% JSON 스키마 준수**를 달성했지만, 이는 프롬프트에 스키마를 명시해야 합니다. Sela는 이를 자동화하여:

- **예측 가능한 데이터 구조**: 동일 URL은 항상 동일 스키마
- **에러 처리 간소화**: 타입 불일치 에러 사전 방지
- **빠른 통합**: AI 에이전트가 즉시 Sela 출력 사용 가능
- **유지보수 부담 감소**: 웹사이트 변경 시에도 스키마 유지

---

## 3. zk-TLS: Verifiable Web Proof Layer

zk-TLS는 Sela Network의 가장 핵심적인 차별점이자, 웹 데이터의 신뢰성을 암호학적으로 보장하는 혁신적 기술입니다. 현재 웹 인터랙션은 데이터의 출처를 증명할 방법이 없지만, Sela는 이를 가능하게 만듭니다.

### 개요: 검증 가능한 웹의 필요성

[zkPass의 zkTLS 분석](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754)과 [Oasis Network의 verifiable web 연구](https://oasis.net/blog/zktls-blockchain-security)에 따르면, **TLS는 암호화는 제공하지만 검증은 불가능**합니다. TLS 암호화 체계는 데이터나 출처를 검증하는 증명을 생성할 수 없으며, 본질적으로 이것이 바로 zkTLS가 해결하는 문제입니다.

**기존 문제:**
- 스크린샷은 조작 가능
- API 응답은 중간자 공격에 취약
- 웹 데이터는 법적 증거로 인정 불가
- 감사 추적(Audit Trail) 부재

**Sela의 해결책:**

AI 에이전트가 받은 데이터가 **실제 웹 서버에서 온 것임을 암호학적으로 증명**합니다. 누구도 데이터를 조작할 수 없고, 출처를 위조할 수 없습니다.

### 핵심 기술

#### TLS Attestation with Multi-Party Computation

[arXiv의 TLSNotary 프로토콜 리뷰](https://arxiv.org/html/2409.17670v1)와 [Binance의 zkTLS 가이드](https://www.binance.com/en/square/post/2024-09-01-understanding-zktls-enhancing-web-security-with-zero-knowledge-proofs-12941846073018)에 따르면, zkTLS는 **표준 TLS 프로토콜을 Zero-Knowledge Proofs와 Secure Multi-Party Computation (MPC)을 사용하여 확장**하여 서버 측 조정이나 권한 없이 증명을 달성합니다.

**프로세스 상세:**

**1. TLS Handshake 캡처**

```
Client (Prover)  ←→  Server (웹사이트)
         ↓
    TLS 1.3 Handshake
    - Client Hello
    - Server Hello
    - 인증서 교환
    - 키 교환 (ECDHE)
    - 세션 키 생성
```

일반적인 브라우저-서버 통신에서 클라이언트는 서버와의 TLS 세션을 단독으로 제어합니다. zkTLS에서는 이 과정에 **Verifier(검증자)**가 참여합니다.

**2. Multi-Party Computation (MPC)**

[TLSNotary 프로토콜 설명](https://arxiv.org/html/2409.17670v1)에 따르면, TLSNotary는 3단계로 구성됩니다:

- **첫째**, Prover(클라이언트)가 TLS를 통해 서버에서 데이터를 요청하면서 Verifier와 안전한 MPC를 수행합니다
- **둘째**, Prover가 선택적으로 데이터를 Verifier에게 공개합니다
- **셋째**, Verifier가 데이터를 검증합니다

이 과정에서 TLS 세션 키가 Prover와 Verifier 간에 분할(sharding)됩니다. 즉, 어느 한쪽도 단독으로 전체 키를 소유하지 않으므로, Prover는 데이터를 위조할 수 없습니다.

**3. Zero-Knowledge Proof 생성**

[Shoal.gg의 zkTLS 분석](https://www.shoal.gg/p/zktls-verifiable-data-composability)과 [Gate.io의 zkTLS 가이드](https://www.gate.com/learn/articles/zk-tls-unlocking-crypto-consumer-apps/7509)에 따르면, zkTLS는 **데이터 자체를 공개하지 않고도 데이터의 진위성을 검증**할 수 있도록 Zero-Knowledge Proofs를 작동시킵니다.

생성되는 증명:
```javascript
{
  "proof_type": "zk-TLS",
  "server": "amazon.com",
  "certificate_chain": "...",  // 서버 인증서
  "timestamp": 1736982445,     // Unix timestamp
  "data_hash": "0xabc123...",  // 데이터의 해시
  "zk_proof": "...",           // 영지식 증명
  "selective_disclosure": {     // 선택적 공개
    "product_id": "B08X4YZ123",
    "price": "REDACTED"         // 민감 정보는 숨김
  }
}
```

**4. 온체인/오프체인 검증**

생성된 증명은 다음 방식으로 검증됩니다:
- **온체인 검증**: 스마트 컨트랙트가 증명을 검증하고 결과를 블록체인에 기록
- **오프체인 검증**: 누구나 증명 파일을 다운로드하여 독립적으로 검증 가능

**증명 내용:**

- **서버 인증서 검증**: 데이터가 실제 amazon.com에서 왔음을 증명
- **데이터 무결성**: 전송 중 변조되지 않았음을 증명
- **타임스탬프**: 정확한 데이터 수집 시점 증명
- **전송 경로**: TLS 세션의 완전성 증명

#### Selective Disclosure with Zero-Knowledge

**프라이버시 보호 메커니즘:**

[Olympix AI의 zkTLS 프라이버시 분석](https://medium.com/@olympixai/zktls-maximizing-web-privacy-through-zero-knowledge-transport-layer-security-96cd17df33dc)과 [Bastian Wetzel의 TLS Oracles 연구](https://bwetzel.medium.com/tls-oracles-liberating-private-web-data-with-cryptography-e66e5fad7c34)에 따르면, zkTLS는 **개인 데이터를 실제로 공개하지 않고도 검증을 가능**하게 합니다.

**실제 사용 예:**

**사례 1: 은행 잔고 증명 (금융)**
```
증명 내용:
- "이 사용자의 은행 잔고는 $10,000 이상입니다"
- 데이터 출처: chase.com
- 조회 시간: 2024-01-15 10:30:00 UTC
- 검증: ✓ TLS 인증서 유효
- 검증: ✓ 데이터 무결성 확인

공개되지 않는 정보:
- 정확한 잔고 금액
- 계좌 번호
- 거래 내역
```

**사례 2: 뉴스 기사 진위 (미디어)**
```
증명:
"이 뉴스 기사는 2024년 1월 15일 09:00 UTC에
실제 bloomberg.com 서버에서 수집되었으며,
그 이후 변조되지 않았음"

→ 가짜 뉴스 방지
→ 법정 증거로 활용 가능
→ 감사 추적 완벽 보장
```

**사례 3: 의료 데이터 검증 (헬스케어)**
```
증명:
- 환자의 COVID-19 음성 검사 결과
- 데이터 출처: hospital-system.org
- 검사 날짜: 2024-01-10
- 검증: ✓ 병원 서버에서 직접 수집
- 검증: ✓ 변조 불가능

공개되지 않는 정보:
- 환자 이름
- 주민등록번호
- 기타 의료 기록
```

**기술적 구현:**

[TLSNotary](https://tlsnotary.org/zktls-day/)는 **선택적 공개를 위해 garbled circuits와 키 샤딩 기술**을 사용하지만 ZKP는 사용하지 않습니다. Sela는 TLSNotary의 MPC 접근 방식과 최신 ZK-SNARK 기술을 결합하여 더 강력한 프라이버시를 제공합니다.

### zkTLS 생태계 및 주요 프로젝트

[0xZap의 zkTLS 소개](https://medium.com/@0xzap/introduction-to-zap-bridging-real-world-data-with-zktls-5837711609d0)에 따르면, zkTLS와 관련된 주요 프로젝트는 다음과 같으며 각각 고유한 접근 방식과 초점을 가지고 있습니다:

- **TLSNotary**: MPC 기반 TLS 증명의 선구자, garbled circuits 활용
- **DECO (Chainlink)**: 오라클 네트워크와 통합된 데이터 증명
- **PADO Labs**: 프라이버시 보존 데이터 컴퓨팅
- **zkPass**: 모바일 최적화 zkTLS 구현
- **Reclaim Protocol**: 웹2 데이터를 웹3로 연결

Sela는 이 중 TLSNotary의 MPC 기술을 기반으로 하되, ZK-SNARK를 추가하여 더 강력한 프라이버시와 효율성을 제공합니다.

### 산업별 활용 사례

[Gate.io의 zkTLS 활용 분석](https://www.gate.com/learn/articles/zk-tls-unlocking-crypto-consumer-apps/7509)에 따르면, zkTLS의 잠재적 활용 사례는 다음과 같습니다:

**1. 신원 확인 (Identity Verification)**
- 정부 발급 ID를 개인 데이터 노출 없이 검증
- KYC 프로세스 간소화
- 크로스 보더 인증

**2. 소셜 네트워크 (Social Networks)**
- 팔로워 수, 참여도 검증
- 소셜 그래프 데이터 이동성
- 영향력 증명

**3. 암호 자산 증명 (Crypto Asset Proof)**
- 거래소 잔고 증명 (금액 비공개)
- 포트폴리오 보유 검증
- 담보 증명

**4. DeFi 대출 (DeFi Lending)**
- 신용 점수 증명 (상세 정보 비공개)
- 소득 검증
- 대출 자격 심사 자동화

**5. 의료 데이터 공유 (Medical Data Sharing)**
- 백신 접종 증명
- 처방전 검증
- 임상 시험 데이터 무결성

### 기술적 비교: Sela zk-TLS vs 기존 방식

| 항목             | 전통적 스크래핑 | API 접근         | Sela zk-TLS        |
| ---------------- | --------------- | ---------------- | ------------------ |
| 데이터 출처 증명 | 불가능          | 서버 신뢰 필요   | 암호학적 증명      |
| 조작 방지        | 취약 (조작 쉬움) | 중간자 공격 가능 | 변조 불가능        |
| 프라이버시       | 노출 위험 높음  | 서버가 모든 정보 확인 | Zero-Knowledge 보호 |
| 법적 효력        | 없음            | 제한적           | 법정 증거 가능     |
| 감사 가능성      | 제한적          | 로그 의존        | 완벽한 추적        |
| 확장성           | 낮음 (봇 차단)  | API 한도 제한    | 무제한 (분산 네트워크) |
| 비용             | 높음 (프록시)   | API 요금         | 토큰 이코노미      |

---

## 기술 통합 효과

### 시너지 효과

```
Sela Node (접근)
    +
SRE (이해)
    +
zk-TLS (증명)
    =
완벽한 AI 웹 에이전트
```

### 실제 워크플로우 예시

**"아마존에서 에어팟 최저가 검색 후 주문"**

1. **Sela Node**: 아마존 접속 (Bot 탐지 우회)
2. **SRE**: 상품 목록을 JSON으로 변환
3. **zk-TLS**: 가격 데이터 출처 증명
4. **AI Agent**: 최저가 상품 선택
5. **Sela Node**: 장바구니 추가 및 결제 페이지 이동
6. **zk-TLS**: 주문 내역 증명 생성
7. **완료**: 검증 가능한 주문 완료

---

이 세 가지 핵심 기술의 완벽한 결합으로 Sela Network는 AI 에이전트가 웹에서 **안전하게**, **효율적으로**, **검증 가능하게** 작동할 수 있는 환경을 제공합니다.

---

## Sources & References

### Browser Fingerprinting & Detection
- [Multilogin - Canvas Fingerprinting: Complete Protection Guide (2025)](https://multilogin.com/blog/the-great-myth-of-canvas-fingerprinting/)
- [OctoBrowser - Canvas, Audio and WebGL: In-Depth Analysis](https://blog.octobrowser.net/canvas-audio-and-webgl-an-in-depth-analysis-of-fingerprinting-technologies/)
- [Multilogin - Browser Fingerprinting: Complete Guide (2025)](https://multilogin.com/blog/browser-fingerprinting-the-surveillance-you-can-t-stop/)
- [WebBrowserTools - Detect WebGL Fingerprint](https://webbrowsertools.com/webgl-fingerprint/)
- [Coronium.io - Browser Fingerprint Detection Guide (2025)](https://www.coronium.io/blog/browser-fingerprint-detection-guide)
- [ZenRows - What Is Browser Fingerprinting and How to Bypass it?](https://www.zenrows.com/blog/browser-fingerprinting)
- [Web Scraping Club - Browser Fingerprinting 101](https://substack.thewebscraping.club/p/browser-fingerprinting-how-it-works)

### Bot Detection Bypass & Anti-Bot Systems
- [ZenRows - How to Bypass Akamai in 2025](https://www.zenrows.com/blog/bypass-akamai)
- [ZenRows - How to Bypass DataDome: Complete Guide 2025](https://www.zenrows.com/blog/datadome-bypass)
- [Kameleo - Guide to Bypassing DataDome in 2025](https://kameleo.io/blog/guide-to-bypassing-datadome)
- [ScrapFly - How to Bypass Cloudflare When Web Scraping in 2025](https://scrapfly.io/blog/posts/how-to-bypass-cloudflare-anti-scraping/)
- [GitHub - Notes for bypassing Cloudflare, Akamai, etc.](https://gist.github.com/0xdevalias/b34feb567bd50b37161293694066dd53)
- [BrightData - Web Scraping With Undetected ChromeDriver](https://brightdata.com/blog/web-data/web-scraping-with-undetected-chromedriver)
- [ScrapingBee - How to use undetected_chromedriver](https://www.scrapingbee.com/blog/undetected-chromedriver-python-tutorial-avoiding-bot-detection/)

### Vision Language Models (VLM) for UI
- [Google Research - ScreenAI: A Vision Language Model for UI Understanding](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/)
- [arXiv - MobileVLM: A Vision-Language Model for Better Intra- and Inter-UI Understanding](https://arxiv.org/abs/2409.14818)
- [Apple ML Research - FastVLM: Efficient Vision Encoding for Vision Language Models](https://machinelearning.apple.com/research/fast-vision-language-models)
- [arXiv - AppVLM: A Lightweight Vision Language Model for Online App Control](https://arxiv.org/html/2502.06395v1)
- [Hugging Face - Vision Language Models (Better, faster, stronger)](https://huggingface.co/blog/vlms-2025)
- [Hugging Face - Vision Language Models Explained](https://huggingface.co/blog/vlms)

### AI-Powered Web Scraping & DOM Parsing
- [SerpAPI - Web scraping with AI (Parsing HTML to structured data)](https://serpapi.com/blog/web-scraping-with-ai-parsing-html-to-structured-data/)
- [WebScraping.AI - How do I extract structured data from HTML using LLMs?](https://webscraping.ai/faq/scraping-with-llms/how-do-i-extract-structured-data-from-html-using-llms)
- [WebScraping.AI - How do I extract text from HTML using Claude AI?](https://webscraping.ai/faq/scraping-with-claude/how-do-i-extract-text-from-html-using-claude-ai)
- [OakHeartLab - Reimagining Web Scraping in the Age of AI](https://www.oakheartlab.com/p/reimagining-web-scraping-in-the-age)
- [SerpAPI - Web scraping experiment with AI (Parsing HTML with GPT-4 and GPT-4o)](https://serpapi.com/blog/web-scraping-and-parsing-experiment-with-ai-openai/)
- [IPBurger - Data Parsing: Web Scraping to Artificial Intelligence](https://www.ipburger.com/blog/data-parsing/)

### zkTLS & Zero-Knowledge Proofs
- [arXiv - A Comprehensive Review of TLSNotary Protocol](https://arxiv.org/html/2409.17670v1)
- [Binance - Understanding zkTLS: Enhancing Web Security with Zero-Knowledge Proofs](https://www.binance.com/en/square/post/2024-09-01-understanding-zktls-enhancing-web-security-with-zero-knowledge-proofs-12941846073018)
- [zkPass - zkTLS: The Cornerstone of Verifiable Internet](https://medium.com/zkpass/zktls-the-cornerstone-of-verifiable-internet-da8609a32754)
- [Shoal.gg - zkTLS: Verifiable Data Composability](https://www.shoal.gg/p/zktls-verifiable-data-composability)
- [Gate.io - zkTLS: Unlocking Crypto Consumer Apps](https://www.gate.com/learn/articles/zk-tls-unlocking-crypto-consumer-apps/7509)
- [Olympix AI - zkTLS: Maximizing Web Privacy Through Zero-Knowledge TLS](https://medium.com/@olympixai/zktls-maximizing-web-privacy-through-zero-knowledge-transport-layer-security-96cd17df33dc)
- [Oasis Network - zkTLS: Building A Verifiable and Private Web](https://oasis.net/blog/zktls-blockchain-security)
- [TLSNotary - zkTLS Day at Devconnect 2025](https://tlsnotary.org/zktls-day/)
- [Bastian Wetzel - TLS Oracles: Liberating Private Web Data with Cryptography](https://bwetzel.medium.com/tls-oracles-liberating-private-web-data-with-cryptography-e66e5fad7c34)
- [0xZap - Introduction to zkTLS: Bridging Real-World Data](https://medium.com/@0xzap/introduction-to-zap-bridging-real-world-data-with-zktls-5837711609d0)

### Web Standards & Browser APIs
- [Chrome Developers - Web Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
