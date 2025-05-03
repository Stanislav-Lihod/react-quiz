export default function ProgressBar({step, numOfQuerstions, points, maxPossiblePoints, currentAnswer}) {
  return (
    <div className="progress">
      <progress max={numOfQuerstions} value={step + Number(currentAnswer !== null)}></progress>
      <p>Question {step + 1}/{numOfQuerstions}</p>
      <p>{points}/{maxPossiblePoints}</p>
    </div>
  )
}
