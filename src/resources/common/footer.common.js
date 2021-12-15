import React from "react";

const FooterCommon = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-900">
        <div className="lg:w-3/4 m-auto text-white py-10">
          <div className="my-4 mx-3 flex flex-col lg:flex-row justify-between  lg:mx-0">
            <div className="lg:w-1/2 mb-5 text-center lg:text-left">
              <h1 className="font-bold">ULOS</h1>
              <br />
              <p className="text-gray-400">
                Our goal is to provide a unified and easy-to-access platform for
                all types of renting needs.
              </p>
              <br />
              <h1 className="font-bold">About us</h1>
              <br />
              <ul className="text-gray-400 flex flex-col items-center lg:items-start">
                <li className="hover:underline cursor-pointer w-28">
                  Return Policy
                </li>
                <li className="hover:underline cursor-pointer w-24">
                  Shop Policy
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="font-bold">Contact us</h1>
              <br />
              <p className="hover:underline cursor-pointer text-gray-400">
                ulos.info@gmail.com
              </p>
              <br />
              <h1 className="font-bold">Download our App</h1>
              <br />
              <p className="text-gray-400">
                Download App for Android mobile phones
              </p>
            </div>
          </div>
          <div className="text-xs mx-3 pt-5 text-gray-600 lg:mx-0 text-center lg:text-left">
            <p>
              COPYRIGHT &copy;{" "}
              <span className="hover:underline hover:text-white cursor-pointer">
                ULOS
              </span>{" "}
              2021 - ALL RIGHT RESERVE
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FooterCommon;
