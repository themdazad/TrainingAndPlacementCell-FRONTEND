import PATHS from '../../../constants/paths';

const NavigationMenuDetails = [
  { name: 'Home', path: PATHS.MAIN.HOME },
  // {
  //   name: "Careers",
  //   dropdown: true,
  //   items: [
  //     { name: "Placement Drives", path: "/careers/placement-drives" },
  //   ],
  // },
  {
    name: 'Alumni',
    path: PATHS.MAIN.ALUMNI,
  },
  {
    name: 'Gallery',
    path: PATHS.MAIN.GALLERY,
  },
  {
    name: 'Resume Builder',
    path: PATHS.MAIN.RESUME_BUILDER,
  },
  // Static Info
  {
    name: 'About us',
    path: PATHS.MAIN.ABOUT_US,
  },
];

export default NavigationMenuDetails;
