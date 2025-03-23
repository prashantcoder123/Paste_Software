import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const[title,setTitle] = useState('');
  const[value,setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  // Error  throw ho rha allpaste and paste meee ....
  // useEffect(() =>{
  //   if(pasteId){
  //     const paste = allPastes.find((p) => p.
  //     _id === pasteId);
  //     setTitle(paste.title);
  //     setValue(paste.content);
  //   }
  //   setTitle()
  //  },[pasteId])
  useEffect(() => {
    if (pasteId && allPastes.length > 0) {
        const paste = allPastes.find((p) => p._id === pasteId);
        if (paste) {
            setTitle(paste.title || "");  // Ensure title is set
            setValue(paste.content || ""); // Ensure content is set
        }
    }
}, [pasteId, allPastes]);



  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
          Date.now().toString(36),
          createdAt: new Date().toISOString
          (),
    }


    if(pasteId){
     // update
       dispatch(updateToPastes(paste));
    }
    else{
    //create
    dispatch(addToPastes(paste));
    }
    //after creation or updation 
    setTitle('');
    setValue('');
    setSearchParams({});

  }
  return (
    <div>
      <div className='flex flex-row gap-7 
      place-content-between'>
      <input
      className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
       type='text' placeholder='enter title here'
       value={title}
       onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createPaste}
      className='p-2 rounded-2xl mt-2'>
        {
          pasteId ? "update My Paste ": "Create My Paste"
        }
      </button>
    </div>
    <div className='mt-6'>
      <textarea
      className='rounded-2xl mt-4 min-w-[500px] p-4 '
      value={value}
      placeholder='Enter Content Here'
      onChange={(e)=> setValue(e.target.value)}
      rows={20}
      />
    </div>
    </div>
  )
}

export default Home
