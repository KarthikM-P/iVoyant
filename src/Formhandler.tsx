import { useDispatch, useSelector } from 'react-redux'
import { inputName, inputEmail, inputPassword } from './Redux/inputSlicer';
const Formhandler = () => {
    const dispatch =  useDispatch();
    const data = useSelector(state => state.inputsss);
    console.log(data.name);
  return (
    <div>
        <form >
            <input type="text" value={data.inputName} onChange={(e)=>dispatch(inputName(e.target.value))} />
            <input type="text" value={data.inputEmail} onChange={(e)=>dispatch(inputEmail(e.target.value))} />
            <input type="text" value={data.inputPassword} onChange={(e)=>dispatch(inputPassword(e.target.value))} />
            <button onClick={()=>{
                dispatch(inputName('')); 
                dispatch(inputEmail(''));
                dispatch(inputPassword(''));
            }}> submit</button>

        </form>

        <h1>todolist</h1>
        <p><strong>user:</strong>{data.name}</p>
        <p><strong>email:</strong>{data.email}</p>
        <p><strong>password:</strong>{data.password}</p>
    </div>
    
  )
}

export default Formhandler