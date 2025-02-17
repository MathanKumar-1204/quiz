const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
  quizName: String,
  background: String,
  layout: String,
  questions: [
    {
      question: String,
      options: [String],
      correctOption: Number,
      _id: mongoose.Schema.Types.ObjectId
    }
  ],
  __v: Number
});

// Create the Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);

// Route to fetch and print the quiz data
app.get('/get-quiz-data', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizName: 'test' });
    if (quiz) {
      const { background, questions } = quiz;
      questions.forEach(q => {
        console.log('Question:', q.question);
        console.log('Options:', q.options);
        console.log('Correct Answer:', q.options[q.correctOption]);
      });
      console.log('Background:', background);
      res.send('Quiz data printed to console');
    } else {
      res.status(404).send('Quiz not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
