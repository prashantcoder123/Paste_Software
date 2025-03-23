import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
const Paste = () => {
  // const pastes = useSelector((state) => state.paste.pastes) || [];

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // const filteredData = pastes.filter((paste) =>
  //   paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const pastes = useSelector((state) => state.paste.pastes) || [];
  const filteredData = pastes.filter((paste) =>
      paste.title && paste.title.toLowerCase().includes(searchTerm)
  );
  

  const handleShare = (pasteId, title, content) => {
    const url = `${window.location.origin}/view/${pasteId}`;
    const text = `${title}\n${content}\nCheck it out: ${url}`;

    if (navigator.share) {
        navigator
            .share({
                title: title,
                text: text,
                url: url,
            })
            .then(() => console.log("Shared successfully!"))
            .catch((error) => console.error("Error sharing:", error));
    } else {
        navigator.clipboard.writeText(text).then(() => {
            alert("Link copied to clipboard!");
        });
    }
};
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                       Edit
                    </a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button onClick={() => 
                  handleShare(paste._id, paste.title, 
                    paste.content)}
                   className="bg-black
                    text-white 
                   px-3 py-2 
                   rounded"> 
                    Share
                  </button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
