import { useQuiz } from "../context/QuizProvider"

export default function StartScreen() {
  const {numOfQuerstions, startQuiz} = useQuiz()
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numOfQuerstions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={startQuiz}>Let's Start</button>
    </div>
  )
}
