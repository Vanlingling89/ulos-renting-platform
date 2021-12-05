import React from "react";
import { useNavigate } from "react-router";
import { useScrollTopHelper } from "../../../helpers/custom_hooks/use_scroll_top.helper";
import UserItemProvider from "../../../providers/user_item_provider/user_item.context";
import { FORM_TYPE } from "../form_page/form_selector.page";
import UserRentalsComponent from "./components/user_rental.component";
import UserRequestsComponent from "./components/user_requests.component";

const UserItemPage = () => {
  useScrollTopHelper();
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <UserItemProvider>
        <div className="mx-3 flex flex-col items-center lg:items-start lg:mx-0 my-6">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between text-center">
            <h1 className="truncate text-xl lg:text-3xl">
              Your Items for Rent
            </h1>
            <br className="block lg:hidden" />
            <div>
              <button
                className="px-5"
                onClick={() => navigate("/form/" + FORM_TYPE.rental)}
              >
                Add New
              </button>
            </div>
          </div>
          <br />
          <UserRentalsComponent />
        </div>
        <br />
        <div className="mx-3 flex flex-col items-center lg:items-start lg:mx-0 my-6">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between text-center">
            <h1 className="truncate text-xl lg:text-3xl">Your Requests</h1>
            <br className="block lg:hidden" />
            <div>
              <button
                className="px-5"
                onClick={() => navigate("/form/" + FORM_TYPE.request)}
              >
                Add New
              </button>
            </div>
          </div>

          <br />
          <UserRequestsComponent />
        </div>
      </UserItemProvider>
    </React.Fragment>
  );
};

export default UserItemPage;
