import {React,useEffect,useState } from 'react'

function HookUseEffect() {

  const [value,SetValue]=useState(false);

  useEffect(() => {
    console.log('useeffect called')
  }, [value]);
  

  return (
    <div>
      <button onClick={()=>{SetValue(!value)}}>call useeffect</button>
    </div>
  )
}

export default HookUseEffect
