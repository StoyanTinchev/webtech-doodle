import "./OptionCreator.css"
import {IOption} from "../models"
import {useState} from "react"

let counter = 0;

interface OptionCreatorProps{
    options: Array<IOption>; 
    setOptions : (newOptions :Array<IOption>) => void
}
function OptionCreator({options, setOptions}:OptionCreatorProps){


    const [startHour, setStartHour] = useState<number>(0);
    const [endHour, setEndHour] = useState<number>(1);

    const addOption = function(e: React.MouseEvent<HTMLButtonElement>){

        if (startHour >= endHour) {
            alert("Starting hour must be less than ending hour!");
            return;
        }
        const newOption: IOption = {
            id: counter,
            startTime: startHour,
            endTime: endHour,
        };  

        counter++;
        
        setOptions([...options, newOption]);
    };

    return(
        <div className="optionCreatorContainer">
            <div>
                <div>
                    <label> Starting hour:</label>
                    <input type="number" min="0" max="23" value={startHour} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setStartHour(Number(e.target.value))}}/>
                </div>
                <div>
                    <label> Ending hour:</label>
                    <input type="number" min="0" max="23" value={endHour} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setEndHour(Number(e.target.value))}}/>
                </div>
            </div>

            { (<button className="add-option-button" onClick={addOption}>Add</button>)}
        </div>
    );
}

export default OptionCreator;
