import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemains:null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "failed" };
    case "start":
      return { ...state, status: "active", secondsRemains: state.questions.length * 30 };
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      return {
        ...state, answer: action.payload,
        points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state, status:"finish",
        highscore: state.points > state.highscore ? state.points : state.highscore
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready", highscore: state.highscore };
    case "timeCountdown":
      return {
        ...state, secondsRemains: state.secondsRemains - 1,
        status: state.secondsRemains === 0 ? "finish" : state.status,
        highscore: state.points > state.highscore ? state.points : state.highscore
      };
    default:
      throw new Element("Error");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore, secondsRemains } = state;
  const numOfQuestion = questions.length;
  const totalPoint = questions.map((question) => question.points).reduce((acc, curr) => acc + curr, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && <StartScreen numOfQuestion={numOfQuestion} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress index={index} totalQuestion={numOfQuestion} points={state.points} totalPoint={totalPoint} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemains={secondsRemains} questions={questions} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numOfQuestion={numOfQuestion} />
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen points={points} totalPoint={totalPoint} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}
export default App;