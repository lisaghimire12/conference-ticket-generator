import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from './assets/images/logo-full.svg';
import Desktop from './assets/images/background-desktop.png';
import Lines from './assets/images/pattern-lines.svg';
import Top from './assets/images/pattern-squiggly-line-top.svg';
import Tickett from './assets/images/pattern-ticket.svg';
import Circle from './assets/images/pattern-squiggly-line-bottom-desktop.svg';
import './Ticket.css';
import Github from './assets/images/icon-github.svg';

function Ticket() {
  const location = useLocation();

  const [name, setName] = useState("Guest");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("Guest");
  const [avatar, setAvatar] = useState(null); 
  const [ticketNumber, setTicketNumber] = useState("");

  useEffect(() => {
    // Handle Name
    if (location.state?.name) {
      setName(location.state.name);
      localStorage.setItem("name", location.state.name);
    } else {
      const storedName = localStorage.getItem("name");
      if (storedName) setName(storedName);
    }

    // Handle GitHub
    if (location.state?.github) {
      setGithub(location.state.github);
      localStorage.setItem("github", location.state.github);
    } else {
      const storedGithub = localStorage.getItem("github");
      if (storedGithub) setGithub(storedGithub);
    }

    // Handle Email
    if (location.state?.email) {
      setEmail(location.state.email);
      localStorage.setItem("email", location.state.email);
    } else {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) setEmail(storedEmail);
    }


    if (location.state?.avatar) {
      setAvatar(location.state.avatar);
    }

    //Random Ticket Number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(`${randomNum}#`);
  }, [location.state]);

  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #FF8A8A, #FFFFFF)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    
  };

  return (
    <div id="pattern">
      <div id="logo-container">
        <img id="logo" src={Logo} alt="Logo" />
      </div>

      <img id="background" src={Desktop} alt="background" />
      <img className="lines" src={Lines} alt="lines" />
      <img className="top" src={Top} alt="top squiggly" />

      <div id="text">
        <h1 id="congrats">
          Congrats, <span style={gradientTextStyle}>{name}!</span>
          <br /> Your ticket is ready.
        </h1>
        <p>
          We've emailed your ticket to <br />
          <span style={gradientTextStyle}>{email}</span> and will send updates in <br />
          the run-up to the event.
        </p>

        <div id="ticket-container">
          <img style={{ marginTop: "2%" }} id="ticket" src={Tickett} alt="ticket" />
          <img id="logo-ticket" src={Logo} alt="Logo" />
        </div>

        <div>
          <img
            id="photo"
            src={avatar ? avatar : "https://via.placeholder.com/80"} 
            alt="avatar"
          />
        </div>

        <div id="date">
          Jun 31, 2025 / Austin, TX
        </div>

        <div id="ticket-number" style={{ fontSize: '18px', marginTop: '-3px',
              transform: 'rotate(270deg)',
             display: 'inline-block',
             top:'72%',
             left:'62%',
             position:'absolute',
             color: '#8a91a4'
         }}>
          {ticketNumber}
        </div>

        <div className="circle-box">
          <img className="circle-pattern" src={Circle} alt="circle" />
        </div>

        <div id="details">   
          {name}
        </div>

        <div id="github">
          <img src={Github} alt="github" style={{
            height:"50%", width:"50%", marginTop:"5%" , marginLeft:"18%"
          }} />
          <div style={{marginTop:"8%", paddingLeft:"3%"}} >
          @{github}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
