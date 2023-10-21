import { BigInt, Address, Bytes } from '@graphprotocol/graph-ts'

import {
  AddProject as AddProjectEvent,
  FundedProject as FundedProjectEvent,
} from '../generated/DeFund/DeFund'
import { AddProject, FundedProject } from '../generated/schema'

export function handleAddProject(event: AddProjectEvent): void {
  let id = event.params.maker

  let projectAdded = AddProject.load(id)
  if (!projectAdded) {
    projectAdded = new AddProject(id)
  }
  projectAdded._project = event.params._project
  projectAdded.maker = event.params.maker

  projectAdded.save()
}

export function handleFundedProject(event: FundedProjectEvent): void {
  let id = event.params.maker
  let projectFunded = FundedProject.load(id)
  if (!projectFunded) {
    projectFunded = new FundedProject(id)
  }
  let projectAdded = AddProject.load(id)
  if (!projectAdded) {
    projectAdded = new AddProject(id)
  }

  projectFunded._project = event.params._project
  projectFunded.amount = event.params.amount
  projectFunded.funder = event.params.funder
  projectFunded.maker = event.params.maker
  projectFunded.erc20ContractAddress = event.params.erc20ContractAddress
  projectAdded.maker = Address.fromString(
    '0x000000000000000000000000000000000000dEaD'
  )

  projectFunded.save()
  projectAdded.save()
}
