import "./Home.css";
import { useState } from "react";

const Home = () => {
  const apiKey = "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";
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState([]);

  const handleSubmit = async (event) => {
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
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(apiData),
      }
    );
    const data = await response.json();
    data["Prompt"] = prompt;
    setAnswer([data, ...answer]);
    setPrompt("");
  };


  return (
    <div className="home-container">
      <h1>Fun with AI</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Enter Prompt</label>
        <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder='Ask your question here' />
        <button type="submit">Submit</button>
      </form>
      <div className="responses">
        <h3>Responses</h3>
        {answer && (
          <div>
            {answer?.map((ele, index) => {
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
        )}
      </div>
    </div>
  );
};

export default Home;
