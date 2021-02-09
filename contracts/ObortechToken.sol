pragma solidity >=0.6.0 <0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/GSN/Context.sol';

contract Token is ERC20 {

    constructor (string memory name_, string memory symbol_) public ERC20(name_,symbol_) {
        //_mint(_msgSender(), 1000000 * 10 ** 18);
    }

}