import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const adminDashboard = () => {

  const navigate = useNavigate();

  if(localStorage.getItem('count')==null || JSON.parse(localStorage.getItem('count'))>=0){
    localStorage.setItem('count',JSON.stringify(0));
  }

  const [count,setCount] = useState(JSON.parse(localStorage.getItem('count')));

  const [question,setQuestion] = useState('');
  const [options,setOptions] = useState('');
  const [correctOption,setCorrectOption] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');


  const handleSubmit = async()=>{

    let currentCount = JSON.parse(localStorage.getItem('count'));
    localStorage.setItem('count',JSON.stringify(currentCount+1));
    setCount(count+1);

    let optionsArray = options.split(',');
    let correctOptionKey = '';
    for(let i=0;i<4;i++){
      let currentOption = optionsArray[i].toLowerCase();
      let finalOption = correctOption.toLowerCase();
      if(currentOption==finalOption){
        correctOptionKey = String.fromCharCode(97+i);
      }
    }

    try{
      await axios.post("http://localhost:3001/admin/createQuestions",{
        "question":{
          "title":question,
          "options": [
            {
              "key": "a",
              "value": optionsArray[0]
            },
            {
              "key": "b",
              "value":optionsArray[1]
            },
            {
              "key": "c",
              "value":optionsArray[2]
            },
            {
              "key": "d",
              "value":optionsArray[3]
            }
          ],
          "correctOption": {
            "key": correctOptionKey,
            "value": correctOption
          },
          "difficulty": difficulty,
          "type": type
          }
      }).then((res)=>{
        alert("Saved successfully!");
        console.log(res);
      }).catch((err)=>{
        console.log(queryObject);
        console.log(err);
      })
    }catch(e){
      console.log(e);
    }

    setQuestion('');
    setOptions('');
    setCorrectOption('');
    setDifficulty('');
    setType('');
  }

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  const handleLinkGeneration = ()=>{
    if(localStorage.getItem('uniqueLink')==null){
      localStorage.setItem('uniqueLink',JSON.stringify("https://quizsystem.com/q1h5521jk"));
    }
    navigate('/admin/dashboard/uniqueLink');
}

  return (
    <>
      <div className='adminNavbar'>
          <h1>Admin Portal</h1>
          <a onClick={handleLogout}>Logout</a>
      </div>
      <div className='dashboard'>
        <input type="text" placeholder='Enter the question' onChange={(e)=>setQuestion(e.target.value)} value={question} required/>
        <input type="text" placeholder='Enter the options separted by comma' onChange={(e)=>setOptions(e.target.value)} value={options} required/>
        <input type="text" placeholder='Enter correct option' onChange={(e)=>setCorrectOption(e.target.value)} required value={correctOption}/>
        <input type="text" placeholder='Difficulty' onChange={(e)=>setDifficulty(e.target.value)} value={difficulty} required/>
        <input type="text" placeholder='Type' onChange={(e)=>setType(e.target.value)} value={type} required/>
        <button onClick={handleSubmit}>Add</button>
        <h1>Or</h1>
        <button disabled={count<=0} onClick={handleLinkGeneration}>Generate Link</button>
      </div>
    </>
  )
}

export default adminDashboard