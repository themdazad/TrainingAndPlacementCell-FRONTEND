import { NavLink } from "react-router-dom";
import { Image } from "@heroui/react";

const navItems = [
  { title: "Home", navigate: "/" },
  { title: "Programs", navigate: "programs" },
  { title: "Placements", navigate: "placements" },
  { title: "Gallery", navigate: "gallery" },
  { title: "Careers", navigate: "careers" },
];

export default function NavBar() {
  return (
    <nav className="max-w-[1980px] m-auto ">
      <div className="navHeader px-[5%] py-4  min-h-[100px]  bg-blue-400/20 flex justify-between align-middle">
        {/* website logo */}
        <div className="brand-logo max-h-[100%] h-[80px] aspect-square">
          <Image src="./images/gecsiwan-logo.png" alt="gec-siwan-logo" />
        </div>
        {/* website title */}
        <div className="title text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Training and Placement Cell
          </h1>
          <h3 className="text-xl">Government Engineering College, Siwan</h3>
        </div>
        {/* affiliated logos */}
        {/* right-side logos */}
        <div className="r-logos flex gap-3">
            <Image className="brand-logo border-1 border-black p-1 rounded-full max-h-[100%] h-[80px] aspect-square" src="./images/dstbihar-logo.png" alt="dstbihar-logo" />
            <Image className="brand-logo max-h-[100%] h-[80px] aspect-square" src="./images/aicte-logo.png" alt="aicte-logo" />
        </div>
      </div>

      <div className="nav-items px-[5%] min-h-[40px] bg-blue-400/50">
        <ul className="flex gap-4 p-3">
          {navItems.map((value, index) => {
            return (
              <NavLink to={value.navigate} key={index}>
                {value.title}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
