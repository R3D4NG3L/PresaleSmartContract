var TestErc20Token = artifacts.require("TestErc20Token");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TestErc20Token);
};