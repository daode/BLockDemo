pragma solidity ^0.4.0;

contract nameContract {
    uint storedData;

   function set(uint x) {
        storedData = x;
    }

   function get() constant returns (uint) {
        return storedData;
    }
}