import { onAuthStateChanged } from "@firebase/auth";
import React, { useEffect } from "react";
import { authentication } from "../../../../config/firebase.config";
import { useGlobalContext } from "../../../../providers/global_provider/global.context";
import { useUserItemContext } from "../../../../providers/user_item_provider/user_item.context";
import { USERITEM_ACTION_TYPE } from "../../../../providers/user_item_provider/user_item.reducer";
import RentalService from "../../../../service/rental.service";
import CardLoadingCommon from "../../../common/card_loading.common";
import ItemCardCommon from "../../../common/item_card.common";

const UserRentalsComponent = () => {
  const { global } = useGlobalContext();
  const { userItem, userItemDispatch } = useUserItemContext();

  const fetchAllOwnRental = () => {
    userItemDispatch({
      type: USERITEM_ACTION_TYPE.setBusy,
      payload: true,
    });
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        await RentalService.getUserRentals(user.uid)
          .then((res) => {
            if (res.length === 0) {
              userItemDispatch({
                type: USERITEM_ACTION_TYPE.setUserRental,
                payload: null,
              });
            } else {
              userItemDispatch({
                type: USERITEM_ACTION_TYPE.setUserRental,
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
    fetchAllOwnRental();
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

  if (userItem.userRentals === null) {
    return (
      <div className="flex flex-row w-full h-80 justify-center items-center text-center">
        <h2>You didnt create any for rental items...</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      {userItem.loading && (
        <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:justify-items-stretch gap-6">
          <CardLoadingCommon />
        </div>
      )}
      <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-4 lg:justify-items-stretch gap-6">
        {userItem.userRentals?.map((element) => {
          let { item, description, likes, price, img_url, id_ren, img_path, id_user } =
            element;
          return (
            <ItemCardCommon
              key={id_ren}
              user={id_user}
              id={id_ren}
              item={item}
              likes={likes.length}
              description={description}
              price={price}
              img={img_url}
              path={img_path}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UserRentalsComponent;
