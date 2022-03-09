import { Signer } from "ethers";
import { ethers } from "hardhat";

const ICRouter = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
const CAKE = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
const BUSDHolder = "0xa55acd4f12ad0fbcd5c5818370ddddf9a52855f4";
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const amountIn = 1000e6;

async function SwapToBUSD() {
  //Get signer
  const signer: Signer = await ethers.getSigner(BUSDHolder);

  //Get the contract address of the cake token
  const CAKEToken = await ethers.getContractAt("IERC20", CAKE);

  //Get the contract address of the BUSD token
  const BUSDToken = await ethers.getContractAt("IERC20", BUSD, signer);

  //The router to be approved to carry out the transaction
  const router = await ethers.getContractAt("ICRouter", ICRouter, signer);

  //Shows the balances of the tokens.
  console.log(await BUSDToken.balanceOf(BUSDHolder));
  console.log(`Balance before: ${await CAKEToken.balanceOf(BUSDHolder)} `);

  //impersonation of account
  //@ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [BUSDHolder],
  });

  await BUSDToken.approve(ICRouter, amountIn);

  await router.swapExactTokensForTokens(
    amountIn,
    0,
    [BUSD, CAKE],
    BUSDHolder,
    1646766136
  );
  console.log(`Balance after: ${await CAKEToken.balanceOf(BUSDHolder)} `);
}

SwapToBUSD().catch((error) => {
  console.error(error);
  process.exit(1);
});
