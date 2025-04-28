import {IOption} from "../models"
import {useState} from "react"

interface OptionProps{
    option:IOption;
    options: Array<IOption>;
    setOptions: (options:Array<IOption>)=>void
}
function Option({option, options, setOptions}:OptionProps){
  
    const removeOption = function(e: React.MouseEvent<HTMLButtonElement>){
        
        setOptions(options.filter((x:IOption)=>{return x.id!== option.id;}))

    };
    const [startHour, setStartHour] = useState<number>(option.startTime);
    const [endHour, setEndHour] = useState<number>(option.endTime);
    return ( 
        <div>
            <label> Starting hour:</label>
            <input type="number" min="0" max="23" value={startHour} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setStartHour(Number(e.target.value))}}/>
            <label> Ending hour:</label>
            <input type="number" min="0" max="23" value={endHour} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEndHour(Number(e.target.value))}}/>
            {(<button onClick={removeOption}>Remove</button>)}
        </div>
    );
}

export default Option;