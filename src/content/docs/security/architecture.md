---
title: 보안 아키텍처
description: Sela Network 보안 설계 - Defense in Depth 전략과 검증된 보안 프레임워크
---

## 서론: 보안은 선택이 아닌 필수

AI 에이전트가 웹과 상호작용한다는 것은 **민감한 데이터, 금융 거래, 개인 정보**를 다룬다는 의미입니다. 한 번의 보안 사고는:

- 💸 **금전적 손실**: [평균 데이터 유출 비용 $4.45M](https://www.ibm.com/reports/data-breach)
- ⚖️ **법적 책임**: GDPR 위반 시 최대 연 매출의 4% 또는 €20M
- 📉 **평판 손상**: 고객 신뢰 회복에 수년 소요
- 🚫 **비즈니스 중단**: 심각한 경우 서비스 폐쇄

Sela Network는 보안을 **사후 조치가 아닌 설계 단계부터** 고려합니다. 이 페이지에서는 Sela의 다층 보안 아키텍처와 각 계층이 어떻게 상호 보완하여 **Defense in Depth(심층 방어)**를 구현하는지 설명합니다.

---

## 핵심 보안 원칙 (Security Principles)

### 1. Zero Trust Architecture (절대 신뢰하지 않기)

**개념**: ["신뢰하되 검증하라"는 틀렸습니다. "절대 신뢰하지 말고 항상 검증하라"](https://www.cloudflare.com/learning/security/glossary/what-is-zero-trust/)가 올바릅니다.

**Sela의 구현**:

```
모든 요청 = 위협으로 간주 → 증명될 때까지
매 요청마다 → 인증 & 권한 검증 (캐시 없음)
모든 컴포넌트 = 격리된 샌드박스에서 실행
네트워크 = 마이크로세그멘테이션 (최소 신뢰 경계)
```

**전통적 방식 vs Zero Trust**:

| 상황 | 전통적 방식 | Sela Zero Trust |
|------|-------------|-----------------|
| 내부 네트워크 요청 | 신뢰 (방화벽 내부) | 검증 필요 (내부도 위협 가능) |
| 인증된 사용자 | 모든 리소스 접근 | 리소스별 권한 재검증 |
| API 호출 | 첫 인증 후 세션 신뢰 | 매 호출마다 재인증 |

**실제 적용 사례**:

```python
# 모든 API 요청 처리 함수
@app.route('/api/v1/browse', methods=['POST'])
def handle_browse_request():
    # 1. 항상 인증 검증 (세션 신뢰 안 함)
    user = authenticate_request(request.headers['Authorization'])
    if not user:
        return {"error": "Unauthorized"}, 401
    
    # 2. 권한 확인 (이 사용자가 이 작업을 할 수 있는가)
    if not user.has_permission('browse:execute'):
        return {"error": "Forbidden"}, 403
    
    # 3. Rate Limit 검증
    if not check_rate_limit(user.id):
        return {"error": "Rate Limit Exceeded"}, 429
    
    # 4. 입력 검증 (모든 입력은 잠재적 공격)
    if not validate_input(request.json):
        return {"error": "Invalid Input"}, 400
    
    # 5. 실행 (격리된 환경)
    result = execute_in_sandbox(request.json)
    
    # 6. 감사 로그 (모든 작업 기록)
    audit_log(user, 'browse', request.json, result)
    
    return result
```

### 2. End-to-End Encryption (종단간 암호화)

**데이터는 3가지 상태로 존재**합니다:

**2.1 전송 중 데이터 (Data in Transit)**:

```
프로토콜: TLS 1.3 (최소 1.2, 1.0/1.1은 차단)
Cipher Suite (우선순위):
  1. TLS_AES_256_GCM_SHA384 (AES-256, AEAD)
  2. TLS_CHACHA20_POLY1305_SHA256 (모바일 최적화)
  3. TLS_AES_128_GCM_SHA256 (성능 중시)

Perfect Forward Secrecy: 필수
- ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)
- 세션 키 노출되어도 과거 통신 안전

Certificate Pinning: 모바일 SDK
- 중간자 공격(MITM) 방지
- Let's Encrypt + Backup CA

HSTS (HTTP Strict Transport Security): 강제
- max-age=31536000 (1년)
- includeSubDomains
- preload
```

**왜 TLS 1.3인가**:

[TLS 1.3은 1.2 대비 40% 빠른 핸드셰이크](https://www.cloudflare.com/learning/ssl/why-use-tls-1.3/)를 제공하며, 약한 암호화 스위트를 제거하여 더 안전합니다:

- 핸드셰이크: 2 RTT (1.2) → 1 RTT (1.3)
- 0-RTT Resumption 지원 (재연결 시)
- 취약한 암호화 제거 (RSA 키 교환, SHA-1 등)

**2.2 저장 데이터 (Data at Rest)**:

```
데이터베이스 (PostgreSQL):
- 알고리즘: AES-256-GCM (Authenticated Encryption)
- 모드: Transparent Data Encryption (TDE)
- 키 관리: AWS KMS (Key Management Service)
- 키 계층: Master Key → Data Key → 실제 데이터
- 자동 회전: 90일마다 (Zero Downtime)

파일 스토리지 (S3):
- SSE-KMS (Server-Side Encryption with KMS)
- Bucket Policy: 암호화 강제 (평문 업로드 차단)
- Versioning: 활성화 (삭제 방지)
- Access Logging: 모든 접근 기록

백업:
- 암호화된 백업 (AES-256)
- 다중 리전 복제 (us-east-1, eu-west-1, ap-northeast-1)
- 불변 백업 (Immutable, 수정/삭제 불가)
- 보관 기간: 30일
```

**키 관리 모범 사례**:

[NIST의 키 관리 가이드라인](https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final)을 따릅니다:

```
키 계층 구조:
┌─────────────────────────────────┐
│  Master Key (AWS KMS)           │
│  - HSM에 저장                   │
│  - 절대 추출 불가               │
│  - 다중 리전 복제               │
└────────────┬────────────────────┘
             │ 생성
             ↓
┌─────────────────────────────────┐
│  Data Encryption Keys (DEK)     │
│  - 각 데이터베이스/테이블별     │
│  - 90일마다 자동 회전           │
└────────────┬────────────────────┘
             │ 암호화
             ↓
┌─────────────────────────────────┐
│  실제 데이터 (Encrypted)        │
│  - 평문은 메모리에만 존재       │
│  - 디스크에는 항상 암호화       │
└─────────────────────────────────┘
```

**자동 키 회전 (Key Rotation)**:

```python
# Sela의 자동 키 회전 (사용자 개입 불필요)
@scheduled_task(every="90 days")
async def rotate_encryption_keys():
    # 1. 새로운 DEK 생성
    new_dek = await kms.generate_data_key(master_key_id)
    
    # 2. 기존 데이터를 새 키로 재암호화 (Rolling Update)
    # → Zero Downtime, 백그라운드에서 점진적 실행
    await reencrypt_database_with_new_key(new_dek)
    
    # 3. 이전 키는 30일 보관 후 삭제 (복구용)
    await schedule_key_deletion(old_dek, days=30)
    
    # 4. 감사 로그
    await audit_log("KEY_ROTATION", new_dek.id, old_dek.id)
```

**2.3 사용 중 데이터 (Data in Use)**:

메모리에 있는 데이터도 보호:

```
Secure Enclave (가능한 경우):
- Apple Secure Enclave
- Intel SGX (Software Guard Extensions)
- AMD SEV (Secure Encrypted Virtualization)

메모리 암호화:
- 민감 데이터는 메모리에서도 암호화
- 사용 직후 즉시 Zero-out (덮어쓰기)

프로세스 격리:
- 각 API 요청은 독립된 프로세스/컨테이너
- 메모리 공유 없음 (Spectre/Meltdown 방지)
```

### 3. Privacy by Design (설계 단계부터 프라이버시)

[GDPR의 Privacy by Design 원칙](https://gdpr.eu/privacy-by-design/)을 핵심 설계 철학으로 채택:

**원칙 1: Proactive not Reactive (사전 예방)**

```
문제 발생 후 대응 ❌
문제 발생 전 방지 ✅

예시:
- 민감 데이터는 애초에 수집하지 않음
- 로그에 자동으로 PII 마스킹
- 취약점 발견 전에 침투 테스트
```

**원칙 2: Privacy as Default (기본 설정이 프라이버시)**

```
사용자가 선택하지 않아도:
- 최소 데이터만 수집
- 최대 암호화 적용
- 최단 보관 기간

예시:
- 웹 페이지 내용: 저장 안 함 (기본)
- API 로그: 30일 후 자동 삭제 (기본)
- IP 주소: 자동 익명화 (192.168.1.100 → 192.168.1.0)
```

**원칙 3: Embedded into Design (설계에 내장)**

```
보안은 Add-on이 아닌 Core:
- 코드 리뷰: 보안 체크리스트 필수
- CI/CD: 보안 스캔 실패 시 배포 차단
- Architecture: 보안 우선 설계
```

**원칙 4: Full Functionality (프라이버시 = 성능 저하 아님)**

Sela는 프라이버시를 유지하면서도 **full performance**를 제공합니다:

```
zkTLS 증명 생성: < 450ms (오버헤드 최소)
E2E 암호화: TLS 1.3 (오히려 1.2보다 빠름)
익명화 처리: 실시간 (지연 없음)
```

---

## 다층 보안 아키텍처 (Defense in Depth)

보안은 **단일 방어선이 아닌 다층 방어**입니다. 한 계층이 뚫려도 다음 계층이 보호합니다.

```
┌────────────────────────────────────────┐
│  Layer 7: 사용자 교육 & 인식           │
│  - Phishing 교육, 보안 가이드          │
├────────────────────────────────────────┤
│  Layer 6: 애플리케이션 보안            │
│  - Input Validation, OWASP Top 10      │
├────────────────────────────────────────┤
│  Layer 5: 데이터 보안                  │
│  - 암호화 (AES-256), 익명화            │
├────────────────────────────────────────┤
│  Layer 4: 네트워크 보안                │
│  - TLS 1.3, VPN, Network Segmentation  │
├────────────────────────────────────────┤
│  Layer 3: 인증 & 권한                  │
│  - API Key, OAuth, mTLS, RBAC          │
├────────────────────────────────────────┤
│  Layer 2: 인프라 보안                  │
│  - Firewall, DDoS 방어, IDS/IPS        │
├────────────────────────────────────────┤
│  Layer 1: 물리적 보안                  │
│  - 데이터센터 (SOC 2, ISO 27001)       │
└────────────────────────────────────────┘
```

각 계층을 상세히 살펴봅시다.

---

## Layer 1: 네트워크 보안 (Network Security)

### 1.1 DDoS 방어 - 초대규모 공격 대응

**위협**: [2024년 최대 DDoS 공격은 5.6 Tbps](https://blog.cloudflare.com/zh-cn/cloudflare-blocks-record-breaking-5-6-tbps-ddos-attack-zh-cn/)를 기록했습니다. Sela도 대상이 될 수 있습니다.

**Sela의 다층 DDoS 방어**:

**L3/L4 (네트워크/전송 계층) 방어**:

```
1차 방어: Cloudflare Magic Transit
- 처리 능력: 최대 100 Tbps+
- Always-On 모드: 모든 트래픽 검사
- Anycast 네트워크: 전 세계 300+ PoP

2차 방어: AWS Shield Advanced
- Managed DDoS Protection
- 자동 완화 (수초 내)
- 비용 보호: DDoS로 인한 추가 비용 환급

3차 방어: 자체 Rate Limiting
- iptables/nftables 방화벽 규칙
- IP당 초당 요청 수 제한
- 자동 블랙리스트 (의심 IP)
```

**L7 (애플리케이션 계층) 방어**:

```
WAF (Web Application Firewall):
- Cloudflare WAF (OWASP Core Ruleset)
- 커스텀 규칙: Sela 특화 패턴 탐지
- Bot Fight Mode: 의심스러운 봇 Challenge

Challenge 유형:
1. JavaScript Challenge (가벼운 의심)
   → 브라우저가 JS를 실행하여 증명
   
2. CAPTCHA (중간 의심)
   → hCaptcha 또는 reCAPTCHA v3
   
3. 완전 차단 (확실한 공격)
   → IP 블랙리스트 추가 (24시간)
```

**실제 방어 사례 (시뮬레이션)**:

```
날짜: 2024년 12월 테스트
공격 유형: Volumetric DDoS (L4 UDP Flood)
공격 규모: 50 Gbps, 초당 200M 패킷
지속 시간: 3시간

결과:
- Cloudflare 자동 탐지: T+3초
- 완화 시작: T+8초
- 정상 사용자 영향: 0% (다운타임 없음)
- 차단된 패킷: 2.16 조개
- 방어 비용: $0 (Shield Advanced 포함)
```

### 1.2 방화벽 및 네트워크 세그멘테이션

**마이크로세그멘테이션 (Micro-Segmentation)**:

[네트워크를 작은 세그먼트로 분할](https://www.paloaltonetworks.com/cyberpedia/what-is-microsegmentation)하여 측면 이동(Lateral Movement) 공격 방지:

```
┌─────────────────────────────────────────┐
│  Public Zone (인터넷 노출)              │
│  - API Gateway                          │
│  - CDN                                  │
│  - Rate Limiter                         │
├─────────────────────────────────────────┤
│  DMZ (Demilitarized Zone)               │
│  - Web Application Firewall             │
│  - Load Balancer                        │
├─────────────────────────────────────────┤
│  Application Zone (애플리케이션)        │
│  - API Servers                          │
│  - Semantic Rendering Engine            │
│  - Session Manager                      │
├─────────────────────────────────────────┤
│  Data Zone (데이터)                     │
│  - PostgreSQL (암호화)                  │
│  - Redis (세션)                         │
│  - MongoDB (로그)                       │
├─────────────────────────────────────────┤
│  Management Zone (관리)                 │
│  - Monitoring (Prometheus, Grafana)     │
│  - Logging (ELK Stack)                  │
│  - Admin Dashboard                      │
└─────────────────────────────────────────┘

각 Zone 간 통신: 명시적 허용만 (Whitelist)
```

**방화벽 규칙 (예시)**:

```yaml
# Kubernetes Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-server-policy
spec:
  podSelector:
    matchLabels:
      app: api-server
  
  # Ingress: API Server가 받을 수 있는 트래픽
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: gateway  # Gateway에서만 허용
      ports:
        - protocol: TCP
          port: 8080
  
  # Egress: API Server가 보낼 수 있는 트래픽
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database  # Database로만
      ports:
        - protocol: TCP
          port: 5432
    
    - to:
        - podSelector:
            matchLabels:
              app: redis
      ports:
        - protocol: TCP
          port: 6379
    
    # 인터넷 접근: 명시적 도메인만
    - to:
        - namespaceSelector: {}
      ports:
        - protocol: TCP
          port: 443  # HTTPS만
```

이것은 **공격자가 API Server를 해킹해도 Database에 직접 접근할 수 없음**을 의미합니다.

---

## Layer 2: 애플리케이션 보안 (Application Security)

### 2.1 인증 및 권한 관리

**인증 (Authentication) - "당신은 누구인가?"**

**Multi-Factor Authentication (다중 인증)**:

```
Tier 1: API Key (기본)
- HMAC-SHA256 서명
- 64자 (256-bit entropy)
- 평문 전송 금지 (HTTPS 필수)

Tier 2: OAuth 2.0 (웹 앱)
- Authorization Code Flow (가장 안전)
- PKCE (Proof Key for Code Exchange) 필수
- State 파라미터로 CSRF 방지

Tier 3: mTLS (Enterprise)
- 클라이언트 인증서 필수
- 상호 인증 (서버 ↔ 클라이언트)
- Certificate Pinning
```

**API Key 보안 모범 사례**:

```python
# ❌ 절대 금지
api_key = "sk_live_abc123xyz"  # 코드에 하드코딩
git commit -m "Add API key"     # Git에 커밋

# ✅ 올바른 방법
import os
api_key = os.environ['SELA_API_KEY']  # 환경 변수

# ✅ 더 좋은 방법: Secrets Manager
from aws_secrets import get_secret
api_key = get_secret("sela-api-key")

# ✅ 프로덕션: Vault
import hvac
client = hvac.Client(url='https://vault.example.com')
api_key = client.secrets.kv.v2.read_secret_version(
    path='sela-api-key'
)['data']['data']['key']
```

**권한 관리 (Authorization) - "당신은 무엇을 할 수 있는가?"**

**RBAC (Role-Based Access Control)**:

[AWS IAM의 RBAC 모델](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)을 참고:

```json
// 역할 정의 (예시: Developer 역할)
{
  "role": "developer",
  "permissions": [
    {
      "resource": "browse",
      "actions": ["read", "execute"],
      "conditions": {
        "rate_limit": "60/min",
        "regions": ["US", "EU", "KR"],  // 특정 지역만
        "max_cost_per_request": 0.1  // 요청당 최대 0.1 SELA
      }
    },
    {
      "resource": "proofs",
      "actions": ["read"],  // 증명 조회만, 생성 불가
      "conditions": {}
    },
    {
      "resource": "sessions",
      "actions": ["read", "create", "delete"],  // 세션 관리
      "conditions": {
        "max_sessions": 10  // 최대 10개 세션
      }
    }
  ],
  "denied": [
    {"resource": "admin", "actions": ["*"]},  // 관리 기능 불가
    {"resource": "billing", "actions": ["update"]}  // 결제 수정 불가
  ]
}
```

**실제 권한 검증**:

```python
@require_permission("browse:execute")
@require_cost_approval(max_cost=0.1)  # 0.1 SELA 이상은 명시적 승인
async def execute_browse_request(user, request):
    # 1. 사용자 역할 확인
    if not user.has_role("developer", "admin"):
        raise PermissionDenied("Insufficient permissions")
    
    # 2. 리소스별 권한 확인
    if not user.can("browse:execute", request.url):
        raise PermissionDenied(f"Cannot access {request.url}")
    
    # 3. 조건 확인 (Rate Limit, 비용 등)
    if not check_conditions(user, request):
        raise PermissionDenied("Conditions not met")
    
    # 4. 실행
    result = await browse(request)
    
    # 5. 감사 로그
    await audit_log(user, "browse:execute", request, result)
    
    return result
```

### 2.2 입력 검증 및 Injection 방지

**모든 입력은 잠재적 공격**으로 간주합니다.

**SQL Injection 방지**:

```python
# ❌ 취약: 직접 문자열 연결
query = f"SELECT * FROM users WHERE email = '{user_email}'"
# 공격: email = "' OR '1'='1" → 모든 사용자 조회

# ✅ 안전: Parameterized Query
query = "SELECT * FROM users WHERE email = %s"
cursor.execute(query, (user_email,))
```

**XSS (Cross-Site Scripting) 방지**:

```python
from html import escape

# ❌ 취약: 사용자 입력 직접 출력
html = f"<div>{user_input}</div>"
# 공격: user_input = "<script>alert('XSS')</script>"

# ✅ 안전: Output Encoding
html = f"<div>{escape(user_input)}</div>"
# 결과: &lt;script&gt;alert('XSS')&lt;/script&gt;
```

**Command Injection 방지**:

```python
import subprocess
import shlex

# ❌ 취약: shell=True
subprocess.run(f"curl {user_url}", shell=True)
# 공격: user_url = "example.com; rm -rf /"

# ✅ 안전: shell=False + 인자 배열
subprocess.run(["curl", shlex.quote(user_url)], shell=False)
```

**URL Validation**:

```python
from urllib.parse import urlparse

def validate_url(url):
    """안전한 URL만 허용"""
    parsed = urlparse(url)
    
    # 스키마 검증
    if parsed.scheme not in ['http', 'https']:
        raise ValueError("Only HTTP(S) allowed")
    
    # SSRF 방지: 내부 IP 차단
    if is_internal_ip(parsed.hostname):
        raise ValueError("Internal IP not allowed")
    
    # 안전하지 않은 포트 차단
    if parsed.port and parsed.port not in [80, 443, 8080, 8443]:
        raise ValueError(f"Port {parsed.port} not allowed")
    
    return True

def is_internal_ip(hostname):
    """내부 네트워크 IP 확인"""
    import ipaddress
    
    try:
        ip = ipaddress.ip_address(hostname)
        return ip.is_private or ip.is_loopback or ip.is_reserved
    except:
        return False  # 도메인 이름은 허용
```

이것은 [SSRF (Server-Side Request Forgery)](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery) 공격을 방지합니다:

```
공격 예시:
url = "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
# AWS 메타데이터 API → 인스턴스 자격 증명 탈취 시도

Sela 방어:
→ is_internal_ip(169.254.169.254) = True
→ 요청 차단 ✓
```

---

## Layer 3: 데이터 보안 (Data Security)

### 3.1 암호화 - 모든 상태에서 보호

---

## 보안 레이어

### Layer 1: Network Security

#### DDoS 방어

**다층 방어 체계:**

```
L3/L4 방어:
- Cloudflare Magic Transit
- AWS Shield Advanced
- 자체 Rate Limiting

L7 방어:
- WAF (Web Application Firewall)
- Bot Detection
- Geo-Blocking
```

**처리 능력:**

```
정상 트래픽: ~10 Gbps
DDoS 방어 능력: 최대 100 Tbps
평균 차단 시간: < 3초
```

#### Firewall 규칙

**Ingress Rules:**

```
포트 443 (HTTPS): 전체 허용
포트 80 (HTTP): 443으로 리다이렉트
포트 22 (SSH): 허용 IP만
기타: 전체 차단
```

**Egress Rules:**

```
노드 → 인터넷: 허용 (웹 접근 필요)
API → 데이터베이스: 내부 네트워크만
API → 외부: 필요한 서비스만 허용
```

---

### Layer 2: Application Security

#### API 인증 및 권한

**인증 방식:**

1. **API Key (Bearer Token)**

```http
Authorization: Bearer sk_live_abc123xyz...

형식:
- sk_live_... (프로덕션)
- sk_test_... (테스트)

키 길이: 64자 (256-bit entropy)
알고리즘: HMAC-SHA256
```

2. **OAuth 2.0**

```
Grant Types:
- Authorization Code (웹 앱)
- Client Credentials (서버)
- Refresh Token

토큰 유효기간:
- Access Token: 1시간
- Refresh Token: 30일
```

3. **mTLS (Mutual TLS)**

```
Enterprise 플랜 전용
클라이언트 인증서 필수
자동 회전 (30일)
```

#### 권한 관리 (RBAC)

**역할 정의:**

| 역할          | 권한              | 사용 사례      |
| ------------- | ----------------- | -------------- |
| **Admin**     | 모든 권한         | 계정 소유자    |
| **Developer** | API 사용, 키 관리 | 개발자         |
| **Viewer**    | 읽기 전용         | 관리자, 감사자 |
| **Billing**   | 결제 관리         | 재무 담당자    |
| **Custom**    | 커스텀 권한       | Enterprise     |

**권한 검증:**

```python
@require_permission("browse:write")
def create_browse_request(user, request):
    # 권한 확인 후 실행
    pass

# 모든 API 호출마다 검증
```

#### Rate Limiting

**다층 Rate Limit:**

```
1. IP 기반 (DDoS 방어)
   - 익명: 분당 10 요청
   - 인증: 무제한

2. API Key 기반 (공정 사용)
   - Free: 분당 10 요청
   - Pro: 분당 300 요청
   - Enterprise: 커스텀

3. 사용자 기반 (어뷰징 방지)
   - 일일 한도
   - 월간 한도

4. 엔드포인트 기반 (리소스 보호)
   - /browse: 일반
   - /actions: 제한적
   - /admin: 엄격
```

**알고리즘:**

```
Token Bucket Algorithm
- Refill Rate: 설정된 RPS
- Bucket Size: Burst 허용량
- 초과 시: 429 Too Many Requests
```

---

### Layer 3: Data Security

#### 암호화

**전송 중 (In-Transit):**

```
프로토콜: TLS 1.3
Cipher Suite:
  - TLS_AES_256_GCM_SHA384
  - TLS_CHACHA20_POLY1305_SHA256

Perfect Forward Secrecy: 지원
HSTS: 강제 적용
Certificate Pinning: 모바일 SDK
```

**저장 중 (At-Rest):**

```
데이터베이스:
- 알고리즘: AES-256-GCM
- 키 관리: AWS KMS
- 자동 회전: 90일

파일 스토리지:
- S3 Server-Side Encryption
- Customer-Managed Keys (CMK)

백업:
- 암호화된 백업
- 다중 지역 복제
```

#### 민감 데이터 처리

**PII (개인 식별 정보) 보호:**

```python
# 자동 마스킹
email = "user@example.com"
masked = "u***@e***.com"

# 로그에서 제외
logger.info(f"User login", extra={
    "email": email,  # 자동 마스킹됨
    "ip": request.ip  # 해시화됨
})

# 저장 시 암호화
encrypted_data = encrypt(sensitive_data, key)
store(encrypted_data)
```

**데이터 최소화:**

```
수집 데이터:
- 필요: API 사용량, 에러 로그
- 불필요: 웹 페이지 내용 (저장 안 함)

보관 기간:
- API 로그: 30일
- 에러 로그: 90일
- 사용량 통계: 2년 (집계만)
- 개인정보: 계정 삭제 시 즉시 삭제
```

#### Secrets 관리

**저장 위치:**

```
개발 환경: .env 파일 (gitignore)
프로덕션: HashiCorp Vault

절대 금지:
- 코드에 하드코딩
- Git 커밋
- 평문 로그
```

**자동 회전:**

```
API Keys: 90일마다 알림
Database Credentials: 30일 자동 회전
TLS Certificates: 60일 전 자동 갱신
```

---

### Layer 4: Infrastructure Security

#### Container Security

**이미지 스캔:**

```
도구: Trivy, Clair
주기: 매 빌드마다
기준:
  - Critical: 0개 허용
  - High: 심사 후 허용
  - Medium/Low: 기록만
```

**런타임 보안:**

```
AppArmor/SELinux: 강제 적용
Read-Only File System: 컨테이너
Non-Root User: 필수
Resource Limits: CPU, Memory 제한
```

#### Kubernetes Security

**네임스페이스 격리:**

```
production
staging
development
monitoring
```

**RBAC (Role-Based Access Control):**

```yaml
# 최소 권한
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list"]
```

**Network Policies:**

```yaml
# 팟 간 통신 제한
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: gateway
```

#### Database Security

**액세스 제어:**

```
방화벽: Private Subnet만
SSL/TLS: 강제
최소 권한 계정:
  - App: SELECT, INSERT, UPDATE만
  - Admin: 전체 권한 (MFA 필수)
```

**감사 로깅:**

```sql
-- 모든 쿼리 로깅
log_statement = 'all'
log_min_duration_statement = 100

-- 접속 로깅
log_connections = on
log_disconnections = on
```

**백업 및 복구:**

```
자동 백업: 매일 2AM UTC
증분 백업: 6시간마다
보관 기간: 30일
복구 테스트: 매주
```

---

## 위협 모델 (Threat Model)

### STRIDE 분석

#### Spoofing (스푸핑)

**위협:**

- 공격자가 정상 사용자로 위장
- 노드가 악성 노드로 위장

**대응:**

```
- 강력한 인증 (API Key, OAuth, mTLS)
- 노드 스테이킹 (Proof of Stake)
- IP 평판 시스템
- 디바이스 지문 (Fingerprinting)
```

#### Tampering (변조)

**위협:**

- API 요청/응답 변조
- 웹 데이터 조작

**대응:**

```
- TLS로 전송 중 변조 방지
- zk-TLS Proof로 데이터 무결성 증명
- Message Signing (HMAC)
- Immutable Audit Logs
```

#### Repudiation (부인)

**위협:**

- 사용자가 작업 부인
- 노드가 악의적 행위 부인

**대응:**

```
- 모든 작업 로깅 (Audit Trail)
- 디지털 서명
- 타임스탬프
- 온체인 기록 (블록체인)
```

#### Information Disclosure (정보 노출)

**위협:**

- 민감한 데이터 유출
- API 키 노출

**대응:**

```
- 암호화 (전송 및 저장)
- 접근 제어 (RBAC)
- 데이터 최소화
- Secrets 관리
```

#### Denial of Service (서비스 거부)

**위협:**

- DDoS 공격
- 리소스 고갈 공격

**대응:**

```
- DDoS 방어 (Cloudflare)
- Rate Limiting
- Auto-Scaling
- Circuit Breaker
```

#### Elevation of Privilege (권한 상승)

**위협:**

- 일반 사용자가 관리자 권한 획득
- 코드 인젝션

**대응:**

```
- 최소 권한 원칙
- 입력 검증
- Parameterized Queries (SQL Injection 방지)
- Content Security Policy
```

---

## 보안 모니터링

### SIEM (Security Information and Event Management)

**도구:**

```
- Splunk Enterprise Security
- ELK Stack (Elasticsearch, Logstash, Kibana)
- AWS GuardDuty
```

**모니터링 항목:**

```
인증 실패
비정상 API 패턴
권한 변경
데이터 접근 이상
네트워크 이상 트래픽
```

### 이상 탐지 (Anomaly Detection)

**머신러닝 기반 탐지:**

```python
# 이상 패턴 감지
from sklearn.ensemble import IsolationForest

model = IsolationForest(contamination=0.01)
model.fit(normal_traffic_data)

# 실시간 탐지
prediction = model.predict(current_request)
if prediction == -1:  # 이상
    alert_security_team()
```

**탐지 규칙:**

```
1. 단기간 대량 요청 (DDoS)
2. 비정상적인 시간대 접근
3. 여러 IP에서 동일 API Key 사용
4. 높은 에러율
5. 민감한 엔드포인트 집중 접근
```

---

## 보안 사고 대응 (Incident Response)

### 대응 프로세스

```
1. 탐지 (Detection)
   ↓
2. 분석 (Analysis)
   ↓
3. 격리 (Containment)
   ↓
4. 제거 (Eradication)
   ↓
5. 복구 (Recovery)
   ↓
6. 사후 분석 (Post-Incident)
```

### 비상 연락망

```
Severity 1 (Critical):
- 즉시 CTO, CISO 알림
- 15분 이내 대응 팀 소집
- 고객 알림 (1시간 이내)

Severity 2 (High):
- 보안팀 알림
- 1시간 이내 대응
- 24시간 내 해결

Severity 3 (Medium):
- 일반 티켓 생성
- 업무일 기준 3일 내 해결
```

### 사고 대응 플레이북

**데이터 유출:**

```
1. 즉시 격리: 영향받은 시스템 차단
2. 로그 수집: 포렌식 분석용
3. 영향 평가: 유출 범위 파악
4. 고객 알림: GDPR 72시간 규정 준수
5. 원인 분석: 재발 방지
```

**계정 탈취:**

```
1. 계정 비활성화
2. 세션 무효화
3. API Key 취소
4. 사용자 알림
5. 강제 비밀번호 변경
```

---

## 컴플라이언스

### 준수 규정

**GDPR (EU 일반 데이터 보호 규정):**

```
- 데이터 최소화
- 동의 기반 수집
- 삭제권 보장 (Right to be Forgotten)
- 데이터 이동권
- 72시간 내 유출 알림
```

**CCPA (캘리포니아 소비자 프라이버시법):**

```
- 데이터 수집 고지
- 판매 거부권
- 삭제 요청 처리
- 차별 금지
```

**SOC 2 Type II:**

```
- Security (보안)
- Availability (가용성)
- Processing Integrity (처리 무결성)
- Confidentiality (기밀성)
- Privacy (프라이버시)

감사 주기: 연 1회
감사 기관: Big 4 회계법인
```

**ISO 27001:**

```
정보보안 관리 시스템 (ISMS)
인증 예정: 2025 Q2
```

---

## 보안 감사 및 테스트

### 침투 테스트 (Penetration Testing)

**주기:** 분기별 (3개월마다)

**범위:**

```
- Web Application
- API Endpoints
- Infrastructure
- Mobile SDK (출시 시)
```

**외부 업체:**

```
- HackerOne Bug Bounty Program
- Synack Red Team
- 내부 보안팀
```

### 코드 감사

**정적 분석 (SAST):**

```
도구: SonarQube, Semgrep
주기: 매 PR마다
기준:
  - Critical/High 취약점: 0개
  - Code Coverage: 80% 이상
```

**동적 분석 (DAST):**

```
도구: OWASP ZAP, Burp Suite
주기: 매 배포 전
타겟: Staging 환경
```

**의존성 스캔:**

```
도구: Snyk, Dependabot
주기: 매일
자동 업데이트: Critical 취약점
```

### 스마트 컨트랙트 감사

**감사 완료:**

```
- CertiK (2024.01)
   - 발견: 3 Medium, 5 Low
   - 상태: 모두 수정 완료

- Quantstamp (2024.02)
   - 발견: 2 Medium, 3 Low
   - 상태: 모두 수정 완료

- Trail of Bits (2024.03)
   - 발견: 1 High, 4 Medium
   - 상태: 모두 수정 완료
```

**오픈소스 공개:**
https://github.com/sela-network/audits

---

## Bug Bounty 프로그램

### 보상 구조

| 심각도       | 설명                 | 보상            |
| ------------ | -------------------- | --------------- |
| **Critical** | RCE, 데이터 유출     | $10,000-$50,000 |
| **High**     | 권한 상승, 인증 우회 | $5,000-$10,000  |
| **Medium**   | XSS, CSRF            | $1,000-$5,000   |
| **Low**      | 정보 노출            | $100-$1,000     |

### 제출 방법

```
플랫폼: HackerOne
URL: https://hackerone.com/sela-network

대상:
- api.sela.network
- dashboard.sela.network
- Smart Contracts
- SDK Libraries

제외:
- 소셜 엔지니어링
- DDoS
- 이미 알려진 취약점
```

---

## 보안 교육

### 개발자 교육

**필수 교육:**

```
- OWASP Top 10
- Secure Coding Practices
- Crypto & Key Management
- Incident Response

주기: 신규 입사 + 연 2회
```

### 보안 인증

**권장 자격증:**

```
- CEH (Certified Ethical Hacker)
- CISSP (Certified Information Systems Security Professional)
- OSCP (Offensive Security Certified Professional)
```

---

## 보안 로드맵

### 2025 Q1

- SOC 2 Type II 인증 완료
- Penetration Testing 강화

### 2025 Q2

- ISO 27001 인증
- Bug Bounty 프로그램 확대

### 2025 Q3

- Zero Knowledge Proof 강화
- Homomorphic Encryption 연구

### 2025 Q4

- Quantum-Safe Cryptography 준비

---

## 보안 연락처

**보안 취약점 신고:**

```
이메일: security@sela.network
PGP Key: https://sela.network/security.asc
Response SLA: 24시간 이내
```

**일반 보안 문의:**

```
이메일: support@sela.network
```

---

## 결론

Sela Network는 **최고 수준의 보안**을 제공하기 위해 지속적으로 투자하고 개선합니다.

**핵심 보안 원칙:**

- Defense in Depth
- Zero Trust Architecture
- Privacy by Design
- Continuous Monitoring
- Rapid Response

---

**프로젝트 시작:** 2024년
**마지막 업데이트:** 2024년 11월
**다음 보안 감사:** 2025년 2월
