import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProtectedRoute extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    isAuthenticated() {
        const  { auth } = this.props;
        return auth && auth.isAuthenticated;
    }

    render() {
       const {component: Component, ...rest} = this.props;

       return (
           <Route {...rest} render={props => (
               this.isAuthenticated() ? ( 
                 <Component {...props}/>
           ) : (
            <Redirect to={{
                pathname: '/login', 
                state: {from: props.location }
            }}/>
           )
         )}/>
       );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProtectedRoute);
