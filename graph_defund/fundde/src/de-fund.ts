import { BigInt, bigInt } from '@graphprotocol/graph-ts'
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
  projectAdded.maker = event.params.maker
  projectAdded.project = event.params.project
  projectAdded.youtube = event.params.youtube
  projectAdded.github = event.params.github
  projectAdded.name = event.params.name
  projectAdded.description = event.params.description
  projectAdded.amount = event.params.amount

  projectAdded.save()
}

export function handleFundedProject(event: FundedProjectEvent): void {
  let id = event.params.maker
  let projectFunded = FundedProject.load(id)
  if (!projectFunded) {
    projectFunded = new FundedProject(id)
  }
  let money: BigInt
  if (projectFunded) {
    money = projectFunded.amount
  } else {
    money = new BigInt(0)
  }

  projectFunded.funder = event.params.funder
  projectFunded.maker = event.params.maker
  projectFunded.project = event.params.project
  //@ts-ignore
  projectFunded.amount = event.params.amount + money

  projectFunded.save()
}
