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
  const [owner,burner] = accounts;

  const name = 'ObertechToken';
  const symbol = 'OTKN';

  beforeEach(async function(){
    this.tokene = await ObertechToken.new(name,symbol);
  });

  it('Owner check', async function () {
    await expectRevert(
      this.tokene.addBurner(burner),
      'No rights'
    );
  });

});