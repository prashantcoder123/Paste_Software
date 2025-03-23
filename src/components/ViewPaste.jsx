
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.
  pastes);
const paste = allPastes.filter((p) => p._id === id)[0];
console.log("final Paste :",paste);
  return (
    <div>
      <div
        className="flex flex-row gap-7 
    place-content-between"
      >
        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createPaste}
    className='p-2 rounded-2xl mt-2'>
      {
        pasteId ? "update My Paste ": "Create My Paste"
      }
    </button> */}
      </div>
      <div className="mt-6">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4 "
          value={paste.content}
          placeholder="Enter Content Here"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
