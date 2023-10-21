import {
  AddProject as AddProjectEvent,
  FundedProject as FundedProjectEvent
} from "../generated/DeFund/DeFund"
import { AddProject, FundedProject } from "../generated/schema"

export function handleAddProject(event: AddProjectEvent): void {
  let entity = new AddProject(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.maker = event.params.maker
  entity._project = event.params._project

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundedProject(event: FundedProjectEvent): void {
  let entity = new FundedProject(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.funder = event.params.funder
  entity.maker = event.params.maker
  entity._project = event.params._project
  entity.amount = event.params.amount
  entity.erc20ContractAddress = event.params.erc20ContractAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
