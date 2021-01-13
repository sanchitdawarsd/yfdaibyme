const { assert } = require("chai");
//const { expectRevert } = require("@openzeppelin/test-helpers");
const BN = require("bn.js");
const Yfdai = artifacts.require("Yfdai");
const web3 = require("web3");
//const { isMainThread } = require("worker_threads");
// const FlexUSD = artifacts.require("flexUSD");
//import { accounts, contract } from '@openzeppelin/test-environment';
// import { Proxy } from '@openzeppelin/upgrades';
// import { ZWeb3 } from '@openzeppelin/upgrades';
//require("chai").use(require("chai-as-promised")).should();
//import presaleabi from "../client/src/contracts/Yfdai.json";
contract("Yfdai", () => {
    let instance;
    beforeEach('should setup the contract instance', async () => {
        const instance = await Yfdai.deployed();
        //  var testContract = new web3.eth.Contract(presaleabi, 0xeD7F3368948b0aba53ebAfF5677dE0d311a424cF);

    });

    it('should deploy smart contract properly', async () => {
        const yfdai = await Yfdai.deployed();
        console.log(yfdai.address);
        assert(yfdai !== '');
    });

    it("should return false, presale is completed", async () => {
        const yfdai = await Yfdai.deployed();
        console.log(startPresale)
        assert.equal(startPresale.valueOf(), false);

    });
});