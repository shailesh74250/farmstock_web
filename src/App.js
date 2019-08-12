import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import logo from './logo.svg';
import './App.css';
import QuestionAnswer from './pages/NewQuestionAnswer';
import SignIn from './pages/SignIn';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path='/' component = {QuestionAnswer} />
                    <Route path="/login" component = {SignIn} />
                </Switch>
            </div>
        </BrowserRouter>   
    );
}

export default App;
