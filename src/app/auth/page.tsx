"use client";
// import {Card, CardHeader, CardBody, Image, CardFooter, Button} from "@nextui-org/react";
import ImageCard from "../components/imagecard";

export default function Auth() {
  return (
    <>
      <h1 className="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        How do you want to register yourself?
      </h1>
        <div className="flex space-x-24 mt-10">
            <ImageCard heading="Investor" description="Fund world changing ideas." image="https://source.unsplash.com/WMD64tMfc4k" />
            <ImageCard heading="Seeker" description="Have an impactful idea?" image="https://source.unsplash.com/XVqwbImMR4M" />
        </div>
    </>
  );
}
