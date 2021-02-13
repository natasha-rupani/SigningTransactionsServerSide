//// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;

contract Counter {
    uint256 private count;

    constructor() public {
        count = 0;
    }

    function increment() public {
        require(count + 1 >= count, "Overflow");
        count += 1;
    }

    function decrement() public {
        require(count >= 1, "Underflow");
        count -= 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
