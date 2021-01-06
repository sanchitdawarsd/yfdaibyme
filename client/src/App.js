import { ethers, Contract } from "ethers";
import React, { useEffect, useState, Fragment } from "react";
import presaleabi from "./contracts/Yfdai.json";
import tokenabi from "./contracts/token.json";
import Navbar from "./navbar";
import Body from "./body.js";
import Body2 from "./body2.js";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import swal from "sweetalert";

function App() {
  const [refresh, setrefresh] = useState(0);

  let content;
  const [loading2, setloading2] = useState(false);
  const [account, setAccount] = useState("");
  const [loading, setloading] = useState(true);
  const [SIGNER, SETSIGNER] = useState({});
  const [flag, setflag] = useState(0);
  const [getNetwork, setNetwork] = useState("");

  const [name, setname] = useState();
  const [totalsupply, settotalsupply] = useState("");
  const [symbol, setsymbol] = useState("");
  const [Currentaccount, setCurrentaccount] = useState("");
  const [presalesm, SetPresalesm] = useState();
  const [rate, setRate] = useState();
  const [mytoken, setMytoken] = useState();

  const [claimablebal, setClaimablebal] = useState();
  const [ispresale, setispresale] = useState();

  const [presaleinfo, setpresaleinfo] = useState({
    rate: 0,
    ispresale: false,
    myclaimablebalance: 0,
    contractethbalance: 0,
    contractusdcbalance: 0,
    contractusdtbalance: 0,
    contracttokenabalnce: 0,
  });

  const [tokeninfo, settokeninfo] = useState({
    tokenname: "",
    tokensymbol: "",
    mybalance: 0,
    totalsupply: 0,
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setloading(true);
    if (typeof window.ethereum == "undefined") {
      return;
    }

    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    SETSIGNER(signer);

    let url = window.location.href;
    console.log(url);

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    if (accounts.length == 0) {
      return;
    }

    setAccount(accounts[0]);

    var networkId;
    await provider.getNetwork().then((result) => {
      networkId = result.chainId;
    });
    if (networkId) {
      const usdcaddress = "0x546c0f2aDA1f97fEe9Bd02C1aE19b6f629D8BA49";
      const usdtaddress = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
      const tokenaddress = "0xDA27F505FEaffA14c6e188E2d556706BF037A854";
      const presaleaddress = "0x2657a6Fe988F33E33D652Cf20D17CA08f75BE851";
      // set network name here
      // setNetwork("Kovan");
      // defining a smart contract ;
      // signer is defined above no need to define again
      // const smartcontract = new Contract( /* address of smart contract*/  , /*  abi of smart contract */, signer);
      const presalecontract = new Contract(
        presaleaddress,
        presaleabi.abi,
        signer
      );
      const tokencontract = new Contract(tokenaddress, tokenabi.abi, signer);
      SetPresalesm(presalecontract);
      // setMytoken(tokencontract);

      let name, symbol, tokenbalance, totalsupply;
      await tokencontract.name().then((result) => {
        name = result;
      });
      await tokencontract.symbol().then((result) => {
        symbol = result;
      });

      await tokencontract.balanceOf(accounts[0]).then((result) => {
        tokenbalance = ethers.utils.formatUnits(result, 18);
      });
      await tokencontract.totalSupply().then((result) => {
        totalsupply = ethers.utils.formatUnits(result, 18);
      });

      settokeninfo({
        tokenname: name,
        tokensymbol: symbol,
        mybalance: tokenbalance,
        totalsupply,
      });
      let x,
        rate,
        ispresale,
        myclaimablebalance,
        contractethbalance,
        contractusdcbalance,
        contractusdtbalance,
        contracttokenabalnce;
      x = await presalecontract.rate();

      rate = ethers.utils.formatUnits(x, 18);
      console.log(rate);
      ispresale = await presalecontract.presale();
      console.log(ispresale);
      await presalecontract.claimable(accounts[0]).then((result) => {
        console.log(result);
        myclaimablebalance = ethers.utils.formatUnits(result, 18);
      });
      await presalecontract.getEthBalance().then((result) => {
        console.log(result);
        contractethbalance = ethers.utils.formatUnits(result, 18);
      });

      // await presalecontract
      //   .getContractNonErc20Balance(usdcaddress)
      //   .then((result) => {
      //     console.log(result);
      //     contractusdcbalance = ethers.utils.formatUnits(result, 18);
      //   });

      // await presalecontract
      //   .getContractNonErc20Balance(usdtaddress)
      //   .then((result) => {
      //     console.log(result);
      //     contractusdtbalance = ethers.utils.formatUnits(result, 18);
      //   });
      await presalecontract
        .getContractTokenBalance(tokenaddress)
        .then((result) => {
          console.log(result);
          contracttokenabalnce = ethers.utils.formatUnits(result, 18);
        });

      console.log({
        rate,
        ispresale,
        myclaimablebalance,
        contractethbalance,
        contractusdcbalance,
        contractusdtbalance,
        contracttokenabalnce,
      });
      setpresaleinfo({
        rate,
        ispresale,
        myclaimablebalance,
        contractethbalance,
        contractusdcbalance,
        contractusdtbalance,
        contracttokenabalnce,
      });
      setRate(rate);
      setClaimablebal(myclaimablebalance);
      if (ispresale == false)
        setispresale("Presale is going on")
      else
        setispresale("Presale is over")
      settotalsupply(totalsupply)
      setname(name)
      setsymbol(symbol)
      setloading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const buyTokenWithToken = async (_addr, amount) => {
    setloading(true);
    console.log(amount);
    // if you want to go from eth to wei
    var x = ethers.utils.parseEther(amount.toString());
    let overrides = {
      value: x,
    };
    console.log(overrides);
    try {
      const tx = await presalesm.buyTokenWithToken(_addr, amount);
      console.log(tx);
      const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      console.log(e);
      swal("transaction failed");
    }
    setloading(false);
  };

  const buyTokenWithEther = async (amount) => {
    setloading(true);
    console.log(amount.toString());
    // if you want to go from eth to wei
    var x = ethers.utils.parseEther(amount.toString());
    let overrides = {
      value: x.toString(),
    };
    console.log(x + "hi");
    try {
      const tx = await presalesm.buyTokenWithEther(overrides);
      console.log(tx);
      const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      console.log(e);
      swal("transaction failed");
    }
    setloading(false);
  };

  const claim = async () => {
    setloading(true);
    try {

      const tx = await presalesm.claim();
      console.log(tx);
      const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      console.log(e);
      swal("transaction failed");
    }
    setloading(false);
  };

  const endPresale = async () => {
    setloading(true);

    try {
      const tx = await presalesm.endPresale();
      console.log(tx);
      const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      console.log(e);
      swal("transaction failed");
    }

    setloading(false);
  };
  const startPresale = async () => {
    setloading(true);
    try {
      const tx = await presalesm.startPresale();
      console.log(tx);
      const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      console.log(e);
      swal("transaction failed");
    }
    setloading(false);
  };
  const isPresaleCompleted = async () => {
    setloading(true);

    const ispresale = await presalesm.presale();

    if (ispresale == false) setispresale("Presale is going on");
    else setispresale("Presale is over");

    setloading(false);
  };
  const addtoken = async (_addr) => {
    setloading(true);
    await presalesm.addTokentoListing(_addr).then((result) => {
      console.log(result);
    });
    setloading(false);
  };
  const istokenadded = async (_addr) => {
    setloading(true);
    const istokenadded = await presalesm.approvedAddresses(_addr)
    console.log(istokenadded)

    setloading(false);
  };
  const tokenname = async () => {
    setloading(true);
    await mytoken.name().then((result) => {
      console.log(result);
      setname(result);
    });
    setloading(false);
  };
  const tokensymbol = async () => {
    setloading(true);
    await mytoken.symbol().then((result) => {
      console.log(result);
      setsymbol(result);
    });
    setloading(false);
  };
  const tokentotalsupply = async () => {
    setloading(true);
    await mytoken.totalSupply().then((result) => {
      console.log(ethers.utils.formatUnits(result, 18));
      settotalsupply(ethers.utils.formatUnits(result, 18));
    });
    setloading(false);
  };
  const claimableBal = async (_addr) => {
    setloading(true);
    await presalesm.claimable(_addr).then((result) => {
      setClaimablebal(ethers.utils.formatUnits(result, 18));
      console.log(ethers.utils.formatUnits(result, 18));
    });
    setloading(false);
  };
  const getrate = async () => {
    setloading(true);
    await presalesm.rate().then((result) => {
      console.log(result);
      setRate(result);
    });
    setloading(false);
  };
  const setrate = async (_rate) => {
    setloading(true);
    try {
      const tx = await presalesm.setrate(_rate);
      console.log(tx + "setratein");
      // const txsign = await tx.wait();
      window.location.reload();
    } catch (e) {
      console.log(e);
      swal("transaction failed");
    }
  };
  const getBalance = async () => {
    setloading(true);
    await presalesm.getBalance().then((result) => {
      console.log(ethers.utils.formatUnits(result, 18));
    });
    setloading(false);
  };

  const walletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    if (accounts.length == 0) {
      return;
    }

    setAccount(accounts[0]);
    loadBlockchainData();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div>
        hello
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <Navbar
                    tokensymbol={tokensymbol}
                    totalsupply={totalsupply}
                    tokentotalsupply={tokentotalsupply}
                    tokenname={tokenname}
                    symbol={symbol}
                    name={name}
                    mytoken={mytoken}
                    account={account}
                    ispresale={ispresale}
                    rate={rate}
                    claimablebal={claimablebal}
                  />
                  <Body
                    contract={presalesm}
                    buyTokenWithToken={buyTokenWithToken}
                    buyTokenWithEther={buyTokenWithEther}
                  />
                </Fragment>
              )}
            ></Route>
            <Route
              path="/admin"
              render={() => (
                <Fragment>
                  <Navbar
                    tokensymbol={tokensymbol}
                    totalsupply={totalsupply}
                    tokentotalsupply={tokentotalsupply}
                    tokenname={tokenname}
                    symbol={symbol}
                    name={name}
                    mytoken={mytoken}
                    account={account}
                    ispresale={ispresale}
                    rate={rate}
                    claimablebal={claimablebal}
                  />
                  <Body2
                    isPresaleCompleted={isPresaleCompleted}
                    claim={claim}
                    getBalance={getBalance}
                    getrate={getrate}
                    addtoken={addtoken}
                    istokenadded={istokenadded}
                    claimableBal={claimableBal}
                    setrate={setrate}
                    endPresale={endPresale}
                    startPresale={startPresale}
                  />
                </Fragment>
              )}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }

  return (
    <div>
      {account == "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress} style={{ color: "black" }}>
            metamask
          </button>
        </div>
      ) : (
          content
        )}
    </div>
  );
}
export default App;
