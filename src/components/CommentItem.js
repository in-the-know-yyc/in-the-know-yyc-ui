import Image from "next/image";
import "../app/styles/components/commentItem.css";

const CommentItem = ({ comment, id }) => {
  return (
    <div className={`comment`} id={id}>
      <div className="photo">
        <Image src={comment.photoPath} alt='User profile picture' width={114} height={114} />
      </div>
      <div className="text">
        <label>{comment.name}</label>
        <span>{comment.position}</span>
        <p>&quot;{comment.comment}&quot;</p>
      </div>
    </div>

  );
};

export default CommentItem;