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

  it('Set burner role', async function() {
    await this.token.setTokenDistributionContract(alice, {from: owner});
    expect( await this.token.getTokenDistributionContract(),alice);
  });


  it('Burn',async function() {
    await this.token.setTokenDistributionContract(alice, {from: owner});
    await this.token.transfer(alice, ether('10.0'), { from: owner });
    expect( await this.token.burn(ether('1.0'),{from: alice}));
  })

  it('No rights to burn', async function (){
    await this.token.transfer(alice, ether('10.0'), { from: owner });
    await expectRevert(
      this.token.burn(ether('1.0'),{from: alice}),
      'No rights'
      );
  });

});