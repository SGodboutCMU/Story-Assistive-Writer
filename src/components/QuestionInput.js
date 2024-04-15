import React, { useState } from 'react';
import './FormElements.css';  // Assuming you have general styles for forms

const QuestionInput = ({ questions, onQuestionAdd }) => {
    const [question, setQuestion] = useState('');

    const addQuestion = (e) => {
        e.preventDefault();
        if (!question.trim()) return;  // Prevent adding empty questions
        const newQuestions = [...questions, question.trim()];
        setQuestion('');  // Reset input field after adding
        onQuestionAdd(newQuestions);  // Update parent component with the new list of questions
    };

    return (
        <div>
            <form onSubmit={addQuestion} className="form-container">
                <input
                    type="text"
                    className="input-field"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter a question"
                />
                <button type="submit" className="button">Add Question</button>
            </form>
            <div>
                <h2>Questions List</h2>
                <ul className="list-container">
                    {questions.map((q, index) => (
                        <li key={index} className="list-item">{q}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuestionInput;
