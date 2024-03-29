import React from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 const Landing = ({isAuthenticated}) => {
     if(isAuthenticated){
         return <Redirect to="/dashboard"/>
     }
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">Developer Connector</h1>
                <p className="lead">
                    Create a developer profile/portfolio, share posts and get help from
                    other developers
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-lg btn-primary">Sign Up</Link> &nbsp;
                    <Link to="/login" className="btn btn-lg btn-success">Login</Link>
                </div>
                </div>
            </div>
    </div>
    )
}
Landing.propTypes={
    isAuthenticated:PropTypes.bool,
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);
