import React, { useState } from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Card, Input, Button } from 'antd';
import { Container } from 'react-bootstrap';
import './body2.scss'

const Body2 = ({ startPresale, setrate, claim, isPresaleCompleted, endPresale, getBalance, getrate, addtoken, istokenadded, claimableBal }) => {

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [ratee, setratee] = useState();

    const onchangeamount = (e) => {
        setAmount(e.target.value);
        console.log(e.target.value);
    };
    const onchangerate = (e) => {
        setratee(e.target.value);
        console.log(e.target.value);
    };
    const onchangeaddress = (e) => {
        setAddress(e.target.value);
        console.log(e.target.value);
    };

    const onclickaddtoken = (e) => {
        e.preventDefault();
        if (address !== 0) addtoken(address);
        else window.alert("there is error in submission");
    };

    const onclicksetrate = (e) => {
        e.preventDefault();
        if (address !== 0) setrate();
        else window.alert("there is error in submission");
    };
    const onclickendPresale = (e) => {
        e.preventDefault();
        endPresale();

    };
    const onclickstartPresale = (e) => {
        e.preventDefault();
        startPresale();

    };
    const onclickistoken = (e) => {
        e.preventDefault();
        if (address !== 0) istokenadded(address);
        else window.alert("there is error in submission");
    };
    const onclickclaimableBal = (e) => {
        e.preventDefault();
        if (address !== 0) claimableBal(address);
        else window.alert("there is error in submission");
    };
    const onclickgetrate = (e) => {
        e.preventDefault();
        if (address !== 0) getrate();
        else window.alert("there is error in submission");
    };
    const onclickgetBalance = (e) => {
        e.preventDefault();
        if (address !== 0) getBalance();
        else window.alert("there is error in submission");
    };
    const onclickclaim = (e) => {
        e.preventDefault();
        claim();

    };

    const onclickisPresaleCompleted = (e) => {
        e.preventDefault();
        isPresaleCompleted();

    };
    return (
        <div>
            <div className='container3'>
                <Container>
                    <div className='box1'>
                        <input
                            value={address}
                            onChange={onchangeaddress}
                            className='inputBox'
                            placeholder='Address'
                        />
                    </div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickaddtoken} className='dropdown'>Add Token to listing</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className='box1'>
                        <input
                            value={address}
                            onChange={onchangeaddress}
                            className='inputBox'
                            placeholder='Address'
                        />
                    </div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickistoken} className='dropdown'>isTokenAdded</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className="box1"></div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickstartPresale} className='dropdown'>startPresale</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className="box1"></div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickendPresale} className='dropdown'>endPresale</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className="box1"></div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickgetrate} className='dropdown'>getRate</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className='box1'>
                        <input
                            value={ratee}
                            onChange={onchangerate}
                            className='inputBox'
                            placeholder='RATE'
                        />
                    </div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclicksetrate} className='dropdown'>setRate</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className="box1"></div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickclaim} className='dropdown'>claim</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className="box1"></div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickisPresaleCompleted} className='dropdown'>isPresaleCompleted</button>
                    </div>
                </Container>
            </div>

            <div className='container3'>
                <Container>
                    <div className='box1'>
                        <input
                            value={address}
                            onChange={onchangeaddress}
                            className='inputBox'
                            placeholder='Address'
                        />
                    </div>
                    <div className='box1' style={{ borderRadius: '0 0 13px 13px' }}>
                        <button onClick={onclickclaimableBal} className='dropdown'>claimableBal</button>
                    </div>
                </Container>
            </div>
            {/* <div className="site-card-border-less-wrapper">
                <div title="" bordered={true} className="cc2">
                    <p><Input value={address} onChange={onchangeaddress} className="inputs" placeholder="_addr" /></p>
                    <div><Button className="buttons" onClick={onclickaddtoken}>isTokenAdded</Button></div>
                    <div></div>
                </div>
            </div>


            <div className="site-card-border-less-wrapper">
                <div title="" bordered={true} className="cc2">
                    <p><Input value={ratee} onChange={onchangerate} className="inputs" placeholder="setrate" /></p>
                    <div><Button className="buttons" on change onClick={onclicksetrate}>setrate</Button></div>
                    <div></div>
                </div>
            </div>


            <div className="site-card-border-less-wrapper">
                <div title="" bordered={true} className="cc2">
                    <div><Button className="buttons" onClick={onclickendPresale}>endPresale</Button></div>
                    <div></div>
                </div>
            </div>
            <div className="site-card-border-less-wrapper">
                <div title="" bordered={true} className="cc2">
                    <div><Button className="buttons" onClick={onclickstartPresale}>startPresale</Button></div>
                    <div></div>
                </div>
            </div>

            <div className="site-card-border-less-wrapper">
                <div title="" bordered={true} className="cc2">
                    <p><Input value={address} onChange={onchangeaddress} className="inputs" placeholder="_addr" /></p>
                    <div><Button onClick={onclickistoken} className="buttons">isTokenAdded</Button></div>
                    <div></div>
                </div>
            </div>
            <div className="site-card-border-less-wrapper">
                <div title="" bordered={true} className="cc2">
                    <p><Input value={address} onChange={onchangeaddress} className="inputs" placeholder="_addr" /></p>
                    <div><Button onClick={onclickclaimableBal} className="buttons">claimableBal</Button></div>
                    <div></div>
                </div>
            </div>
            <div style={{}}>
                <div className="site-card-border-less-wrapper">
                    <div title="" bordered={true} className="cc2">
                        <div><Button onClick={onclickgetrate} className="buttons">getrate</Button></div>
                        <div></div>
                    </div>
                </div>
                <div className="site-card-border-less-wrapper">
                    <div title="" bordered={true} className="cc2">
                        <div><Button onClick={onclickclaim} className="buttons">claim</Button></div>
                        <div></div>
                    </div>
                </div>

                <div className="site-card-border-less-wrapper">
                    <div title="" bordered={true} className="cc2" >
                        <div><Button onClick={onclickisPresaleCompleted} className="buttons">isPresaleCompleted</Button></div>
                        <div></div>
                    </div>
                </div>
            </div> */}

        </div >
    )
}

export default Body2