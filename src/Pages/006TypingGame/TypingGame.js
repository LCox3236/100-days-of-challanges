import React, { useState, useEffect } from "react";
import "./TypingGame.css";
export default function TypingGame() {
  const [text, setText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [lastLetter, setLastLetter] = useState("");
  const [words, setWords] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(undefined);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [allTexts, setAllTexts] = useState(() => {
    return [
      `You never read a book on psychology, Tippy. You didn\'t need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
      `I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
      `A spider's body consists of two main parts: an anterior portion, the prosoma (or cephalothorax), and a posterior part, the opisthosoma (or abdomen).`,
      `As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.`,
      `Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
      `I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`,
    ];
  });

  function setUp() {
    let t = allTexts[Math.floor(Math.random() * allTexts.length)];
    let w = t.split(" ");
    setText(t);
    setWords(w);
    setCompletedWords([]);
    setStarted(true);
  }

  function endProcess() {
    setStarted(false);
    setCompleted(true);
  }
  function handleInputChange(e) {
    const inValue = e.target.value;
    const lLetter = inValue[inValue.length - 1];
    const currentWord = words[0];

    //If space or '.' pressed, check word;
    if (lLetter === "." || lLetter === " ") {
      if (inValue.trim() === currentWord) {
        const newWords = [...words.slice(1)];
        const newCompletedWords = [...completedWords, currentWord];

        setProgress(
          (newCompletedWords.length /
            (newWords.length + newCompletedWords.length)) *
            100
        );
        setWords(newWords);
        setCompletedWords(newCompletedWords);
        setInputValue("");
        setCompleted(newWords.length === 0);
      }
    } else {
      setInputValue(inValue);
      setLastLetter(lLetter);
    }
    calculateWPM();
  }

  function calculateWPM() {
    const now = Date.now;
    const diff = (now - startTime) / 1000 / 60;
    // every word is considered to have 5 letters
    // so here we are getting all the letters in the words and divide them by 5
    // "my" shouldn't be counted as same as "deinstitutionalization"
    const wordsTyped = Math.ceil(
      completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
    );

    // calculating the wpm
    const wpmCalc = Math.ceil(wordsTyped / diff);

    setWpm(wpmCalc);
    setTimeElapsed(diff);
  }

  useEffect(() => {
    console.log(text);
    console.log(words);
  }, [words]);

  return (
    <div className="type-game-container">
      {started ? (
        <>
          <div className="wpm">
            <strong>WPM: </strong>
            {wpm}
            <br />
            <strong>Time: </strong>
            {Math.floor(timeElapsed * 60)}s
          </div>
          <div className="game-container">
            <progress value={progress} max="100"></progress>
            <p className="text">
              {text.split(" ").map((word, wordIndex) => {
                let highlighted = false;
                let currentWord = false;

                if (completedWords.length > wordIndex) {
                  highlighted = true;
                }

                if (completedWords.length === wordIndex) {
                  currentWord = true;
                }
                return (
                  <span
                    className={`word ${highlighted && "green"} ${
                      currentWord && "underline"
                    }`}
                    key={wordIndex}
                  >
                    {word.split(" ").map((letter, letterIndex) => {
                      const isCurrentWord = wordIndex === completedWords.length;
                      const isWronglyTyped = letter !== inputValue[letterIndex];
                      const shouldBeHighlighted =
                        letterIndex < inputValue.length;

                      return (
                        <span
                          className={`letter ${
                            isCurrentWord && shouldBeHighlighted
                              ? isWronglyTyped
                                ? "red"
                                : "green"
                              : ""
                          }`}
                          key={letterIndex}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </p>
            <input
              type="text"
              onChange={handleInputChange}
              value={inputValue}
              autofocus={started ? "true" : "false"}
            />
            <button id="end-button" onClick={endProcess}>
              end
            </button>
          </div>
        </>
      ) : completed ? (
        <div>completed</div>
      ) : (
        <div>
          <h2>TypingGame</h2>
          <p>
            <strong>Rules:</strong> <br />
            Type in the input field the highlighted word. <br />
            The correct words will turn <span className="green">green</span>.
            <br />
            Incorrect letters will turn <span className="red">red</span>.
            <br />
          </p>
          <button className="start-btn" onClick={setUp}>
            Start game
          </button>
        </div>
      )}
    </div>
  );
}
