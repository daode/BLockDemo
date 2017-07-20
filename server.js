var express = require('express');
var app = express();
var fs = require("fs");

var Web3 = require('web3');
var solc = require('solc');

var addressContract;
var contractInstance;
var contract;


//Init Web3 object
var web3 = new Web3();
//Setup the local blockchain
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

//Get the balance of the account
app.get('/balance/:address', function(req, res) {

    web3.eth.getBalance(req.params.address, function(error, resultat) {

        if (!error) {
            res.end("\nThe Balance of account: \n" + req.params.address + "\n\n\nis:\n" + resultat);
        }
    })
})


//Deploy the smart contract
app.get('/deploy', function(req, res) {
	//init constructor input
    var addressee = "0x28a8746e75304c0780e011bed21c72cd78cd535e";
    var lockId = "0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e";
    var isopen = false;
    //Contract Interface
    contract = web3.eth.contract([{
        "constant": true,
        "inputs": [],
        "name": "_customofficer",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "_lockId",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "opening",
            "type": "bool"
        }],
        "name": "set",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "a",
            "type": "address"
        }],
        "name": "verify",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "_addressee",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "a",
            "type": "address"
        }],
        "name": "open",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "_isopen",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "a",
            "type": "address"
        }],
        "name": "close",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "_sender",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "type": "function"
    }, {
        "inputs": [{
            "name": "addressee",
            "type": "address"
        }, {
            "name": "lockId",
            "type": "address"
        }, {
            "name": "isopen",
            "type": "bool"
        }],
        "payable": false,
        "type": "constructor"
    }]);
	
	//Instaciate the contract in the blockchain
    contractInstance = contract.new(
        addressee,
        lockId,
        isopen, {
            from: web3.eth.accounts[0],
            data: '6060604052341561000c57fe5b604051606080610756833981016040528080519060200190919080519060200190919080519060200190919050505b73e11ba2b4d45eaed5996cd0823791e0c93114882d600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360146101000a81548160ff0219169083151502179055505b5050505b6105d5806101816000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806335e2a6b4146100995780635f469437146100eb5780635f76f6ab1461013d57806363a9c3d71461015f578063a9db14f6146101ad578063b95460f8146101ff578063c3011e1f1461024d578063c74073a114610277578063cbd49462146102c5575bfe5b34156100a157fe5b6100a9610317565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100f357fe5b6100fb61033d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561014557fe5b61015d60048080351515906020019091905050610363565b005b341561016757fe5b610193600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610381565b604051808215151515815260200191505060405180910390f35b34156101b557fe5b6101bd6104a1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561020757fe5b610233600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104c7565b604051808215151515815260200191505060405180910390f35b341561025557fe5b61025d61051c565b604051808215151515815260200191505060405180910390f35b341561027f57fe5b6102ab600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061052f565b604051808215151515815260200191505060405180910390f35b34156102cd57fe5b6102d5610583565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600360146101000a81548160ff0219169083151502179055505b50565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16148061042c5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b806104845750600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b15610492576001905061049c565b6000905061049c565b5b919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006104d282610381565b1561051257600360149054906101000a900460ff161515610511576001600360146101000a81548160ff02191690831515021790555060019050610517565b5b600090505b919050565b600360149054906101000a900460ff1681565b600061053a82610381565b1561057957600360149054906101000a900460ff1615610578576000600360146101000a81548160ff0219169083151502179055506001905061057e565b5b600090505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582027c49b55af5ad5970f73ddabcf801fc42b371b457a8a0a34444f886c20854cf90029',
            gas: '4700000'
        },
        function(e, contract) {
            console.log(e, contract);
			//Store instance address
            addressContract = contract.address;
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                res.end("Contract BLock created at the address:\n" + contract.address);
            }
        })

})


//Retrieve isopen value
app.get('/isopen', function(req, res) {
    //Get _isopen value
    var result = contractInstance._isopen();
    //display it
    res.end("_isopen value:\n " + result);
})

//Open the lock for the User
app.get('/open/:address', function(req, res) {
    //Generate function data.
    var getData = contractInstance.open.getData(req.params.address);
    //Send the transaction in order to modify the state of the contract.
    web3.eth.sendTransaction({
        from: web3.eth.coinbase,
        to: addressContract,
        data: getData
    });
    //Verify the state
    res.end("This interface call the function Open the Lock for the given user (Address)\n\nLock Opened:\nIsOpen Value's:" + contractInstance._isopen());

})


//Close the lock for the User
app.get('/close/:address', function(req, res) {
    //Generate function data.
    var getData = contractInstance.close.getData(req.params.address);
    //Send the transaction in order to modify the state of the contract.
    web3.eth.sendTransaction({
        from: web3.eth.coinbase,
        to: addressContract,
        data: getData
    });
    //Verify the state
    res.end("This interface call the function Close the Lock for the given user (Address)\n\nLock Closed\nIsOpen Value's: " + contractInstance._isopen());

})


var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("SmartContract DApp listening at http://%s:%s", host, port)

})

app.use('/', express.static('./routes/contract.html'));
