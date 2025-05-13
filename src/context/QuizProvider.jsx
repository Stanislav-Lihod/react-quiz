import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext()

const initialState = {
  questions: [],
  status: 'loading',
  step: 0,
  currentAnswer: null,
  points: 0,
  highscore: 0,
  timer: 300,
  numOfQuerstions: 0,
  maxPossiblePoints:0,
}

const reducer = function(state, action){
  switch(action.type){
    case 'setState': 
      const numOfQuerstions = action.payload.length
      const maxPossiblePoints = action.payload.reduce((prev, cur) => prev + cur.points, 0);

      return {
        ...state,
        questions: action.payload,
        numOfQuerstions,
        maxPossiblePoints,
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
      return {
        ...initialState,
        questions: state.questions,
        status: 'start',
        highscore: state.highscore,
        numOfQuerstions: state.numOfQuerstions,
        maxPossiblePoints: state.maxPossiblePoints
      }
    case 'tick':
      return {...state, timer: state.timer - 1, status: state.timer === 0 ? 'finish' : state.status}
    default:
      return state
  }
}

function QuizProvider({children}){
  const [{questions, question, status, step, currentAnswer, points, highscore, timer, numOfQuerstions, maxPossiblePoints}, dispatch] = useReducer(reducer, initialState)

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

  function startQuiz(){
    dispatch({type: 'startQuiz'})
  }

  function setAnswer(index){
    dispatch({type: 'setAnswer', payload: index})
  }

  function setTick(){
    dispatch({type: 'tick'})
  }

  function restartQuiz(){
    dispatch({type: 'restartQuiz'})
  }

  function nextStep(){    
    dispatch({type: 'nextStep'})
  }

  function finishQuiz(){
    dispatch({type: 'finishQuiz'})
  }

  return <QuizContext.Provider value={{
    questions,
    question,
    status,
    step,
    currentAnswer,
    points,
    highscore,
    timer,
    numOfQuerstions,
    maxPossiblePoints,
    startQuiz,
    setAnswer,
    setTick,
    restartQuiz,
    nextStep,
    finishQuiz
  }}>{children}</QuizContext.Provider>
}

function useQuiz(){
  return useContext(QuizContext)
}

export {QuizProvider, useQuiz}