export default function NextQuerstionButton({dispatch, currentAnswer, step, numOfQuerstions}) {
  if (currentAnswer === null) return

  if (step < numOfQuerstions - 1) {
    return (
      <button className="btn btn-ui" onClick={()=>dispatch({type: 'nextStep'})}>
        Next
      </button>
    )
  }

  if (step === numOfQuerstions - 1) {
    return (
      <button className="btn btn-ui" onClick={()=>dispatch({type: 'finishQuiz'})}>
        Finish
      </button>
    )
  }
}
