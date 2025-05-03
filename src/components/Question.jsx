import Options from "./Options";

export default function Question({question, dispatch, currentAnswer}) {  
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} dispatch={dispatch} currentAnswer={currentAnswer} correctOption={question.correctOption}/>
    </div>
  )
}
