pragma solidity >=0.6.0 <0.8.0;

import 'contracts/ObortechToken.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';



contract TokenDistributiom is Ownable {

    uint256 constant private FOR_SALE_TOKENS = 200_000_000 * 10 ** 18;
    uint256 constant private INVESTORS_TOKENS = 25_000_000 * 10 ** 18;
    uint256 constant private PRIVAT_TOKENS = 75_000_000 * 10 ** 18;
    uint256 constant private IEO_TOKENS = 100_000_000 * 10 ** 18;

    address private SaleAddres;
    address private InvestorsAddress;
    address private PrivateUserAddres;
    address private IewAddress;
    IERC20 private token;

    bool private WhetherToDistributeForSale;
    bool private WhetherToDistributeForInvestors;
    bool private WhetherToDistributeForPrivateUser;
    bool private WhetherToDistributeForIewAddress;

    function configure (
        address _Sale,
        address _Investors,
        address _PrivateUsr,
        address _Ieo,
        address _token) external
        {
            SaleAddres = _Sale;
            InvestorsAddress = _Investors;
            PrivateUserAddres = _PrivateUsr;
            IewAddress = _Ieo;
            token = IERC20(_token);
            token.transferFrom(_msgSender(), address(this), FOR_SALE_TOKENS + INVESTORS_TOKENS +PRIVAT_TOKENS + IEO_TOKENS);
            WhetherToDistributeForSale = true;
            WhetherToDistributeForInvestors = true;
            WhetherToDistributeForPrivateUser = true;
            WhetherToDistributeForIewAddress = true;
        }

    function distributeForSale() external onlyOwner {
        require (WhetherToDistributeForSale, 'tokens is over');
        token.transfer(SaleAddres, FOR_SALE_TOKENS);
        WhetherToDistributeForSale = false;
    }

      function distributeForInvestors() external onlyOwner {
        require (WhetherToDistributeForInvestors, 'tokens is over');
        token.transfer(InvestorsAddress, INVESTORS_TOKENS);
        WhetherToDistributeForInvestors = false;
    }

     function distributeForPrivateUser() external onlyOwner {
        require (WhetherToDistributeForPrivateUser, 'tokens is over');
        token.transfer(PrivateUserAddres, PRIVAT_TOKENS);
        WhetherToDistributeForPrivateUser = false;
    }

    function distributeForIewAddress() external onlyOwner {
        require (WhetherToDistributeForIewAddress, 'tokens is over');
        token.transfer(IewAddress, IEO_TOKENS);
        WhetherToDistributeForIewAddress = false;
    }

}