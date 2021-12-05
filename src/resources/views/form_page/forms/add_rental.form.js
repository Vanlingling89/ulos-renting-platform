import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useScrollTopHelper } from "../../../../helpers/custom_hooks/use_scroll_top.helper";
import useResponseHelper from "../../../../helpers/custom_hooks/use_response.helper";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../../../../providers/global_provider/global.context";
import RentalService from "../../../../service/rental.service";

const validationString = Yup.string()
  .required("This field is required")
  .max(255, "Maximum of 255 characters");
const validationNumber = Yup.number()
  .typeError("Must be a number")
  .required("This field is required");

const AddRentalForm = () => {
  const { renderFail, renderSucceed, renderBusy } = useResponseHelper();
  const { global } = useGlobalContext();
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState();
  const [imageContainer, setImageContainer] = useState();
  const rentalForm = useFormik({
    initialValues: {
      item: "",
      description: "",
      img: "", //Note this key act as input validator only and its values is no use
      price: "",
    },
    validationSchema: Yup.object({
      item: Yup.string()
        .required("This field is required")
        .max(30, "Maximum of 100 characters"),
      description: validationString,
      img: Yup.mixed().required("This field is required"),
      price: validationNumber,
    }),
    onSubmit: async (values) => {
      renderBusy(true);
      await RentalService.addRental(
        global.currentUser?.uid,
        values,
        imageContainer
      )
        .then(() => {
          renderSucceed({ message: "Rental Item Added" });
          navigate("/my-lists");
        })
        .catch((err) => renderFail({ message: err.message }));
      renderBusy(false);
    },
  });

  const imageValidation =
    rentalForm.touched.img && rentalForm.errors.img
      ? "bg-red-600 hover:bg-red-700 hover:text-white text-white"
      : "bg-white hover:bg-green-600 hover:text-white text-green-600";

  const getImageForDisplay = (e) => {
    const image = e.target.files[0];
    let blob = new Blob([image], { type: "image/jpg" });
    setImgUrl({ url: URL.createObjectURL(blob), alt: e.target.name });
    setImageContainer(image);
  };

  useScrollTopHelper();
  return (
    <React.Fragment>
      <form onSubmit={rentalForm.handleSubmit}>
        <div className="mx-3 lg:w-2/3 my-8 lg:my-24 lg:mx-auto">
          <h1>Add Rental</h1>
          <br />
          <ImageDisplay image={imgUrl?.url} alt={imgUrl?.alt} />
          <br />
          <div></div>
          <div className="my-1 w-full">
            <label>Item Name</label>
            <input
              name="item"
              value={rentalForm.item}
              onChange={rentalForm.handleChange}
            />
            {rentalForm.touched.item && rentalForm.errors.item ? (
              <span className="span-input-validation">
                {rentalForm.errors?.item}
              </span>
            ) : null}
          </div>

          <div className="my-1 w-full">
            <label>Description</label>
            <textarea
              name="description"
              value={rentalForm.description}
              onChange={rentalForm.handleChange}
            />
            {rentalForm.touched.description && rentalForm.errors.description ? (
              <span className="span-input-validation">
                {rentalForm.errors?.description}
              </span>
            ) : null}
          </div>

          <div className="my-1 w-full">
            <label>Price</label>
            <input
              name="price"
              value={rentalForm.price}
              onChange={rentalForm.handleChange}
            />
            {rentalForm.touched.price && rentalForm.errors.price ? (
              <span className="span-input-validation">
                {rentalForm.errors?.price}
              </span>
            ) : null}
          </div>
          <br />
          <div className="w-full">
            <label
              className={
                "w-full flex flex-col rounded items-center py-3 tracking-wide uppercase border cursor-pointer ease-linear transition-all duration-150 " +
                imageValidation
              }
            >
              <span className="text-base leading-normal">Select a Image</span>
              <input
                name="img"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  rentalForm.handleChange(e);
                  getImageForDisplay(e);
                }}
              />
            </label>
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

export default AddRentalForm;

const ImageDisplay = ({ image, alt }) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        {image && (
          <img
            className="succ-err-res shadow-2xl rounded lg:h-96"
            src={image}
            alt={alt}
          />
        )}
      </div>
    </React.Fragment>
  );
};
