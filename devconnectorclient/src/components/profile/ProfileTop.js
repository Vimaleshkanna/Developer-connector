import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile:{status,company,location,website,social,user:{name,avatar}}}) => {
    return (
        <div className="col-sm-12 profile-top" style={{textAlign:"center",backgroundColor:"#17a2b8"}}>
          <img
            className="rounded-circle"
            src={avatar}
            alt=""
          />
          <h1 className="large text-white">{name}</h1>
          <p className="lead">{status} {company && <span>at {company}</span>}</p>
          <p>{location &&<span>{location}</span>}</p>
          <div className="icons my-1">
          {
              website &&(
                <a  style={{padding:"5px"}} href={website} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
            </a>
              )
          }
           {
               social && social.twitter && (
                <a  style={{padding:"5px"}} href={social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x"></i>
                </a>
               )
           } 
           {
               social && social.facebook && (
                <a  style={{padding:"5px"}} href={social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x"></i>
                </a>
               )
           }
           {
               social && social.linkedin && (
                <a style={{padding:"5px"}} href={social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
                </a>
               )
           }
           {
               social && social.youtube && (
                <a  style={{padding:"5px"}} href={social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube fa-2x"></i>
                </a>
               )
           }
           {
               social && social.instagram && (
                <a style={{padding:"5px"}} href={social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
                </a>
               )
           }
            
           
             
            
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
profile:PropTypes.object.isRequired,
}

export default ProfileTop
