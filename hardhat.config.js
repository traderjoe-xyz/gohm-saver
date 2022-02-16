/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.6",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_PROJECT_ID}`,
      },
      accounts: process.env.ACCOUNT_PRIVATE_KEY ? [{privateKey: process.env.ACCOUNT_PRIVATE_KEY, balance: "100000000000000000"}] : [],
    },
    ethereum: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_PROJECT_ID}`,
      accounts: process.env.ACCOUNT_PRIVATE_KEY ? [process.env.ACCOUNT_PRIVATE_KEY] : [],
    },
  },
};
