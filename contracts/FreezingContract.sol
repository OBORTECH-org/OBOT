pragma solidity >=0.6.0 <0.8.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import 'contracts/ObortechToken.sol';


contract FreezingContract is Ownable { 
    using SafeMath for uint;
    uint256 constant private FOUNDERS_TOKENS = 60_000_000 * 10 ** 18;
    uint256 constant private MANAGEMENTS_TOKENS = 10_000_000 * 10 ** 18;

    IERC20 private token;
    uint256 private startTimestamp;
    uint256 private first15mCounter;
    address private founderAddress;
    address private managementAddress;
    uint256 constant ONE_YEAR = 365;


    function getStartTimestamp() external view returns (uint256) {
        return startTimestamp;
    }

    function getFounderAddress() external view returns (address) {
        return founderAddress;
    }

    function getManagementAddress() external view returns (address) {
        return managementAddress;
    }

    function getUnlockTimeManagementAddress() external view returns (uint256) {
        return startTimestamp + 4 * 365 * 1 days;
    }

    function getNearestUnlockTimeFoundersTokens() external view returns (uint256) {
        if (first15mCounter >= 4) {
            return 0;
        }
        return startTimestamp + first15mCounter * ONE_YEAR.div(2) * 1 days; // TODO: test this
    }

    function setFounderAddress(address _founderAddress) external onlyOwner {
        require(_founderAddress != address(0), 'incorrect founderAddress');
        founderAddress = _founderAddress;
    }

    function setManagementAddress(address _managementAddress) external onlyOwner {
        require(_managementAddress != address(0), 'incorrect managementAddress');
        managementAddress = _managementAddress;
    }

    function configure(
        address _token,
        uint256 _startTimestamp,
        address _founderAddress,
        address _managementAddress) external
    {
        token = IERC20(_token);
        startTimestamp = _startTimestamp;
        founderAddress = _founderAddress;
        managementAddress = _managementAddress;
        token.transferFrom(_msgSender(), address(this), FOUNDERS_TOKENS + MANAGEMENTS_TOKENS);
        first15mCounter = 0;
    }

    function unfreezeFoundersTokens() external {
        require(block.timestamp >= startTimestamp + first15mCounter * ONE_YEAR.div(2) * 1 days,"Cannot unlock tokens"); // TODO: test this
        require(first15mCounter < 4, 'tokens is over');
        first15mCounter++;
        token.transfer(founderAddress, FOUNDERS_TOKENS.div(4));
    }

    function unfreezeManagementsTokens() external {
        require (block.timestamp >= startTimestamp + 4 * 365 * 1 days, "Cannot unlock tokens");
        token.transfer(managementAddress, MANAGEMENTS_TOKENS);
    }
}
