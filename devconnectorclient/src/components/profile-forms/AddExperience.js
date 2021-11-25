import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';
const AddExperience = ({addExperience,history}) => {

    const [formData,setFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:'',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {company,title,location,from,to,current,description}=formData;

    const onChange= e=>setFormData({...formData,[e.target.name]:e.target.value});
    return (
        <div className="row">
            <h1 className="large text-head">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small className="text-danger">* = required field</small>
            <form className="form" onSubmit={e=>{
                e.preventDefault();
                addExperience(formData,history)
            }}>
                <div className="form-floating ae-fg">
                <input className="form-control" id="floatingInput" type="text" placeholder="* Job Title" name="title" value={title} onChange={(e)=>onChange(e)} required />
                <label for="floatingInput">* Job Title</label>
                </div>
                <div className="form-floating ae-fg">
                <input className="form-control" id="floatingInput" type="text" placeholder="* Company" name="company" value={company} onChange={(e)=>onChange(e)} required />
                <label for="floatingInput">* Company </label>
                </div>
                <div className="form-floating ae-fg">
                <input className="form-control" id="floatingInput" type="text" placeholder="Location" name="location" value={location} onChange={(e)=>onChange(e)}/>
                <label for="floatingInput">Location</label>
                </div>
                <div className="ae-fg">
                <h4>From Date</h4>
                <input className="form-control" id="floatingInput" type="date" name="from" value={from} onChange={(e)=>onChange(e)}/>
                
                </div>
                <div style={{padding:"10px"}}>
                <p><input type="checkbox" name="current" value={current} checked={current} onChange={(e)=>{setFormData({...formData,current:!current}); toggleDisabled(!toDateDisabled)}} />{''} Current Job</p>
                
                </div>
                <div className="ae-fg">
                <h4>To Date</h4>
                <input className="form-control" id="floatingInput" type="date" name="to" value={to} onChange={(e)=>onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="ae-fg">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description} onChange={(e)=>onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary" style={{padding:"10px"}} />
                <a className="btn btn-light my-1" href="/dashboard">Go Back</a>
            </form>
        </div>
    )
}

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired,
}

export default connect(null,{addExperience})(withRouter(AddExperience));
