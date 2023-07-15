import React from 'react'
import Questions from './Questions'

const QuestionList = ({ questionsList }) => {
    return (
        <>
            {
                questionsList.map((question) => (
                    question.type!=="S" && <Questions question={question} key={question.id} />
                ))
            }
        </>
    )
}

export default QuestionList