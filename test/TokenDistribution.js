const {
  constants,
  expectRevert,
  ether,
} = require('@openzeppelin/test-helpers');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const { expect } = chai;
const { ZERO_ADDRESS } = constants;

const ObortechToken = artifacts.require('ObortechToken');
const TokenDistribution = artifacts.require('TokenDistribution');

contract('TokenDistribution', (accounts) => {
  const [
    owner,
    networkAdminFeeAddress,
    marketingPoolAddress,
    userGrowthPoolAddress,
    nonProfitActivitiesAddress,
    
  ] = accounts;
  const name = 'OBORTECH';
  const symbol = 'OBOT';

  beforeEach(async () => {
    this.token = await ObortechToken.new(name, symbol);
    this.token_distribution = await TokenDistribution.new();
    await this.token.approve(this.token_distribution.address, ether('300000000'), { from: owner });
    await this.token.setTokenDistributionContract(this.token_distribution.address, { from: owner });
    await this.token_distribution.configure(
      this.token.address, networkAdminFeeAddress,
      marketingPoolAddress, userGrowthPoolAddress,
      nonProfitActivitiesAddress,
      { from: owner },
    );
  });

  it('Distribute tokens', async () => {
    await this.token_distribution.distributeTokens(ether('100'));
    const NETWORK_ADMIN_FEE_TOKENS = await this.token_distribution.getNetworkAdminFeeTokens();
    const MARKET_TKOENS = await this.token_distribution.getMarketingPoolTokens();
    const USER_TOKENS = await this.token_distribution.getUserGrowthPoolTokens();
    const NON_PROFIT_TOKENS = await this.token_distribution.getNonProfitActivitiesTokens();

    expect(NETWORK_ADMIN_FEE_TOKENS).to.be.bignumber.equal(ether('70'));
    expect(MARKET_TKOENS).to.be.bignumber.equal(ether('10'));
    expect(USER_TOKENS).to.be.bignumber.equal(ether('10'));
    expect(NON_PROFIT_TOKENS).to.be.bignumber.equal(ether('5'));


    
  });

  it('Take Network Admin Fee Address ', async () => {
    await expectRevert(
    this.token_distribution.takeNetworkAdminFeeTokens({ from: marketingPoolAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeNetworkAdminFeeTokens( { from: networkAdminFeeAddress } ));
  });

  it('Take Marketing pool tokens ', async () => {
    await expectRevert(
    this.token_distribution.takeMarketingPoolTokens({ from: networkAdminFeeAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeMarketingPoolTokens( { from: marketingPoolAddress } ));
  });

  it('Take User growth Pool tokens', async () => {
    await expectRevert(
    this.token_distribution.takeUserGrowthPoolTokens({ from: marketingPoolAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeUserGrowthPoolTokens( { from: userGrowthPoolAddress }));
  });

  it('Take Non Profit Activities tokens ', async () => {
    await expectRevert(
    this.token_distribution.takeNonProfitActivitiesTokens({ from: marketingPoolAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeNonProfitActivitiesTokens( { from: nonProfitActivitiesAddress } ));
  });

  
  // Set zero address tests
  it('Set zero address in Network Admin Fee Address', async () => {
    await expectRevert(
      this.token_distribution.setNetworkAdminFeeAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  it('Set zero address in MarketingPoolAddress', async () => {
    await expectRevert(
      this.token_distribution.setMarketingPoolAddress(ZERO_ADDRESS, { from: owner }),
      'incorrect address',
    );
  });

  it('Set zero address in UserGrowthPoolAddress', async () => {
    await expectRevert(
      this.token_distribution.setUserGrowthPoolAddress(ZERO_ADDRESS, { from: owner }),
      'incorrect address',
    );
  });

  it('Set zero address in setNonProfitActivitiesAddress', async () => {
    await expectRevert(
      this.token_distribution.setNonProfitActivitiesAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  

  // Set address tests
  it('Set address in NetworkAdminFeeAddress', async () => {
    await this.token_distribution.setNetworkAdminFeeAddress(networkAdminFeeAddress, { from: owner } );
    expect(
      await this.token_distribution.getNetworkAdminFeeAddress(),
      networkAdminFeeAddress,
    );
  });

  it('Set address in MarketingPoolAddress', async () => {
    await this.token_distribution.setMarketingPoolAddress(marketingPoolAddress, { from: owner } );
    expect(
      await this.token_distribution.getMarketingPoolAddress(),
      marketingPoolAddress,
    );
  });

  it('Set address in UserGrowthPoolAddress', async () => {
    await this.token_distribution.setUserGrowthPoolAddress(userGrowthPoolAddress, { from: owner } );
    expect(
      await this.token_distribution.getUserGrowthPoolAddress(),
      userGrowthPoolAddress,
    );
  });


  it('Set address in UserNonProfitActivitiesAddress', async () => {
    await this.token_distribution.setNonProfitActivitiesAddress(
      nonProfitActivitiesAddress,
      { from: owner },
    );
    expect(
      await this.token_distribution.getNonProfitActivitiesAddress(),
      nonProfitActivitiesAddress,
    );
  });
});
