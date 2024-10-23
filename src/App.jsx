import './App.css'
import { LoginScene } from './components/LoginScene'
import { useLogin } from './hooks/useLogin'
import { FieldScene } from './components/FieldScene';
import { useField } from './hooks/useField';
import { usePlayerPos } from './hooks/usePlayerPos';
import { ResultScene } from './components/ResultScene';

function App() {

  const { isLogin, loginCheck, message, logout, } = useLogin();
  const { playerPos, updatePlayerPos, prevPos, dire } = usePlayerPos();
  const { field, isGoal, moveCount, time, start } = useField(isLogin, playerPos, updatePlayerPos, prevPos, dire);

  return (
    <>
      {!isLogin && <LoginScene loginCheck={loginCheck} message={message}  ></LoginScene>}
      {isLogin && !isGoal && <FieldScene logout={logout} field={field} moveCount={moveCount} time={time}
        start={start} ></FieldScene>}
      {isGoal && <ResultScene isGoal={isGoal} ></ResultScene>}
    </>
  )
}

export default App
