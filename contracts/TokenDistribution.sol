pragma solidity >=0.6.0 <0.8.0;

import 'contracts/ObortechToken.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/proxy/Initializable.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';



contract TokenDistributiom is Ownable {

    using SafeMath for uint;

    address private OBORTECHglobalAddr;
    address private MarketingPoolAddr;
    address private UserGrowthAddr;
    address private OBORTECHFoundationAddr;
    address private MarketMakingAddr;

    uint256 private OBORTECHglobalSUMM;
    uint256 private MarketingPoolSUMM;
    uint256 private UserGrowthSUMM;
    uint256 private OBORTECHFoundationSUMM;
    uint256 private MarketMakingSUMM;

    IERC20 private token;
    
        

    
    function distributeTokens (uint256 amount) external {

        token.transferFrom(_msgSender(), address(this), amount);

        OBORTECHglobalSUMM = OBORTECHglobalSUMM.add(amount.mul(7000).div(10_000));
        MarketingPoolSUMM = MarketingPoolSUMM.add(amount.mul(1000).div(10_000));
        UserGrowthSUMM = UserGrowthSUMM.add(amount.mul(1000).div(10_000));
        OBORTECHFoundationSUMM = OBORTECHFoundationSUMM.add(amount.mul(1000).div(10_000));
        MarketMakingSUMM = MarketMakingSUMM.add(amount.mul(500).div(10_000));

    }
    
    function takeObertechGlobalTokens() external {
        require(_msgSender() !=  OBORTECHglobalAddr,'invalid address');
        uint256 _OBORTECHglobalSUMM = OBORTECHglobalSUMM;
        OBORTECHglobalSUMM = 0;
        token.transfer(OBORTECHglobalAddr, _OBORTECHglobalSUMM);
    }

    function taketMarketingPoolTokens() external {
        require(_msgSender() !=  MarketingPoolAddr,'invalid address');
        uint256 _MarketingPoolSUMM = MarketingPoolSUMM;
        MarketingPoolSUMM = 0;
        token.transfer(MarketingPoolAddr, _MarketingPoolSUMM);

    }

      function takeUserGrowthPoolTokens() external {
        require(_msgSender() !=  UserGrowthAddr,'invalid address');
        uint256 _UserGrowthSUMM = UserGrowthSUMM;
        UserGrowthSUMM = 0;
        token.transfer(UserGrowthAddr, _UserGrowthSUMM);

    }

      function takeOBORTECHFoundationTokens() external {
        require(_msgSender() !=  OBORTECHFoundationAddr,'invalid address');
        uint256 _OBORTECHFoundationSUMM = OBORTECHFoundationSUMM;
        OBORTECHFoundationSUMM = 0;
        token.transfer(OBORTECHFoundationAddr, _OBORTECHFoundationSUMM);
    }

    function takeMarketMakingTokens() external {
        require(_msgSender() !=  MarketMakingAddr,'invalid address');
        uint256 _MarketingPoolSUMM = MarketingPoolSUMM;
        MarketingPoolSUMM = 0;
        token.transfer(MarketMakingAddr, _MarketingPoolSUMM);
    }

    function getObertechGlobalTokens() external view returns(uint256) {
        return OBORTECHglobalSUMM;
    }   

    function getMarketingPoolTokens() external view returns(uint256) {
        return MarketingPoolSUMM;
    }  

    function getUserGrowthTokens() external view returns(uint256) {
        return UserGrowthSUMM;
    }

    function getOBORTECHFoundationTokens() external view returns(uint256) {
        return OBORTECHFoundationSUMM;
    }

    function getMarketMakingTokens() external view returns(uint256) {
        return MarketMakingSUMM;
    }
// Get address functions 
    function setObertechGlobalAddress(address addr) external onlyOwner {
        OBORTECHglobalAddr = addr;
    }

    function setMarketingPoolAddress(address addr) external onlyOwner {
        MarketingPoolAddr = addr;
    }

    function setUserGrowthPoolAddress(address addr) external onlyOwner {
        UserGrowthAddr = addr;
    }

     function setOBORTECHFoundationAddress(address addr) external onlyOwner {
        OBORTECHFoundationAddr = addr;
    }

    function setMarketMakingAddress(address addr) external onlyOwner {
        MarketMakingAddr = addr;
    }
    
    function getObertechGlobalAddress() external view onlyOwner returns(address) {
        return OBORTECHglobalAddr;
    }

    function getMarketingPoolAddress() external view onlyOwner returns(address) {
       return MarketingPoolAddr;
    }

    function getUserGrowthPoolAddress() external view onlyOwner returns(address) {
        return UserGrowthAddr;
    }

     function getOBORTECHFoundationAddress() external view onlyOwner returns(address) {
        return OBORTECHFoundationAddr;
    }

    function getMarketMakingAddress() external view onlyOwner returns(address){
        return MarketMakingAddr;
    }
    


    function configure (
        address _OBORTECHglobalAddr,
        address _MarketingPoolAddr,
        address _UserGrowthAddr,
        address _OBORTECHFoundationAddr,
        address _MarketMakingAddr,
        address _token
        ) onlyOwner external {
            token = IERC20(_token);
            OBORTECHglobalAddr = _OBORTECHglobalAddr;
            MarketingPoolAddr = _MarketingPoolAddr;
            UserGrowthAddr = _UserGrowthAddr;
            OBORTECHFoundationAddr = _OBORTECHFoundationAddr;
            MarketMakingAddr = _MarketMakingAddr;
    } 
    
    
}