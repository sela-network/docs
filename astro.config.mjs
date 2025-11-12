// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Sela Network",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          items: [
            { label: "Welcome to SelaNetwork", slug: "introduction/welcome" },
          ],
        },
        {
          label: "SelaNetwork Node Sale",
          items: [
            {
              label: "Introduction",
              items: [
                {
                  label: "What is Sela Node?",
                  slug: "node-sale/introduction/what-is-sela-node",
                },
                {
                  label: "Sela Node Rewards",
                  slug: "node-sale/introduction/sela-node-rewards",
                },
              ],
            },
            {
              label: "Node Sale Overview",
              items: [
                {
                  label: "Node Sale Tiers",
                  slug: "node-sale/overview/node-sale-tiers",
                },
                { label: "Whitelist", slug: "node-sale/overview/whitelist" },
              ],
            },
          ],
        },
        {
          label: "Rewards",
          items: [
            {
              label: "SelaNetwork Rewards System",
              slug: "rewards/rewards-system",
            },
            { label: "SelaNetwork Points", slug: "rewards/points" },
            { label: "$SELA Token", slug: "rewards/sela-token" },
          ],
        },
        {
          label: "SelaNetwork Architecture",
          items: [
            { label: "Overview", slug: "architecture/overview" },
            { label: "Data Layer", slug: "architecture/data-layer" },
            { label: "LLM Layer", slug: "architecture/llm-layer" },
          ],
        },
        {
          label: "Setup SelaNetwork",
          items: [
            { label: "Installation Guide", slug: "setup/installation-guide" },
          ],
        },
      ],
    }),
  ],
});
