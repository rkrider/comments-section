import { useState, useRef, useEffect } from "react";
import Action from "../Action";
import "./styles.css";
import deleteIcon from "../../assets/bin.png";
import CommentInput from "./CommentInput";

const Comments = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, name, commentText);
      setShowInput(false);
      setName("");
      setCommentText("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <span>Comment</span>
            <section className="main_comment">
            <CommentInput
                name={name}
                setName={setName}
                commentText={commentText}
                setCommentText={setCommentText}
                onAddComment={onAddComment}
              />
            </section>
          </>
        ) : (
          <section className="reply_card">
            <h4
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </h4>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
            >
              {comment.comment}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="Save"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.commentText;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type="Reply"
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="edit"
                    type="Edit"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="delete"
                    type={<img src={deleteIcon} alt="delete icon" />}
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </section>
        )}
      </div>

      <div
        style={{
          display: expand ? "block" : "none",
          paddingLeft: 25,
          marginTop: 8,
        }}
      >
        {showInput && (
          <div className="replyInputContainer">
            <h5>Reply</h5>
            <div className="replyInputContainer_form">
              
            <input
              type="text"
              autoFocus
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              />
            <input
              type="text"
              autoFocus
              placeholder="Comment"
              onChange={(e) => setCommentText(e.target.value)}
              />
            <Action
              className="comment"
              type="POST"
              handleClick={onAddComment}
              />
              </div>
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comments
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comments;
