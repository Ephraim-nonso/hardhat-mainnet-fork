import { Signer } from "ethers";
import { ethers, network } from "hardhat";
const UNIROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDTHolder = "0xe3011271416f3a827e25d5251d34a56d83446159";
const UNIToken = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const amountIn = 1000e6;

async function Swap() {
  const usdtSigner: Signer = await ethers.getSigner(USDTHolder);
  const router = await ethers.getContractAt("IRouter", UNIROUTER, usdtSigner);
  const usdtContract = await ethers.getContractAt("IERC20", USDT, usdtSigner);
  const uniTokenContract = await ethers.getContractAt("IERC20", UNIToken);
  console.log(`balance before ${await uniTokenContract.balanceOf(USDTHolder)}`);

  // Set the balance of a user
  await network.provider.send("hardhat_setBalance", [
    "0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B",
    "0x1111000000000000",
  ]);

  // console.log(
  //   `The new set balance is ${await ethers.provider.getBalance(USDTHolder)}`
  // );

  //Impersonation of the signer to carry out transaction
  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [USDTHolder],
  });

  console.log(`approving ${UNIROUTER} to spend ${amountIn}`);
  await usdtContract.approve(UNIROUTER, amountIn);

  console.log(`swapping ${amountIn}USDT`);

  await router.swapExactTokensForTokens(
    amountIn,
    0,
    [USDT, UNIToken],
    USDTHolder,
    174667003954
  );
  console.log(`balance after ${await uniTokenContract.balanceOf(USDTHolder)}`);
}

Swap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
