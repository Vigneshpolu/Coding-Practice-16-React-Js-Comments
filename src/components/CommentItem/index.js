// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {
    id,
    nameInput,
    commentInput,
    date,
    isLiked,
    initialClassName,
  } = commentDetails
  const initial = nameInput ? nameInput[0].toUpperCase() : ''
  const time = formatDistanceToNow(date)
  const likeButtonClassName = isLiked ? 'button active' : 'button'
  const imageLikedUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onClickDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{nameInput}</p>
            <p className="time">{time}</p>
          </div>
          <p className="comment">{commentInput}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={imageLikedUrl} alt="like" className="like-image" />
          <button
            type="button"
            className={likeButtonClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>

        <button
          type="button"
          className="button"
          onClick={onClickDeleteComment}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
