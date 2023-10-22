"use client"

import { Card, CardHeader, Image, CardFooter } from "@nextui-org/react";


interface props {
  heading: string;
  isChoice?: boolean;
  image: string;
  description: string;
  handlePress:()=>void
}

export default function ImageCard(props: props) {

  return (
    <>
      <Card isFooterBlurred shadow="md" isPressable className="w-[250px] h-[300px] col-span-12 sm:col-span-7" onPress={props.handlePress}>
        <CardHeader className="absolute z-10 flex-col items-start bg-gradient-to-b from-zinc-950 to-black/5">
          <p className="text-lg text-orange-400 uppercase font-bold">{props.heading}</p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={props.image}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-left text-white">{props.description}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
