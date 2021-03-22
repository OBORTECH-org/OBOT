const ObortechToken = artifacts.require('ObortechToken');
const FreezingContract = artifacts.require('FreezingContract');
const TokenDistribution = artifacts.require('TokenDistribution');

const ether = (n) => web3.utils.toWei(n, 'ether');

module.exports = function (deployer, network) {
  const owner = process.env.DEPLOYER_ACCOUNT;
  deployer.then(async () => {
    if (network === 'test' || network === 'soliditycoverage') {
    } else if (network.startsWith('mainnet')) {
      const ownerBalance = await web3.eth.getBalance(owner);
      console.log('ownerBalance:', ownerBalance.toString());
      // deploy contracts
      const token = await deployer.deploy(ObortechToken, 'OBORTECH', 'OBOT', { from: owner });
      // const tokenDistribution = await deployer.deploy(TokenDistribution, { from: owner });
      const freezingContract = await deployer.deploy(FreezingContract, { from: owner });
      // configure contracts
      // await token.setTokenDistributionContract(tokenDistribution.address, { from: owner });
      // await tokenDistribution.configure(
      //   token.address, process.env.NETWORK_ADMIN_FEE_ADDRESS,
      //   process.env.MARKETING_POOL_ADDRESS, process.env.USER_GROWTH_POOL_ADDRESS,
      //   process.env.NON_PROFIT_ACTIVITIES_ADDRESS, { from: owner }
      // );
      await token.approve(freezingContract.address, ether('70000000'), { from: owner });
      await freezingContract.configure(
        token.address, process.env.START_TIME,
        process.env.OBORTECH_FOUNDATION_ADDRESS, process.env.MANAGEMENT_ADDRESS,
        { from: owner },
      );
      await token.transfer(process.env.TOKEN_HOLDER_ADDRESS, ether('230000000'), { from: owner });
      await token.transferOwnership(process.env.TOKEN_OWNER, { from: owner });
      await freezingContract.transferOwnership(process.env.FRIZING_CONTRACT_OWNER, { from: owner });
      // await tokenDistribution.transferOwnership(process.env.TOKEN_DISTRIBUTION_OWNER, { from: owner });
      const ownerBalanceAfterDeploy = await web3.eth.getBalance(owner);
      console.log('ownerBalanceAfterDeploy:', ownerBalanceAfterDeploy.toString());
    } else {
      console.error(`Unsupported network: ${network}`);
    }
  });
};
