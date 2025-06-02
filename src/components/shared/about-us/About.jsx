import { ArrowRightCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <div>
      <p className="text-sm tracking-widest text-bold uppercase dark:text-zinc-400 mb-2">
        About Us
      </p>
      <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-800 dark:text-white">
        Training & Placement Cell at Government Engineering College, Siwan
      </h2>
      <p className="my-4 text-justify text-zinc-600 dark:text-zinc-300 leading-relaxed">
        The Training and Placement Cell at Government Engineering College,
        Siwan, is dedicated to preparing students for successful careers in
        industry and academia. Under the esteemed leadership of our Principal,{" "}
        <strong>Dr. Suryakant Singh</strong>, and the guidance of our Training &
        Placement Officer, <strong>Mr. Navdeep Pandey</strong>, the cell
        actively fosters industry interaction, soft skills training, internship
        programs, and placement support. Our mission is to bridge the
        academic–industry gap and provide students with ample opportunities to
        realize their professional goals.
      </p>

      <NavLink to="/about-us">
        <span className="text-blue-500 hover:text-blue-500 font-medium inline-flex items-center">
          know more
          <ArrowRightCircle className="w-4 h-4 ml-1" />
        </span>
      </NavLink>
    </div>
  );
}
