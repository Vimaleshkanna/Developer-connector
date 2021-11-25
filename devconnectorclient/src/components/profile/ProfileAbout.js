import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile:{bio,skills,user:{name}}}) => {
    return (
        <div className="col-sm-12 bg-light profile-about" style={{textAlign:"center"}}>
        {
            bio && (<Fragment>
                <h2 className="text-head">{name.trim().split(' ')[0]}'s Bio</h2>
                <p>
                    {bio}
                </p>
          <div className="line"></div>
            </Fragment>)
        }
          
          <h2 className="text-head">Skill Set</h2>
          <div className="skills">
            {skills.map((skill,index)=>(
                <div key={index} className="p-1">
                    <i className="fas fa-check">{skill}</i>
                </div>
            ))}
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
profile:PropTypes.object.isRequired,
}

export default ProfileAbout
