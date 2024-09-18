import "../app/styles/components/commentItem.css";

const CommentItem = ({comment}) => {

  return (

    <div className="comment">
      <div className="photo" style={{ backgroundImage: `url(${comment.photoPath})` }}>
      </div>
      <div className="text">
        <label>{comment.name}</label>
        <span>{comment.position}</span>
        <p>"{comment.comment}"</p>
      </div>
    </div>

  );
};

export default CommentItem;