import { useEffect } from "react"

export default function Timer({timer, dispatch}) {
  const min = Math.floor(timer / 60)
  const sec = timer % 60

  useEffect(()=>{
    const interval = setInterval(()=>{
      dispatch({type: 'tick'})
    },1000)

    return()=>{
      clearInterval(interval)
    }
  }, [dispatch])

  return (
    <div className="timer">
     {min < 10 && '0'}{min} : {sec < 10 && '0'}{sec}
    </div>
  )
}
