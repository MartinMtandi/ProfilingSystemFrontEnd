import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Login from './components/pages/Login';
import AdminWrapper from './components/AdminWrapper';
import LoginWrapper from './components/LoginWrapper';
import Dashboard from './components/pages/Dashboard';
import Questions from './components/pages/Questions';
import Users from './components/pages/Users';
import QuestionAnalysis from './components/pages/QuestionAnalysis';



class App extends Component {
  render(){
    return (
      <Router>
        <Route 
          path="/analysis"
          exact={true}
          render={props => {
            return (
              ( 
                <div>
                  {this.props.auth.isAuthenticated ?
                    <AdminWrapper>
                      <QuestionAnalysis />
                    </AdminWrapper> 
                   : 
                   <LoginWrapper>
                     <Login />
                   </LoginWrapper> 
                   }
                </div>
              )
            )
          }}
        />

        <Route 
          path="/questions"
          exact={true}
          render={props => {
            return (
              ( 
                <div>
                  {this.props.auth.isAuthenticated ?
                    <AdminWrapper>
                      <Questions />
                    </AdminWrapper> 
                   : 
                   <LoginWrapper>
                     <Login />
                   </LoginWrapper> 
                   }
                </div>
              )
            )
          }}
        />

        <Route 
          path="/users"
          exact={true}
          render={props => {
            return (
              ( 
                <div>
                  {this.props.auth.isAuthenticated ?
                    <AdminWrapper>
                      <Users />
                    </AdminWrapper> 
                   : 
                   <LoginWrapper>
                     <Login />
                   </LoginWrapper> 
                   }
                </div>
              )
            )
          }}
        />

        <Route
          path="/"
          exact={true}
          render={props => {
            return (
              ( 
                <div>
                  {this.props.auth.isAuthenticated ?
                    <AdminWrapper>
                      <Dashboard />
                    </AdminWrapper> 
                   : 
                   <LoginWrapper>
                     <Login />
                   </LoginWrapper> 
                   }
                </div>
              )
            )
          }}
        />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
