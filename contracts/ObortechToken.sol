pragma solidity >=0.6.0 <0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';


contract ObertechToken is ERC20, AccessControl {
    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant BURNER = keccak256("BURNER");

    constructor (string memory name_, string memory symbol_) public ERC20(name_, symbol_) {
        _mint(_msgSender(), 300_000_000 * 10 ** 18);
        _setRoleAdmin(BURNER, OWNER);
        _setupRole(OWNER, _msgSender());
    }

    function burn(address account, uint256 amount) external {
       require(hasRole(BURNER, _msgSender()), "No rights");
       _burn(account, amount);
    }

    // TODO: need transferOwnership
}
