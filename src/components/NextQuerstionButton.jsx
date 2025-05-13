import { useQuiz } from "../context/QuizProvider"

export default function NextQuerstionButton() {
  const {nextStep, finishQuiz, currentAnswer, step, numOfQuerstions} = useQuiz()
  
  if (currentAnswer === null) return

  if (step < numOfQuerstions - 1) {
    return (
      <button className="btn btn-ui" onClick={nextStep}>
        Next
      </button>
    )
  }

  if (step === numOfQuerstions - 1) {
    return (
      <button className="btn btn-ui" onClick={finishQuiz}>
        Finish
      </button>
    )
  }
}
