import { useDispatch, useSelector } from 'react-redux'
import { inputName, inputEmail, inputPassword } from './Redux/inputSlicer';
import { RootState } from './Redux/reduxStore';
const Formhandler = () => {
    const dispatch =  useDispatch();
    const data = useSelector((state:RootState) => state.inputsss);
    function handles(){
      dispatch(inputName('')); 
      dispatch(inputEmail(''));
      dispatch(inputPassword(''));
    }
  return (
    <div>
        <form >
            <input type="text" value={data.name} onChange={(e)=>dispatch(inputName(e.target.value))} />
            <input type="text" value={data.email} onChange={(e)=>dispatch(inputEmail(e.target.value))} />
            <input type="text" value={data.password} onChange={(e)=>dispatch(inputPassword(e.target.value))} />
            <button onClick={()=>{handles}}> submit</button>

        </form>

        <h1>todolist</h1>
        <p><strong>user:</strong>{data.name}</p>
        <p><strong>email:</strong>{data.email}</p>
        <p><strong>password:</strong>{data.password}</p>
    </div>
    
  )
}

export default Formhandler