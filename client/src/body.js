import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import './body.scss';

const Body = ({ buyTokenWithToken, buyTokenWithEther }) => {

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("0");

    const onchangeamount = (e) => {
        setAmount(e.target.value);
        console.log(e.target.value);
    };
    const onchangeaddress = (e) => {
        setAddress(e.target.value);
        console.log(e.target.value);
    };
    const onclickbuytoken = (e) => {
        e.preventDefault();
        if (address === "0x0000000000000000000000000000000000000000") {
            console.log("inn function two")
            buyTokenWithEther(amount);
        }
        else if (address !== 0 && amount !== 0) {
            console.log("inn function one")
            buyTokenWithToken(address, amount);
        }

    };



    return (

        <div className='container3'>
            <Container>
                <div className='box1'>
                    <input
                        type='number'
                        value={amount}
                        onChange={onchangeamount}
                        name='amount'
                        id='amount'
                        className='inputBox'
                        placeholder='Amount'
                    />
                    <select className='dropdown' onChange={onchangeaddress}>
                        <option default>select</option>
                        <option value="0x0000000000000000000000000000000000000000" >ETHER</option>
                        <option value='0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa'>DAI</option>
                        <option value='0xb7a4F3E9097C08dA09517b5aB877F7a917224ede'>USDC</option>
                        <option value='0x546c0f2aDA1f97fEe9Bd02C1aE19b6f629D8BA49'>USDT</option>
                    </select>
                </div>
                <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                    <button onClick={onclickbuytoken} className='dropdown'>BuyToken</button>
                </div>
            </Container>


        </div >
    )
}

export default Body