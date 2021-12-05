import { firestore, storage } from "../config/firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "@firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const RENTALS_QUERY = collection(firestore, "rentals");

/**
 * CREATE A NEW RENTAL ENTRY TO FIRESTORE
 * @param {string} userID the current user id
 * @param {object} values the form/input values
 * @param {object} file the image value
 */
const createRentalItem = async (userID, values, file) => {
  const imgName = Math.round(+new Date() / 1000) + "-" + file.name;
  let { item, description, price } = values;
  let imgUrl = "";
  try {
    const rentalImgReference = ref(storage, "rentals_img/" + imgName);
    const uploadImage = await uploadBytes(rentalImgReference, file);

    await getDownloadURL(uploadImage.ref).then((url) => (imgUrl = url));

    await addDoc(RENTALS_QUERY, {
      item,
      description,
      price: parseFloat(price, 10),
      likes: [],
      img_url: imgUrl,
      img_path: rentalImgReference.fullPath,
      id_user: userID,
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * GET ALL RENTALS STORED IN FIRESTORE
 * @returns an array of requests object
 */
const readAllRentalItems = async () => {
  try {
    const data = await getDocs(RENTALS_QUERY);
    let requests = data.docs.map((doc) => ({ ...doc.data(), id_ren: doc.id }));
    return requests;
  } catch (error) {
    return new Error(error);
  }
};

/**
 * READ A REQUEST PER USER
 * @param {string} userID id of user is required
 * @returns user made rentals
 */
const readRentalsOfUser = async (userID) => {
  try {
    const find = query(RENTALS_QUERY, where("id_user", "==", userID));
    const data = await getDocs(find);
    let userRentals = data.docs.map((items) => ({
      ...items.data(),
      id_ren: items.id,
    }));
    return userRentals;
  } catch (error) {
    return new Error(error);
  }
};

const createDeleteLikeRental = (userID) => {
  try {
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * DELETE ITEM FROM FIRESTORE USING REQUEST ID
 * @param {string} rentalID rental id that will be deleted
 * @param {string} path rental img_path that will be deleted
 */
const deleteRentalItem = async (rentalID, path) => {
  console.log(rentalID);
  const desertRef = ref(storage, path);
  try {
    const rentalTag = doc(firestore, "rentals", rentalID);
    await deleteDoc(rentalTag);
    deleteObject(desertRef).catch((err) => new Error(err));
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * An object that holds all requests crud functionalities
 */
const RentalService = {
  getAllRentals: readAllRentalItems,
  getUserRentals: readRentalsOfUser,
  addRental: createRentalItem,
  likeRental: createDeleteLikeRental,
  removeRental: deleteRentalItem,
};

export default RentalService;
