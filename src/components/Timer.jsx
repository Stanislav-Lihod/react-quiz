import { useEffect } from "react"
import { useQuiz } from "../context/QuizProvider"

export default function Timer() {
  const {timer, setTick} = useQuiz()

  const min = Math.floor(timer / 60)
  const sec = timer % 60

  useEffect(()=>{
    const interval = setInterval(()=>{
      setTick()
    },1000)

    return()=>{
      clearInterval(interval)
    }
  }, [setTick])

  return (
    <div className="timer">
     {min < 10 && '0'}{min} : {sec < 10 && '0'}{sec}
    </div>
  )
}
