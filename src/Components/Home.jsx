import React, { useEffect, useState } from 'react';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=029783abd5b946c28064018a0e39c0f1");
        const data = await res.json();
        setArticles(data.articles);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();

    // Chatbase embed script injection
    const chatbaseInit = () => {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };

        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "Xv1EOiGc6tQ4yVLQ5Lqyu";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      chatbaseInit();
    } else {
      window.addEventListener("load", chatbaseInit);
    }
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {articles.map((article, index) => (
            <div key={index} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={article.urlToImage || 'https://dummyimage.com/720x400'}
                  alt="news"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {article.source.name}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {article.title}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    {article.description || 'No description available.'}
                  </p>
                  <div className="flex items-center flex-wrap">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
