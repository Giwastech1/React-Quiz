function FinishScreen({ points, totalPoint,highscore,dispatch }) {
    const scorePercent = Math.ceil((points / totalPoint * 100));
    let emoji;
    if (scorePercent === 0) emoji = "🤦";
    if (scorePercent > 0 && scorePercent < 50) emoji = "😔";
    if (scorePercent >= 50 && scorePercent < 80) emoji = "😄";
    if (scorePercent >= 80 && scorePercent < 100) emoji = "🎉";
    if (scorePercent === 100) emoji = "🥇";
    return (
        <>
            <p className="result"><span>{emoji} </span>You scored {points} out of {totalPoint} ({scorePercent}%)</p>
            <p className="highscore">(highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart Quiz</button>
        </>
    );
}
export default FinishScreen;