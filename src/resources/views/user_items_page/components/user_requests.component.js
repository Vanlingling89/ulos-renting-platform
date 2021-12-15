import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect } from "react";
import { authentication } from "../../../../config/firebase.config";
import { useGlobalContext } from "../../../../providers/global_provider/global.context";
import { useUserItemContext } from "../../../../providers/user_item_provider/user_item.context";
import { USERITEM_ACTION_TYPE } from "../../../../providers/user_item_provider/user_item.reducer";
import RequestService from "../../../../service/request.service";
import CardLoadingCommon from "../../../common/card_loading.common";
import RequestCardCommon from "../../../common/request_card.common";

const UserRequestsComponent = () => {
  const { global } = useGlobalContext();
  const { userItem, userItemDispatch } = useUserItemContext();

  const fetchAllOwnRequest = () => {
    userItemDispatch({
      type: USERITEM_ACTION_TYPE.setBusy,
      payload: true,
    });
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        await RequestService.getUserRequest(user.uid)
          .then((res) => {
            if (res.length === 0) {
              userItemDispatch({
                type: USERITEM_ACTION_TYPE.setUserRequest,
                payload: null,
              });
            } else {
              userItemDispatch({
                type: USERITEM_ACTION_TYPE.setUserRequest,
                payload: res,
              });
            }
          })
          .catch((err) => console.log(err.message));
      }

      userItemDispatch({
        type: USERITEM_ACTION_TYPE.setBusy,
        payload: false,
      });
    });
  };

  useEffect(() => {
    fetchAllOwnRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global.refresh]);

  if (global.online === false) {
    return (
      <React.Fragment>
        <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:justify-items-stretch gap-6">
          <CardLoadingCommon />
        </div>
      </React.Fragment>
    );
  }

  if (userItem.userRequests === null) {
    return (
      <div className="flex flex-row w-full h-80 justify-center items-center text-center">
        <h2>You didnt create any request items...</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:justify-items-stretch gap-6">
        {userItem.loading && <CardLoadingCommon />}
        {userItem.userRequests?.map((element) => {
          let {
            id_req,
            id_user,
            range_from,
            range_to,
            description,
            location,
            contact,
            item,
          } = element;

          return (
            <RequestCardCommon
              key={id_req}
              id={id_req}
              user={id_user}
              rentalProduct={item}
              description={description}
              priceFrom={range_from}
              priceTo={range_to}
              location={location}
              contact={contact}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UserRequestsComponent;
