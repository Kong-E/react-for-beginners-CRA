import Button from "./Button";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1>Welcome back!</h1>
      <Button className={styles.title} text="Button" />
    </div>
  );
}

export default App;
