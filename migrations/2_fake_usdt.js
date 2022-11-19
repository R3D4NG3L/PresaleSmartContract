var TestUSDT = artifacts.require("TestUSDT");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TestUSDT);
};