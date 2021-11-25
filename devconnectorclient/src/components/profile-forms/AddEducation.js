import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';
const AddEducation = ({addEducation,history}) => {

    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:'',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school,degree,fieldofstudy,from,to,current,description}=formData;

    const onChange= e=>setFormData({...formData,[e.target.name]:e.target.value});
    return (
        <Fragment>
            <h1 className="large text-head">
            Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school/bootcamp that you have attended
            </p>
            <small className="text-danger">* = required field</small>
            <form className="form" onSubmit={e=>{
                e.preventDefault();
                addEducation(formData,history)
            }}>
                <div className="form-floating ae-fg">
                <input className="form-control" id="floatingInput" type="text" placeholder="* school or bootcamp" name="school" value={school} onChange={(e)=>onChange(e)} required />
                <label for="floatingInput">* school or bootcamp </label>
                </div>
                <div className="form-floating ae-fg">
                <input className="form-control" id="floatingInput" type="text" placeholder="* degree or certificate" name="degree" value={degree} onChange={(e)=>onChange(e)} required />
                <label for="floatingInput">* degree or certificate </label>
                </div>
                <div className="form-floating ae-fg">
                <input className="form-control" id="floatingInput" type="text" placeholder="fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange={(e)=>onChange(e)}/>
                <label for="floatingInput">fieldofstudy </label>
                </div>
                <div className="ae-fg">
                <h4>From Date</h4>
                <input className="form-control" id="floatingInput" type="date" name="from" value={from} onChange={(e)=>onChange(e)}/>
                </div>
                <div style={{padding:"10px"}}>
                <p><input type="checkbox" name="current" value={current} checked={current} onChange={(e)=>{setFormData({...formData,current:!current}); toggleDisabled(!toDateDisabled)}} />{''} Current School</p>
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
                    placeholder="program Description"
                    value={description} onChange={(e)=>onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="/dashboard">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(withRouter(AddEducation));
