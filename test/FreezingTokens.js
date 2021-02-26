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
const FreezingContract = artifacts.require('FreezingContract');

contract('FreezingContract', (accounts) => {
  const [owner, alice, founderAddress, managementAddress] = accounts;
  const name = 'ObertechToken';
  const symbol = 'OTKN';

  beforeEach(async () => {
    this.token = await ObertechToken.new(name, symbol);
    this.freezingContract = await FreezingContract.new();
    const startTime = await time.latest();
    this.global_time = startTime;
    await this.token.approve(this.freezingContract.address, ether('70000000'), { from: owner });
    await this.freezingContract.configure(
      this.token.address, startTime, founderAddress, managementAddress,
    );
  });

  it('get start time check', async () => {
    expect(
      await this.freezingContract.getStartTimestamp(),
    ).to.be.bignumber.equal(this.global_time);
  });

  it('check founder address', async () => {
    expect(await this.freezingContract.getFounderAddress()).to.equal(founderAddress);
  });

  it('check management address', async () => {
    expect(await this.freezingContract.getManagementAddress()).to.equal(managementAddress);
  });

  it('check get unlock time management address', async () => {
    expect(
      await this.freezingContract.getUnlockTimeManagementAddress(),
    ).to.be.bignumber.equal(
      (await this.global_time.add(time.duration.years('4'))),
    );
  });

  it('check nearest unlock time founders tokens 1', async () => {
    expect(
      await this.freezingContract.getNearestUnlockTimeFoundersTokens(),
    ).to.be.bignumber.equal(this.global_time);
  });

  it('check nearest unlock time founders tokens 2', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    expect(
      await this.freezingContract.getNearestUnlockTimeFoundersTokens(),
    ).to.be.bignumber.equal((await this.global_time.add(time.duration.days('182'))));
  });

  it('check nearest unlock time founders tokens 3', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('182'));
    time.increase(time.duration.hours('12'));
    await this.freezingContract.unfreezeFoundersTokens();
    expect(
      await this.freezingContract.getNearestUnlockTimeFoundersTokens(),
    ).to.be.bignumber.equal((await this.global_time.add(time.duration.days('182').mul(new BN('2')))));
  });

  it('check nearest unlock time founders tokens 4', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('182'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('182'));
    await this.freezingContract.unfreezeFoundersTokens();
    expect(
      await this.freezingContract.getNearestUnlockTimeFoundersTokens(),
    ).to.be.bignumber.equal((await this.global_time.add(time.duration.days('182').mul(new BN('3')))));
  });

  it('check nearest unlock time founders tokens 5', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('182'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('182'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('182'));
    await this.freezingContract.unfreezeFoundersTokens();
    expect(await this.freezingContract.getNearestUnlockTimeFoundersTokens()).to.be.bignumber.equal(new BN('0'));
  });

  it('check set founder address', async () => {
    await this.freezingContract.setFounderAddress(alice, { from: owner });
    expect(await this.freezingContract.getFounderAddress(), alice);
  });

  it('check set founder address', async () => {
    await this.freezingContract.setFounderAddress(alice, { from: owner });
    expect(await this.freezingContract.getFounderAddress(), alice);
  });

  it('check set manager address', async () => {
    await this.freezingContract.setManagementAddress(alice, { from: owner });
    expect(await this.freezingContract.getManagementAddress(), alice);
  });

  it('check founder address', async () => {
    await expectRevert(
      this.freezingContract.setFounderAddress(ZERO_ADDRESS, { from: owner }),
      'incorrect founderAddress',
    );
  });

  it('check manager address', async () => {
    await expectRevert(
      this.freezingContract.setManagementAddress(ZERO_ADDRESS, { from: owner}),
      'incorrect managementAddress',
    );
  });

  it('check first unfreeze founders tokens', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    const foundersBalance = await this.token.balanceOf(founderAddress);
    expect(foundersBalance).to.be.bignumber.equal(ether('15000000'));
  });

  it('check second unfreeze founders tokens', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    const foundersBalance = await this.token.balanceOf(founderAddress);
    expect(foundersBalance).to.be.bignumber.equal(ether('30000000'));
  });

  it('check third unfreeze founders tokens', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    const foundersBalance = await this.token.balanceOf(founderAddress);
    expect(foundersBalance).to.be.bignumber.equal(ether('45000000'));
  });

  it('check fourth unfreeze founders tokens', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    const foundersBalance = await this.token.balanceOf(founderAddress);
    expect(foundersBalance).to.be.bignumber.equal(ether('60000000'));
  });

  it('tokens is over check', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await this.freezingContract.unfreezeFoundersTokens();
    time.increase(time.duration.days('183'));
    await expectRevert(
      this.freezingContract.unfreezeFoundersTokens(),
      'tokens is over',
    );
  });

  it('check unfreeze founders tokens without the right time', async () => {
    await this.freezingContract.unfreezeFoundersTokens();
    await expectRevert(
      this.freezingContract.unfreezeFoundersTokens(),
      'Cannot unlock tokens',
    );
  });

  it('unfreeze management tokens without the right time', async () => {
    await expectRevert(
      this.freezingContract.unfreezeManagementsTokens(),
      'Cannot unlock tokens',
    );
  });

  it('unfreeze management tokens with the right time', async () => {
    time.increase(time.duration.days('1460'));
    await this.freezingContract.unfreezeManagementsTokens();
    const managementBalance = await this.token.balanceOf(managementAddress);
    expect(managementBalance).to.be.bignumber.equal(ether('10000000'));
  });
});
