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
  
  const ObertechToken = artifacts.require('FreezingTokens');
  contract('ObertechToken',function(accounts) {

  });