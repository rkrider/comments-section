import Action from "../../Action";

const CommentInput = ({ name, setName, commentText, setCommentText, onAddComment }) => {
    return (
      <>
        <input
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          required
        />
        <input
          type="text"
          autoFocus
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Comment..."
          required
        />
        <Action
          className="reply comment"
          type="POST"
          handleClick={onAddComment}
        />
      </>
    );
  };

export default CommentInput;