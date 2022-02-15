// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}


/// @notice A contract for sweeping ERC20 tokens to a know address.
contract Sweep {
    constructor (
        address _token,
        address _to
    ) {
		IERC20 gOHM = IERC20(_token);
        gOHM.transfer(_to, gOHM.balanceOf(address(this)));
    }
}
