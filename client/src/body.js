import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import './body.scss';

const Body = ({ buytoken }) => {

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");

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
        if (address !== 0 && amount !== 0) buytoken(address, amount);
        else window.alert("there is error in submission");
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
                        <option value="0x0000000000000000000000000000000000000000" >Ether</option>
                        <option value='0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa'>DAI</option>
                        <option value='0xb7a4F3E9097C08dA09517b5aB877F7a917224ede'>USDC</option>
                        <option value='0x07de306FF27a2B630B1141956844eB1552B956B5'>USDT</option>
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