import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import useResponseHelper from "../../helpers/custom_hooks/use_response.helper";
import { useGlobalContext } from "../../providers/global_provider/global.context";
import { GLOBAL_ACTION_TYPE } from "../../providers/global_provider/global.reducer";
import RequestService from "../../service/request.service";

const RequestCardCommon = ({
  id,
  user,
  rentalProduct,
  description,
  priceFrom,
  priceTo,
  location,
}) => {
  const { global, globalDispatch } = useGlobalContext();
  const { renderSucceed, renderFail, renderBusy } = useResponseHelper();
  const deleteRequest = async (itemId) => {
    renderBusy(true);
    await RequestService.removeRequest(itemId)
      .then(() => {
        renderSucceed({ message: "Delete item: " + itemId });
        globalDispatch({ type: GLOBAL_ACTION_TYPE.setReload });
      })
      .catch((err) => renderFail({ message: err.message }));
    renderBusy(false);
  };
  return (
    <React.Fragment>
      <div className="succ-err-res">
        <div className="w-full transition delay-200 transform hover:-translate-y-2 border py-8 px-5 lg:p-10 shadow-xl rounded">
          <p className="lg:text-3xl font-bold truncate">User: {user}</p>
          <p>
            is looking for <strong>{rentalProduct}</strong>
          </p>
          <br />
          <p>Description: {description}</p>
          <br />
          <p>
            Price range:{" "}
            <strong>
              {priceFrom} - {priceTo}
            </strong>
          </p>

          <p>
            Location: <strong>{location}</strong>
          </p>

          <br />
          <div className="flex flex-row gap-2">
            <button className="rounded-full w-12 h-12 flex items-center justify-center">
              <AiOutlineSearch size="20px" />
            </button>
            {user === global.currentUser?.uid ? (
              <button
                className="rounded-full w-12 h-12 flex items-center justify-center bg-red-600  hover:bg-red-500 "
                onClick={() => {
                  deleteRequest(id);
                }}
              >
                <BsFillTrashFill size="20px" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequestCardCommon;
