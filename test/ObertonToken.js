const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  ether,
  time,
} = require('@openzeppelin/test-helpers');
const chai = require('chai');
const { iteratee } = require('lodash');
const { isContractAddressInBloom } = require('web3-utils');
chai.use(require('chai-as-promised'));
const { expect } = chai;

const ObertechToken = artifacts.require('ObertechToken');

contract('ObertechToken',function(accounts){
  const [owner,burner,alice] = accounts;

  const name = 'ObertechToken';
  const symbol = 'OTKN';

  const BURNER_ROLE = web3.utils.soliditySha3('BURNER');

  beforeEach(async function(){
    this.token = await ObertechToken.new(name,symbol);
    
  });

  it('Burn', async function () {
    await this.token.grantRole(BURNER_ROLE, burner, { from: owner });
    const balanceBefore = await this.token.balanceOf(owner);
    await this.token.burn(owner, ether('1.0'), { from: burner });
    const balanceAfter = await this.token.balanceOf(owner);
    expect(balanceBefore).to.be.bignumber.equal(balanceAfter.add(ether('1.0')));
  });

  it('Burn without rights', async function () {
    await expectRevert(
      this.token.burn(alice,ether('1'), { from: burner}),
      'No rights'
    );
  });

  // it('No rights to burn', async function (){
  //   await this.token.transfer(burner, ether('10.0'), { from: owner });
  //   await expectRevert(
  //     this.token.burn(burner,ether('1.0')),
  //     'No rights'
  //     );
  // });

});