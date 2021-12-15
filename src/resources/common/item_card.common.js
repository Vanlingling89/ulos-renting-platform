import React, { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import useResponseHelper from "../../helpers/custom_hooks/use_response.helper";
import { useGlobalContext } from "../../providers/global_provider/global.context";
import { GLOBAL_ACTION_TYPE } from "../../providers/global_provider/global.reducer";
import RentalService from "../../service/rental.service";

const ItemCardCommon = ({
  id,
  user,
  item,
  likes,
  description,
  price,
  img,
  favorite = false,
  path,
}) => {
  const { global, globalDispatch } = useGlobalContext();
  const { renderSucceed, renderFail, renderBusy } = useResponseHelper();
  const [favItem, setFavItem] = useState(favorite);
  const [likesItem, setLikesItem] = useState(parseInt(likes));

  const likeOrUnlike = () => {
    if (favItem === false) {
      setLikesItem(parseInt(likesItem) + 1);
    } else {
      setLikesItem(parseInt(likesItem) - 1);
    }
  };

  const deleteRental = async (itemId, imgPath) => {
    renderBusy(true);
    await RentalService.removeRental(itemId, imgPath)
      .then(() => {
        renderSucceed({ message: "Delete item: " + itemId });
        globalDispatch({ type: GLOBAL_ACTION_TYPE.setReload });
      })
      .catch((err) => renderFail({ message: err.message }));
    renderBusy(false);
  };

  return (
    <React.Fragment>
      <div className="w-full succ-err-res transition delay-200 transform hover:-translate-y-2 rounded">
        <div className="w-full h-96 flex items-center justify-center">
          <img
            className="succ-err-res object-cover w-full h-full rounded"
            src={img}
            alt={id}
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-6">
          <div className="truncate">
            <h2 className="font-bold py-1 truncate">{item}</h2>
          </div>

          {user === global.currentUser?.uid ? (
            <div onClick={() => deleteRental(id, path)}>
              <p className="text-red-600 hover:text-red-800 text-sm cursor-pointer">
                REMOVE
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-row gap-6 items-center">
          <div className="flex flex-row items-center justify-center">
            <div
              onClick={() => {
                setFavItem(!favItem);
                likeOrUnlike();
              }}
            >
              {favItem === false ? (
                <BsSuitHeart
                  className="text-red-400 hover:text-red-600"
                  size="20px"
                />
              ) : (
                <BsSuitHeartFill
                  className="text-red-400 hover:text-red-600"
                  size="20px"
                />
              )}
            </div>
            <p className="pl-2">{likesItem}</p>
          </div>
        </div>

        <p className="font-bold">P {price}</p>
        <p className="font-bold">Contact: {description}</p>
      </div>
    </React.Fragment>
  );
};

export default ItemCardCommon;
