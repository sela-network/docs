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
          label: "INTRODUCTION",
          items: [{ label: "Welcome", slug: "introduction/welcome" }],
        },
        {
          label: "OVERVIEW",
          items: [
            { label: "Executive Summary", slug: "overview/executive-summary" },
            { label: "Problem Statement", slug: "overview/problem" },
          ],
        },
        {
          label: "WHITEPAPER",
          items: [{ label: "Introduction", slug: "whitepaper/introduction" }],
        },
        {
          label: "TECHNOLOGY",
          items: [
            { label: "Solution", slug: "technology/solution" },
            { label: "Architecture", slug: "technology/architecture" },
            { label: "Core Technologies", slug: "technology/core-technologies" },
            { label: "Workflow", slug: "technology/workflow" },
          ],
        },
        {
          label: "USE CASES",
          items: [
            { label: "Overview", slug: "use-cases/overview" },
            { label: "E-commerce & Retail", slug: "use-cases/ecommerce-retail" },
            { label: "Finance & Trading", slug: "use-cases/finance-trading" },
          ],
        },
        {
          label: "TOKENOMICS",
          items: [{ label: "Overview", slug: "tokenomics/overview" }],
        },
        {
          label: "REWARDS",
          items: [
            { label: "Rewards System", slug: "rewards/rewards-system" },
            { label: "Node Rewards", slug: "rewards/node-rewards" },
            { label: "Developer Rewards", slug: "rewards/developer-rewards" },
            { label: "Points System", slug: "rewards/points" },
            { label: "SELA Token", slug: "rewards/sela-token" },
          ],
        },
        {
          label: "ROADMAP",
          items: [
            { label: "Vision", slug: "roadmap/vision" },
            { label: "Development Phases", slug: "roadmap/phases" },
          ],
        },
        {
          label: "SECURITY",
          items: [
            { label: "Architecture", slug: "security/architecture" },
            { label: "Threat Model", slug: "security/threat-model" },
            { label: "Data Protection", slug: "security/data-protection" },
          ],
        },
        {
          label: "PERFORMANCE",
          items: [{ label: "Benchmarks", slug: "benchmarks/performance" }],
        },
        {
          label: "COMPETITIVE ANALYSIS",
          items: [
            { label: "Market Overview", slug: "competitive-analysis/overview" },
          ],
        },
        {
          label: "REFERENCE",
          items: [
            { label: "API", slug: "api/overview" },
            { label: "System Requirements", slug: "technical-specs/system-requirements" },
            { label: "Installation", slug: "setup/installation-guide" },
          ],
        },
      ],
    }),
  ],
});
