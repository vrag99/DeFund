"use client";

import "./profile.css";

import {
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { cryptoList } from "./cryptocurrencies.tsx";
import { Textarea, Select, SelectItem, Divider } from "@nextui-org/react";
import ProjectCard from "../components-new/projectCard.tsx";

export default function SeekerProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="w-full h-screen dark backdrop-blur-3xl">
        <div className="p-10">
          <h1 className=" text-4xl text-center p-4 mb-2 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hello, Himanshu 👋
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
            <br />
            <Button onPress={onOpen} variant="ghost" className="font-bold shadow-lg">
              Add New Project
            </Button>
            {/* <Modal
              className="text-orange-100 dark"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
              backdrop="blur"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">New Project</ModalHeader>
                    <ModalBody>
                      <Input label="Project Name" variant="flat" />
                      <Textarea label="Description" placeholder="Enter your description" />
                      <Input label="Video Link" variant="flat" />
                      <Input label="GitHub Link" variant="flat" />
                      <div className="w-full flex space-x-2">
                        <Input label="Amount" type="number" variant="flat" />
                        <Select
                          items={cryptoList}
                          label="Cryptocurrency"
                          placeholder="Select a currency"
                        >
                          {(crypto) => <SelectItem key={crypto.value}>{crypto.label}</SelectItem>}
                        </Select>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="bg-orange-600 font-semibold" onPress={onClose}>
                        Seek Funding
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal> */}
            <Divider className="max-w-md mx-auto my-10" />
          </div>

          <h2 className="text-2xl p-4 mb-2 font-semibold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Your Projects ➴
          </h2>

          <div className="flex flex-row space-x-3">
            <Button onPress={onOpen} color="primary">
              Add Poll
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="dark">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                    <ModalBody>
                      <Input
                        autoFocus
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                      />
                      <div className="flex py-2 px-1 justify-between">
                        <Checkbox>Remember me</Checkbox>
                        <Link color="primary" href="#" size="sm">
                          Forgot password?
                        </Link>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Sign in
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
