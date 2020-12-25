import React, { useEffect, useState } from 'react'
import './navbar.scss';
import { Container } from 'react-bootstrap';
import { Header } from './Header';

const Navbar = ({ account, tokentotalsupply, totalsupply, tokensymbol, symbol, tokenname, name, ispresale, rate, claimablebal }) => {




    const onclicktokentotalsupply = (e) => {
        e.preventDefault();
        tokentotalsupply();
    };
    const onclicktokenname = (e) => {
        e.preventDefault();
        tokenname();
    };
    const onclicktokensymbol = (e) => {
        e.preventDefault();
        tokensymbol();
    };

    return (
        <>
            <Header />
            <div
                className='separator'
                style={{ height: '0.2rem', backgroundColor: '#102037', margin: '1rem' }}
            ></div>
            <div className='homePageContainer'>
                <Container className='container1'>
                    <div className='box1'>
                        <div className='name'>Presale Dapp</div>
                        <div className='value'>{account}</div>
                    </div>
                </Container>
                <div className='container2'>
                    <Container className='flexContainer'>
                        <div className='card card1'>
                            <div className='cardTitle'>Token Name</div>
                            <div className='cardContent'>{name}</div>
                        </div>
                        <div className='card card2'>
                            <div className='cardTitle'>Token Symbol</div>
                            <div className='cardContent'>{symbol}</div>
                        </div>
                        <div className='card card3'>
                            <div className='cardTitle'>Total Supply</div>
                            <div className='cardContent'>{totalsupply}</div>
                        </div>
                        <div className='card card4'>
                            <div className='cardTitle'>Available for Presale</div>
                            <div className='cardContent'>{ispresale}</div>
                        </div>
                        <div className='card card5'>
                            <div className='cardTitle'>Claimable Balance</div>
                            <div className='cardContent'>{claimablebal}</div>
                        </div>
                        <div className='card card6'>
                            <div className='cardTitle'>Exchange Rate</div>
                            <div className='cardContent'>{"1 DAI = " + rate + " " + symbol}</div>
                        </div>
                    </Container>
                </div>

            </div>
        </>
    )
}

export default Navbar