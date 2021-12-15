import React, { useEffect } from "react";
import RequestCardCommon from "../../../common/request_card.common";
import { useRequestContext } from "../../../../providers/request_provider/request.context";
import { REQUEST_ACTION_TYPE } from "../../../../providers/request_provider/request.reducer";
import RequestService from "../../../../service/request.service";
import { useGlobalContext } from "../../../../providers/global_provider/global.context";
import CardLoadingCommon from "../../../common/card_loading.common";

const DisplayRequestsComponent = () => {
  const { request, requestDispatch } = useRequestContext();
  const { global } = useGlobalContext();

  const fetchOnLoad = async () => {
    requestDispatch({
      type: REQUEST_ACTION_TYPE.setBusy,
      payload: true,
    });

    await RequestService.getAllRequests()
      .then((res) => {
        if (res?.length === 0) {
          requestDispatch({
            type: REQUEST_ACTION_TYPE.setAllRequest,
            payload: null,
          });
        } else {
          requestDispatch({
            type: REQUEST_ACTION_TYPE.setAllRequest,
            payload: res,
          });
        }
      })
      .catch((err) => console.log(err.message));

    requestDispatch({
      type: REQUEST_ACTION_TYPE.setBusy,
      payload: false,
    });
  };

  useEffect(() => {
    fetchOnLoad();
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

  if (request.allRequests === null) {
    return (
      <div className="flex flex-row w-full h-80 justify-center items-center text-center">
        <h2>There are no requests at the moment...</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:justify-items-stretch gap-6">
        {request?.allRequests?.map((element) => {
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
        {request.loading && <CardLoadingCommon />}
      </div>
    </React.Fragment>
  );
};

export default DisplayRequestsComponent;
