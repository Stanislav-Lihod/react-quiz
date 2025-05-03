export default function Options({options, dispatch, currentAnswer, correctOption}) {
  const isAnswered = currentAnswer !== null

  const getButtonClass = (index) => {
    let className = 'btn btn-option';

    if (index === currentAnswer) className += ' answer';
    if (isAnswered) className += index === correctOption ? ' correct' : ' wrong';

    return className;
  };

  return (
    <div className="options">
      {options.map((option, i) => (
        <button 
          key={option} 
          className={getButtonClass(i)}
          onClick={()=>{dispatch({type: 'setAnswer', payload: i})}}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
