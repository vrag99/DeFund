import { Card, CircularProgress } from "@nextui-org/react"

export default function ProjectCard({name , description}:{name:string , description:string}){
    return (
        <Card className="p-8 max-w-4/5 min-w-min">
              <div className="flex flex-row space-x-4">
                <CircularProgress
                  size="lg"
                  value={2}
                  maxValue={10}
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border",
                    indicator: "text-orange-600 font-semibold",
                    value: "font-semibold text-tiny",
                  }}
                  formatOptions={{ style: "currency", currency: "ETH" }}
                  showValueLabel={true}
                ></CircularProgress>
                <div>
                  <h3 className="text-xl mb-2 font-extrabold">{name}</h3>
                  <p className="text-md text-orange-50">
                    {description}
                  </p>
                </div>
              </div>
            </Card>

    )
}