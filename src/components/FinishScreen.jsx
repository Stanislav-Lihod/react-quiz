export default function FinishScreen({points, maxPossiblePoints, highscore, dispatch}) {
  const percent = ((points / maxPossiblePoints) * 100).toFixed(2)

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints} ({percent} %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={()=>dispatch({type: 'restartQuiz'})}>Restart Quiz</button>
    </>
  )
}
