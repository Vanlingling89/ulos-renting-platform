import React from "react";

const CardLoadingCommon = () => {
  return (
    <React.Fragment>
      <div className="w-full">
        <DisplayCardLoadingCommon />
      </div>
      <div className="w-full hidden lg:block">
        <DisplayCardLoadingCommon />
      </div>
      <div className="w-full hidden lg:block">
        <DisplayCardLoadingCommon />
      </div>
    </React.Fragment>
  );
};

export default CardLoadingCommon;

const DisplayCardLoadingCommon = () => {
  return (
    <React.Fragment>
      <div className="bg-yellow-300 rounded shadow-xl">
        <div className="h-64 bg-yellow-400 rounded-tr rounded-tl animate-pulse"></div>

        <div className="p-5">
          <div className="h-8 rounded-sm bg-yellow-400 animate-pulse mb-3"></div>
          <div className="h-6 rounded-sm bg-yellow-400 animate-pulse mb-4"></div>

          <div className="grid grid-cols-4 gap-1 mb-4">
            <div className="col-span-3 h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
            <div className="h-6 rounded-sm bg-yellow-400 animate-pulse"></div>

            <div className="col-span-2 h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
            <div className="col-span-2 h-6 rounded-sm bg-yellow-400 animate-pulse"></div>

            <div className="h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
            <div className="col-span-3 h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
            <div className="col-span-2 h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
            <div className="h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
          </div>

          <div className="w-48 h-6 rounded-sm bg-yellow-400 animate-pulse mb-1"></div>
          <div className="w-40 h-6 rounded-sm bg-yellow-400 animate-pulse"></div>
        </div>
      </div>
    </React.Fragment>
  );
};
