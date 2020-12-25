import { ethers, Contract } from "ethers";
import React, { useEffect, useState, Fragment } from "react";
import presaleabi from "./contracts/Yfdai.json";
import tokenabi from "./contracts/sanchittoken.json"
import Navbar from "./navbar";
import Body from './body.js';
import Body2 from './body2.js';
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
            // set network name here
            setNetwork("Kovan");
            // defining a smart contract ;
            // signer is defined above no need to define again
            // const smartcontract = new Contract( /* address of smart contract*/  , /*  abi of smart contract */, signer);
            const presale = new Contract("0x226Be01B3e281E1A14De60Dc410502ED1783dB05", presaleabi.abi, signer);
            const token = new Contract("0x8C1BAb676Ebd9C99a3158A06D8B609dA61D7a15C", tokenabi.abi, signer);
            SetPresalesm(presale);
            setMytoken(token);

            console.log(presale);
            console.log(token);

            // if you want to call data from smart contract follow below
            // suppose there is function in smart contract which returns something




            // await presalesm
            //     .ispresaleCompleted()
            //     .then((result) => {
            //         if (result == false)
            //             setispresale("Presale is going on")
            //         else
            //             setispresale("Presale is over")
            //     });
            // await presalesm
            //     .claimableBal(account)
            //     .then((result) => {
            //         setClaimablebal(ethers.utils.formatUnits(result, 18))
            //         console.log(ethers.utils.formatUnits(result, 18))

            //     });
            // await presalesm
            //     .getrate()
            //     .then((result) => {
            //         console.log(result);
            //         setRate(result)
            //     })
            // await mytoken
            //     .totalSupply()
            //     .then((result) => {
            //         console.log(ethers.utils.formatUnits(result, 18))
            //         settotalsupply(ethers.utils.formatUnits(result, 18));
            //     })
            // const aa = await mytoken
            //     .symbol();
            // setsymbol(aa);

            // const bb = await mytoken
            //     .name()
            // setname(bb);

            // await smartcontract
            //   .functioninsmartcontract(accounts[0].toString())
            //   .then((result) => {
            //     console.log("vesting schedule data ", result);
            //   });

            // suppose there is a call function only or a public variable
            // await smartcontract.functioninsmartcontract();

            setloading(false);
        } else {
            window.alert("the contract not deployed to detected network.");
            setloading2(true);
        }
    };

    const buytoken = async (_addr, amount) => {
        setloading(true);
        console.log(amount);
        // if you want to go from eth to wei
        var x = ethers.utils.parseEther(amount.toString());
        let overrides = {
            value: x,
        };
        console.log(overrides);
        try {
            const tx = await presalesm.buyToken(_addr, amount);
            console.log(tx);
            const txsign = await tx.wait();
            window.location.reload();
        }
        catch (e) {
            console.log(e);
            swal("transaction failed");
        }

        // setloading(true);
        // if (_addr === '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa') {



        //     await presalesm.methods
        //         .buyToken(_addr, amount)
        //         .send({ from: Currentaccount })
        //         .on("transactionhash", () => {
        //             console.log("succesfully ran");
        //         });
        // }

        // else {

        //     console.log(amount)
        //     await presalesm.methods
        //         .buyToken(_addr, amount)
        //         .send({ from: Currentaccount })
        //         .on("transactionhash", () => {
        //             console.log("succesfully ran");
        //         });
        setloading(false);
    }


    const claim = async () => {
        setloading(true);
        try {
            const tx = await presalesm.claim();
            console.log(tx);
            const txsign = await tx.wait();
            window.location.reload();
        }
        catch (e) {
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
        }
        catch (e) {
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
        }
        catch (e) {
            console.log(e);
            swal("transaction failed");
        }
        setloading(false);
    };
    const isPresaleCompleted = async () => {
        setloading(true);
        await presalesm
            .ispresaleCompleted()
            .then((result) => {
                if (result == false)
                    setispresale("Presale is going on")
                else
                    setispresale("Presale is over")
            });



        setloading(false);

    };
    const addtoken = async (_addr) => {
        setloading(true);
        await presalesm
            .addTokentoListing(_addr)
            .then((result) => {

                console.log(result);

            });
        setloading(false);
    };
    const istokenadded = async (_addr) => {
        setloading(true);
        await presalesm
            .isTokenListed(_addr)
            .then((result) => {
                console.log(result);
            })
        setloading(false);
    };
    const tokenname = async () => {
        setloading(true);
        await mytoken
            .name()
            .then((result) => {
                console.log(result)
                setname(result);
            })
        setloading(false);
    };
    const tokensymbol = async () => {
        setloading(true);
        await mytoken
            .symbol()
            .then((result) => {
                console.log(result)
                setsymbol(result);
            })
        setloading(false);
    };
    const tokentotalsupply = async () => {
        setloading(true);
        await mytoken
            .totalSupply()
            .then((result) => {
                console.log(ethers.utils.formatUnits(result, 18))
                settotalsupply(ethers.utils.formatUnits(result, 18));
            })
        setloading(false);
    };
    const claimableBal = async (_addr) => {
        setloading(true);
        await presalesm
            .claimableBal(_addr)
            .then((result) => {
                setClaimablebal(ethers.utils.formatUnits(result, 18))
                console.log(ethers.utils.formatUnits(result, 18))

            });
        setloading(false);
    };
    const getrate = async () => {
        setloading(true);
        await presalesm
            .getrate()
            .then((result) => {
                console.log(result);
                setRate(result)
            })
        setloading(false);
    };
    const setrate = async (_rate) => {
        setloading(true);
        try {
            const tx = await presalesm.setRate();
            console.log(tx);
            const txsign = await tx.wait();
            window.location.reload();
        }
        catch (e) {
            console.log(e);
            swal("transaction failed");
        }
    };
    const getBalance = async () => {
        setloading(true);
        await presalesm
            .getBalance()
            .then((result) => {
                console.log(ethers.utils.formatUnits(result, 18));
            })
        setloading(false);
    };

    const walletAddress = async () => {
        await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [
                {
                    eth_accounts: {},
                },
            ],
        });
        window.location.reload();
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
        content = (<div>
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
                                <Body contract={presalesm} buytoken={buytoken} />
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
        </div>);
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