import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentList: [],
  }

  deleteComment = id => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== id),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  renderCommentList = () => {
    const {commentList} = this.state

    return commentList.map(eachItem => (
      <CommentItem
        commentDetails={eachItem}
        key={eachItem.id}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      nameInput,
      commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technology
              </p>
              <input
                type="text"
                value={nameInput}
                className="name-input"
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
              />
              <br />
              <textarea
                type="text"
                rows="6"
                value={commentInput}
                className="comment-input"
                placeholder="Your Comment"
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
              <br />
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className='className="image"'
            />
          </div>
          <hr className="line" />
          <p>
            <span className="comments-count">{commentList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
