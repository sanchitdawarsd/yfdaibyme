import React from 'react';
import { Container } from 'react-bootstrap';
import logo from './logo.png';
import settings from './settings.png';
import './Header.scss';

export const Header = () => {
    return (
        <Container className='headerContainer'>
            <img src={logo} alt='logo' width='250px' height='auto' className='logo' />
            <div className='rightBox'>
                <button className='headerButton'>Connect to a wallet</button>
                <div className='img1'>
                    <img
                        src={settings}
                        alt='settings'
                        className='settings'
                        width='50px'
                        height='auto'
                    />
                </div>
                <div className='img2'></div>
            </div>
        </Container>
    );
};
