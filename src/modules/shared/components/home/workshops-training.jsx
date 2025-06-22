import { Button, Divider, Image } from "@heroui/react";
import { useState } from "react";
import {Link } from "lucide-react";
import { NavLink } from "react-router-dom";
import WorkshopsTrainingData from "../../../../assets/data/workshops-training-data.js";

export default function WorkshopsTraining() {
  const [cardData, setCardData] = useState(WorkshopsTrainingData);
  return (
    <div className="section ">
      <section className="max-w-screen-2xl m-auto px-[2.5%] space-y-6 w-full">
        {/* page title  */}
        <span className="text-xl md:text-3xl font-semibold backdrop-blur-md inline-flex rounded-full  bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 text-nowrap">
          Workshops & Training
        </span>
        <Divider />
        <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardData.splice(0, 4).map((item) => {
            return (
              <div
                key={item._id}
                className="group aspect-video bg-white relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt={"azad-"}
                  width={400}
                  height={200}
                  className="absolute z-8 object-contain"
                />
                {/*hoverd: details card  */}
                <div className="absolute bg-blue-100 dark:bg-stone-800 grid place-content-center z-9 backdrop-blur-xl backdrop-saturate-0 p-6 space-y-1 h-full w-full -top-full group-hover:top-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="space-y-2 text-center">
                    <h1 className="text-xl font-extrabold">{item.title}</h1>
                    <div className="inline-flex gap-2">
                      {item.branch.map((data, ls) => {
                        return <p key={ls}>{data}</p>;
                      })}
                    </div>
                    {!!item.deadline && (
                      <p className="">Last Date: {item.deadline}</p>
                    )}
                  </div>

                  <div className="space-x-2 flex justify-center">
                    {!!item?.apply && (
                      <NavLink to={item.apply} target="_blank">
                        <Button
                          className="hover:shadow-xl cursor-pointer rounded-3xl"
                          variant="outline"
                        >
                          <Link /> Apply
                        </Button>
                      </NavLink>
                    )}

                    {!!item?.know_more && (
                      <NavLink to={item.know_more} target="_blank">
                        <Button
                          className="hover:shadow-xl cursor-pointer rounded-3xl"
                          variant="outline"
                        >
                          Know More
                        </Button>
                      </NavLink>
                    )}
                  </div>
                </div>
                <div className="absolute z-10 px-3 py-1 text-sm flex dark:bg-stone-800 text-white bg-blue-500 rounded-tr-3xl opacity-100 group-hover:opacity-0 min-w-max -bottom-0 group-hover:-bottom-full transition-all duration-500 ">
                  <p className=" px-2">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
