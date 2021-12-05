import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useScrollTopHelper } from "../../../../helpers/custom_hooks/use_scroll_top.helper";
import useResponseHelper from "../../../../helpers/custom_hooks/use_response.helper";
import RequestService from "../../../../service/request.service";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../../../../providers/global_provider/global.context";

const validationString = Yup.string()
  .required("This field is required")
  .max(255, "Maximum of 255 characters");
const validationNumber = Yup.number()
  .typeError("Must be a number")
  .required("This field is required");

const AddRequestForm = () => {
  const { renderFail, renderSucceed, renderBusy } = useResponseHelper();
  const { global } = useGlobalContext();
  const navigate = useNavigate();
  const requestForm = useFormik({
    initialValues: {
      item: "",
      description: "",
      location: "",
      range_from: "",
      range_to: "",
    },
    validationSchema: Yup.object({
      item: Yup.string()
        .required("This field is required")
        .max(100, "Maximum of 100 characters"),
      description: validationString,
      location: validationString,
      range_from: validationNumber,
      range_to: validationNumber.moreThan(
        Yup.ref("range_from"),
        "Range to must be higher than Range From"
      ),
    }),
    onSubmit: async (values) => {
      renderBusy(true);
      await RequestService.addRequest(global.currentUser?.uid, values)
        .then(() => {
          renderSucceed({ message: "Request Added" });
          navigate("/my-lists");
        })
        .catch((err) => renderFail({ message: err.message }));
      renderBusy(false);
    },
  });

  useScrollTopHelper();
  return (
    <React.Fragment>
      <form onSubmit={requestForm.handleSubmit}>
        <div className="mx-3 lg:w-2/3 my-8 lg:my-24 lg:mx-auto">
          <h1>Add Request</h1>
          <br />
          <div className="my-1 w-full">
            <label>Item Name</label>
            <input
              name="item"
              value={requestForm.item}
              onChange={requestForm.handleChange}
            />
            {requestForm.touched.item && requestForm.errors.item ? (
              <span className="span-input-validation">
                {requestForm.errors?.item}
              </span>
            ) : null}
          </div>

          <div className="my-1 w-full">
            <label>Description</label>
            <textarea
              name="description"
              value={requestForm.description}
              onChange={requestForm.handleChange}
            />
            {requestForm.touched.description &&
            requestForm.errors.description ? (
              <span className="span-input-validation">
                {requestForm.errors?.description}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col lg:flex-row w-full items-start">
            <div className="my-1 w-full lg:mr-2">
              <label>Range from</label>
              <input
                name="range_from"
                value={requestForm.range_from}
                onChange={requestForm.handleChange}
              />
              {requestForm.touched.range_from &&
              requestForm.errors.range_from ? (
                <span className="span-input-validation">
                  {requestForm.errors?.range_from}
                </span>
              ) : null}
            </div>
            <div className="my-1 w-full lg:ml-2">
              <label>Range to</label>
              <input
                name="range_to"
                value={requestForm.range_to}
                onChange={requestForm.handleChange}
              />
              {requestForm.touched.range_to && requestForm.errors.range_to ? (
                <span className="span-input-validation">
                  {requestForm.errors?.range_to}
                </span>
              ) : null}
            </div>
          </div>

          <div className="my-1 w-full">
            <label>Location</label>
            <input
              name="location"
              value={requestForm.location}
              onChange={requestForm.handleChange}
            />
            {requestForm.touched.location && requestForm.errors.location ? (
              <span className="span-input-validation">
                {requestForm.errors?.location}
              </span>
            ) : null}
          </div>
          <br />
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddRequestForm;
