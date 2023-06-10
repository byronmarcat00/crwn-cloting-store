
import Home from "./components/routes/home/home.component";
import { Route,Routes} from "react-router-dom";
import Navigation from "./components/routes/Navigation/navigation.component";
import SignIn from "./components/routes/sing-in/sign-in.component";

const App = () => {
  return(
  <Routes>
  <Route  path='/'  element={<Navigation/>}>
      <Route   index element={<Home/>}/> 
      <Route path="Sign-In" element={<SignIn/>}/>


  </Route>
   
  </Routes>

  )
  
};

export default App;
