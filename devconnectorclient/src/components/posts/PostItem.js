import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike,removeLike,deletePost } from '../../actions/post';
const PostItem = ({auth,addLike,removeLike,deletePost,post:{_id,text,name,avatar,user,likes,comments,date},showActions}) => {
    return (
        <div className="card bg-light">
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
                {showActions && <div style={{padding:"10px"}}>
                    <button onClick={e=>addLike(_id)} type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-up"></i>{' '}
                  <span>{likes.length > 0 &&(
                    <span>{likes.length}</span>
                  )} </span>
                </button>
                <button onClick={e=>removeLike(_id)} type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link  to={`/posts/${_id}`} className="btn btn-primary">
                  Discussion {comments.length > 0 &&(
                    <span className='comment-count'>{comments.length}</span>
                  )} 
                </Link> &nbsp;
                {!auth.loading && user === auth.user._id &&(
                    <button onClick={e=>deletePost(_id)}     
                        type="button"
                        className="btn btn-danger">
                        <i className="fas fa-times"></i>
                    </button>
                )}
                </div>}
                
                
              </div>
            </div>
          </div>
          
        </div>
    )
}
PostItem.defaultProps={
    showActions:true
}
PostItem.propTypes = {
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    addLike:PropTypes.func.isRequired,
    removeLike:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem)
