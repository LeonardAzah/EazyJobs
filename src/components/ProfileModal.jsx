import React from "react";

const ProfileModal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed top-0 left-0 w-full justify-center items-center md:left-[210px] md:w-[calc(100%-210PX)] 2xl:left-[290px] 2xl:w-[calc(100%-290px)] h-screen bg-[rgba(0,0,0,0.4)] bg-opacity-25 backdrop-blur-[2px] z-50 overflow-y-auto px-[20px]"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          onClick={() => onClose()}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white p-2 rounded ">{children} </div>
      </div>
    </div>
  );
};

export default ProfileModal;
