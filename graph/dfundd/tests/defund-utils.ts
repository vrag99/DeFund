import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { AddProject, FundedProject } from "../generated/defund/defund"

export function createAddProjectEvent(
  maker: Address,
  _project: BigInt
): AddProject {
  let addProjectEvent = changetype<AddProject>(newMockEvent())

  addProjectEvent.parameters = new Array()

  addProjectEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  addProjectEvent.parameters.push(
    new ethereum.EventParam(
      "_project",
      ethereum.Value.fromUnsignedBigInt(_project)
    )
  )

  return addProjectEvent
}

export function createFundedProjectEvent(
  funder: Address,
  maker: Address,
  _project: BigInt,
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
      "_project",
      ethereum.Value.fromUnsignedBigInt(_project)
    )
  )
  fundedProjectEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundedProjectEvent
}
