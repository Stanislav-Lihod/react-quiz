import { useEffect, useReducer } from "react";
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

const initialState = {
  questions: [],
  status: 'loading',
  step: 0,
  currentAnswer: null,
  points: 0,
  highscore: 0,
  timer: 300
}

const reducer = function(state, action){
  switch(action.type){
    case 'setState': 
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    case 'fetchFailed': 
      return {...state,status: 'error'};
    case 'startQuiz':
      return {...state, status: 'start'}
    case 'setAnswer':
      const currentQuestion = state.questions[state.step]
      const correctAnswer = currentQuestion.correctOption
      const pointsForCorrect = currentQuestion.points

      return {
        ...state, 
        currentAnswer: action.payload, 
        points: action.payload === correctAnswer ? state.points + pointsForCorrect : state.points
      }
    case 'nextStep':
      return {...state, currentAnswer: null, step: state.step + 1}
    case 'finishQuiz':
      return {...state, status: 'finish', highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'restartQuiz':
      return {...initialState, questions: state.questions, status: 'start', highscore: state.highscore}
    case 'tick':
      return {...state, timer: state.timer - 1, status: state.timer === 0 ? 'finish' : state.status}
    default:
      return state
  }
}

function App() {
  const [{questions, status, step, currentAnswer, points, highscore, timer}, dispatch] = useReducer(reducer, initialState)

  const numOfQuerstions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(()=>{
    const fetchData = async function(){
      try {
        const res = await fetch('http://localhost:3005/questions')
        const data = await res.json()

        dispatch({type: 'setState', payload: data})
      } catch (error) {
        dispatch({type:'fetchFailed'})
      }
    }

    fetchData()
  }, [])
  

  return (
    <div className='app'>
      <Header/>
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen dispatch={dispatch} numOfQuerstions={numOfQuerstions}/>}
        {status === 'start' && (
          <>
            <ProgressBar step={step} numOfQuerstions={numOfQuerstions} points={points} maxPossiblePoints={maxPossiblePoints} currentAnswer={currentAnswer}/>
            <Question question={questions[step]} dispatch={dispatch} currentAnswer={currentAnswer}/>
            <Timer timer={timer} dispatch={dispatch}/>
            <NextQuerstionButton dispatch={dispatch} currentAnswer={currentAnswer} step={step} numOfQuerstions={numOfQuerstions}/>
          </>
        )}
        {status === 'finish' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>

    </div>
  );
}

export default App;
