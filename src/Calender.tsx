import React from 'react';
import {useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import useModal from './hooks/useModal';


export const Calender = () => {
  const [date,setDate] = useState<Date>(()=>{
    return new Date();
 })
 const {Modal,showModal,closeModal} = useModal();
 const inputDate = useRef<HTMLInputElement>(null);
 const[calender,setCalender] = useState<Date[][]> (()=>{
   var ret = new Array<Array<Date>>(5);
   ret.map((index)=>{
     index = new Array<Date>(7);
   })
   return ret;
 })
 const days = [0,1,2,3,4,5,6];







 const handleClick = () => {
   if(inputDate.current?.value == null)return;
   console.log(inputDate.current?.value);
   create_cl(new Date(inputDate.current?.value));

 }

 const create_cl = (startDay:Date) =>
 {
   const month = startDay.getMonth();
   const year = startDay.getFullYear();
   const FDmonth = new Date(year,month,1);
   const day = FDmonth.getDay();
   
   var test = new Array<Array<Date>>();
   for(var i = 0;i < 5;i++)
   {
     test[i] = [];
     for(var j = 0;j < 7;j++)
     {
       test[i][j] = new Date(year,month,i * 7 + j - day + 1);
     }
   }
   test.map((index,i)=>{
     console.log(i);
     index.map((day) =>{
       console.log(day);
     })
   })
   
   return test;
   
 }
 const getweekDay = (day:number) =>{
   
   switch(day){
     case 0:
       return 'sunday';
     case 1:
       return 'Monday';
     case 2:
       return 'Tuesday';
     case 3:
       return 'Wednesday'
     case 4:
       return 'Thursday';
     case 5:
       return 'Friday';
     case 6:
       return 'Saturday';
     default:
       return;
   }
 }
 
 useEffect(() =>{

   const test = create_cl(date);
   setCalender(test);
 },[date]);
 return (
   <div className = 'calender'>
     <h1>カレンダー</h1>
     <p>日付を入力してください</p>
     <input type = "text" ref = {inputDate}/>
     <button onClick = {handleClick}>カレンダーを作成</button>
     <div className = 'flame'>
       {days.map((index)=>(
         <td><h2>{getweekDay(index)}</h2></td>
       ))}
         {calender.map((week,i)=>(
           <tr>
             {week.map((index,j) =>(
               
               <td onClick = {showModal}>
                 <h2>{index.getDate().toString()} </h2>
               </td>
             ))}
           </tr>
       ))}
       <Modal>
         <div className = 'Modal'>
           <h2>スケジュールを作成</h2>
           <button onClick={closeModal}>Close</button>
         </div>
       </Modal>

     </div>
   </div>
 )
 
  
};


