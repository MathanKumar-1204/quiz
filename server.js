const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/quiz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scores: [{ quizName: String, score: Number }] // To store quiz scores
});

const User = mongoose.model("User", userSchema);

// Quiz schema
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

// Sign Up endpoint
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Username already exists" });
    }
    res.status(400).json({ error: "User registration failed" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials" });

  res.json({ message: "Logged in successfully", userId: user._id }); // Include userId in the response
});

// Save score endpoint
app.post("/api/users/:userId/score", async (req, res) => {
  const { userId } = req.params;
  const { quizName, score } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingScore = user.scores.find((s) => s.quizName === quizName);
    if (existingScore) {
      existingScore.score = score; // Update existing score
    } else {
      user.scores.push({ quizName, score }); // Add new score entry
    }

    await user.save();
    res.json({ message: "Score saved successfully", scores: user.scores });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Quiz submission endpoint
app.post("/api/quizzes", async (req, res) => {
  const { quizName, background, layout, questions } = req.body;

  // Validate questions
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "Questions are required" });
  }

  for (const question of questions) {
    if (!question.question || !Array.isArray(question.options) || question.options.length === 0 || question.correctOption === undefined) {
      return res.status(400).json({ error: "Invalid question data" });
    }
  }

  const quiz = new Quiz({
    quizName,
    background,
    layout,
    questions,
  });

  try {
    await quiz.save(); // Save quiz data to MongoDB
    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(400).json({ error: "Quiz creation failed" });
  }
});

// Fetch quiz endpoint
app.get('/api/quizzes/:quizName', async (req, res) => {
  const { quizName } = req.params; // Get the quiz name from the request parameters
  try {
    const quiz = await Quiz.findOne({ quizName });
    if (quiz) {
      res.json(quiz); // Send the quiz data as a JSON response
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
