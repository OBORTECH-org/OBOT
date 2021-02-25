pragma solidity >=0.6.0 <0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import 'contracts/IBurnable.sol';
import 'contracts/ObortechToken.sol';


contract TokenDistribution is Ownable {
    using SafeMath for uint256;

    address private obortechGlobalAddress;
    address private marketingPoolAddress;
    address private userGrowthAddress;
    address private obortechFoundationAddress;
    address private marketMakingAddress;

    uint256 private obortechGlobalAmount;
    uint256 private marketingPoolAmount;
    uint256 private userGrowthAmount;
    uint256 private obobrtechFoundationAmount;
    uint256 private marketMakingAmount;

    IERC20 private token;

    function distributeTokens (uint256 amount)  external {
        token.transferFrom(_msgSender(), address(this), amount);
        IBurnable(address(token)).burn(amount.div(20)); // burn 5%
        uint256 _amount = amount.mul(95).div(100);

        obortechGlobalAmount = obortechGlobalAmount.add(_amount.mul(7).div(10)); // 70%
        marketingPoolAmount = marketingPoolAmount.add(_amount.div(10)); // 10%
        userGrowthAmount = userGrowthAmount.add(_amount.div(10)); // 10%
        obobrtechFoundationAmount = obobrtechFoundationAmount.add(_amount.div(20)); // 5%
        marketMakingAmount = marketMakingAmount.add(_amount.div(20)); // 5%
    }

    function takeObertechGlobalTokens() external {
        require(_msgSender() != obortechGlobalAddress,'invalid address');
        uint256 _obortechGlobalAmount = obortechGlobalAmount;
        obortechGlobalAmount = 0;
        token.transfer(obortechGlobalAddress, _obortechGlobalAmount);
    }

    function taketMarketingPoolTokens() external {
        require(_msgSender() != marketingPoolAddress,'invalid address');
        uint256 _marketingPoolAmount = marketingPoolAmount;
        marketingPoolAmount = 0;
        token.transfer(marketingPoolAddress, _marketingPoolAmount);

    }

      function takeUserGrowthPoolTokens() external {
        require(_msgSender() != userGrowthAddress,'invalid address');
        uint256 _userGrowthAmount = userGrowthAmount;
        userGrowthAmount = 0;
        token.transfer(userGrowthAddress, _userGrowthAmount);

    }

      function takeObortechFoundationTokens() external {
        require(_msgSender() != obortechFoundationAddress,'invalid address');
        uint256 _obobrtechFoundationAmount = obobrtechFoundationAmount;
        obobrtechFoundationAmount = 0;
        token.transfer(obortechFoundationAddress, _obobrtechFoundationAmount);
    }

    function takeMarketMakingTokens() external {
        require(_msgSender() != marketMakingAddress,'invalid address');
        uint256 _marketingPoolAmount = marketingPoolAmount;
        marketingPoolAmount = 0;
        token.transfer(marketMakingAddress, _marketingPoolAmount);
    }

    // Get amounts functions
    function getObertechGlobalTokens() external view returns(uint256) {
        return obortechGlobalAmount;
    }

    function getMarketingPoolTokens() external view returns(uint256) {
        return marketingPoolAmount;
    }

    function getUserGrowthTokens() external view returns(uint256) {
        return userGrowthAmount;
    }

    function getObortechFoundationTokens() external view returns(uint256) {
        return obobrtechFoundationAmount;
    }

    function getMarketMakingTokens() external view returns(uint256) {
        return marketMakingAmount;
    }

    // Get addresses functions
    function getObertechGlobalAddress() external view returns(address) {
        return obortechGlobalAddress;
    }

    function getMarketingPoolAddress() external view returns(address) {
       return marketingPoolAddress;
    }

    function getUserGrowthPoolAddress() external view returns(address) {
        return userGrowthAddress;
    }

     function getObortechFoundationAddress() external view returns(address) {
        return obortechFoundationAddress;
    }

    function getMarketMakingAddress() external view returns(address){
        return marketMakingAddress;
    }

    function configure (
        address _obortechGlobalAddress,
        address _marketingPoolAddress,
        address _userGrowthAddress,
        address _obortechFoundationAddress,
        address _marketMakingAddress,
        address _token
        ) onlyOwner external {
            token = IERC20(_token);
            obortechGlobalAddress = _obortechGlobalAddress;
            marketingPoolAddress = _marketingPoolAddress;
            userGrowthAddress = _userGrowthAddress;
            obortechFoundationAddress = _obortechFoundationAddress;
            marketMakingAddress = _marketMakingAddress;
    }

    // Set addresses functions
    function setObertechGlobalAddress(address addr) external onlyOwner {
        require(addr != address(0), 'incorrect address');
        obortechGlobalAddress = addr;
    }

    function setMarketingPoolAddress(address addr) external onlyOwner {
        require(addr != address(0), 'incorrect address');
        marketingPoolAddress = addr;
    }

    function setUserGrowthPoolAddress(address addr) external onlyOwner {
        require(addr != address(0), 'incorrect address');
        userGrowthAddress = addr;
    }

    function setObortechFoundationAddress(address addr) external onlyOwner {
        require(addr != address(0), 'incorrect address');
        obortechFoundationAddress = addr;
    }

    function setMarketMakingAddress(address addr) external onlyOwner {
        require(addr != address(0), 'incorrect address');
        marketMakingAddress = addr;
    }
}
