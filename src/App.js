
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import UserPrivateComponent from './components/UserPrivateComponent';
import LoginUserPrivateComponent from './components/LoginUserPrivateComponent';
import SetImage from './pages/SetImage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserPrivateComponent />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoginUserPrivateComponent />}>
          <Route path="/setimage" element={<SetImage />} />
          <Route path="/" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
