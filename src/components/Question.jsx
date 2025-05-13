import { useQuiz } from "../context/QuizProvider";
import Options from "./Options";

export default function Question() {
  const {questions, step} = useQuiz()  
  return (
    <div>
      <h4>{questions[step].question}</h4>
      <Options/>
    </div>
  )
}
