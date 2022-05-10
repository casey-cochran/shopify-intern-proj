import "./Home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState(() => {
    const saved = localStorage.getItem("answer")
    const val = JSON.parse(saved)
    return val || []
  });


  const handleSubmit = async (event) => {
    if(!prompt) return;
    event.preventDefault();

    const apiData = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const response = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
        body: JSON.stringify(apiData),
      }
    );
    const data = await response.json();
    data["Prompt"] = prompt;
    setAnswer([data, ...answer]);
    setPrompt("");
  };

  const clearStorage = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAnswer([]);
  }

  useEffect(() => {
    localStorage.setItem("answer", JSON.stringify(answer))
  }, [answer])

  return (
    <div className="home-container">
      <h1>Fun with AI</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Enter Prompt</label>
        <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder='Ask your question here' />
        <div className="btn-cont">
        <button onClick={clearStorage}>Clear Results</button>
        <button type="submit">Submit</button>
        </div>
      </form>
      <div className="responses">
        <h3>Responses</h3>
          <div>
            {answer?.length > 0 && answer?.map((ele, index) => {
              return (
                <div className="response-cont" key={index}>
                  <div className="res-cont">
                    <h5>Prompt:</h5>
                    <p className="user-prompt">{ele.Prompt}</p>
                  </div>
                  <div className="res-cont">
                    <h5>Response: </h5>
                    <p>{ele.choices[0].text}</p>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
};

export default Home;
