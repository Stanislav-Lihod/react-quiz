import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuerstionButton from "./NextQuerstionButton";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import FinishScreen from "./FinishScreen";
import { useQuiz } from "../context/QuizProvider";

function App() {
  const {status} = useQuiz()

  return (
    <div className='app'>
      <Header/>
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen/>}
        {status === 'start' && (
          <>
            <ProgressBar/>
            <Question/>
            <Timer/>
            <NextQuerstionButton/>
          </>
        )}
        {status === 'finish' && <FinishScreen/>}
      </Main>

    </div>
  );
}

export default App;
