import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddProject } from "../generated/schema"
import { AddProject as AddProjectEvent } from "../generated/DeFund/DeFund"
import { handleAddProject } from "../src/de-fund"
import { createAddProjectEvent } from "./de-fund-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let maker = Address.fromString("0x0000000000000000000000000000000000000001")
    let project = BigInt.fromI32(234)
    let youtube = "Example string value"
    let github = "Example string value"
    let name = "Example string value"
    let description = "Example string value"
    let amount = BigInt.fromI32(234)
    let newAddProjectEvent = createAddProjectEvent(
      maker,
      project,
      youtube,
      github,
      name,
      description,
      amount
    )
    handleAddProject(newAddProjectEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddProject created and stored", () => {
    assert.entityCount("AddProject", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maker",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "project",
      "234"
    )
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "youtube",
      "Example string value"
    )
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "github",
      "Example string value"
    )
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "AddProject",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
