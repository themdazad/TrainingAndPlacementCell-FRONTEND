import { Button } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <>
      <div>
        <p className="text-sm tracking-widest text-bold uppercase dark:text-gray-400 mb-2">
          About
        </p>
        <h2 className="text-xl md:text-6xl text-bold text-gray-800 dark:text-white">
          Training & Placement Cell
        </h2>
        <p className="my-4 text-justify text-gray-600 dark:text-gray-300 leading-relaxed">
          The Training and Placement Cell at Government Engineering College,
          Siwan, is dedicated to preparing students for successful careers in
          industry and academia. Under the esteemed leadership of our Principal,{" "}
          <strong>Dr. Suryakant Singh</strong>, and the guidance of our Training
          & Placement Officer, <strong>Mr. Navdeep Pandey</strong>, the cell
          actively fosters industry interaction, soft skills training,
          internship programs, and placement support. Our mission is to bridge
          the academic-industry gap and provide students with ample
          opportunities to realize their professional goals.
        </p>
        <button className="rounded-3xl text-blue-500">Know more</button>
      </div>
    
    </>
  );
}
