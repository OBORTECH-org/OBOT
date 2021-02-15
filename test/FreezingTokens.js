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
  const FreezingContract = artifacts.require('FreezingContract');
  contract('FreezingContract',function(accounts) {

    const [owner,burner,alice, founderAddress, managementAddress] = accounts;
    const name = 'ObertechToken';
    const symbol = 'OTKN';
      
    beforeEach(async function(){
      this.token = await ObertechToken.new(name,symbol);
      this.freezing_contract = await FreezingContract.new();
      const startTime = await time.latest();
      await this.token.approve(this.freezing_contract.address , ether('7000000') , { from: owner });
      await this.freezing_contract.configure(this.token.address,startTime,founderAddress,managementAddress);

    });

    it('cheack founder address',async function (){
      await expectRevert(this.freezing_contract.setFounderAddress( alice, { from: owner }),
    'incorrect founderAddress'
    );
    });
  
  });