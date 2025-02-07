import Child from './Child';

const Parent = () => {

    const name: string = 'Rohit';
    const age:number = 23;

  return (
    <div>
        <Child username={name} age={age}/>
    </div>
  )
}

export default Parent