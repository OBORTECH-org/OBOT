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
    await this.token_distribution.distributeTokens(ether('100'));
    const GLOBAL_OBETECH_TOKENS = await this.token_distribution.getObertechGlobalTokens();
    const MARKET_TKOENS = await this.token_distribution.getMarketingPoolTokens();
    const USER_TOKENS = await this.token_distribution.getUserGrowthTokens();
    const OBERTECH_FOUNDATION_TOKENS = await this.token_distribution.getObortechFoundationTokens();
    const MARKET_MAKING_TOKENS = await this.token_distribution.getMarketMakingTokens();

    expect(GLOBAL_OBETECH_TOKENS).to.be.bignumber.equal(ether('66.5'));
    expect(MARKET_TKOENS).to.be.bignumber.equal(ether('9.5'));
    expect(USER_TOKENS).to.be.bignumber.equal(ether('9.5'));
    expect(OBERTECH_FOUNDATION_TOKENS).to.be.bignumber.equal(ether('4.75'));
    expect(MARKET_MAKING_TOKENS).to.be.bignumber.equal(ether('4.75'));


    
  });

  it('Take Obertech global tokens ', async () => {
    await expectRevert(
    this.token_distribution.takeObertechGlobalTokens({ from: _marketingPoolAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeObertechGlobalTokens( { from: _obortechGlobalAddress } ));
  });

  it('Take Marketing pool tokens ', async () => {
    await expectRevert(
    this.token_distribution.takeMarketingPoolTokens({ from: _obortechGlobalAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeMarketingPoolTokens( { from: _marketingPoolAddress } ));
  });

  it('Take User growth tokens', async () => {
    await expectRevert(
    this.token_distribution.takeUserGrowthPoolTokens({ from: _marketingPoolAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeUserGrowthPoolTokens( { from: _userGrowthAddress }));
  });

  it('Take Obetech foundation tokens ', async () => {
    await expectRevert(
    this.token_distribution.takeObortechFoundationTokens({ from: _marketingPoolAddress }),
    'invalid address',
    );
    expect(this.token_distribution.takeObortechFoundationTokens( { from: _obortechFoundationAddress } ));
  });

  it('Take Market making tokens ', async () => {
    await expectRevert(
    this.token_distribution.takeMarketMakingTokens( { from: _marketingPoolAddress } ),
    'invalid address',
    );
    expect(this.token_distribution.takeMarketMakingTokens( { from: _marketMakingAddress } ));
  });

  // Set zero address tests
  it('Set zero address in ObertechGlobalAddress', async () => {
    await expectRevert(
      this.token_distribution.setObertechGlobalAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  it('Set zero address in MarketingPoolAddress', async () => {
    await expectRevert(
      this.token_distribution.setMarketingPoolAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  it('Set zero address in UserGrowthPoolAddress', async () => {
    await expectRevert(
      this.token_distribution.setUserGrowthPoolAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  it('Set zero address in UserObortechFoundationAddress', async () => {
    await expectRevert(
      this.token_distribution.setObortechFoundationAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  it('Set zero address in MarketMakingAddress', async () => {
    await expectRevert(
      this.token_distribution.setMarketMakingAddress(ZERO_ADDRESS, { from: owner } ),
      'incorrect address',
    );
  });

  // Set address tests
  it('Set address in ObertechGlobalAddress', async () => {
    await this.token_distribution.setObertechGlobalAddress(_obortechGlobalAddress, { from: owner } );
    expect(
      await this.token_distribution.getObertechGlobalAddress(),
      _obortechGlobalAddress,
    );
  });

  it('Set address in MarketingPoolAddress', async () => {
    await this.token_distribution.setMarketingPoolAddress(_marketingPoolAddress, { from: owner } );
    expect(
      await this.token_distribution.getMarketingPoolAddress(),
      _marketingPoolAddress,
    );
  });

  it('Set address in UserGrowthPoolAddress', async () => {
    await this.token_distribution.setUserGrowthPoolAddress(_userGrowthAddress, { from: owner } );
    expect(
      await this.token_distribution.getUserGrowthPoolAddress(),
      _userGrowthAddress,
    );
  });

  it('Set address in MarketMakingAddress', async () => {
    await this.token_distribution.setMarketMakingAddress(_marketMakingAddress, { from: owner } );
    expect(
      await this.token_distribution.getMarketMakingAddress(),
      _marketMakingAddress,
    );
  });

  it('Set address in UserObortechFoundationAddress', async () => {
    await this.token_distribution.setObortechFoundationAddress(
      _obortechFoundationAddress,
      { from: owner },
    );
    expect(
      await this.token_distribution.getObortechFoundationAddress(),
      _obortechFoundationAddress,
    );
  });

  
});
