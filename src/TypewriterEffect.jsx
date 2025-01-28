import {useEffect, useRef, useState} from "react";

const TypewriterEffect = () => {
    const [typedSentence, setTypedSentence] = useState('');
    const intervalId = useRef();
    const savedCallback = useRef();

    const startTyping = (sentence) => {
        setTypedSentence("");
        intervalId.current = setInterval(() => {
            savedCallback.current(sentence);
        }, 500);
    };

    const stopTyping = () => {
        clearInterval(intervalId.current);
        intervalId.current = null;
    }

    const typedNextLetter = (sentence) => {
        const letters = Array.from(sentence);
        if (typedSentence.length === letters.length) {
            stopTyping();
            return;
        }
         const nextLetterIdx = typedSentence.length;
        setTypedSentence(typedSentence + letters[nextLetterIdx]);
    }

    useEffect(() => {
        savedCallback.current = typedNextLetter;
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // TODO Display the text with typewriter effect
    startTyping(data.get("sentence"));
    console.log(`The sentence to display is ${data.get("sentence")}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="sentence"
          placeholder="Type a sentence"
          style={{ width: "300px" }}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>
        {typedSentence && <p>You typed {typedSentence}</p>}
    </div>
  );
};

export default TypewriterEffect;
