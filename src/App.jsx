import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense,lazy } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import loader from "./assets/loader.gif";
import styled from "styled-components";

const Loader =()=>{
  return (
    <Container>

      <img src={loader} alt="loaderLazy"/>
    </Container>
  )
}

const Loadable =(Component)=>(props)=>{

  return (
    <Suspense fallback={<Loader/>}>
<Component {...props}/>
    </Suspense>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const   Register = Loadable(lazy(()=>import ("./pages/Register")));


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  `
