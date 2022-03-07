import { BigNumber, BytesLike, Signer } from "ethers";
import { ethers, network } from "hardhat";

async function forkMain() {
  const addr = "0xf46bb6dda9709c49efb918201d97f6474eac5aea";
  const IERC20 = await ethers.getContractAt(
    "IERC20",
    "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A"
  );

  const bal = await IERC20.balanceOf(addr);

  //   console.log(bal);

  // Account impersonation
  //@ts-ignore
  //   await hre.network.provider.request({
  //     method: "hardhat_impersonateAccount",
  //     params: [addr],
  //   });

  //   const signer: Signer = await ethers.getSigner(addr);
  //   const satus = await IERC20.connect(signer).transfer(
  //     "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
  //     "123000000000000000"
  //   );
  //   console.log(satus);

  // set Mapping storage

  const x: BytesLike = new ethers.utils.AbiCoder().encode(
    ["address", "uint256"],
    [addr, 11]
  );
  const hashedVal: BytesLike = ethers.utils.solidityKeccak256(["bytes"], [x]);
  const dec: BigNumber = BigNumber.from(hashedVal);
  console.log(hashedVal, dec);

  const secondBal = await ethers.provider.getStorageAt(IERC20.address, dec);
  console.log(`Balance before ${await IERC20.balanceOf(addr)}`);

  console.log(secondBal);
  await network.provider.send("hardhat_setStorageAt", [
    IERC20.address,
    hashedVal,
    "0x00000000000000000000000000000000000000000000000000000000000f4240",
  ]);
  console.log(`Balance after ${await IERC20.balanceOf(addr)}`);

  //     const balAfter = await IERC20.balanceOf(addrr)
  //   console.log(balance after rigging is ${balAfter})
}

forkMain().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
