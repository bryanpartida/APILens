const sampleJson = [
  {
    id: "prod_1001",
    productName: "Atlas API Monitor",
    team: "Platform Ops",
    description:
      "Observability dashboard for tracking endpoint latency, uptime, and deployment health across services.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    status: "active",
    monthlyUsers: 4820,
    responseTimeMs: 184,
    uptimePercent: 99.97,
    tags: ["monitoring", "analytics", "devtools"],
    owner: {
      name: "Elena Park",
      role: "Product Lead",
    },
  },
  {
    id: "prod_1002",
    productName: "Pulse Billing API",
    team: "Revenue Systems",
    description:
      "Usage-based billing service that aggregates invoice events, rate cards, and account-level plan changes.",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
    status: "beta",
    monthlyUsers: 1950,
    responseTimeMs: 246,
    uptimePercent: 99.89,
    tags: ["billing", "payments", "events"],
    owner: {
      name: "Marcus Reed",
      role: "Engineering Manager",
    },
  },
  {
    id: "prod_1003",
    productName: "Northstar Search",
    team: "Growth Search",
    description:
      "Search relevance service powering instant suggestions, ranked results, and personalized discovery cards.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    status: "active",
    monthlyUsers: 8310,
    responseTimeMs: 129,
    uptimePercent: 99.99,
    tags: ["search", "relevance", "ranking"],
    owner: {
      name: "Priya Shah",
      role: "Staff Engineer",
    },
  },
];

export default sampleJson;
