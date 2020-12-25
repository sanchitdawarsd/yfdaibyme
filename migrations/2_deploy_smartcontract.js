const Yfdai = artifacts.require("Yfdai");
const sanchittoken = artifacts.require("sanchittoken");
const _totalsupply = "1000000000000000000000000";
const _rate = "3000000000000000000";
const _token = "0x8267Fc1c455146f7F953BD117Ae4240Bd15FFD8E";
const _addr1 = "0x07de306FF27a2B630B1141956844eB1552B956B5";
const _addr2 = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
const uniswapRouterAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
module.exports = function (deployer) {
    deployer.deploy(Yfdai, _rate, _token, _owneraddr, _addr1, _addr2, uniswapRouterAddr);
    deployer.deploy(sanchittoken, _totalsupply)
};
