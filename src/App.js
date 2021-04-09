import "./App.css";

const sighInWithGoogle = () => {};

const SignIn = () => (
  <main>
    <button onClick={sighInWithGoogle}>Sign In with Google</button>
  </main>
);

const App = () => {
  const user = "test";
  return user ? <Todo /> : <SignIn />;
};
export default App;
