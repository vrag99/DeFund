import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { AddProject, FundedProject } from "../generated/DeFund/DeFund"

export function createAddProjectEvent(
  maker: Address,
  project: BigInt,
  youtube: string,
  github: string,
  name: string,
  description: string,
  amount: BigInt
): AddProject {
  let addProjectEvent = changetype<AddProject>(newMockEvent())

  addProjectEvent.parameters = new Array()

  addProjectEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam(
      "project",
      ethereum.Value.fromUnsignedBigInt(project)
    )
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam("youtube", ethereum.Value.fromString(youtube))
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam("github", ethereum.Value.fromString(github))
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return addProjectEvent
}

export function createFundedProjectEvent(
  funder: Address,
  maker: Address,
  project: BigInt,
  amount: BigInt
): FundedProject {
  let fundedProjectEvent = changetype<FundedProject>(newMockEvent())

  fundedProjectEvent.parameters = new Array()

  fundedProjectEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  fundedProjectEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  fundedProjectEvent.parameters.push(
    new ethereum.EventParam(
      "project",
      ethereum.Value.fromUnsignedBigInt(project)
    )
  )
  fundedProjectEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundedProjectEvent
}
