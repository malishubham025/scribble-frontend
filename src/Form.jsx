import React from "react";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate,Navigate } from "react-router-dom";
function Form(){
    const navigate = useNavigate();
    const [form,setForm]=React.useState({
        name:"",
        roomid:""
    });
    function enterRoom(){
       if(form.roomid){
        Cookies.set("admin",0);
        console.log(form.roomid);
        Cookies.set("roomid",form.roomid);
        navigate("/home");
       }
       else{
        alert("enter room id");
       }
       
    }
    function createRoom(){
        let room=uuidv4();
        Cookies.set("roomid",room);
        Cookies.set("admin",1);
        navigate(`/home`);
    }
    function handelForm(event){
        const name=event.target.name;
        const value=event.target.value;
        if(name==="name"){
            setForm((pvalue)=>{
                return{
                ...pvalue,
                name:value
                }
            })
        }
        else{
            setForm((pvalue)=>{
                return{
                ...pvalue,
                roomid:value
                }
            })
        }
    }
    React.useEffect(()=>{
        const userid=Cookies.get("userid");
        if(!userid){
            const x=uuidv4();
            Cookies.set("userid",x);
        }
    },[]);
    // function
    return(
    <div>
        <h1>Scrible</h1>
        <form action="">
        
                <input name="name" onChange={handelForm} type="text" placeholder="Enter your name" />
                <p></p>
                <br />
                <input name="roomid" onChange={handelForm} type="text" placeholder="enter to the room"/>
                <button onClick={enterRoom}>Enter</button>
                <br />
                
        {/* </form>
        <form action=""> */}
            <button type="submit" onClick={createRoom} style={{cursor:"pointer"}}><p>Create Room</p></button>
        </form>
    </div>
    );
}
export default Form;

