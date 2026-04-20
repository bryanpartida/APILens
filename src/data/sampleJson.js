const sampleJson = {
  actor: "Jason Statham",
  profession: "Actor",
  isActive: true,
  latestProject: "Mutiny",
  metadata: {
    nationality: "British",
    born: 1967,
    apiVersion: "2.4.0",
  },
  movies: [
    {
      title: "Mutiny",
      year: 2026,
      role: "TBA",
      status: "post-production",
      poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Levon's Trade",
      year: 2025,
      role: "Levon Cade",
      status: "upcoming",
      poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "The Beekeeper",
      year: 2024,
      role: "Adam Clay",
      status: "released",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Meg 2: The Trench",
      year: 2023,
      role: "Jonas Taylor",
      status: "released",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Fast X",
      year: 2023,
      role: "Deckard Shaw",
      status: "released",
      poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
  ],
  upcomingProjects: [
    {
      title: "Mutiny",
      releaseWindow: "2026-09-18",
      category: "Action Thriller",
    },
    {
      title: "Untitled Action Project",
      releaseWindow: "2027-04-02",
      category: "Franchise",
    },
  ],
  platforms: ["Theaters", "Prime Video", "Apple TV"],
};

export default sampleJson;
