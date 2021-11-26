import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const ProfileItem = ({profile:{user:{_id,name,avatar},status,company,location,skills}}) => {
    return (
        <div className="card bg-light">
           <div className="contaier">
               <div className="row" >
                   <div className="col-sm-12 col-md-4">
                   <center>
                   <img src={avatar} alt="" className="rounded-circle" />
                   </center>
                   </div>
                   <div className="col-sm-12 col-md-4">
                   <center>
                   <div className="card-body">
                        <h2 className="card-title">{name}</h2>
                        <p className="card-text">{status} {company && <span> at {company}</span>}</p>
                        <p className="card-text my-1">{location &&<span>{location}</span>}</p>
                        <Link to={`/profile/${_id}`} className="btn btn-primary"> View Profile</Link>
                    </div>
                   </center>
                   
                   </div>
                   <div className="col-sm-12 col-md-4">
                        <ul className="card-body">
                        {skills.slice(0,4).map((skill,index)=>(
                            <li key={index} className="text-primary"><i className="fas fa-check"></i>{skill}</li> 
                            
                        ))}
                        </ul>
                   </div>
               </div>
           </div>
            
            
            
        </div>
    )
}

ProfileItem.propTypes = {
profile:PropTypes.object.isRequired,
}

export default ProfileItem
