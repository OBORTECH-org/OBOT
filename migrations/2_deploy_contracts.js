const ObortechToken = artifacts.require('ObortechToken');
const FreezingContract = artifacts.require('FreezingContract');
const TokenDistribution = artifacts.require('TokenDistribution');

const ether = (n) => web3.utils.toWei(n, 'ether');

module.exports = function (deployer, network) {
  deployer.then(async () => {
    if (network === 'test' || network === 'soliditycoverage') {
    } else if (network.startsWith('rinkeby')) {
      // deploy contracts
      const token = await deployer.deploy(ObortechToken, 'OBORTECH', 'OBOT');
      const tokenDistribution = await deployer.deploy(TokenDistribution);
      const freezingContract = await deployer.deploy(FreezingContract);
      // configure contracts
      await token.setTokenDistributionContract(tokenDistribution.address);
      await tokenDistribution.configure(
        token.address, process.env.NETWORK_ADMIN_FEE_ADDRESS,
        process.env.MARKETING_POOL_ADDRESS, process.env.USER_GROWTH_POOL_ADDRESS,
        process.env.NON_PROFIT_ACTIVITIES_ADDRESS,
      );
      await token.approve(freezingContract.address, ether('70000000'));
      await freezingContract.configure(
        token.address, process.env.START_TIME,
        process.env.OBORTECH_FOUNDATION_ADDRESS, process.env.MANAGEMENT_ADDRESS,
      );
    } else {
      console.error(`Unsupported network: ${network}`);
    }
  });
};
