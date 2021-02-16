// const {
//   BN,
//   constants,
//   expectEvent,
//   expectRevert,
//   ether,
//   time,
// } = require('@openzeppelin/test-helpers');
// const chai = require('chai');
// const { iteratee } = require('lodash');
// const { isContractAddressInBloom } = require('web3-utils');
// chai.use(require('chai-as-promised'));
// const { expect } = chai;
// const { ZERO_ADDRESS } = constants;

// const ObertechToken = artifacts.require('ObertechToken');
// const FreezingContract = artifacts.require('FreezingContract');
// contract('FreezingContract',  function (accounts) {
//   const [owner, burner, alice, founderAddress, managementAddress] = accounts;
//   const name = 'ObertechToken';
//   const symbol = 'OTKN';
//   let global_time;
//   beforeEach(async function () {
//     this.token = await ObertechToken.new(name, symbol);
//     this.freezing_contract = await FreezingContract.new();
//     const startTime = await time.latest();
//     this.global_time = startTime;
//     await this.token.approve(this.freezing_contract.address,ether('70000000'), { from: owner } );
//     await this.freezing_contract.configure(this.token.address, startTime, founderAddress, managementAddress
//     );
//   });

//   it ('get star time cheack',async function () {    
//     expect( await this.freezing_contract.getStartTimestamp()).to.be.bignumber.equal(this.global_time);
//   });


//   it ('check founder address', async function () {
//     expect ( await this.freezing_contract.getFounderAddress()).to.equal(founderAddress);
//   });

//   it ('check mangmet address', async function () {
//     expect ( await this.freezing_contract.getManagementAddress()).to.equal(managementAddress);
//   });

//   it ('check get unlock time managment address',async function() {
//     expect( await this.freezing_contract.getUnlockTimeManagementAddress()).to.be.bignumber
//     .equal((await time.latest()).add(time.duration.years(4)));
//   })

//   it ('check nearest unclock time founders tokens 1',async function () {    
//     expect(await this.freezing_contract.getNearestUnlockTimeFoundersTokens()).to.be.bignumber.equal(this.global_time);
//   })

//   it ('check nearest unclock time founders tokens 2', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     expect(await this.freezing_contract.getNearestUnlockTimeFoundersTokens()).to.be.bignumber
//     .equal((await time.latest()).add(time.duration.days(182)));
//   })

//   it ('check nearest unclock time founders tokens 3', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();

//     time.increase(time.duration.days('182'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     expect(await this.freezing_contract.getNearestUnlockTimeFoundersTokens()).to.be.bignumber
//     .equal((await time.latest()).add(time.duration.days(182)));
//   })

//   it ('check nearest unclock time founders tokens 4', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('182'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('182'));
//     await this.freezing_contract.unfreezeFoundersTokens();

//     expect(await this.freezing_contract.getNearestUnlockTimeFoundersTokens()).to.be.bignumber
//     .equal((await time.latest()).add(time.duration.days(182)));
//   })
//   it ('check nearest unclock time founders tokens 5', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('182'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('182'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('182'));
//     await this.freezing_contract.unfreezeFoundersTokens();

//     expect(await this.freezing_contract.getNearestUnlockTimeFoundersTokens(),
//     0);
//   })

//   it('check set founder addres',async function (){
//     await this.freezing_contract.setFounderAddress(alice,{ from: owner });

//     expect(
//       await this.freezing_contract.getFounderAddress(),
//       alice
//     );
//   }) 

//   it('check set founder addres',async function (){
//     await this.freezing_contract.setFounderAddress(alice,{ from: owner });

//     expect(
//       await this.freezing_contract.getFounderAddress(),
//       alice
//     );
//   }) 

//   it('check set manager addres',async function (){
//     await this.freezing_contract.setManagementAddress(alice,{ from: owner });

//     expect(
//       await this.freezing_contract.getManagementAddress(),
//       alice
//     );
//   }) 

//   it('check founder address', async function () {
//     await expectRevert(
//       this.freezing_contract.setFounderAddress(ZERO_ADDRESS, { from: owner }),
//       'incorrect founderAddress'
//     );
//   });

//   it('check manager address', async function () {
//     await expectRevert(
//       this.freezing_contract.setManagementAddress(ZERO_ADDRESS, { from: owner}),
//       'incorrect managementAddress'
//     );
//   });

//   it('check first unfreeze founders tokens', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     const founders_balance = await this.token.balanceOf(founderAddress);
//     expect(founders_balance).to.be.bignumber.equal(ether('15000000'));
//   });

//   it('check second unfreeze founders tokens', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     const founders_balance = await this.token.balanceOf(founderAddress);
//     expect(founders_balance).to.be.bignumber.equal(ether('30000000'));
//   });


//   it('check third unfreeze founders tokens', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     const founders_balance = await this.token.balanceOf(founderAddress);
//     expect(founders_balance).to.be.bignumber.equal(ether('45000000'));
//   });

//   it('check fourth unfreeze founders tokens', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     const founders_balance = await this.token.balanceOf(founderAddress);
//     expect(founders_balance).to.be.bignumber.equal(ether("60000000"));
//   });

//   it('tokens is over check', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await this.freezing_contract.unfreezeFoundersTokens();
//     time.increase(time.duration.days('183'));
//     await expectRevert(
//       this.freezing_contract.unfreezeFoundersTokens(),
//       "tokens is over"
//     );
//   });

//   it('check unfreeze founders tokens without the right time', async function () {
//     await this.freezing_contract.unfreezeFoundersTokens();
//     await expectRevert(
//       this.freezing_contract.unfreezeFoundersTokens(),
//       'Cannot unlock tokens'
//     );
//   });

//   it('unfreez managment tokens without the right time', async function () {
//     await expectRevert(
//       this.freezing_contract.unfreezeManagementsTokens(),
//       'Cannot unlock tokens'
//     );
//   });

//   it('unfreez managment tokens with the right time', async function () {
//     time.increase(time.duration.days('1460'));
//     await this.freezing_contract.unfreezeManagementsTokens();
//     const management_balance = await this.token.balanceOf(managementAddress);
//     expect(management_balance).to.be.bignumber.equal(eglobal_timether('10000000'));
//   });
//   global_time
// });
