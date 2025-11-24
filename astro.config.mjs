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
          ],
        },
        {
          label: "Use Cases",
          items: [{ label: "Overview", slug: "use-cases/overview" }],
        },
        {
          label: "Node Operators",
          items: [
            { label: "Complete Guide", slug: "node-operators/complete-guide" },
          ],
        },
        // {
        //   label: "Rewards",
        //   items: [
        //     { label: "Rewards System", slug: "rewards/rewards-system" },
        //     { label: "Node Rewards", slug: "rewards/node-rewards" },
        //     { label: "$SPWR", slug: "rewards/points" },
        //   ],
        // },
        {
          label: "Roadmap",
          items: [{ label: "Vision", slug: "roadmap/vision" }],
        },
        {
          label: "Competitive Analysis",
          items: [
            { label: "Market Overview", slug: "competitive-analysis/overview" },
          ],
        },
        // {
        //   label: "Reference",
        //   items: [
        //     { label: "API", slug: "reference/overview" },
        //     {
        //       label: "System Requirements",
        //       slug: "reference/system-requirements",
        //     },
        //     { label: "Installation", slug: "reference/installation-guide" },
        //   ],
        // },
      ],
    }),
  ],
});
