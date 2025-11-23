// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": "/introduction/welcome",
  },
  integrations: [
    starlight({
      title: "Sela Network",
      pagefind: false,
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/sela-network",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          items: [{ label: "Welcome", slug: "introduction/welcome" }],
        },
        {
          label: "Overview",
          items: [
            { label: "Executive Summary", slug: "overview/executive-summary" },
            { label: "Problem Statement", slug: "overview/problem" },
          ],
        },
        {
          label: "Whitepaper",
          items: [{ label: "Introduction", slug: "whitepaper/introduction" }],
        },
        {
          label: "Technology",
          items: [
            { label: "Solution", slug: "technology/solution" },
            { label: "Architecture", slug: "technology/architecture" },
            {
              label: "Core Technologies",
              slug: "technology/core-technologies",
            },
            { label: "Workflow", slug: "technology/workflow" },
            {
              label: "Browser Automation",
              slug: "technology/browser-automation",
            },
            {
              label: "Vision Language Models",
              slug: "technology/vision-language-models",
            },
            {
              label: "zkTLS Verification",
              slug: "technology/zktls-verification",
            },
          ],
        },
        {
          label: "Use Cases",
          items: [
            { label: "Overview", slug: "use-cases/overview" },
            { label: "Finance & Trading", slug: "use-cases/finance-trading" },
            {
              label: "Enterprise Automation",
              slug: "use-cases/enterprise-automation",
            },
            {
              label: "Research & Intelligence",
              slug: "use-cases/research-intelligence",
            },
            {
              label: "E-commerce & Retail",
              slug: "use-cases/ecommerce-retail",
            },
          ],
        },
        {
          label: "AI Agent Integration",
          items: [{ label: "LangChain", slug: "integrations/langchain" }],
        },
        {
          label: "Node Operators",
          items: [
            { label: "Complete Guide", slug: "node-operators/complete-guide" },
          ],
        },
        {
          label: "Tokenomics",
          items: [{ label: "Overview", slug: "tokenomics/overview" }],
        },
        {
          label: "Rewards",
          items: [
            { label: "Rewards System", slug: "rewards/rewards-system" },
            { label: "Node Rewards", slug: "rewards/node-rewards" },
            { label: "Developer Rewards", slug: "rewards/developer-rewards" },
            { label: "Points System", slug: "rewards/points" },
            { label: "SELA Token", slug: "rewards/sela-token" },
          ],
        },
        {
          label: "Roadmap",
          items: [
            { label: "Vision", slug: "roadmap/vision" },
            { label: "Development Phases", slug: "roadmap/phases" },
          ],
        },
        {
          label: "Security",
          items: [
            { label: "Architecture", slug: "security/architecture" },
            { label: "Threat Model", slug: "security/threat-model" },
            { label: "Data Protection", slug: "security/data-protection" },
          ],
        },
        {
          label: "Performance",
          items: [{ label: "Benchmarks", slug: "performance/performance" }],
        },
        {
          label: "Competitive Analysis",
          items: [
            { label: "Market Overview", slug: "competitive-analysis/overview" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "API", slug: "reference/overview" },
            {
              label: "System Requirements",
              slug: "reference/system-requirements",
            },
            { label: "Installation", slug: "reference/installation-guide" },
          ],
        },
      ],
    }),
  ],
});
