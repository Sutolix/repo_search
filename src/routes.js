import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from "./pages/Main";
import Repositorio from "./pages/Repositorio";


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Main }/>
                {/* /:repositorio está indicando que ele receberá uma parametro após o / na url*/}
                <Route exact path="/repositorio/:repositorio" component={ Repositorio }/>
            </Switch>
        </BrowserRouter>
    )
}