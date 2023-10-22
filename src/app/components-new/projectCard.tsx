
import { Card, CircularProgress, Button, Modal } from "@nextui-org/react";
import {
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  Progress,
} from "@nextui-org/react";

import { ScrollShadow } from "@nextui-org/react";

interface props {
  name: string;
  currentFunding: number;
  reqFunding: number;
  description: string;
  github: string;
  video: string;
  isInvestor?: boolean;
}

const ProjectCard: React.FC<{ inputProps: props }> = ({ inputProps }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { name, currentFunding, reqFunding, description, github, video, isInvestor } = inputProps;
  return (
    <>
      <Card className="p-8 max-w-md">
        <ScrollShadow
          className="flex flex-row space-x-4 overflow-auto max-h-unit-4xl"
          hideScrollBar
        >
          <CircularProgress
            size="lg"
            value={currentFunding}
            maxValue={reqFunding}
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border",
              indicator: "text-orange-600 font-semibold",
              value: "font-semibold text-tiny",
            }}
            formatOptions={{ style: "currency", currency: "APE" }}
            showValueLabel={true}
          ></CircularProgress>
          <div>
            <h3 className="text-xl mb-2 font-extrabold underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-orange-600 lg:decoration-4">
              {name}
            </h3>
            <p className="text-md text-gray-400 ">{description}</p>
          </div>
        </ScrollShadow>
        <Button className="bg-orange-600 mt-4 max-w-sm" onPress={onOpen}>
          View Details
        </Button>

        <Modal
          className="text-orange-100 dark"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="blur"
        >
          <ModalContent className="p-4">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className="text-xl mb-2 font-extrabold underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-orange-600 lg:decoration-4">
                    {name}
                  </h3>
                </ModalHeader>
                <ModalBody>
                  <p className="text-md text-gray-400">{description}</p>
                  <div className="flex flex-row space-x-3 my-4">
                    <p>Links: </p>
                    <Link isExternal href={github} showAnchorIcon>
                      Github Link
                    </Link>
                    <Link isExternal href={video} showAnchorIcon>
                      Video Link
                    </Link>
                  </div>

                  <Progress
                    label="Funding Recieved"
                    size="md"
                    value={currentFunding}
                    maxValue={reqFunding}
                    classNames={{
                      base: "max-w-md",
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-red-500 to-orange-400",
                      label: "font-medium text-default-600",
                      value: "text-foreground/60",
                    }}
                    formatOptions={{ style: "currency", currency: "APE" }}
                    showValueLabel={true}
                    className="max-w-md"
                  />
                  {isInvestor && (
                    <Button variant="flat" className="font-semibold w-auto mt-2 hover:bg-orange-500">
                      Fund this idea 💸
                    </Button>
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </Card>
    </>
  );
};

export default ProjectCard;
