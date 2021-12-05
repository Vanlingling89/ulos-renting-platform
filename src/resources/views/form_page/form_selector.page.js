import React from "react";
import { useParams } from "react-router";
import AddRentalForm from "./forms/add_rental.form";
import AddRequestForm from "./forms/add_request.form";

export const FORM_TYPE = {
  request: "ADD_REQUEST",
  rental: "ADD_RENTAL",
};

const FormSelectorPage = () => {
  let { type } = useParams();

  switch (type) {
    case FORM_TYPE.rental:
      return <AddRentalForm />;
    case FORM_TYPE.request:
      return <AddRequestForm />;
    default:
      return (
        <div>
          <h1>Google</h1>
        </div>
      );
  }
};

export default FormSelectorPage;
