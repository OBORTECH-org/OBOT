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

const ObertechToken = artifacts.require('ObertechToken');

contract('ObertechToken', (accounts) => {
  const [owner, alice] = accounts;

  const name = 'ObertechToken';
  const symbol = 'OTKN';

  beforeEach(async () => {
    this.token = await ObertechToken.new(name, symbol);
  });

  it('Set burner role', async () => {
    await this.token.setTokenDistributionContract(alice, { from: owner });
    expect(await this.token.getTokenDistributionContract(), alice);
  });

  it('Burn', async () => {
    await this.token.setTokenDistributionContract(alice, { from: owner });
    await this.token.transfer(alice, ether('10.0'), { from: owner });
    expect(await this.token.burn(ether('1.0'), { from: alice }));
  });

  it('No rights to burn', async () => {
    await this.token.transfer(alice, ether('10.0'), { from: owner });
    await expectRevert(
      this.token.burn(ether('1.0'), { from: alice }),
      'No rights',
    );
  });
});
