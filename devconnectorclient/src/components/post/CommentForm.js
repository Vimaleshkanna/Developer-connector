import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post';

const CommentForm = ({addComment,postId}) => {
    const [text ,setText]=useState("");

    return (
        <div className="post-form">
        <div className="bg-primary p" >
          <h3 style={{backgroundColor:"#17a2b8",color:"white"}}>Leave a comment...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addComment(postId,{text});
            setText("");
        }}>
          <textarea
          style={{width:"100%"}}
          className="col-sm-12"
          value={text}
          onChange={e=>setText(e.target.value)}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a comment"
            required
          ></textarea>
          <input type="submit" className="col-sm-3 btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
    
}

CommentForm.propTypes = {
addComment:PropTypes.func.isRequired,
}

export default connect(null,{addComment})(CommentForm);
