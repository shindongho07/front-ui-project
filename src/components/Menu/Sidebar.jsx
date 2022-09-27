import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

function Sidebar (){
    return (
        <div>
            <Router>
            
                <Header/>
                <AppBody>
                    <Switch>
                        <Route path = "/" excact>

                        </Route>
                    </Switch>
                </AppBody>
           
            </Router>
        </div>
    );
}