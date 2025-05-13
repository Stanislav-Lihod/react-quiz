import { useQuiz } from "../context/QuizProvider"

export default function ProgressBar() {
  const {step, numOfQuerstions, points, maxPossiblePoints, currentAnswer} = useQuiz()
  return (
    <div className="progress">
      <progress max={numOfQuerstions} value={step + Number(currentAnswer !== null)}></progress>
      <p>Question {step + 1}/{numOfQuerstions}</p>
      <p>{points}/{maxPossiblePoints}</p>
    </div>
  )
}
