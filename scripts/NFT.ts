// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const MyNFT = await ethers.getContractFactory("NFTProject");
  const nft = await MyNFT.deploy();

  await nft.deployed();

  console.log(
    await nft.safeMint(
      "0xf18be8A5FcBD320fDe04843954c1c1A155b9Ae2b",
      "ipfs//:QmcRZBdzxSxvrzt4469Vxuc7gTbQFB2Eqt5pp5kg8La88B"
    )
  );

  console.log("Greeter deployed to:", nft.address);
}

//0x32FcA5F54dF2F9Fb4Ffa4B5ed9Ab200d58110fFc   ---ropsten
//0xCA965a1D96Bbc9F92FA2B371E2Bf6ceE28F5fB26   ---rinkeby

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
