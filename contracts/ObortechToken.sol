pragma solidity >=0.6.0 <0.8.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';


contract ObertechToken is ERC20, AccessControl {
    bytes32 public constant OWNER = keccak256("OWNER");

    mapping (address => bool) private _burners;
    mapping (address => bool) private _black_list;

    constructor (string memory name_, string memory symbol_) public ERC20(name_,symbol_) {
        _mint(_msgSender(), 300_000_000 * 10 ** 18);
        _setupRole(OWNER, _msgSender());
    }

    function isBurner(address account)  external view returns (bool) {
        return _burners[account];
    }

    function burn(address account, uint256 amount) external {
       require(_burners[account] == true,"No rights");
       _burn(account, amount);
    }

    function addBurner(address account) external  {
        require(hasRole(OWNER, msg.sender),"No rights");
        require(_burners[account] != true,"User already exists");
        _burners[account] = true;
    }

    function removeBurner(address account) external  {
        require(hasRole(OWNER, msg.sender),"No rights");
        require(_burners[account] != false,"User already exists");
        _burners[account] = false;
    }

    function addBlackList(address account) external {
        require(hasRole(OWNER, msg.sender),"No rights");
        require(_black_list[account] != true,"User already exists");
        _black_list[account] = true;
    }

    function removeBlackList(address account) external {
        require(hasRole(OWNER, msg.sender),"No rights");
        require(_black_list[account] != false,"User already exists");
        _black_list[account] = false;
    }

    function isBlackList(address account) external view returns (bool) {
        return _black_list[account];
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        require(_black_list[from] != true,"from addr in BlackList");
        require(_black_list[to] != true,"to addr in BlackList");
    }

}
