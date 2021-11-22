import React from 'react';

export default class FreeFormEvaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        this.employerId = this.props.match.params.employerId;
        this.quizId = this.props.match.params.quizId;
        this.candidateId = this.props.match.params.candidateId;
        
        if (!this.checkCookie('auth')) {
            window.location.href = `${process.env.REACT_APP_SERVER_HOST}/auth/google`;
        }
    }
    
    checkCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            return true;
        } else {
            return false;
        }
    }
    
    fetchCandidate() {
        fetch(`https://adroit-marking-328200.uc.r.appspot.com/candidate/${this.candidateId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.quizzes) {
                        let decodedQuizzes = JSON.parse(result.quizzes);
                        if (decodedQuizzes) {
                            for (let quiz of decodedQuizzes) {
                                if (parseInt(quiz.result.id) === parseInt(this.quizId)) {
                                    if (!quiz.hasFreeForm) {
                                        this.setState({error: "This quiz does not have a free-form question."});
                                        return;
                                    }
                                    
                                    let questions = [];
                                    for (let question of quiz.result.question) {
                                        if (question.type === 4) {
                                            questions.push(question);
                                        }
                                    }
                                    
                                    this.setState({
                                        quizName: quiz.name,
                                        candidate: result,
                                        questions: questions,
                                        isLoaded: true
                                    });
                                }
                            }
                        } else {
                            this.setState({error: "This candidate's quizzes have been stored in an incorrect format."});
                        }
                    } else {
                        this.setState({error: "This candidate does not have any submitted quizzes."});
                    }
                },
                (error) => {
                    this.setState({error: "Unable to fetch candidate's submitted quizzes."});
                }
            );
    }
    
    componentDidMount() {
        this.fetchCandidate();
    }
    
    render() {
        const submitEvaluation = () => {
            let showWarning = false;
            let elements = document.querySelectorAll('.freeFormEvaluation__input');
            let scores = {};
            for (let element of elements) {
                if (!element.value) {
                    showWarning = true;
                    break;
                }
                
                let questionId = element.getAttribute('data-id');
                scores[questionId] = element.value;
            }
            
            if (showWarning) {
                this.setState({warning: 'A value must be entered for each question listed.'});
            } else {
                if (this.state.candidate.quizzes) {
                    let decodedQuizzes = JSON.parse(this.state.candidate.quizzes);
                    if (decodedQuizzes) {
                        for (let quiz of decodedQuizzes) {
                            if (parseInt(quiz.result.id) === parseInt(this.quizId)) {
                                if (!quiz.hasFreeForm) {
                                    this.setState({error: "This quiz does not have a free-form question."});
                                    return;
                                }
                                
                                for (let question of quiz.result.question) {
                                    if (question.type === 4) {
                                        question.credit = parseInt(scores[question.id]);
                                    }
                                }
                                
                                let totalCredit = 0;
                                for (let i = 0; i < quiz.result.question.length; ++i) {
                                    totalCredit += quiz.result.question[i].credit;
                                }
                                quiz.result.credit = totalCredit;
                            }
                        }
                        
                        let candidate = this.state.candidate;
                        candidate.quizzes = JSON.stringify(decodedQuizzes);
                        candidate = JSON.stringify(candidate);
                        
                        fetch(
                            `https://adroit-marking-328200.uc.r.appspot.com/candidate/${this.candidateId}`,
                            {
                                method: 'POST',
                                mode: 'cors',
                                body: candidate,
                                headers: {
                                  "Content-Type": "application/json"
                                }
                            }
                        )
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    this.fetchCandidate();
                                },
                                (error) => {
                                    this.setState({error: "Unable to update candidate's score."});
                                }
                            );
                    } else {
                        this.setState({error: "This candidate's quizzes have been stored in an incorrect format."});
                    }
                } else {
                    this.setState({error: "This candidate does not have any submitted quizzes."});
                }
            }
        }
        
        if (this.state.error) {
            return <div>Error: {this.state.error}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading</div>;
        } else if (this.state.alreadyEvaluated) {
            return <div>This quiz has already been evaluated.</div>;
        } else {
            let questions = this.state.questions.map((question) => {
                let question_component =
                <div key={question.id} className="freeFormEvaluation__section p-2 m-2 border border-primary rounded" style={{maxWidth: '500px'}}>
                    <div className="freeFormEvaluation__currentScore d-flex justify-content-between">Current Score: <span>{question.credit}</span></div>
                    <div className="freeFormEvaluation__availablePoints d-flex justify-content-between">Available Points: <span>{question.points}</span></div>
                    <div className="freeFormEvaluation__question d-flex justify-content-between">Question: <span style={{marginLeft: '0.5em'}}>{question.question}</span></div>
                    <div className="freeFormEvaluation__submission">Submission:<div className="p-2">{question.submission}</div></div>
                    <label className="freeFormEvaluation__label">
                        <span>Enter the candidate's score:</span>
                        <input type="number" className="freeFormEvaluation__input" data-id={question.id} min="0" max={question.points} style={{marginLeft: '0.5em'}} />
                    </label>
                </div>;
                
                return question_component;
            });
            
            let warning = null;
            if (this.state.warning) {
                warning = <div className="freeFormEvaluation__warning p-2 rounded bg-danger text-white">{this.state.warning}</div>
            }
            
            return (
                <div className="freeFormEvaluation">
                    {warning}
                    <h1 className="p-2">{this.state.quizName}</h1>
                    <p className="p-2 lead">Evaluate free-form responses for {this.state.quizName}</p>
                    <div>{questions}</div>
                    <div className="freeFormEvaluation__submit m-2 btn btn-primary" onClick={submitEvaluation}>SUBMIT</div> 
                </div>
            );
        }
    }
}
