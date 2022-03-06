import { Signer } from "ethers";
import { ethers } from "hardhat";

async function forkMain() {
  const addr = "0x489ee077994b6658eafa855c308275ead8097c4a";
  const IERC20 = await ethers.getContractAt(
    "IERC20",
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
  );

  const bal = await IERC20.balanceOf(addr);

  console.log(bal);

  // Account impersonation
  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [addr],
  });

  const signer: Signer = await ethers.getSigner(addr);
  const satus = await IERC20.connect(signer).transfer(
    "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    "100000"
  );
  console.log(satus);
}

forkMain().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
