import React, {useState, useEffect} from 'react'

function Timer() {
    const [startTime, setStartTime] = useState<any>(null)
    useEffect(() => {
        const now = Date.now()
        setStartTime(() => now)
        console.log(now)

        const timer = setInterval(() => {
            
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])
  return (
    <div>

    </div>
  )
}

export default Timer