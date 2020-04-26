import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from 'compoents/ActiveQuiz/ActiveQuiz'
import Finished from 'compoents/Finished/Finished'

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state={
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            quiz: [
                {
                    question: 'What is the color of the sky?',
                    rightAnswer: 2,
                    id: 1,
                    answers:[
                        {text: 'Black', id: 1},
                        {text: 'Blue', id: 2}, 
                        {text: 'Red', id: 3}, 
                        {text: 'Green', id: 4}
                    ]
                },
                {
                    question: 'When was St. Petersburg founded?',
                    rightAnswer: 3,
                    id: 2,
                    answers:[
                        {text: '1700', id: 1},
                        {text: '1010', id: 2}, 
                        {text: '1703', id: 3}, 
                        {text: '1773', id: 4}
                    ] 
                }
            ]
        }
    }

    onAnswerClickHandler = (answerId) => {
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') return
        }

        const results = this.state.results
        const question = this.state.quiz[this.state.activeQuestion]

        if(answerId === question.rightAnswer){
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results,
            })

            const timeout = window.setTimeout(() =>{
                if(this.isQuizFinished()){
                    this.setState({isFinished: true})
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion +1,
                        answerState: null
                    })
                }
        
                clearTimeout(timeout)
            }, 1000)
        }else{
            results[question.id] = 'error'
            this.setState({
                results,
                answerState: {[answerId]: 'error'}
            })
        }
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    isQuizFinished(){
        return (this.state.activeQuestion +1 === this.state.quiz.length)
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Please, answer all questions</h1>
                    {
                        this.state.isFinished
                        ?
                        <Finished 
                            results={this.state.results} 
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :
                        <ActiveQuiz 
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers} 
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            questionNumber={this.state.activeQuestion +1}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz 