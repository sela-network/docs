// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/overview/executive-summary",
  },
  integrations: [
    starlight({
      title: "Sela Network",
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "개요",
          items: [
            { label: "핵심 요약", slug: "overview/executive-summary" },
            { label: "문제 정의", slug: "overview/problem" },
          ],
        },
        {
          label: "백서",
          items: [{ label: "소개", slug: "whitepaper/introduction" }],
        },
        {
          label: "기술",
          items: [
            { label: "솔루션 개요", slug: "technology/solution" },
            { label: "아키텍처", slug: "technology/architecture" },
            { label: "핵심 기술", slug: "technology/core-technologies" },
            { label: "데이터 흐름", slug: "technology/workflow" },
          ],
        },
        {
          label: "활용 사례",
          items: [{ label: "개요", slug: "use-cases/overview" }],
        },
        {
          label: "토크노믹스",
          items: [{ label: "개요", slug: "tokenomics/overview" }],
        },
        {
          label: "로드맵",
          items: [
            { label: "개발 단계", slug: "roadmap/phases" },
            { label: "비전", slug: "roadmap/vision" },
          ],
        },
        {
          label: "보상 시스템",
          items: [
            { label: "개요", slug: "rewards/rewards-system" },
            { label: "노드 운영자 보상", slug: "rewards/node-rewards" },
            { label: "개발자 보상", slug: "rewards/developer-rewards" },
            { label: "포인트 시스템", slug: "rewards/points" },
            { label: "$SELA 토큰", slug: "rewards/sela-token" },
          ],
        },
        {
          label: "API 레퍼런스",
          items: [{ label: "API 개요", slug: "api/overview" }],
        },
        {
          label: "성능 & 벤치마크",
          items: [{ label: "성능 벤치마크", slug: "benchmarks/performance" }],
        },
        {
          label: "보안",
          items: [
            { label: "보안 아키텍처", slug: "security/architecture" },
            { label: "위협 모델 분석", slug: "security/threat-model" },
            { label: "데이터 보호", slug: "security/data-protection" },
          ],
        },
        {
          label: "경쟁 분석",
          items: [
            { label: "시장 분석", slug: "competitive-analysis/overview" },
          ],
        },
        {
          label: "기술 사양",
          items: [
            {
              label: "시스템 요구사항",
              slug: "technical-specs/system-requirements",
            },
          ],
        },
      ],
    }),
  ],
});
