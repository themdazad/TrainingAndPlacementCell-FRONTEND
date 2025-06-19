import { Button } from "@heroui/react";

export default function About() {
  return (
    <>
      <div>
        <p className="text-sm tracking-widest text-bold uppercase dark:text-neutral-400 mb-2">
          About Us
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 dark:text-white">
          Training & Placement Cell
        </h2>
        <p className="my-4 text-justify text-neutral-600 dark:text-neutral-300 leading-relaxed">
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
        <Button className="rounded-3xl" color="primary">Know more</Button>
      </div>
    
    </>
  );
}
