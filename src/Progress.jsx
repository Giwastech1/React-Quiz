function Progress({index,totalQuestion,points,totalPoint,answer}) {
    return (
        <header className="progress">
            <progress max={totalQuestion} value={index + Number(answer !== null)} />
            <p><strong>{index + 1}</strong>/{totalQuestion}</p>
            <p><strong>{points}</strong>/{totalPoint}</p>
        </header>
    );
}
export default Progress;