pragma solidity ^0.4.0;
/*
* BLock Project Smart Contract
*/
contract BLock {
	
	address public _customofficer;
	address public _sender;
	address public _addressee;
	address public _lockId;
	bool public _isopen;
	

	function BLock (address addressee, address lockId, bool isopen)
	{
		_customofficer = 0xe11ba2b4d45eaed5996cd0823791e0c93114882d;
		_sender = msg.sender;
		_addressee = addressee;
		_lockId = lockId;
		_isopen = isopen;
	}


	//Verify if the user is eligible to open the lock (is the user a part of the transaction?)
	function verify(address account) returns (bool) 
	{
		if ((account == _addressee) || (account == _sender) || (account == _customofficer))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	//Open the lock
	function open(address account) returns (bool)
	{
		if(verify(account))
		{
			if(!_isopen)
			{
				_isopen = true;
				return true;
			}
		}
		return false;
	}
	
	//Close the lock
	function close(address account) returns (bool)
	{
	if(verify(account))
		{
			if(_isopen)
			{
				_isopen = false;
				return true;
			}
		}
		return false;
	}
}