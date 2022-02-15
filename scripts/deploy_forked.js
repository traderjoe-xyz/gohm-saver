const hre = require("hardhat");
const fs = require('fs');

async function deployNoOp(signer) {
  const {abi, bytecode} = JSON.parse(
    fs.readFileSync('./artifacts/contracts/NoOp.sol/NoOp.json').toString()
  );
  const NoOp = new hre.ethers.ContractFactory(abi, bytecode, signer);
  const noop = await NoOp.deploy()
  await noop.deployed()
  return noop
}

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

  console.log('Deploying NoOp contract')
  const noop = await deployNoOp(signer)

  let tx = await noop.noop()
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
