const hre = require("hardhat");
const fs = require('fs');


async function main() {
  console.log('Setting up forked env')
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f"]
  })
  await hre.network.provider.request({
    method: "hardhat_setBalance",
    params: ["0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f", "0x56bc75e2d63100000"]
  })

  const signer = await hre.ethers.provider.getSigner(
    "0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f"
  );

  console.log("Sending transactions to self")
  let tx = await signer.sendTransaction({
    to: "0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f",
    value: 0,
  })
  console.log('first tx: ', tx)
  while (tx.nonce != 1111) {
    if (tx.nonce % 100 == 0) {
      console.log(`Burned ${tx.nonce} nonces`)
    }
    tx = await signer.sendTransaction({
      to: "0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f",
      value: 0
    })
  }
  console.log('last tx:', tx)
  console.log('Deploying Sweep contract')
  const SweepFactory = await hre.ethers.getContractFactory()
  await SweepFactory.deploy(
    "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",  // gohm address
    "0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f",  // deployer address
  )


  const gohm = await hre.ethers.getContractAt(
    "IERC20",
    "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f"
  )
  const balance = await gohm.balanceOf('0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f')
  console.log(`gOHM balance of 0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f ${balance}`)
}

main();
