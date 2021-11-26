import React, { Fragment,useState } from 'react'
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import FloatingLabel from "react-bootstrap-floating-label";
const Login = ({login,isAuthenticated}) => {
    const[formData,setFormData] = useState({
        email:"",
        password:""
    });

    const{email,password}= formData;
    const onChange = e =>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = async e=>{
        e.preventDefault();
        
        login(email,password);
        
    }
    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
        <div className="reg-fg row">
            <h1 className="large text-primary lg-fg">Sign in</h1>
                <p className="lead lg-fg" style={{fontStyle:"italic",fontWeight:"revert"}} ><i className="fas fa-user"></i> Sign into Your Account</p>
                    <form className="form" onSubmit={e=> onSubmit(e)}>
                        <div className="form-floating lg-fg">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" required value={email} onChange={e=>onChange(e)}/>
                        <label for="floatingInput">Email Address</label>
                        <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                        </div>
                        <div className="form-floating lg-fg">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Your password"
                            id="floatingInput"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={e=>onChange(e)}
                        />
                        <label for="floatingInput">Password</label>
                        </div>
                        <input type="submit" className=" btn btn-primary lg-fg" value="Login" />
                    </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </div>
    )
}

Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);