pragma solidity >=0.6.0 <0.8.0;

import 'contracts/ObortechToken.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/proxy/Initializable.sol";
import '@openzeppelin/contracts/math/SafeMath.sol';



contract TokenDistributiom is Initializable,Ownable {

    using SafeMath for uint;

    address private OBORTECHglobalAddr;
    address private MarketingPoolAddr;
    address private UserGrowthAddr;
    address private OBORTECHFoundationAddr;
    address private MarketMakingAddr;
    address private DEFAULT_ADMIN_ROLE;
    address private owner;

    uint256 private OBORTECHglobalSUMM;
    uint256 private MarketingPoolSUMM;
    uint256 private UserGrowthSUMM;
    uint256 private OBORTECHFoundationSUMM;
    uint256 private MarketMakingSUMM;

    IERC20 private token;
    

    
    function distributeTokens (uint256 amount) external {

        token.transferFrom(_msgSender(), address(this), amount);

        OBORTECHglobalSUMM += amount.mul(7000).div(10_000);
        MarketingPoolSUMM += amount.mul(1000).div(10_000);
        UserGrowthSUMM += amount.mul(1000).div(10_000);
        OBORTECHFoundationSUMM += amount.mul(1000).div(10_000);
        MarketMakingSUMM += amount.mul(500).div(10_000);

    }
    
    function getObertechHlobalTokens() external {
        require(_msgSender() !=  OBORTECHglobalAddr,'invalid adress');
        token.transfer(OBORTECHglobalAddr, OBORTECHglobalSUMM);
        OBORTECHglobalSUMM = 0;
    }

    function getMarketingPoolTokens() external {
        require(_msgSender() !=  MarketingPoolAddr,'invalid adress');
        token.transfer(MarketingPoolAddr, MarketingPoolSUMM);
        MarketingPoolSUMM = 0;

    }

      function getUserGrowthPoolTokens() external {
        require(_msgSender() !=  UserGrowthAddr,'invalid adress');
        token.transfer(UserGrowthAddr, UserGrowthSUMM);
        UserGrowthSUMM = 0;

    }

      function getOBORTECHFoundationTokens() external {
        require(_msgSender() !=  OBORTECHFoundationAddr,'invalid adress');
        token.transfer(OBORTECHFoundationAddr, OBORTECHFoundationSUMM);
        OBORTECHFoundationSUMM = 0;

    }

    function getMarketMakingTokens() external {
        require(_msgSender() !=  MarketMakingAddr,'invalid adress');
        token.transfer(MarketMakingAddr, MarketingPoolSUMM);
        MarketingPoolSUMM = 0;

    }

    function configure (
        address _OBORTECHglobalAddr,
        address _MarketingPoolAddr,
        address _UserGrowthAddr,
        address _OBORTECHFoundationAddr,
        address _MarketMakingAddr,
        address _token
        ) external {
            token = IERC20(_token);
            OBORTECHglobalSUMM = _OBORTECHglobalAddr;
            MarketingPoolSUMM = _MarketingPoolAddr;
            UserGrowthSUMM = _UserGrowthAddr;
            OBORTECHFoundationSUMM = _OBORTECHFoundationAddr;
            MarketMakingSUMM = _MarketMakingAddr;
    } 
    

    

    function initialize( address admin, address minter) public initializer {
    _initialize("PEAKDEFI", "PEAK", 8);
    _setupRole(DEFAULT_ADMIN_ROLE, admin);
    _setupRole(MINTER_ROLE, minter);
    }
    
}