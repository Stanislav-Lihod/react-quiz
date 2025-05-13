import { useQuiz } from "../context/QuizProvider"

export default function FinishScreen() {
  const {points, maxPossiblePoints, highscore, restartQuiz} = useQuiz()
  const percent = ((points / maxPossiblePoints) * 100).toFixed(2)

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints} ({percent} %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={restartQuiz}>Restart Quiz</button>
    </>
  )
}
