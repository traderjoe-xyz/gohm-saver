const hre = require("hardhat");
const fs = require('fs');

async function deploySweep(signer) {
  const {abi, bytecode} = JSON.parse(
    fs.readFileSync('./artifacts/contracts/Sweep.sol/Sweep.json').toString()
  );
  const Sweep = new hre.ethers.ContractFactory(abi, bytecode, signer);
  const sweep = await Sweep.deploy(
    "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",  // gohm address
    "0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f",  // deployer address
  )
  await sweep.deployed()
}

async function main() {

  const signer = (await hre.ethers.getSigners())[0]

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
    tx = await noop.noop()
  }

  console.log('Deploying Sweep contract')
  await deploySweep(signer)

  const gohm = await hre.ethers.getContractAt(
    "IERC20",
    "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f"
  )
  const balance = await gohm.balanceOf('0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f')
  console.log(`gOHM balance of 0x66Fb02746d72bC640643FdBa3aEFE9C126f0AA4f ${balance}`)
}

main();