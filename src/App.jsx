import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
// import { SocketProvider } from './SocketContext';
import Lobby from "./Lobby";
import Form from "./Form";
function Guest({children}){
    
    return children;
}
function App(){
    return(
       
            <Router>
        <Routes>
          <Route path="/" element={
                <Guest>
                   <Form/>
                </Guest>
            }/>
            <Route path="/home" element={
                <Guest>
                   <Lobby/>
                </Guest>
            }/>
          
        </Routes>
      </Router>
      
    )
}
export default App;