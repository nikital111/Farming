/* eslint-disable jest/valid-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { Farming, TestToken, TestTokenReward } from "../typechain-types";
const { expect } = require("chai");
const { ethers } = require("hardhat");

const address0 = "0x0000000000000000000000000000000000000000";

describe("NFT", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const TestTokenRewardFactory = await ethers.getContractFactory(
      "TestTokenReward"
    );
    const TestTokenReward: TestTokenReward =
      await TestTokenRewardFactory.deploy("A", "A");

    const TestTokenFactory = await ethers.getContractFactory("TestToken");
    const TestToken: TestToken = await TestTokenFactory.deploy("B", "B");

    await TestTokenReward.deployed();
    await TestToken.deployed();

    const FarmingFactory = await ethers.getContractFactory("Farming");
    const Farming: Farming = await FarmingFactory.deploy(
      TestTokenReward.address,
      TestToken.address,
      100000
    );

    await Farming.deployed();

    expect(Farming.address).to.be.properAddress;

    return { Farming, TestTokenReward, TestToken, owner, otherAccount };
  }

  it("should be deployed", async function () {
    const { Farming, TestTokenReward, TestToken, owner } = await loadFixture(
      deployFixture
    );
  });
});
