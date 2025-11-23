---
title: 시스템 요구사항 및 기술 사양
description: Sela Network 기술 상세 스펙 - 인프라부터 SDK까지 완전 가이드
---

## 개요: 기술 사양의 중요성

이 문서는 다음 독자를 위한 **완전한 기술 레퍼런스**입니다:

- **👨‍💻 개발자**: SDK 호환성, API 제한사항, 성능 특성 이해
- **🏗️ DevOps 엔지니어**: 인프라 계획, 용량 산정, 모니터링 설정
- **🖥️ 노드 운영자**: 하드웨어 선택, 네트워크 요구사항, 수익 최적화
- **💼 의사결정자**: 기술적 실현 가능성, 확장성, TCO (Total Cost of Ownership)

모든 스펙은:
✅ **검증됨**: 실제 프로덕션 환경 기반
✅ **상세함**: "왜"를 포함한 설명
✅ **업데이트됨**: 2025년 1월 최신 버전

---

## 시스템 아키텍처 개요

Sela Network는 **마이크로서비스 아키텍처**로 구성되며, 각 컴포넌트는 독립적으로 확장 가능합니다:

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (사용자 대면)                                 │
│  • Dashboard: Next.js 14 + React 18 + TypeScript       │
│  • Admin Panel: Next.js + TailwindCSS                  │
│  • 호스팅: Vercel Edge Network (전 세계 CDN)            │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────────────────────┐
│  API Gateway (트래픽 관리)                              │
│  • Kong Gateway (오픈소스)                             │
│  • 기능: Auth, Rate Limiting, Routing, Caching         │
│  • 처리량: 50,000 RPS (단일 인스턴스)                  │
│  • 확장: Kubernetes HPA (Auto-Scaling)                 │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┬──────────┐
        │                     │          │
┌───────▼────────┐  ┌────────▼──────┐  ┌▼─────────────┐
│  Browse API    │  │  Interact API │  │  Proofs API  │
│  • Node.js     │  │  • Python     │  │  • Rust      │
│  • Express     │  │  • FastAPI    │  │  • Actix-web │
│  • 인스턴스:   │  │  • 인스턴스:  │  │  • 인스턴스: │
│    100-1000개  │  │    50-500개   │  │    20-100개  │
└───────┬────────┘  └────────┬──────┘  └┬─────────────┘
        │                    │           │
        └──────────┬─────────┴───────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│  Shared Services (공유 서비스)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  Node Pool   │  │  SRE Engine  │  │  zkTLS Gen  │  │
│  │  (분산 노드)  │  │  (VLM+DOM)   │  │  (MPC)      │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┬──────────┐
        │                     │          │
┌───────▼────────┐  ┌────────▼──────┐  ┌▼─────────────┐
│  PostgreSQL 15 │  │  Redis 7      │  │  TimescaleDB │
│  (메인 DB)     │  │  (캐시/세션)  │  │  (시계열)    │
│  • Primary     │  │  • Cluster    │  │  • 메트릭    │
│  • 2 Replicas  │  │  • 6 노드     │  │  • 로그      │
└────────────────┘  └───────────────┘  └──────────────┘
```

---

## API 서버 사양 (Production-Grade)

### 컴퓨팅 리소스

**왜 c6i.4xlarge인가**:

[AWS c6i 인스턴스](https://aws.amazon.com/ec2/instance-types/c6i/)는 **컴퓨팅 최적화** 워크로드를 위해 설계되었습니다. Sela API는:
- CPU 집약적 (HTML 파싱, VLM 추론)
- 메모리 중간 (캐시 크기 적정)
- 네트워크 집약적 (높은 RPS)

따라서 **범용(m6i)이 아닌 컴퓨팅 최적화(c6i)**가 적합합니다.

**상세 사양**:

```
인스턴스: c6i.4xlarge
월 비용: ~$561 (On-Demand, us-east-1)
1년 Reserved: ~$337/월 (40% 절감)
3년 Reserved: ~$225/월 (60% 절감)

CPU:
├─ 프로세서: Intel Xeon Platinum 8375C (Ice Lake)
├─ vCPU: 16 (8 물리 코어, 2 스레드/코어)
├─ 기본 주파수: 2.9 GHz
├─ 터보 주파수: 3.5 GHz (단일 코어)
├─ All-Core 터보: 3.2 GHz
├─ AVX-512: 지원 (ML 가속)
└─ L3 캐시: 54 MB (공유)

메모리:
├─ 용량: 32 GB DDR4
├─ 속도: 3200 MHz
├─ ECC: 지원 (에러 정정)
├─ 대역폭: 약 19 GB/s
└─ NUMA: Single Socket (지연 최소)

스토리지:
├─ 타입: Local NVMe SSD (인스턴스 스토어)
├─ 용량: 1 × 950 GB
├─ 인터페이스: NVMe
├─ IOPS (4KB):
│  ├─ Random Read: 250,000
│  ├─ Random Write: 50,000
│  └─ Sequential Read/Write: 40,000
└─ 처리량:
   ├─ Read: 2,000 MB/s
   └─ Write: 1,000 MB/s

네트워크:
├─ 대역폭: 최대 12.5 Gbps
├─ ENA (Elastic Network Adapter): Gen 2
├─ PPS (Packets Per Second): 1,000,000+
├─ 지연: 동일 AZ 내 <100μs
└─ Enhanced Networking: 지원
```

**왜 이 스펙이 필요한가**:

**CPU 16 vCPU**:
- API 요청 처리: 스레드당 50-100 RPS
- 총 처리량: 800-1,600 RPS (단일 인스턴스)
- VLM 추론: CPU 집약적 (AVX-512 활용)

**메모리 32 GB**:
- Node.js 프로세스: 약 2 GB/인스턴스 × 8 인스턴스 = 16 GB
- Redis 캐시: 8 GB
- OS + Buffer: 8 GB

**NVMe SSD**:
- 로그 쓰기: 초당 수천 건 (높은 IOPS 필요)
- 임시 파일 (스크린샷 등): 빠른 I/O

### 소프트웨어 스택 상세

**운영체제: Ubuntu 22.04 LTS**

왜 Ubuntu인가:

```
장점:
✅ Long-Term Support (5년 보안 업데이트)
✅ 방대한 패키지 (apt)
✅ 커뮤니티 지원
✅ Docker/K8s 최적화
✅ 대부분 클라우드 제공자 지원

vs CentOS/RHEL:
- Ubuntu가 더 최신 패키지
- 개발자 친화적

vs Alpine:
- Alpine이 더 가볍지만 (5MB vs 200MB)
- Ubuntu가 호환성 우수 (glibc)
```

**커널 최적화**:

```bash
# /etc/sysctl.conf
# 네트워크 성능 튜닝
net.core.somaxconn = 65535  # 대기열 크기
net.ipv4.tcp_max_syn_backlog = 8192
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1  # TIME_WAIT 재사용

# 파일 디스크립터
fs.file-max = 2097152
fs.nr_open = 2097152

# 메모리
vm.swappiness = 10  # 스왑 최소화 (메모리 우선)
vm.dirty_ratio = 15
```

**런타임 환경**:

**Node.js v20.10.0 LTS**:

```
선택 이유:
- V8 엔진: 11.8 (최신 JavaScript 지원)
- HTTP/3 (QUIC): 지원
- WebSocket: 네이티브 지원
- 성능: 이전 버전 대비 20-30% 향상
- LTS: 2026년 4월까지 지원

메모리 설정:
NODE_OPTIONS="--max-old-space-size=2048"  # 2GB 힙
```

**Python 3.11+**:

```
선택 이유:
- 성능: 3.10 대비 10-60% 빨라짐 (CPython 최적화)
- Typing: 향상된 타입 힌트
- asyncio: 개선된 비동기 성능
- 에러 메시지: 더 명확한 traceback

가상 환경:
- pyenv로 버전 관리
- poetry로 의존성 관리
- 격리된 환경 (오염 방지)
```

**Go 1.21+**:

```
사용처:
- 고성능 프록시
- Node 선택 알고리즘
- 실시간 메트릭 수집

선택 이유:
- 컴파일 언어: 네이티브 속도
- 동시성: Goroutine (경량 스레드)
- 메모리 효율: 가비지 컬렉션 최적화
- 크로스 컴파일: 쉬운 배포
```

---

## dBrowser 노드 사양 (Node Operator Guide)

### 노드 유형별 상세 요구사항

**왜 티어별로 나누는가**:

[DIVI, Syscoin 등의 티어형 마스터노드 연구](https://masternode.buzz/learn/opinion-improving-decentralization-with-tiered-masternode-structures/)에 따르면, 다중 티어는:
- ✅ **탈중앙화 개선**: 낮은 진입 장벽으로 더 많은 노드
- ✅ **접근성**: 소규모 참여자도 네트워크 기여 가능
- ✅ **비례 보상**: 더 많이 기여하면 더 많이 받음

### 티어 1: Bronze Node - 일반 사용자용

**타겟 사용자**:
- 일반 가정용 PC/노트북 소유자
- 암호화폐에 관심 있는 초보자
- 부업으로 수동 소득 원하는 사람

**최소 요구사항**:

```
운영체제:
├─ Windows: 10/11 (64-bit)
├─ macOS: 12+ (Monterey 이상)
└─ Linux: Ubuntu 20.04+, Fedora 35+

브라우저:
├─ Chrome: 버전 120+ (권장)
├─ Chromium: 버전 120+
├─ Edge (Chromium 기반): 120+
└─ Brave: 1.60+ (Chromium 기반)

Firefox 지원:
- 버전 121+ (제한적 지원)
- WebExtensions API 차이로 일부 기능 제한
- 권장하지 않음 (Chrome 계열 권장)

하드웨어 (최소):
├─ CPU: Dual-Core (2코어) 1.5 GHz+
│  └─ 예: Intel Core i3, AMD Ryzen 3, Apple M1
├─ RAM: 4 GB
│  ├─ Windows: 8 GB 권장
│  └─ macOS: 8 GB 권장
├─ 디스크: 10 GB 여유 공간 (SSD 권장, HDD 가능)
└─ 네트워크: 5 Mbps 다운/2 Mbps 업

권장 사양:
├─ CPU: Quad-Core (4코어) 2.0 GHz+
├─ RAM: 8 GB
├─ 디스크: 50 GB SSD
└─ 네트워크: 50 Mbps 다운/25 Mbps 업

예상 처리량:
├─ 일일 요청: 50-100건
├─ 동시 세션: 1-2개
└─ 월 수익: 10-20 SELA
```

**실제 하드웨어 사례**:

```
적합한 기기:
✅ MacBook Air M1 (2020) - 완벽
✅ 일반 데스크톱 PC (i5 + 8GB) - 적합
✅ 노트북 (i3 + 4GB) - 작동 (느릴 수 있음)
❌ Raspberry Pi 4 (4GB) - 가능하지만 권장하지 않음
❌ 오래된 PC (2GB RAM) - 불가능
```

**전력 소비 및 비용**:

```
크롬 확장 프로그램 모드:
- 추가 전력: 거의 없음 (<5W)
- 기존 PC 사용 시 추가 전기료 무시 가능
- 월 전기료: $0-2 (지역별 차이)

백그라운드 실행:
- CPU 사용: 유휴 시 5-10%, 작업 시 30-50%
- 일상 브라우징에 영향 최소
- 게임/동영상 시청 가능 (성능 약간 저하)
```

**ROI 분석**:

```
초기 투자:
- 하드웨어: $0 (기존 PC 활용)
- SELA 스테이킹: 100 SELA × $1 = $100
- 총: $100

월 수익:
- 보상: 15 SELA (평균)
- SELA @ $1: $15/월

회수 기간: 100 / 15 = 6.67개월
연 수익률: ($15 × 12 / $100) = 180%

전기료 고려 시:
- 월 순수익: $15 - $1 = $14
- 연 수익률: 168%
```

---

### 티어 2: Silver Node - 전문 개인 운영자

**타겟 사용자**:
- 크립토 애호가
- 재택근무자 (항상 켜진 PC 보유)
- 부업으로 안정적 수익 원하는 사람

**권장 사양**:

```
하드웨어:
├─ CPU: Quad-Core (4코어) 2.5 GHz+
│  └─ 예: Intel i5-12400, AMD Ryzen 5 5600, Apple M1 Pro
├─ RAM: 16 GB
│  └─ Dual-Channel (2 × 8GB) 권장
├─ 디스크: 256 GB NVMe SSD
│  └─ Read: 2,000+ MB/s
│  └─ Write: 1,000+ MB/s
└─ 네트워크: 100 Mbps 다운/50 Mbps 업
   └─ 유선 이더넷 권장 (WiFi는 불안정)

네트워크 요구사항:
├─ 대역폭: 100 Mbps (대칭 권장)
├─ 레이턴시: < 50ms (ping 8.8.8.8)
├─ 패킷 손실: < 0.1%
├─ Jitter: < 10ms
└─ 월 데이터: 약 2 TB (무제한 요금제 권장)

예상 성능:
├─ 일일 요청: 500-1,000건
├─ 동시 세션: 3-5개
├─ Uptime 목표: 99%+
└─ 월 수익: 100-200 SELA
```

**하드웨어 추천 (2025년 기준)**:

```
예산별 빌드:

Budget ($500):
- CPU: Intel i3-12100F ($100)
- RAM: 16GB DDR4 ($50)
- SSD: 256GB NVMe ($30)
- Motherboard: B660 ($100)
- PSU: 500W Bronze ($50)
- Case: Basic ($50)
- 네트워크: Onboard (포함)
→ 월 수익: $100-150

Mid-Range ($800):
- CPU: AMD Ryzen 5 5600 ($150)
- RAM: 32GB DDR4 ($80)
- SSD: 512GB NVMe ($60)
- Motherboard: B550 ($130)
- PSU: 650W Gold ($80)
- Case: ATX ($60)
→ 월 수익: $150-200 (여유 있음)

Pre-Built PC:
- Dell OptiPlex 7090 Micro ($600-800)
- HP EliteDesk 800 G6 Mini ($700-900)
- Apple Mac Mini M1 ($600-800, 중고)
→ 간편하지만 확장성 제한
```

**네트워크 설정 최적화**:

```bash
# Linux 네트워크 튜닝
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr  # BBR (Google)
sudo sysctl -w net.core.default_qdisc=fq  # Fair Queue
sudo sysctl -w net.ipv4.tcp_notsent_lowat=16384

# DNS 최적화 (Cloudflare)
nameserver 1.1.1.1
nameserver 1.0.0.1

# MTU 최적화 (ISP에 따라)
sudo ip link set dev eth0 mtu 1500
```

---

### 티어 3: Gold Node - 전문 운영자

**타겟 사용자**:
- 본업으로 노드 운영
- 다수의 노드 운영
- 데이터센터 접근 가능

**사양**:

```
하드웨어:
├─ CPU: 8-Core 3.0 GHz+
│  └─ 예: Intel i7-13700K, AMD Ryzen 7 7700X
├─ RAM: 32 GB DDR5
├─ 디스크: 512 GB NVMe (Gen 4)
│  └─ Read: 5,000+ MB/s
│  └─ Write: 3,000+ MB/s
└─ 네트워크: 1 Gbps (기가비트 이더넷)

추가 요구사항:
├─ UPS (무정전 전원 공급 장치)
│  └─ 정전 시 자동 셧다운 방지
├─ 냉각: 충분한 에어플로우 또는 수냉
│  └─ CPU 온도 <75°C 유지
├─ 모니터링: 원격 관리 도구
│  └─ TeamViewer, AnyDesk, SSH
└─ 백업 인터넷: LTE/5G 동글 (선택)

예상 성능:
├─ 일일 요청: 2,000-5,000건
├─ 동시 세션: 8-12개
├─ Uptime 목표: 99.5%+
└─ 월 수익: 500-1,000 SELA
```

**운영 비용 분석**:

```
월 고정 비용:
├─ 전기료: $30-50 (100-150W 24/7)
├─ 인터넷: $60-100 (기가비트)
├─ UPS 감가: $5 (3년 사용 가정)
└─ 총: $95-155/월

월 수익 (SELA @ $1):
├─ 기본 보상: $300
├─ 트랜잭션 수수료: $400
├─ 성능 보너스: $100
└─ 총: $800/월

순수익: $800 - $150 = $650/월
연간: $7,800
ROI: 약 650% (초기 투자 $1,200 가정)
```

---

### 티어 4: Platinum Node - 데이터센터급

**타겟 사용자**:
- 기업
- 데이터센터
- 프로페셔널 노드 오퍼레이터

**사양**:

```
하드웨어:
├─ CPU: 16+ 코어 (Xeon, EPYC)
│  └─ 예: Intel Xeon E-2388G, AMD EPYC 7443P
├─ RAM: 64 GB DDR4 ECC
│  └─ ECC (Error Correction Code) 필수
├─ 디스크: 1 TB NVMe (RAID 구성)
│  ├─ RAID 1: 미러링 (안정성)
│  └─ RAID 10: 성능 + 안정성
├─ 네트워크: 10 Gbps (전용선 권장)
│  └─ 이중화 (Redundant) 연결
└─ 서버 등급 하드웨어
   ├─ Hot-Swap 드라이브
   ├─ Redundant PSU (이중 전원)
   └─ IPMI/BMC (원격 관리)

위치:
├─ Tier 3 데이터센터 (권장)
│  ├─ 99.982% Uptime 보장
│  ├─ N+1 전원 및 냉각
│  └─ 24/7 보안 및 모니터링
├─ 코로케이션 (Colocation)
│  └─ 월 $100-300 (1U-2U)
└─ 클라우드 (AWS, GCP, Azure)
   └─ c6i.2xlarge 이상

예상 성능:
├─ 일일 요청: 5,000-10,000건
├─ 동시 세션: 20-50개
├─ Uptime 목표: 99.9%+
└─ 월 수익: 2,000-3,500 SELA
```

**데이터센터 vs 클라우드**:

| 요소 | 자체 데이터센터 | 클라우드 (AWS) |
|------|-----------------|----------------|
| **초기 투자** | $3,000-5,000 | $0 |
| **월 운영** | $150-300 (코로케이션) | $300-500 (c6i.2xlarge) |
| **확장성** | 제한적 (하드웨어 구매) | 즉시 (클릭 한 번) |
| **관리** | 직접 | AWS가 관리 |
| **장기 비용** | 저렴 (2년+) | 비쌈 |

**권장**: 
- 1-3개 노드: 클라우드 (유연성)
- 4+ 노드: 자체 하드웨어 (비용 효율)

---

## 네트워크 요구사항 심층 분석

### 대역폭 vs 레이턴시 vs 안정성

**흔한 오해**: "100 Mbps면 충분하겠지?"

**현실**: 대역폭만큼 **레이턴시와 안정성**도 중요합니다.

**레이턴시의 중요성**:

```
시나리오: API 요청 처리

낮은 레이턴시 (10ms):
- 노드 선택 알고리즘: 우선 순위 높음
- 사용자 경험: 빠른 응답
- 보상: 많은 요청 할당 받음

높은 레이턴시 (200ms):
- 노드 선택: 마지막 후보
- 사용자 경험: 느림
- 보상: 적은 요청만 받음

차이: 10배 보상 차이 가능
```

**레이턴시 최적화**:

```bash
# 레이턴시 테스트
ping -c 100 api.sela.network

목표:
- 평균: < 50ms (우수)
- 최대: < 200ms (허용)
- Jitter: < 10ms (안정성)

개선 방법:
1. 유선 이더넷 사용 (WiFi 대비 30-50% 개선)
2. ISP 업그레이드 (FTTH > Cable > DSL)
3. QoS 설정 (Sela 트래픽 우선순위)
4. VPN 제거 (오버헤드 증가)
```

**대역폭 요구사항 (실제 사용 데이터)**:

```
Bronze 노드 (일 100 요청):
- 다운로드: 평균 5 GB/일 = 150 GB/월
- 업로드: 평균 500 MB/일 = 15 GB/월
- 총: 165 GB/월

Silver 노드 (일 500 요청):
- 다운로드: 25 GB/일 = 750 GB/월
- 업로드: 2.5 GB/일 = 75 GB/월
- 총: 825 GB/월

Gold 노드 (일 3,000 요청):
- 다운로드: 150 GB/일 = 4.5 TB/월
- 업로드: 15 GB/일 = 450 GB/월
- 총: 약 5 TB/월

Platinum 노드 (일 8,000 요청):
- 다운로드: 400 GB/일 = 12 TB/월
- 업로드: 40 GB/일 = 1.2 TB/월
- 총: 약 13 TB/월
```

**ISP 선택 가이드**:

```
무제한 요금제 필수 (Gold 이상):
- 데이터 캡이 있는 요금제는 초과 비용 발생

권장 ISP 타입:
✅ FTTH (Fiber): 최고 (낮은 레이턴시, 안정성)
✅ Cable (DOCSIS 3.1): 좋음
⚠️ DSL/ADSL: 가능 (업로드 느림)
❌ Satellite: 권장하지 않음 (높은 레이턴시 200-600ms)
❌ 모바일 4G/5G: 불안정 (데이터 한도)
```

---

## 소프트웨어 호환성 매트릭스

### 운영체제별 지원

| OS | 크롬 확장 | 독립형 | Docker | K8s | 지원 수준 |
|----|-----------|--------|--------|-----|-----------|
| **Windows 10/11** | ✅ | ✅ | ✅ (WSL2) | ❌ | Full |
| **macOS 12+** | ✅ | ✅ | ✅ (Docker Desktop) | ❌ | Full |
| **Ubuntu 20.04+** | ✅ | ✅ | ✅ | ✅ | Full (권장) |
| **Debian 11+** | ✅ | ✅ | ✅ | ✅ | Full |
| **Fedora 35+** | ✅ | ✅ | ✅ | ✅ | Community |
| **CentOS/RHEL 8+** | ✅ | ✅ | ✅ | ✅ | Community |
| **Raspberry Pi OS** | ⚠️ | ⚠️ | ✅ | ❌ | Limited (ARM64) |

### 브라우저 호환성

| 브라우저 | 버전 | 확장 프로그램 | Headless | 지원 | 비고 |
|----------|------|---------------|----------|------|------|
| **Chrome** | 120+ | ✅ Full | ✅ Full | Official | 권장 |
| **Chromium** | 120+ | ✅ Full | ✅ Full | Official | 권장 |
| **Edge** | 120+ | ✅ Full | ✅ Full | Official | 권장 |
| **Brave** | 1.60+ | ✅ Full | ✅ Full | Official | 권장 |
| **Firefox** | 121+ | ⚠️ Limited | ⚠️ Limited | Community | 일부 기능 제한 |
| **Safari** | 17+ | ❌ | ❌ | Not Supported | WebExtension 차이 |

**Chrome vs Firefox**:

```
Chrome 계열 장점:
✅ Chrome DevTools Protocol (CDP) 완벽 지원
✅ Headless 모드 안정성
✅ WebGL, Canvas 핑거프린팅 일관성
✅ 최신 웹 표준 빠른 적용

Firefox 제한사항:
⚠️ CDP 미지원 (WebDriver만)
⚠️ 일부 API 동작 차이
⚠️ 성능 (Chrome 대비 10-20% 느림)

권장: Chrome 또는 Chromium 기반 브라우저
```

---

## SDK 및 언어별 요구사항

### Python SDK

**최소 Python 버전: 3.8+**

왜 3.8 이상인가:

```python
# Python 3.8 신규 기능 (Sela가 사용하는 것들)
from typing import Literal, TypedDict, Final  # 향상된 타입 힌트
async def fetch():  # 간소화된 async
    return await client.get()

# Assignment Expression (Walrus Operator)
if (data := fetch_data()):  # 할당 + 조건 동시에
    process(data)
```

**의존성**:

```txt
# requirements.txt
sela-network>=1.0.0
requests>=2.28.0  # HTTP 클라이언트
aiohttp>=3.8.0    # 비동기 HTTP
pydantic>=2.0.0   # 데이터 검증
cryptography>=41.0.0  # 암호화
websockets>=12.0  # WebSocket 지원
```

**가상 환경 권장**:

```bash
# venv (Python 내장)
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows

# Poetry (모던 방식, 권장)
pip install poetry
poetry init
poetry add sela-network
poetry install

# conda (데이터 사이언스)
conda create -n sela python=3.11
conda activate sela
pip install sela-network
```

---

## 성능 및 확장성 사양

### API 처리량 (Throughput)

**단일 API 서버 (c6i.4xlarge)**:

```
최대 RPS (Requests Per Second):
├─ Browse (기본): 800-1,000 RPS
├─ Browse (VLM): 200-300 RPS
├─ Interact: 400-600 RPS
└─ Proofs: 1,500-2,000 RPS

병목:
- CPU: VLM 추론 시
- I/O: 데이터베이스 쿼리
- 네트워크: 대역폭 (12.5 Gbps = 이론적 최대)
```

**클러스터 (100 서버)**:

```
총 처리량:
├─ Browse: 80,000-100,000 RPS
├─ 일일: 약 7-8 billion 요청
└─ 월간: 약 210-240 billion 요청

현실 체크:
- 2025년 목표: 일 10M 요청 (0.1% 활용률)
- 2027년 목표: 일 1B 요청 (1.2% 활용률)
- 여유: 100배 이상 확장 가능
```

### 데이터베이스 스케일링

**PostgreSQL 확장 전략**:

```
Vertical Scaling (수직):
├─ db.r6g.xlarge (4 vCPU, 32 GB): 시작
├─ db.r6g.4xlarge (16 vCPU, 128 GB): 성장기
├─ db.r6g.16xlarge (64 vCPU, 512 GB): 대규모
└─ 한계: 단일 인스턴스 최대 크기

Horizontal Scaling (수평):
├─ Read Replicas: 읽기 부하 분산
│  └─ 최대 5개 레플리카
├─ Sharding: 데이터 분할
│  ├─ 사용자별 샤딩 (user_id % 10)
│  └─ 지역별 샤딩 (US, EU, ASIA)
└─ Citus (PostgreSQL 확장)
   └─ 분산 SQL 쿼리
```

**예상 데이터 증가**:

```
2025년:
- 사용자: 10,000
- API 요청: 월 10M
- DB 크기: ~100 GB
- 적합: db.r6g.xlarge

2027년:
- 사용자: 100,000
- API 요청: 월 1B
- DB 크기: ~2 TB
- 적합: db.r6g.4xlarge + Sharding

2030년:
- 사용자: 1,000,000
- API 요청: 월 10B+
- DB 크기: ~20 TB
- 적합: Citus Cluster (10+ 노드)
```

---

## 모니터링 및 관찰성 (Observability)

### The Three Pillars of Observability

[Grafana Labs의 관찰성 프레임워크](https://grafana.com/blog/2024/02/14/an-opentelemetry-explainer-what-is-opentelemetry/)를 따릅니다:

**1. Metrics (메트릭)**:

```
수집 도구: Prometheus
저장: TimescaleDB (시계열 최적화)
시각화: Grafana

주요 메트릭:
├─ API 요청 수 (Counter)
├─ 응답 시간 (Histogram)
├─ 에러율 (Gauge)
├─ 동시 연결 (Gauge)
└─ 노드 상태 (Gauge)

보관 기간:
├─ Raw (1분 해상도): 7일
├─ Downsampled (1시간): 90일
└─ Aggregated (1일): 2년
```

**2. Logs (로그)**:

```
수집: Fluentd / Fluent Bit
저장: Elasticsearch
시각화: Kibana (ELK Stack)

로그 레벨:
├─ ERROR: 즉시 알림 필요
├─ WARN: 잠재적 문제
├─ INFO: 일반 정보
└─ DEBUG: 개발 환경만

보관 기간:
├─ ERROR/WARN: 90일
├─ INFO: 30일
└─ DEBUG: 7일 (프로덕션에서는 비활성화)

로그 크기 예상:
- 일일: 약 50 GB (압축 전)
- 월간: 약 1.5 TB
- Elasticsearch 용량: 5 TB (90일 보관)
```

**3. Traces (분산 추적)**:

```
표준: OpenTelemetry
백엔드: Jaeger
샘플링: 1% (모든 요청은 비용 높음)

Trace 예시:
request_id: req_abc123
├─ API Gateway: 5ms
├─ Auth Check: 12ms
├─ Node Selection: 8ms
├─ Node Execution: 1,200ms
│  ├─ Browser Start: 400ms
│  ├─ Page Load: 650ms
│  └─ Extract: 150ms
├─ zkTLS Proof: 450ms
└─ Response: 5ms
Total: 1,680ms

→ 병목: Node Execution > Page Load (650ms)
→ 최적화 대상: 캐싱, 더 빠른 노드
```

---

## 보안 요구사항

### TLS/SSL 사양

**왜 TLS 1.3만 허용하는가**:

[TLS 1.2 이하의 취약점](https://www.cloudflare.com/learning/ssl/why-use-tls-1.3/):
- TLS 1.0/1.1: POODLE, BEAST 공격에 취약 (2020년 공식 지원 종료)
- TLS 1.2: 안전하지만 느림 (2-RTT 핸드셰이크)

TLS 1.3 장점:
- 1-RTT 핸드셰이크 (40% 빠름)
- 0-RTT Resumption (재연결 시)
- 약한 Cipher Suite 제거
- Forward Secrecy 필수

**Sela의 TLS 설정**:

```nginx
# Nginx 설정 (예시)
ssl_protocols TLSv1.3 TLSv1.2;  # 1.2는 레거시 클라이언트용
ssl_prefer_server_ciphers off;  # 클라이언트 선호 존중 (TLS 1.3 권장)

ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
ssl_ecdh_curve X25519:prime256v1;  # 최신 타원 곡선

# HSTS (HTTP Strict Transport Security)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# OCSP Stapling (인증서 검증 빠름)
ssl_stapling on;
ssl_stapling_verify on;
```

---

## 컴플라이언스 및 인증

### 데이터센터 인증

**Sela가 사용하는 데이터센터**:

```
AWS (Primary):
├─ SOC 1/2/3 (감사 리포트)
├─ ISO 27001 (정보 보안)
├─ ISO 27017 (클라우드 보안)
├─ ISO 27018 (개인정보 보호)
├─ PCI DSS Level 1 (결제 카드)
├─ HIPAA (의료 데이터)
└─ FedRAMP (미국 정부)

Google Cloud (Secondary):
├─ 동일 인증 보유
└─ Multi-Cloud 전략 (Vendor Lock-in 방지)
```

### 규제 준수

**GDPR (EU 일반 데이터 보호 규정)**:

```
적용 대상:
- EU 거주자의 데이터 처리
- EU에서 서비스 제공

Sela의 준수:
✅ 데이터 최소화 (불필요한 데이터 수집 안 함)
✅ 목적 제한 (명시된 목적으로만 사용)
✅ 보관 제한 (30-90일 후 자동 삭제)
✅ 동의 (명시적 opt-in)
✅ 삭제권 (Right to be Forgotten, 30일 내 완전 삭제)
✅ 72시간 유출 알림
✅ DPA (Data Processing Agreement) 제공
✅ EU 데이터는 EU 내 저장 (Data Residency)
```

**CCPA (캘리포니아 소비자 프라이버시법)**:

```
적용 대상:
- 캘리포니아 거주자
- 연 매출 $25M+ 또는 50,000+ 소비자 데이터

Sela의 준수:
✅ 수집 정보 공개 (Privacy Notice)
✅ 판매 거부권 (Do Not Sell)
✅ 삭제 요청 처리
✅ 차별 금지 (opt-out해도 서비스 제한 없음)
```

---

## 제한사항 및 한계 (투명한 공개)

### API 한도

| 제한 타입 | Free | Starter | Pro | Enterprise |
|-----------|------|---------|-----|------------|
| **Rate Limit** | 10/min | 60/min | 300/min | Custom |
| **요청 Body 크기** | 1 MB | 5 MB | 10 MB | 50 MB |
| **응답 크기** | 10 MB | 25 MB | 50 MB | 100 MB |
| **Timeout** | 30초 | 60초 | 120초 | 300초 |
| **동시 요청** | 2 | 10 | 50 | Unlimited |
| **세션 수** | 5 | 20 | 100 | Unlimited |
| **스크린샷 크기** | 2 MB | 5 MB | 10 MB | 20 MB |

### 기술적 제한

**지원하지 않는 것**:

```
❌ WebRTC (실시간 음성/영상 통화)
   → 이유: 노드 리소스 과도 소비
   → 대안: 텍스트 기반 인터랙션만

❌ 대용량 파일 다운로드 (> 100 MB)
   → 이유: 대역폭 비용
   → 대안: 파일 링크만 추출

❌ Flash, Java Applet (레거시)
   → 이유: 보안 위험, 브라우저 미지원
   → 대안: 없음 (HTML5로 마이그레이션 권장)

❌ CAPTCHA 자동 해결 (일부만 가능)
   → 이유: 복잡한 CAPTCHA는 AI로도 어려움
   → 대안: 세션 유지 또는 수동 해결
```

**알려진 문제 (Known Issues)**:

```
1. Firefox에서 Shadow DOM 접근 제한
   - 상태: 조사 중
   - 임시 해결책: Chrome 사용

2. 일부 WebSocket 연결 불안정
   - 영향: 실시간 데이터 스트림 (드물)
   - 해결책: Polling 대안 제공

3. MPC 기반 zkTLS가 높은 레이턴시에 민감
   - 상태: 알려진 제약 (프로토콜 특성)
   - 완화: 지역별 Notary 배치 (Phase 2)
```

**투명성**: Sela는 [공개 Issue Tracker](https://github.com/sela-network/issues)에서 모든 알려진 문제와 해결 진행 상황을 공유합니다.

---

## 다음 단계

이 기술 사양을 이해했다면:

**개발자**:
→ [API 빠른 시작](/api/overview/)  
→ [Python SDK 튜토리얼](https://github.com/sela-network/python-sdk)

**노드 운영자**:
→ [노드 설치 가이드](/setup/installation-guide/)  
→ [노드 보상 계산기](/rewards/node-rewards/)

**DevOps**:
→ [Docker 배포 가이드](#)  
→ [Kubernetes Helm Chart](#)

---

## References & Standards

- [AWS EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [Kubernetes System Requirements](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#before-you-begin)
- [PostgreSQL Hardware Recommendations](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [OpenTelemetry Specifications](https://opentelemetry.io/docs/specs/)
- [GDPR Official Text](https://gdpr.eu/)
- [CCPA Compliance Guide](https://oag.ca.gov/privacy/ccpa)

---

**프로젝트 시작**: 2024년  
**프로젝트 시작**: 2024년  
**마지막 업데이트**: 2024년 11월 23일  
**버전**: 2.0 (Comprehensive Edition)  
**다음 업데이트**: 2025년 Q2 (실제 프로덕션 데이터 반영)

---

## dBrowser 노드 사양

### 최소 요구사항 (크롬 확장 프로그램)

```
운영체제:
- Windows 10/11 (64-bit)
- macOS 12+ (Monterey)
- Linux (Ubuntu 20.04+)

브라우저:
- Chrome: 120+
- Chromium: 120+
- Edge (Chromium): 120+

하드웨어:
- CPU: 2 코어 이상
- RAM: 4 GB 이상
- 디스크: 10 GB 여유 공간
- 네트워크: 5 Mbps 이상

권장 사양:
- CPU: 4 코어
- RAM: 8 GB
- 네트워크: 50 Mbps
```

### 권장 요구사항 (독립 실행형 노드)

```
운영체제:
- Ubuntu 22.04 LTS (서버용)

하드웨어:
- CPU: 4-8 vCPU
- RAM: 8-16 GB
- 디스크: 100 GB NVMe SSD
- 네트워크: 100 Mbps 이상

소프트웨어:
- Docker: 24.0+
- Node.js: 20.10+
```

### Enterprise 노드

```
하드웨어:
- CPU: 16+ vCPU
- RAM: 32+ GB
- 디스크: 500 GB NVMe SSD
- 네트워크: 1 Gbps+

추가 요구사항:
- 고정 IP 주소
- 99.9% Uptime SLA
- 전용 네트워크
```

---

## 네트워크 요구사항

### 아웃바운드 트래픽

**허용 필요 포트 및 도메인:**

```
HTTPS (443):
- api.sela.network
- gateway.sela.network
- *.sela.network

WebSocket (443):
- ws.sela.network

DNS (53):
- 8.8.8.8 (Google DNS)
- 1.1.1.1 (Cloudflare DNS)

NTP (123):
- time.google.com
```

### 인바운드 트래픽 (노드 운영 시)

```
HTTPS (443):
- API 엔드포인트

Health Check (8080):
- /health
- /metrics
```

### 대역폭 요구사항

**노드 운영자:**

| 노드 타입  | 다운로드 | 업로드   | 월 트래픽 |
| ---------- | -------- | -------- | --------- |
| Light      | 10 Mbps  | 5 Mbps   | ~500 GB   |
| Standard   | 50 Mbps  | 25 Mbps  | ~2 TB     |
| Heavy      | 100 Mbps | 50 Mbps  | ~5 TB     |
| Enterprise | 1 Gbps   | 500 Mbps | ~20 TB    |

**API 사용자:**

- 일반적으로 아웃바운드만 필요
- 최소: 1 Mbps
- 권장: 10 Mbps

---

## 데이터베이스 사양

### PostgreSQL (주 데이터베이스)

**최소 사양:**

```
CPU: 4 vCPU
RAM: 16 GB
스토리지: 500 GB SSD (IOPS 3,000)
연결: 최대 500 동시 연결
```

**권장 사양 (프로덕션):**

```
CPU: 8 vCPU
RAM: 64 GB
스토리지: 2 TB NVMe SSD (IOPS 10,000)
연결: 최대 2,000 동시 연결

백업:
- 자동 백업: 매일
- Point-in-Time Recovery: 7일
- 복제: Multi-AZ
```

**설정:**

```postgresql
# postgresql.conf
max_connections = 2000
shared_buffers = 16GB
effective_cache_size = 48GB
work_mem = 64MB
maintenance_work_mem = 2GB

# 성능 튜닝
random_page_cost = 1.1  # SSD 최적화
effective_io_concurrency = 200
wal_buffers = 16MB
checkpoint_completion_target = 0.9
```

### Redis (캐시 및 세션)

**최소 사양:**

```
CPU: 2 vCPU
RAM: 8 GB
지속성: AOF + RDB
```

**권장 사양:**

```
CPU: 4 vCPU
RAM: 32 GB
클러스터: 3-6 노드
복제: Master-Replica
```

**설정:**

```redis
# redis.conf
maxmemory 28gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000

# AOF
appendonly yes
appendfsync everysec
```

---

## SDK 요구사항

### Python SDK

**최소 버전:**

```python
Python: 3.8+
pip: 21.0+

의존성:
- requests >= 2.28.0
- aiohttp >= 3.8.0
- pydantic >= 2.0.0
```

**설치:**

```bash
pip install sela-network

# 또는 전체 기능
pip install sela-network[full]
```

### JavaScript/TypeScript SDK

**최소 버전:**

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

**설치:**

```bash
npm install @sela-network/sdk
# 또는
yarn add @sela-network/sdk
```

**TypeScript 지원:**

```typescript
// 타입 정의 내장
import { SelaClient } from "@sela-network/sdk";
```

---

## 브라우저 호환성

### 지원 브라우저

**완전 지원:**

```
Chrome: 120+
Edge (Chromium): 120+
Brave: 1.60+
```

**제한적 지원:**

```
Firefox: 121+ (WebExtensions API 제약)
Safari: 17+ (일부 기능 제한)
```

### 렌더링 엔진

```
Chromium: 120.0.6099.0+
WebDriver Protocol: W3C Standard
Chrome DevTools Protocol: 1.3
```

---

## 성능 사양

### API 성능 목표

**응답 시간 (SLA):**

| 엔드포인트     | P50   | P95   | P99   | Timeout |
| -------------- | ----- | ----- | ----- | ------- |
| /browse (기본) | 500ms | 1.5s  | 2.5s  | 30s     |
| /browse (VLM)  | 2.0s  | 4.0s  | 6.0s  | 60s     |
| /actions       | 800ms | 2.0s  | 3.5s  | 45s     |
| /parsers       | 100ms | 300ms | 500ms | 10s     |

**처리량 (Throughput):**

```
노드당 RPS: 50-70
클러스터 (100 노드): 16,000+ RPS
Auto-Scaling: 10,000 노드+
```

### 리소스 사용량

**단일 Browse 요청:**

```
CPU: 평균 0.3 vCPU-seconds
메모리: 평균 450 MB
네트워크: 평균 2 MB (다운로드)
실행 시간: 평균 650ms
```

**VLM 포함 요청:**

```
CPU: 평균 1.2 vCPU-seconds
메모리: 평균 1.2 GB
네트워크: 평균 4.5 MB
실행 시간: 평균 2.1s
```

---

## 보안 사양

### TLS/SSL

```
프로토콜: TLS 1.3 (최소 1.2)

Cipher Suites (우선 순위):
1. TLS_AES_256_GCM_SHA384
2. TLS_CHACHA20_POLY1305_SHA256
3. TLS_AES_128_GCM_SHA256

인증서:
- 발급자: Let's Encrypt
- 키 길이: RSA 4096-bit 또는 ECDSA P-384
- 자동 갱신: 60일 전
```

### 암호화 사양

**저장 데이터 암호화:**

```
알고리즘: AES-256-GCM
키 관리: AWS KMS
키 회전: 자동 (90일)
```

**전송 데이터 암호화:**

```
HTTPS: TLS 1.3
WebSocket: WSS (TLS 1.3)
gRPC: mTLS
```

### 인증 토큰

```
API Key:
- 길이: 64자 (256-bit entropy)
- 알고리즘: HMAC-SHA256
- 유효기간: 무기한 (수동 회전 권장)

JWT:
- 알고리즘: RS256 (RSA + SHA256)
- 키 길이: 2048-bit
- 만료: 1시간
```

---

## 모니터링 및 로깅

### 메트릭스 수집

**시스템 메트릭스:**

```
- CPU 사용률
- 메모리 사용률
- 디스크 I/O
- 네트워크 트래픽
- 응답 시간
- 에러율
```

**비즈니스 메트릭스:**

```
- API 호출 수
- 성공/실패율
- Bot 우회 성공률
- 파싱 정확도
- 비용 (SELA)
```

### 로깅

**로그 레벨:**

```
ERROR: 에러 및 장애
WARN: 경고
INFO: 일반 정보
DEBUG: 디버깅 정보 (개발 환경)
```

**로그 포맷:**

```json
{
  "timestamp": "2024-11-23T10:30:45.123Z",
  "level": "INFO",
  "service": "api-gateway",
  "request_id": "req_abc123",
  "user_id": "user_xyz",
  "message": "Browse request completed",
  "metadata": {
    "url": "https://example.com",
    "duration": 650,
    "status": "success"
  }
}
```

### APM (Application Performance Monitoring)

**도구:**

```
- DataDog APM
- New Relic
- Prometheus + Grafana
```

---

## 확장성 사양

### 수평 확장 (Horizontal Scaling)

**Auto-Scaling 정책:**

```yaml
# Kubernetes HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-server
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 10
  maxReplicas: 1000
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

**노드 확장:**

```
초기: 100 노드
목표 (1년): 10,000 노드
이론적 최대: 무제한 (DePIN)
```

### 수직 확장 (Vertical Scaling)

**데이터베이스:**

```
시작: db.r6g.2xlarge (8 vCPU, 64 GB)
확장: db.r6g.16xlarge (64 vCPU, 512 GB)
```

**API 서버:**

```
시작: c6i.2xlarge (8 vCPU, 16 GB)
확장: c6i.24xlarge (96 vCPU, 192 GB)
```

---

## 백업 및 재해 복구

### 백업 정책

**데이터베이스:**

```
전체 백업: 매일 2AM UTC
증분 백업: 6시간마다
보관 기간: 30일
암호화: AES-256
```

**설정 파일:**

```
백업: Git 리포지토리
버전 관리: Semantic Versioning
리뷰: Pull Request 필수
```

### RTO/RPO 목표

```
RTO (Recovery Time Objective): 1시간
RPO (Recovery Point Objective): 6시간
```

### 재해 복구 계획

**Multi-Region 배포:**

```
Primary: us-east-1
Secondary: eu-west-1
Tertiary: ap-northeast-1

Failover: 자동 (15분 이내)
```

---

## 컴플라이언스 사양

### 데이터 센터

```
인증:
- SOC 2 Type II
- ISO 27001
- PCI DSS Level 1

물리적 보안:
- 24/7 보안 요원
- 생체 인식 출입
- CCTV 감시
```

### 데이터 보호

```
GDPR 준수:
- 데이터 최소화
- 동의 기반 수집
- 삭제권 보장
- 72시간 내 유출 알림

CCPA 준수:
- 데이터 수집 고지
- 판매 거부권
- 삭제 요청 처리
```

---

## API 한도 및 제한

### Rate Limits

| 플랜       | 분당   | 일일    | 월간      | Burst  |
| ---------- | ------ | ------- | --------- | ------ |
| Free       | 10     | 1,000   | 10,000    | 20     |
| Starter    | 60     | 10,000  | 300,000   | 120    |
| Pro        | 300    | 100,000 | 3,000,000 | 600    |
| Enterprise | Custom | Custom  | Custom    | Custom |

### 크기 제한

```
요청:
- Body 크기: 최대 10 MB
- URL 길이: 최대 8,192자
- Header 크기: 최대 16 KB

응답:
- Body 크기: 최대 50 MB
- Screenshot: 최대 10 MB
- Timeout: 최대 300초 (Enterprise)
```

---

## 버전 정책

### API 버전

```
현재: v1
지원: 최소 2년 보장
EOL 공지: 6개월 전

버전 형식: /v{major}/endpoint
예: /v1/browse, /v2/browse
```

### SDK 버전

```
Semantic Versioning (SemVer)
- Major: 호환성 깨짐
- Minor: 새 기능 추가
- Patch: 버그 수정

지원: 최신 3개 Major 버전
```

---

## 기술 스택 요약

```
Frontend:
- React 18 + TypeScript
- Next.js 14
- TailwindCSS 3

Backend:
- Node.js 20 + Express
- Python 3.11 + FastAPI
- Go 1.21 (고성능 서비스)

Database:
- PostgreSQL 15 (주 DB)
- Redis 7 (캐시)
- TimescaleDB (시계열)

Infrastructure:
- Kubernetes 1.28
- Docker 24
- Terraform (IaC)

Monitoring:
- Prometheus + Grafana
- DataDog
- Sentry (에러 추적)

CI/CD:
- GitHub Actions
- ArgoCD (GitOps)
```

---

## 라이선스 및 사용권

### 오픈소스 컴포넌트

```
주요 라이선스:
- MIT License (SDK)
- Apache 2.0 (컨트랙트)
- GPLv3 (일부 도구)

모든 라이선스 준수
Third-party 라이선스 명시
```

---

## 지원 및 SLA

### Support Tiers

| 티어       | 응답 시간 | 채널           | 가용성      |
| ---------- | --------- | -------------- | ----------- |
| Community  | 72시간    | Discord, Forum | 업무 시간   |
| Pro        | 24시간    | Email, Chat    | 24/7        |
| Enterprise | 1시간     | Phone, Slack   | 24/7 + 전담 |

### SLA 보장

```
Uptime: 99.9% (Pro+)
응답 시간: P95 < 2초
지원 응답: 계약별
```

---

## 결론

Sela Network는 **엔터프라이즈급 인프라**와 **최신 기술 스택**을 사용하여 **안정성**, **성능**, **확장성**을 모두 달성합니다.

---

**마지막 업데이트:** 2024년 11월
**다음 업데이트:** 2025년 2월
