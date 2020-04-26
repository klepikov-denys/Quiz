import React from 'react'
import classes from 'compoents/Finished/Finished.module.css'


const Finished = (props) => {
    const successCount = Object.values(props.results).reduce((total, key) =>{ 
        if(key === 'success'){
            total++
        }
        return total
    }, 0)

    return(
        <div className={classes.Finished} >
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = props.results[quizItem.id]
                    return(
                        <li key={index}>
                            <strong>{index +1}</strong>.&nbsp;
                            {quizItem.question}
                            <div className={cls === 'success' ? classes.success : classes.error}></div>
                        </li>
                    )
                })    
                }
            </ul>
            <p>Right: {successCount} of {props.quiz.length}</p>
            <div>
                <button onClick={props.onRetry}>Again</button>
            </div>
        </div>
    )
}

export default Finished