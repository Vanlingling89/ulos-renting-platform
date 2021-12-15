import React from "react";
import { useNavigate } from "react-router";
import ulos from "../../../../assets/img/ulos.png";

const HeroComponent = () => {
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="mx-3 lg:mx-0 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
        <div className="flex flex-col justify-center">
          <p className="lg:font-bold text-xl lg:text-3xl">
            Looking for something?
          </p>
          <br className="hidden lg:block" />
          <p className="font-bold text-4xl lg:text-5xl">WE GOT YOU COVERED!</p>
          <br />
          <p>
            Fortifying your renting needs wherever you are. ULOS (Unified
            Lending Online Service) is an all around renting platform that
            caters to whatever you may be looking for in the market!<br /> <br />Sign Up
            today and enjoy looking for renting necessities that you may be
            using either for today or for any other day. Already have an
            account? Log In now and who knows what you might need to use later
            on!
          </p>
        </div>

        <div className="flex items-center justify-end">
          <img className="object-cover" src={ulos} alt="ulos" />
        </div>

        <div className="flex w-3/4 lg:w-1/4 lg:col-span-2 m-auto">
          <button
            className="mr-1 lg:mr-3 bg-green-500"
            onClick={() => navigate("/browse")}
          >
            Browse
          </button>
          <button
            className="ml-2 lg:ml-3 bg-green-500"
            onClick={() => navigate("/request")}
          >
            Request
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeroComponent;
