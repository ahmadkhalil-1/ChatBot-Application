import React, { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";

const ChatRoom = () => {
  const location = useLocation();
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [socket, setSocket] = useState(null);

  const msgBoxRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(newSocket.id);
    });

    newSocket.emit("join", location.state.room);

    return () => {
      // Cleanup: disconnect the socket when the component unmounts
      newSocket.disconnect();
    };
  }, [location.state.room]);

  useEffect(() => {
    setForm(location.state);
  }, [location]);

  useEffect(() => {
    if (socket) {
      socket.on("getLatestMsg", (newMsg) => {
        setAllMsg([...allMsg, newMsg]);
      });
    }
  }, [socket, allMsg]);

  useEffect(() => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [allMsg]);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      onsubmit();
    }
  };

  const onsubmit = () => {
    if (msg) {
      const newMsg = { time: new Date(), msg, name: form.name };
      socket.emit("newMsg", { newMsg, room: form.room });
      setMsg("");
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/"style={{listStyle:'none', textDecoration:'none'}}>
            <button className="btn btn-outline-warning text-light d-flex m-auto mb-4">See Other Rooms</button>
          </Link>
      <div className="w-75 shadow bg-light text-dark border rounded mx-auto">
        <div className="text-center px-2 mb-4 text-capitalize bg-primary text-white py-2 rounded-top">

          <h1>{form?.room} Chat Room</h1>
        </div>
        <div
          className="bg-dark border rounded p-3 mb-4"
          style={{ maxHeight: "450px", overflowY: "scroll" }}
          ref={msgBoxRef}
        >
          {allMsg.map((msg, index) => (
            <div key={index} className="mb-3">
              {form.name === msg.name ? (
                <div className="d-flex flex-column align-items-end">
                  <div className="bg-primary text-white rounded p-2">
                    <div className="mb-1">
                      <strong>{msg.name} </strong>
                      <small className="ml-2">
                        <Moment fromNow>{msg.time}</Moment>
                      </small>
                    </div>
                    <p className="m-1">{msg.msg}</p>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-start">
                  <div className="bg-light rounded p-2">
                    <div className="mb-1">
                      <strong>{msg.name} </strong>
                      <small className="ml-2">
                        <Moment fromNow>{msg.time}</Moment>
                      </small>
                    </div>
                    <p className="m-1">{msg.msg}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="form-group d-flex mb-3">
          <input
            type="text"
            className="form-control bg-light"
            name="message"
            placeholder="Type your message"
            onChange={handleChange}
            value={msg}
            onKeyDown={handleEnter}
          />
          <button
            type="submit"
            onClick={onsubmit}
            className="btn btn-primary mx-2"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
