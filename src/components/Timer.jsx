import { useEffect } from "react"

function Timer({ dispatch, secondsRemains }) {
    const minutes = Math.floor(secondsRemains / 60);
    const seconds = secondsRemains % 60;
    useEffect(function () {
        const countdown = setInterval(function () {
            dispatch({ type: "timeCountdown" });
        }, 1000);
        return function () {
            clearInterval(countdown);
        }
    },[])
    return (
        <div className="timer">{minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}</div>
    );
}
export default Timer;