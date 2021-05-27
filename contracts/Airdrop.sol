// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Airdrop is Ownable {
    /**
     * @dev Tokens airdrop function
     * @param _recipients array of recipients
     * @param _amount array of amounts
     * @param _recipients airdrop token
     */
    function dropTokens(address[] memory _recipients, uint256[] memory _amount, IERC20 _token) public onlyOwner {
        require(_recipients.length == _amount.length, "dropTokens: IL");
        for (uint i = 0; i < _recipients.length; i++) {
            _token.transfer(_recipients[i], _amount[i]);
        }
    }

    /**
     * @dev Withdrawal of not distributed tokens
     * @param _token airdrop token
     */
    function withdrawTokens(IERC20 _token) public onlyOwner {
        uint256 balance = _token.balanceOf(address(this));
        _token.transfer(_msgSender(), balance);
    }
}
