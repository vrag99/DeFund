"use-client";

import "./profile.css";

import { Chip, Input, Divider , useDisclosure } from "@nextui-org/react";
import { SearchIcon } from "./SeachIcon.jsx";
import ProjectCard from "../components-new/projectCard.tsx";

export default function InvestorProfile() {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="w-full h-screen dark backdrop-blur-3xl">
        <div className="p-10">
          <h1 className=" text-4xl text-center p-4 mb-2 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hello, Investor 👋
          </h1>
          <div className="text-center">
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br p-4 mb-8 from-orange-500 to-red-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow text-lg shadow-black text-white font-semibold truncate",
              }}
            >
              Wallet Address: 0xeFCCaCDe8d300b56A9dD3e015908871dfb43E286
            </Chip>
          </div>

          <Input
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                "text-md"
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-lg",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
                "max-w-md",
                "mx-auto"
              ],
            }}
            placeholder="Type to search for projects..."
            startContent={
              <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
            <Divider className="my-6 max-w-md mx-auto" />
          <h2 className="text-2xl p-4 mb-2 font-semibold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Trending Ideas ➴
          </h2>

          {/* <div className="flex flex-row space-x-3">
            <ProjectCard inputProps={{
              name: "Umbrella Corp",
              description: "For other uses of the name Umbrella, see Umbrella (disambiguation). For private military company, see Blue Umbrella. The Umbrella Corporation was a multinational conglomerate with subsidiaries active in a variety of industries from the 1980s to the early 2000s. Umbrella had influence in the production and sale of cosmetics, chemicals, pharmaceuticals, industrial machine production, consumer products, health foods, the transportation industry and tourism. Umbrella's large array of subsidiaries was typical for large-scale corporations, though it was purposely built to cover up illegal activities.",
              currentFunding: 5,
              reqFunding: 10,
              github: "https://github.com/",
              video: "https://youtube.com/",
              isInvestor: true,
            }} />
          </div> */}


        </div>
      </div>
    </>
  );
}
