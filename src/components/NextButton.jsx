function NextButton({ dispatch, answer, numOfQuestion, index }) {
    if (answer === null) return;
    if (index < numOfQuestion-1) {
        return (
            <div>
                <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
            </div>
        );
    }
    return (
          <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>Finish</button>
    )
}
export default NextButton;