---
title: 시스템 요구사항 및 기술 사양
description: Sela Network 기술 상세 스펙
---

## API 서버 사양

### 프로덕션 환경

**하드웨어 요구사항:**

```
인스턴스 타입: AWS c6i.4xlarge (또는 동급)

CPU:
- 코어: 16 vCPU
- 아키텍처: x86_64 (Intel Xeon 3rd Gen)
- 주파수: 3.5 GHz (터보)

메모리:
- RAM: 32 GB DDR4
- 스왑: 8 GB

스토리지:
- 타입: NVMe SSD
- 용량: 500 GB (OS + 로그)
- IOPS: 16,000
- 처리량: 1,000 MB/s

네트워크:
- 대역폭: 최대 12.5 Gbps
- 네트워크 성능: 높음
```

**소프트웨어 요구사항:**

```
운영체제:
- Ubuntu 22.04 LTS (권장)
- Debian 11
- Amazon Linux 2023

런타임:
- Node.js: v20.10.0 LTS
- Python: 3.11+
- Go: 1.21+

데이터베이스:
- PostgreSQL: 15.x
- Redis: 7.2.x
- MongoDB: 7.0.x (선택)

컨테이너:
- Docker: 24.0.x
- Kubernetes: 1.28.x
```

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
