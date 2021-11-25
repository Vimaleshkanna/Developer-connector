import React, { Fragment,useState } from 'react'
import { Link ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import FloatingLabel from "react-bootstrap-floating-label";
import PropTypes from 'prop-types';
const Register = ({setAlert,register,isAuthenticated}) => {//normaly wihin brace we pass props but we destructure here and used in line no 20
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });

    const{name,email,password,password2}= formData;
    const onChange = e =>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit = async e=>{
        e.preventDefault();
        if(password !==password2){
            setAlert("Passwords do not match","danger")
        }else{
            register({name,email,password})
        }
    }

    //Redirect if signed in
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return (
        <div className="reg-fg row">
            <h1 className="large text-primary reg-fg">Sign Up</h1>
                <p className="lead reg-fg" style={{fontStyle:"italic",fontWeight:"revert"}}><i className="fas fa-user"></i> Create Your Account</p>
                    <form className="form" onSubmit={e=> onSubmit(e)}>
                        <div className="form-floating reg-fg" >
                        <input className="form-control" id="floatingInput" placeholder="Name" type="text"  name="name"  value={name} onChange={e=>onChange(e)}  />
                        <label for="floatingInput">UserName</label>
                        </div>
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
                        <div className="form-floating reg-fg">
                        <input className="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            id="floatingInput"
                            value={password2}
                            onChange={e=>onChange(e)}
                            
                        />
                        <label for="floatingInput">Confirm Password</label>
                        </div>
                        <input type="submit" className="btn btn-primary reg-fg" value="Register" />
                    </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </div>
    )
}

Register.propTypes={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{setAlert,register})(Register);