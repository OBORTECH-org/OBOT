const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  ether,
  time,
} = require('@openzeppelin/test-helpers');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const { expect } = chai;
const { ZERO_ADDRESS } = constants;

const ObertechToken = artifacts.require('ObertechToken');
const TokenDistribution = artifacts.require('TokenDistribution');

contract('TokenDistribution', (accounts) => {
  const [
    owner,
    _obortechGlobalAddress,
    _marketingPoolAddress,
    _userGrowthAddress,
    _obortechFoundationAddress,
    _marketMakingAddress,
  ] = accounts;
  const name = 'ObertechToken';
  const symbol = 'OTKN';

  beforeEach(async () => {
    this.token = await ObertechToken.new(name, symbol);
    this.token_distribution = await TokenDistribution.new();
    await this.token.approve(this.token_distribution.address, ether('300000000'), { from: owner });
    await this.token.setTokenDistributionContract(this.token_distribution.address, { from: owner });
    await this.token_distribution.configure(
      this.token.address, _obortechGlobalAddress,
      _marketingPoolAddress, _userGrowthAddress,
      _obortechFoundationAddress, _marketMakingAddress,
      { from: owner },
    );
  });

  it('Distribute tokens', async () => {
    await this.token_distribution.distributeTokens(ether('100'), { from: owner });
    // TODO: check all
  });

  // Set zero address tests
  it('Set zero address in ObertechGlobalAddress', async () => {
    await expectRevert(
      this.token_distribution.setObertechGlobalAddress(ZERO_ADDRESS, { from: owner }),
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

  it('Set zero address in UserObortechFoundationAddress', async () => {
    await expectRevert(
      this.token_distribution.setObortechFoundationAddress(ZERO_ADDRESS, { from: owner }),
      'incorrect address',
    );
  });

  it('Set zero address in MarketMakingAddress', async () => {
    await expectRevert(
      this.token_distribution.setMarketMakingAddress(ZERO_ADDRESS, { from: owner }),
      'incorrect address',
    );
  });

  // Set address tests
  it('Set address in ObertechGlobalAddress', async () => {
    await this.token_distribution.setObertechGlobalAddress(_obortechGlobalAddress, { from: owner });
    expect(
      this.token_distribution.getObertechGlobalAddress(),
      _obortechGlobalAddress,
    );
  });

  it('Set address in MarketingPoolAddress', async () => {
    await this.token_distribution.setMarketingPoolAddress(_marketingPoolAddress, { from: owner });
    expect(
      this.token_distribution.getMarketingPoolAddress(),
      _marketingPoolAddress,
    );
  });

  it('Set address in UserGrowthPoolAddress', async () => {
    await this.token_distribution.setUserGrowthPoolAddress(_userGrowthAddress, { from: owner });
    expect(
      this.token_distribution.getUserGrowthPoolAddress(),
      _userGrowthAddress,
    );
  });

  it('Set address in UserObortechFoundationAddress', async () => {
    await this.token_distribution.setObortechFoundationAddress(
      _obortechFoundationAddress,
      { from: owner },
    );
    expect(
      this.token_distribution.getObortechFoundationAddress(),
      _obortechFoundationAddress,
    );
  });

  it('Set address in MarketMakingAddress', async () => {
    await this.token_distribution.setMarketMakingAddress(_marketMakingAddress, { from: owner });
    expect(
      this.token_distribution.getMarketMakingAddress(),
      _marketMakingAddress,
    );
  });
});
