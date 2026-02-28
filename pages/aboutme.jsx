import Head from "next/head";
import { useEffect, useState } from "react";

export default function AboutMe() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("/quotes.txt")
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").filter(Boolean);
        const formatted = lines.map((line) => {
          const [quote, author] = line.split("|");
          return {
            quote: quote.trim(),
            author: author?.trim(),
          };
        });
        setQuotes(formatted);
      });
  }, []);

  return (
    <>
      <Head>
        <title>About Me | Lakshya Badjatya</title>
        <meta
          name="description"
          content="Lakshya Badjatya is a Class 12 PCM student from Kota, India, aspiring to study Computer Science internationally starting Fall 2027. View his journey, projects, and goals."
        />
      </Head>

      <main className="wrap">

        {/* HERO */}
        <section className="hero">
          <h1 className="theme-gradient-text">About Me</h1>
          <p className="tag">Lakshya Badjatya</p>
          <p className="tag">
            Class 12 PCM Student • Future CS Undergraduate • Aspiring Founder
          </p>
        </section>

        {/* INTRO */}
        <section className="intro">
          <p>
            I’m a Class 12 student from Kota, India building my journey toward
            studying Computer Science abroad. I focus on learning by building real
            projects, improving daily, and preparing to create impactful technology
            in the future.
          </p>
        </section>

        {/* CARDS */}
        <section className="grid">

          <div className="card">
            <h3>🚀 My Journey</h3>
            <p>
              My interest in technology began during COVID when I got my first
              computer. Curiosity quickly turned into passion for understanding
              software, building websites, and learning how digital products work.
            </p>
          </div>

          <div className="card">
            <h3>💻 Projects & Skills</h3>
            <p>
              I enjoy turning ideas into working systems. One early project was
              building a Flappy Bird-style game where I learned programming logic
              and debugging. Currently I’m learning Python and improving through
              hands-on projects.
            </p>
          </div>

          <div className="card">
            <h3>🎓 Academic Focus</h3>
            <p>
              I study Physics, Chemistry, and Mathematics and am preparing for
              IELTS. My goal is to study Computer Science abroad and gain strong
              hands-on training, research exposure, and real-world experience.
            </p>
          </div>

          <div className="card">
            <h3>🎯 Future Vision</h3>
            <p>
              My long-term ambition is to build a technology startup and create
              digital products that solve real-world problems and reach many users.
            </p>
          </div>

          <div className="card wide">
            <h3>🧠 Personal Side</h3>
            <p>
              Outside academics and coding, I play badminton to stay disciplined
              and balanced. I’m naturally introverted, which helps me focus deeply
              on learning and building. I dedicate 2–3 hours daily to improving my
              skills and progressing toward long-term goals.
            </p>
          </div>

          {/* QUOTES SECTION */}
          <div className="quotes wide">
            <h3>✨ Personal Favorite Quotes</h3>

            {quotes.map((item, index) => (
              <div key={index} className="quote-item">
                “{item.quote}”
                <span>— {item.author}</span>
              </div>
            ))}

          </div>

        </section>

      </main>

      <style jsx>{`

        .wrap{
          max-width:1100px;
          margin:80px auto;
          padding:20px;
        }

        .hero{
          text-align:center;
          margin-bottom:30px;
        }

        .hero h1{
          font-size:60px;
        }

        .tag{
          opacity:.7;
          margin-top:6px;
        }

        .intro{
          max-width:720px;
          margin:0 auto 50px;
          text-align:center;
          opacity:.85;
          font-size:17px;
          line-height:1.7;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
          gap:22px;
        }

        .card{
          padding:26px;
          border-radius:18px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          backdrop-filter:blur(10px);
          transition:.3s;
        }

        .card:hover{
          transform:translateY(-6px);
          border-color:var(--primary);
        }

        .card h3{
          margin-bottom:10px;
        }

        .wide{
          grid-column:1/-1;
        }

        .quotes{
          padding:35px;
          border-radius:18px;
          background:linear-gradient(
            120deg,
            rgba(0,0,0,0.35),
            rgba(0,0,0,0.15)
          );
          border:1px solid rgba(255,255,255,0.12);
          backdrop-filter:blur(12px);
          text-align:center;
        }

        .quotes h3{
          margin-bottom:25px;
          font-size:22px;
          opacity:.9;
        }

        .quote-item{
          font-style:italic;
          font-size:18px;
          margin-bottom:22px;
          line-height:1.7;
        }

        .quote-item span{
          display:block;
          margin-top:8px;
          font-style:normal;
          font-size:15px;
          opacity:.6;
        }

        @media(max-width:700px){
          .hero h1{
            font-size:42px;
          }
        }

      `}</style>

    </>
  );
}