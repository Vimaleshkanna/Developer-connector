import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
 const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
     const authLinks = (
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item "><Link id="Link" to="/profiles"><small><i className="fas fa-laptop"></i>{" "}<span >Developers</span></small></Link></li>
                <li className="nav-item "><Link id="Link" to="/posts"><small><i className="fas fa-plus-square"></i>{" "}<span >Posts</span></small></Link></li>
                <li className="nav-item "><Link id="Link" to="/dashboard"><small><i className="fas fa-user "/><span >Dashboard</span></small></Link></li>
                <li className="nav-item "><a id="Link" onClick={logout} href="#!"><small><i className="fas fa-sign-out-alt"/>{''}<span >Logout</span></small></a></li>
            </ul>
        </div>
        
     )

     const guestLinks =(
        

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav"> 
               <li className="nav-item"><Link  id="Link" to="/profiles" ><i className="fas fa-laptop"></i>{" "}<span className="hide-sm">Developers</span></Link></li>
               <li className="nav-item"><a   id="Link" href="/register"><i className="fas fa-address-book"></i>{" "}<span className="hide-sm">Register</span></a></li>
               <li className="nav-item"><a  id="Link" href="/login"><i className="fas fa-sign-in-alt"></i>{" "}<span className="hide-sm">Login</span></a></li>
            </ul>
        </div>
            
        
            
        
        
     )
    return (
        <Fragment>
                        <nav className="navbar navbar-expand-lg  bg-dark" >
                            <div className="container">
                                
                                    <h1>
                                        <a id="Link" href="/"  ><i className="fas fa-code"></i> DevConnector</a>
                                    </h1>
                                    <button style={{backgroundColor:"white"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="fa-solid fa-ellipsis-stroke"></span>
                                    </button>
                            </div>
                            
                            
                            {!loading && <Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>}
                             
                        </nav>
          
        </Fragment>
        
    )
}

Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{logout})(Navbar);
