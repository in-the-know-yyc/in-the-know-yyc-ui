import Image from "next/image";
import "../app/styles/components/community.css";

const Community = () => {

  return (
    <section className="community">
      <div>
        <h2>Join Our Community</h2>
        <p>Sign-Up now to create your own event and be part of a global event network.</p>
        <ul>
          <li>
            <Image src={`/images/icons/check-black.svg`} width={15} height={13} alt="Easy registration" />
            Easy registration
          </li>
          <li>
            <Image src={`/images/icons/check-black.svg`} width={15} height={13} alt="Global Access" />
            Global Access
          </li>
          <li>
            <Image src={`/images/icons/check-black.svg`} width={15} height={13} alt="User-Friendly Tools" />
            User-Friendly Tools
          </li>
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