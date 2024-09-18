import CommentItem from './CommentItem'
import "../app/styles/components/comments.css";

const Comments = () => {
  // This constant is only simulating a response from the API to show any quantity of comments
  const commentsContentTest = [
    {
      photoPath: '/images/comments/c1.png',
      name: 'Munachi Cheks',
      position: 'CEO Tech-x',
      comment: 'Attending the Tech Innovators Summit was a game-changer for me! The event was incredibly well-organized, with insightful speakers who are true leaders in the tech industry. I gained valuable knowledge on the latest trends and future technologies, and the networking opportunities were fantastic'
    },
    {
      photoPath: '/images/comments/c2.png',
      name: 'Munachi Cheks',
      position: 'CEO Tech-x',
      comment: 'Attending the Tech Innovators Summit was a game-changer for me! The event was incredibly well-organized, with insightful speakers who are true leaders in the tech industry. I gained valuable knowledge on the latest trends and future technologies, and the networking opportunities were fantastic'
    },
    {
      photoPath: '/images/comments/c3.png',
      name: 'Munachi Cheks',
      position: 'CEO Tech-x',
      comment: 'Attending the Tech Innovators Summit was a game-changer for me! The event was incredibly well-organized, with insightful speakers who are true leaders in the tech industry. I gained valuable knowledge on the latest trends and future technologies, and the networking opportunities were fantastic'
    }
  ];

  // If there is an even amount of comments, they align in 2 columns. If it is odd, the last comment goes centered.
  const commentsQuantityOddClass = (commentsContentTest.length % 2 === 0) ? '' : 'comments-container-odd';

  return (
    <section className="comments">
      <h2>What People are Saying</h2>
      <div className={`comments-container ${commentsQuantityOddClass}`}>
        <h4>Discover what our event facilitators and attendees are saying about their experience with the events we put out</h4>

        {commentsContentTest.map((comment, index) => {
          return (
            <CommentItem key={`comment_id_${index}`} comment={comment} />
          );
        })}

      </div>
    </section>
  );
};

export default Comments;