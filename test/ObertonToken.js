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

  it('Add burner', async function () {
    await this.token.addBurner(burner);
    expect(await this.token.isBurner(burner),true);
  });
  
  it('Double add burner', async function () {
    await this.token.addBurner(burner);
    await expectRevert(this.token.addBurner(burner),'User already exists');
  });

  it('Add burner not with owner', async function () {
    await expectRevert( this.token.addBurner(burner, {from: alice}),
    'No rights'
    );
  });


  it('Remove burner', async function (){
    await this.token.addBurner(burner);
    expect(await this.token.isBurner(burner),true);
    await this.token.removeBurner(burner);
    expect(await this.token.isBurner(burner),false);
  });

  it('Double remove burner', async function (){
    await this.token.addBurner(burner);
    await this.token.removeBurner(burner);
    await expectRevert (this.token.removeBurner(burner),'User already exists');
  });

  it('Remove burner not with owner', async function () {
    await expectRevert(this.token.removeBurner(burner, {from: alice}),
    'No rights'
    );
  });

  it('Add black list not with owner', async function () {
    await expectRevert(this.token.addBlackList(burner, {from: alice}),
    'No rights'
    );
  });

  it('Remove black list not with owner', async function () {
    await expectRevert(this.token.removeBlackList(burner, {from: alice}),
    'No rights'
    );
  });


  it('Burn', async function (){
    await this.token.addBurner(burner);
    await this.token.transfer(burner, ether('10.0'), { from: owner });
    expect(await this.token.burn(burner,ether('1.0')));
  });

  it('No rights to burn', async function (){
    await this.token.transfer(burner, ether('10.0'), { from: owner });
    await expectRevert(
      this.token.burn(burner,ether('1.0')),
      'No rights'
      );
  });

  it('Add black list', async function (){
    await this.token.addBlackList(burner);
    expect(await this.token.isBlackList(burner),true);
  });

  it('Double add to black list', async function () {
    await this.token.addBlackList(burner);
    await expectRevert(this.token.addBlackList(burner),'User already exists');
  });

  it('Remove black list', async function (){
    await this.token.addBlackList(burner);
    expect(await this.token.isBlackList(burner),true);
    await this.token.removeBlackList(burner);
    expect(await this.token.isBlackList(burner),false);
  });

  it('Double remove to black list', async function () {
    await this.token.addBlackList(burner);
    await this.token.removeBlackList(burner);
    await expectRevert(this.token.removeBlackList(burner),'User already exists');
  });

  it('Transfer from black list address',async function(){
    await this.token.transfer(burner, ether('10.0'), { from: owner });
    await this.token.addBlackList(burner);
    await expectRevert(
      this.token.transfer(owner,ether('1.0'), {from: burner}),
      'from addr in BlackList',
    );
  });

  it('Transfer to black list address', async function(){
    await this.token.transfer(burner,ether('5.0'),{from: owner });
    await this.token.transfer(alice,ether('5.0'),{from: owner});
    await this.token.addBlackList(burner);
    await expectRevert(
      this.token.transfer(burner,ether('1.0'),{from: alice}),
      'to addr in BlackList'
    );

  });

});