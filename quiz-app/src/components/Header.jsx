import logImage from "../assets/quiz-logo.png"

export default function Header() {
  return (
    <header>
      <img src={logImage} alt="Notebook and Pen for Quiz" />
      <h1> React Quiz</h1>
    </header>
  )
}