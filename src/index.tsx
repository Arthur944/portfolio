import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {HomePage} from "./components/home-page";
import {GlobalStyles} from "./styles/global-styles";
import './styles/styles.css';

function App(){
    return(
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Route path={"/"} component={HomePage}/>
            </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
