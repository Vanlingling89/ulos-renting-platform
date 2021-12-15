import React, { useEffect } from "react";
import ItemCardCommon from "../../../common/item_card.common";
import { useGlobalContext } from "../../../../providers/global_provider/global.context";
import CardLoadingCommon from "../../../common/card_loading.common";
import RentalService from "../../../../service/rental.service";
import { useRentalContext } from "../../../../providers/browse_provider/browse.context";
import { RENTAL_ACTION_TYPE } from "../../../../providers/browse_provider/browse.reducer";

const DisplayItemComponent = () => {
  const { global } = useGlobalContext();
  const { rental, rentalDispatch } = useRentalContext();
  const fetchRentalOnLoad = async () => {
    rentalDispatch({ type: RENTAL_ACTION_TYPE.setBusy, payload: true });
    await RentalService.getAllRentals()
      .then((res) => {
        if (res.length === 0) {
          rentalDispatch({
            type: RENTAL_ACTION_TYPE.setAllRentals,
            payload: null,
          });
        } else {
          rentalDispatch({
            type: RENTAL_ACTION_TYPE.setAllRentals,
            payload: res,
          });
        }
      })
      .catch((err) => console.log(err.message));
    rentalDispatch({ type: RENTAL_ACTION_TYPE.setBusy, payload: false });
  };

  useEffect(() => {
    fetchRentalOnLoad();
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

  if (rental.allRentals === null) {
    return (
      <div className="flex flex-row w-full h-80 justify-center items-center text-center">
        <h2>There are no for rental items at the moment...</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      {rental.loading === false ? (
        <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-4 lg:justify-items-stretch gap-6">
          {rental?.allRentals?.map((element) => {
            let { item, likes, price, description, img_url, id_ren, img_path, id_user } =
              element;
            return (
              <ItemCardCommon
                key={id_ren}
                id={id_ren}
                user={id_user}
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
      ) : (
        <React.Fragment>
          <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:justify-items-stretch gap-6">
            <CardLoadingCommon />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DisplayItemComponent;
