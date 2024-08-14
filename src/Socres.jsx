import React from "react";
function Scores(props){
    let arr=[];
    let i=0;
    for(let i=0;i<props.length;i++){
        let obj=props[i];
        arr.push({"score":obj.score ,"user":obj.user });
    }
    arr.sort((a, b) => b.score - a.score);
    return (
        <div>
            <h3>Scores</h3>
            <ul>
                {arr.map((entry, index) => (
                    <li key={index}>
                       {index} {entry.user}: {entry.score}
                    </li>
                ))}
            </ul>
        </div>
    );
    
};
export default Scores;