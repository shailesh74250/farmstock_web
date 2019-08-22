import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import logo from './logo.svg';
import './App.css';
import QuestionAnswer from './pages/NewQuestionAnswer';
import SignIn from './pages/SignIn';
import NewUI from './pages/UI';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path='/' component = {QuestionAnswer} />
                    <Route exact path='/ui' component={NewUI} />
                    <Route path="/login" component = {SignIn} />
                </Switch>
            </div>
        </BrowserRouter>   
    );
}

export default App;
