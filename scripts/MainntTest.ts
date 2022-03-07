import { Provider } from "@ethersproject/abstract-provider";
import { BigNumber, BytesLike, providers, Signer } from "ethers";
import { ethers, network } from "hardhat";

async function Mainnet() {
  const ownerAddress = "0x4adf44961a7cbe8ee46b2bf04e7198e879677825";
  const rand = "0xdd04f596569b09bb967ab9f20cdc1b7bc7495afd";
  const contractAddress = await ethers.getContractAt(
    "IERC20",
    "0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3"
  );
  const bal = await contractAddress.balanceOf(ownerAddress);
  const bal2 = await contractAddress.balanceOf(rand);

  // console.log(bal, bal2);

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [ownerAddress],
  });

  // const signer: Signer = await ethers.getSigner(ownerAddress);
  // const status = await contractAddress
  //   .connect(signer)
  //   .transfer(rand, "100000000000000000000");
  // const status3 = await contractAddress.balanceOf(ownerAddress);
  // const status2 = await contractAddress.connect(signer).balanceOf(rand);

  // console.log(status);
  // console.log(status3, status2);

  const abiValue: BytesLike = new ethers.utils.AbiCoder().encode(
    ["address", "uint256"],
    [ownerAddress, 5]
  );
  const hashed: BytesLike = await ethers.utils.solidityKeccak256(
    ["bytes"],
    [abiValue]
  );

  const decNumber: BigNumber = BigNumber.from(hashed);

  const pos = await ethers.provider.getStorageAt(
    contractAddress.address,
    decNumber
  );
  console.log(pos);
  const balBefore = await contractAddress.balanceOf(ownerAddress);
  console.log(balBefore);

  // const setStorage = await network.provider.send("hardhat_setStorageAt", [
  //   contractAddress,
  //   "0x0",
  //   "0x0000000000000000000000000000000000000000000000000000000000000001",
  // ]);
}

Mainnet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
