import './App.css';
import React from 'react';
import { useState } from 'react';

import './App.css'
import axios from 'axios';

const testData = [
  {name: "Alexander Chinchin", avatar_url: "https://avatars.githubusercontent.com/u/52291881?v=4", company: "@Github"},
    {name: "Francisco Jumbo", avatar_url: "https://avatars.githubusercontent.com/u/61259614?v=4", company: "@Github"},
    {name: "Santiago Santillan", avatar_url: "https://avatars.githubusercontent.com/u/58825544?v=4", company: "@Github"},
    {name: "Michael Pastrana", avatar_url: "https://avatars.githubusercontent.com/u/61259955?v=4", company: "@Github"},
    {name: "Paola Acosta", avatar_url: "https://avatars.githubusercontent.com/u/52224646?v=4", company: "@Github"},
];

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key = {profile.id} {...profile}/>)}
    {props.profiles1.map(profile1 => <Card key = {profile1.id} {...profile1}/>)}
	</div>
);

const Card = (props) => {


  return (
    <div className="github-profile">
      <img src={props.avatar_url} alt="" />
      <div className="info">
      <div className="name">{props.name}</div>
      <div className="company">{props.company}</div>
      </div>
      
    </div>
  )
}

export const Form = (props) => {

  const [userName, setUserName] = useState("")

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data)
    
  }

  return (
    <div>
      	<form onSubmit={handleSubmit}>
    	  <input type="text" placeholder="Usuario de Github" value={userName} onChange={e => setUserName(e.target.value)}/>
        <button>Agregar</button>
    	</form>
    </div>
  )
}

export const App = (props) => {

  const [profiles, setProfiles] = useState(testData)

  const [profiles1, setProfiles1] = useState([])

  const AddPerfil = (profileData) =>{
    
    setProfiles1([...profiles1,profileData])
  }

  return (
    <div>

      <div className="header"> <h2>Tarjetas de GitHub</h2></div>
      
      <Form onSubmit={AddPerfil}/>

      <CardList profiles = {profiles}
                profiles1={profiles1}
      ></CardList>

    </div>
    
  )
}

export default App;
