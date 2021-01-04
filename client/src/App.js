import { ethers, Contract } from "ethers";
import React, { useEffect, useState, Fragment } from "react";
import presaleabi from "./contracts/Yfdai.json";
import tokenabi from "./contracts/token.json"
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
            const presale = new ethers.Contract("0xD065B27D5d62Aa20ffd27817b2d5334Ae0ceE62B", presaleabi.abi, signer);
            const token = new ethers.Contract("0x8053F84FC0925A4f48d8630a7b53d77F161e4e43", tokenabi.abi, signer);
            SetPresalesm(presale);
            setMytoken(token);

            console.log(presale);
            console.log(token);

            // if you want to call data from smart contract follow below
            // suppose there is function in smart contract which returns something



            // const tokenname = async () => {
            //     setloading(true);
            //     await mytoken
            //         .name()
            //         .then((result) => {
            //             console.log(result)
            //             setname(result);
            //         })
            //     setloading(false);
            // };
            // const jj = await presalesm
            //     .presale();
            // console.log(jj);
            // if (jj == false)
            //     setispresale("Presale is going on")
            // else
            //     setispresale("Presale is over")

            // const bb = async (account) => await presalesm
            //     .claimable(account)
            //     .then((result) => {
            //         setClaimablebal(ethers.utils.formatUnits(result, 18))
            //         console.log(ethers.utils.formatUnits(result, 18))

            //     });
            // const cc = await presalesm
            //     .rate();


            // setRate(ethers.utils.formatUnits(cc, 18))

            // const dd = await mytoken
            //     .totalSupply()
            //     .then((result) => {
            //         console.log(ethers.utils.formatUnits(result, 18))
            //         settotalsupply(ethers.utils.formatUnits(result, 18));
            //     })
            // const hh = async () => await mytoken
            //     .symbol();
            // setsymbol(hh);

            // const kk = async () => await mytoken
            //     .name()
            // setname(kk);

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
        }
        catch (e) {
            console.log(e);
            swal("transaction failed");
        }
        setloading(false);
    }

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
        }
        catch (e) {
            console.log(e);
            swal("transaction failed");
        }
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

        const ispresale = await presalesm
            .presale()


        if (ispresale == false)
            setispresale("Presale is going on")
        else
            setispresale("Presale is over")




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
            .claimable(_addr)
            .then((result) => {
                setClaimablebal(ethers.utils.formatUnits(result, 18))
                console.log(ethers.utils.formatUnits(result, 18))

            });
        setloading(false);
    };
    const getrate = async () => {
        setloading(true);
        await presalesm
            .rate()
            .then((result) => {
                console.log(result);
                setRate(result)
            })
        setloading(false);
    };
    const setrate = async (_rate) => {
        setloading(true);
        try {
            const tx = await presalesm.setRate(_rate);
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

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
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
                                <Body contract={presalesm} buyTokenWithToken={buyTokenWithToken} buyTokenWithEther={buyTokenWithEther} />
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