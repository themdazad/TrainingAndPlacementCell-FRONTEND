const NavigationMenuDetails = [
  { name: "Home", path: "/" },

  // Learn & Prepare
  {
    name: "For Student",
    dropdown: true,
    items: [{ name: "Student's Projects", path: "/student/projects" }],
  },

  // Careers
  {
    name: "Careers",
    dropdown: true,
    items: [
      { name: "Placement Drives", path: "/careers/placement-drives" },
      {
        name: "Summer Web Development 2025",
        path: "/training/summer-web-development-2025",
      },
      { name: "Mock Interviews", path: "/training/mock-interview" },
      { name: "Workshops & Webinars", path: "/training/workshops" },
    ],
  },
  {
	name: "Alumani",
	path: "/alumani",
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