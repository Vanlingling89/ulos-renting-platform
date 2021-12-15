import { firestore } from "../config/firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "@firebase/firestore";

const REQUEST_QUERY = collection(firestore, "requests");

/**
 * CREATE A NEW REQUEST ENTRY TO FIRESTORE
 * @param {string} userID the current user id
 * @param {object} values the form/input values
 */
const createRequestItem = async (userID, values) => {
  let { item, range_from, range_to, description, location, contact } = values;
  try {
    await addDoc(REQUEST_QUERY, {
      item,
      description,
      location,
      contact,
      range_from: parseFloat(range_from, 10),
      range_to: parseFloat(range_to, 10),
      id_user: userID,
    });
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * GET ALL REQUEST STORED IN FIRESTORE
 * @returns an array of requests object
 */
const readAllRequestItems = async () => {
  try {
    const data = await getDocs(REQUEST_QUERY);
    let requests = data.docs.map((doc) => ({ ...doc.data(), id_req: doc.id }));
    return requests;
  } catch (error) {
    return new Error(error);
  }
};

/**
 * READ A REQUEST PER USER
 * @param {string} userID id of user is required
 * @returns user made requests
 */
const readRequestsOfUser = async (userID) => {
  try {
    const find = query(REQUEST_QUERY, where("id_user", "==", userID));
    const data = await getDocs(find);
    let userRequests = data.docs.map((items) => ({
      ...items.data(),
      id_req: items.id,
    }));
    return userRequests;
  } catch (error) {
    return new Error(error);
  }
};

/**
 * DELETE ID FROM FIRESTORE USING REQUEST ID
 * @param {string} requestID request id that will be deleted
 */
const deleteRequestItem = async (requestID) => {
  try {
    const requestTag = doc(firestore, "requests", requestID);
    await deleteDoc(requestTag);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * An object that holds all requests crud functionalities
 */
const RequestService = {
  getAllRequests: readAllRequestItems,
  getUserRequest: readRequestsOfUser,
  addRequest: createRequestItem,
  removeRequest: deleteRequestItem,
};

export default RequestService;
