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

  beforeEach(async function(){
    this.token = await ObertechToken.new(name,symbol);
    
  });

  it('Burn', async function (){
    //const burnerRole = await this.token.BURNER.call();
    const ROLE = web3.utils.soliditySha3('BURNER');
    console.log(ROLE);
    
    await this.token.grantRole(ROLE, burner, {form: owner});
    await this.token.transfer(burner, ether('10.0'), { from: owner });
    expect(await this.token.burn(burner,ether('1.0')));
  });

  // it('No rights to burn', async function (){
  //   await this.token.transfer(burner, ether('10.0'), { from: owner });
  //   await expectRevert(
  //     this.token.burn(burner,ether('1.0')),
  //     'No rights'
  //     );
  // });

});