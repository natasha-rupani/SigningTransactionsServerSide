const fs = require('fs');
const path = require('path');
const Counter = artifacts.require("Counter");

module.exports = function (deployer) {
  deployer
    .deploy(Counter)
    .then(() => {
      const counterAddress = JSON.stringify({ address: Counter.address });
      fs.writeFile(path.resolve(__dirname, '..', 'build', 'CounterAddress.json'), counterAddress, err => {
        if (err) {
          console.error(err)
          return
        }
      });
    });
};