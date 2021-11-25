import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'
import { connect } from 'react-redux'
const PostForm = ({addPost}) => {

    const[text,setText]=useState('')
    return (
        <div className="post-form">
        <div className="bg-primary">
          <h3 style={{backgroundColor:"#17a2b8",color:"white"}}>Say Something...</h3>
        </div>
        <form className="form" onSubmit={e=>{
            e.preventDefault();
            addPost({text});
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
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" className="col-sm-3  btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
    addPost:PropTypes.func.isRequired
}

export default connect(null,{addPost})(PostForm);
