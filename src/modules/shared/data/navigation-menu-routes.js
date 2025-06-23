const NavigationMenuDetails = [
  { name: "Home", path: "/" },

  // Learn & Prepare
  {
    name: "For Student",
    dropdown: true,
    items: [
      { name: "Student's Projects", path: "/student/projects" },
    ],
  },

  // Careers
  {
    name: "Careers",
    dropdown: true,
    items: [
      { name: "Placement Drives", path: "/careers/placement-drives" },
      { name: "Mock Interviews", path: "/careers/mock-interview" },
      {
        name: "Summer Web Development 2025",
        path: "/careers/summer-web-development-2025",
      },
    ],
  },
  {
    name: "Alumni",
    path: "/alumni",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
  // Static Info
  {
    name: "About us",
    path: "/about-us",
  },
];

export default NavigationMenuDetails;