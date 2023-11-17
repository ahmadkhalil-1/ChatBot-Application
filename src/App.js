import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./Components/ChatRoom";
import Form from "./Components/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/chatroom/:roomName" element={<ChatRoom />} />
        <Route path="*" element={<h1>404 Error! PAGE NOT FOUND</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
