import React from "react";
import {io} from "socket.io-client";
import Cookies from "js-cookie";
function Canvas(){
    const socket=React.useMemo(()=>io("http://localhost:4000",{withCredentials:true}),[]);

    const ref=React.useRef();
    const contextref=React.useRef();
    const [isdrawing,setisDrawing]=React.useState(false);
    const [penColor, setPenColor] = React.useState("#000000"); 
    const [penWidth, setPenWidth] = React.useState(1);
    function click(){
        setPenColor("#FFFFFF");
        contextref.current.strokeStyle = "#FFFFFF";
    }
    React.useEffect(()=>{
        const canvas=ref.current;
        canvas.width = 500;
        canvas.height = 400;
        const context=canvas.getContext("2d");
        context.strokeStyle = penColor;//for color
        context.lineWidth = penWidth;
        contextref.current = context;
        socket.on('drawing-room', ({room, offsetX, offsetY, color, width }) => {
            // console.log("drawing");
            // contextref.current.moveTo(offsetX,offsetY);
            context.strokeStyle = color;
            context.lineWidth = width;
            context.lineTo(offsetX, offsetY);
            context.stroke();
            // contextref.current.closePath();


        });
    },[]);
    function startdraw(event){
        setisDrawing(true);
        const {offsetX,offsetY}=event.nativeEvent;
        contextref.current.beginPath();
        contextref.current.moveTo(offsetX,offsetY);
        // console.log(offsetX,offsetY);
    };
    function stopdraw(event){
        setisDrawing(false);
        // const {offsetX,offsetY}=event.nativeEvent;
        contextref.current.closePath();
        // console.log(offsetX,offsetY);
    }
    function draw(event){
        if(!isdrawing){
            return;
        }
        const {offsetX,offsetY}=event.nativeEvent;
        contextref.current.lineTo(offsetX,offsetY);
        contextref.current.stroke();
        const room=Cookies.get("roomid"); 
        socket.emit('drawing', {
            room,
            offsetX,
            offsetY,
            color: penColor,
            width: penWidth
        });
        // console.log("jo");
       


    }
    function handleColor(event){
        const x=event.target.value;
        // console.log(event.target.value);
        setPenColor(x);
        contextref.current.strokeStyle = x;
    }
    
    function handleWidthChange(event) {
        setPenWidth(event.target.value);
        contextref.current.lineWidth = event.target.value; // Update the line width immediately
    }

    return(
        <div>
            <input type="color" onChange={handleColor}/>
            <canvas 
                onMouseDown={startdraw}
                onMouseUp={stopdraw}
                onMouseMove={draw}
                ref={ref}
            />
            <button onClick={click}>erase</button>
            <input 
                type="range" 
                min="1" 
                max="30" 
                value={penWidth} 
                onChange={handleWidthChange} 
                style={{ marginLeft: "10px" }}
            />
        </div>
    );
};
export default Canvas