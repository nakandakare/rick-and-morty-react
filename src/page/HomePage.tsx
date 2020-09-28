import React from 'react';
import './HomePage.scss';
import Header from '../components/Header/Header';
import MainPanel from '../components/MainPanel/MainPanel';
import Footer from '../components/Footer/Footer';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const HomePage = () => {

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#FFFFFF',
                contrastText: "#0f0"
            },
            secondary: {
                main: '#FFFFFF',
                contrastText: "#0f0"
            },
        },
        typography: {
            allVariants: {
                color: "white"
            },
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <div className='homePageContainer'>
                <Header />
                <MainPanel />
                <Footer />
            </div>
        </MuiThemeProvider>
    )
}

export default HomePage;