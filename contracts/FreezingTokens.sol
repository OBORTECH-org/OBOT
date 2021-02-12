pragma solidity >=0.6.0 <0.8.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import 'contracts/ObortechToken.sol';


contract FreezingTokens is Ownable {
    IERC20 private token;
    uint256 private startTimestamp;
    uint256 constant private founder_tokens = 60_000_000 * 10 ** 18;
    uint256 constant private managmant_tokens = 10_000_000 * 10 ** 18;
    uint256 private first_15M_counter = 0;
    address private founderAddres;
    address private managementAddres;

    function configuration(IERC20 _token,uint256 _startTimestamp,address _founderAddres,address _managementAddres) external {
        token = _token;
        startTimestamp = _startTimestamp;
        founderAddres = _founderAddres;
        managementAddres = _managementAddres;
        IERC20(token).transferFrom(_msgSender(), address(this),founder_tokens + managmant_tokens);

    }

    function unfreeze_15M() external {
        require(block.timestamp >= startTimestamp + first_15M_counter * 182);
        first_15M_counter++;
        token.transfer(founderAddres, 15_000_000 * 10 ** 18);
        require(block.timestamp >= startTimestamp + first_15M_counter * 182,"Cannot unlock tokens");
        token.transfer(founderAddres, 15_000_000 * 10 ** 18);
        first_15M_counter++;
        require(block.timestamp >= startTimestamp + first_15M_counter * 182,"Cannot unlock tokens");
        token.transfer(founderAddres, 15_000_000 * 10 ** 18);
        first_15M_counter++;
        require(block.timestamp >= startTimestamp + first_15M_counter * 182,"Cannot unlock tokens"); 
        token.transfer(founderAddres, 15_000_000 * 10 ** 18);

    }

    function unfreeze_10M () external {
        require (block.timestamp >= startTimestamp + 4 * 365 * 1 days, "Cannot unlock tokens");
        token.transfer(managementAddres, managmant_tokens);
    }

    function getStarTimstemp() external view returns (uint256) {
        return startTimestamp;

    }

    function getUnlockTime_10M() external view returns (uint256) {
        if(block.timestamp < startTimestamp + 4 * 365 * 1 days){
            return startTimestamp + 4 * 365 * 1 days - block.timestamp;
        }
        else {
            return 0;
        }
    }

    function getNearestUnlockTime_15M() external view returns (uint256) {
        if(block.timestamp < startTimestamp + first_15M_counter * 182){
            return startTimestamp + first_15M_counter * 182 - block.timestamp;
        }
        else {
            return 0;
        }
    }

}