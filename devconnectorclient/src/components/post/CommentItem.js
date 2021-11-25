import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'


const CommentItem = ({postId,deleteComment,auth,comment:{_id,text,name,avatar,user,date}}) => {
    return (
        <div className="card bg-light p-1 my-1">
          <div className="container">
            <div className="row">
              <div  className="col-sm-12 col-md-6">
                <Link style={{textDecoration:"none"}} to={`/profile/${user}`}>
                    <img
                      className="rounded-circle"
                      src={avatar}
                      alt=""
                    />
                    <h4 className="postcard">{name}</h4>
                </Link>
              </div>

              <div className="col-sm-12 col-md-6">
                <p className="my-1" style={{padding:"10px"}}>
                  {text}
                </p>
                <p className="post-date" style={{padding:"10px"}}>
                  Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {
                    !auth.loading && user === auth.user._id && (
                        <button onClick={e=> deleteComment(postId,_id)} type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>
                    )
                }
              </div>
            </div>
            
          </div>
        
      </div>
    )
}

CommentItem.propTypes = {
postId:PropTypes.number.isRequired,
comment:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
deleteComment:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{deleteComment})(CommentItem);
