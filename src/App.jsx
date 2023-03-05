import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense,lazy } from "react";
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
const   Login = Loadable(lazy(()=>import ("./pages/Login")));
const   SetAvatar = Loadable(lazy(()=>import ("./pages/SetAvatar")));
const   Chat = Loadable(lazy(()=>import ("./pages/Chat")));


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
