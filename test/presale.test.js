const { assert } = require("chai");
//const { expectRevert } = require("@openzeppelin/test-helpers");
const BN = require("bn.js");
const Yfdai = artifacts.require("Yfdai");
//const web3 = require("web3");
//const { isMainThread } = require("worker_threads");
// const FlexUSD = artifacts.require("flexUSD");
//import { accounts, contract } from '@openzeppelin/test-environment';
// import { Proxy } from '@openzeppelin/upgrades';
// import { ZWeb3 } from '@openzeppelin/upgrades';
//require("chai").use(require("chai-as-promised")).should();

contract("Yfdai", () => {
    it('should deploy smart contract properly', async () => {
        const yfdai = await Yfdai.deployed();
        console.log(yfdai.address);
        assert(yfdai !== '');
    });

    it("should return if the presale is completed", async () => {
        return Yfdai.deployed().then(function (instance) {
            // Grab token instance first
            yfdaiInstance = instance;

            const endPresale = yfdaiInstance.endPresale();

            assert(endPresale == true);
        });
    });
});