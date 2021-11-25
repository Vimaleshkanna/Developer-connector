import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
const Education = ({education,deleteEducation}) => {

    const educations = education.map(edu =>(
        <tr key={edu.id} >
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment>-{' '}
                {edu.to === null ? ('NOW'):(<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=>deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ))
    return (
        <div style={{marginBottom:"5px"}}>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead className="text-white bg-secondary">
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteEducation})(Education);
