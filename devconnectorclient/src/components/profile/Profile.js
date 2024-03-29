import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({getProfileById, profile:{profile,loading},auth,match}) => {
    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById,match.params.id])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner/> : <Fragment>
                <Link to="/profiles" className="btn btn-light">Back To profiles</Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                 (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}

                 <div className="row">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <div className="col-sm-12 col-md-6 bg-white profile-exp">
                        <h2 className="text-head">Experience</h2>
                        {profile.experience.length>0 ? (
                            <Fragment>
                                {profile.experience.map(experience =>(
                                    <ProfileExperience key={experience._id} experience={experience}/>
                                ))}
                            </Fragment>
                        ):(<h4>No experience Credentials</h4>)}
                    </div>
                    <div className="col-sm-12 col-md-6 bg-white profile-edu">
                        <h2 className="text-head">Education</h2>
                        {profile.education.length>0 ? (
                            <Fragment>
                                {profile.education.map(education =>(
                                    <ProfileEducation key={education._id} education={education}/>
                                ))}
                            </Fragment>
                        ):(<h4>No education Credentials</h4>)}
                    </div>
                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername}/>
                    )}
                 </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToProps,{getProfileById})(Profile);
