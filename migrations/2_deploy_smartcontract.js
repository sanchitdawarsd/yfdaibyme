const Yfdai = artifacts.require("Yfdai");
const token = artifacts.require("token");

module.exports = function (deployer) {
    const _totalsupply = "1000000000000000000000000";
    const _rate = "3000000000000000000";
    const _addr1 = "0x546c0f2aDA1f97fEe9Bd02C1aE19b6f629D8BA49";
    const _addr2 = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
    const uniswapRouterAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
    deployer.deploy(token, _totalsupply);
    //const tokendeployed = token.deployed();


    deployer.deploy(Yfdai, _rate, token.address, _addr1, _addr2, uniswapRouterAddr);
};
