import Image from "next/image";
import "../app/styles/components/community.css";

const Community = () => {

  return (
    <section className="community">
      <div>
        <h2>Join Our Community</h2>
        <p>Sign-Up now to create your own event and be part of a global event network.</p>
        <ul>
          <li>Easy registration</li>
          <li>Global Access</li>
          <li>User-Friendly Tools</li>
        </ul>
        <button>Get Started</button>
      </div>
      <div>
        <Image src={`/images/community.png`} width={687} height={511} alt="Join Our Community | In The Know YYC" />
      </div>
    </section>
  );
};

export default Community;