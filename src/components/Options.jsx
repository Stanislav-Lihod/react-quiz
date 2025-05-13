import { useQuiz } from "../context/QuizProvider";

export default function Options() {
  const {questions, step, setAnswer, currentAnswer} = useQuiz()

  const question = questions[step]

  const isAnswered = currentAnswer !== null

  const getButtonClass = (index) => {
    let className = 'btn btn-option';

    if (index === currentAnswer) className += ' answer';
    if (isAnswered) className += index === question.correctOption ? ' correct' : ' wrong';

    return className;
  };

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button 
          key={option} 
          className={getButtonClass(i)}
          onClick={()=> setAnswer(i)}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
