const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const TokenPreSale = artifacts.require("TokenPreSale");

module.exports = async function (deployer) {
  // BSC Testnet
  // Bsc Testnet BNB / USD Oracle: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526 -> https://docs.chain.link/docs/data-feeds/price-feeds/addresses/
  // TestUSDT BscTestNet (created with TestUSDT contract) = 0x250df3426Facabb1a1AE0145ea2E86cdbb296fA7
  // 
  // Goerli ETH Testnet
  // Goerli ETH/USDT Oracle: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e -> https://docs.chain.link/docs/data-feeds/price-feeds/addresses/
  // TestUSDT Goerli (created with TestUSDT contract) = 0x2BDc3A5CC1DFB531d6eB77812D08bD8C7201c683

  const instance = await deployProxy(TokenPreSale, ['0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526', '0x250df3426Facabb1a1AE0145ea2E86cdbb296fA7'], { deployer });
  console.log('Deployed', instance.address);
};
