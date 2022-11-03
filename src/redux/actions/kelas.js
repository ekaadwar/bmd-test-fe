/* eslint-disable no-undef */
import http from "../../helpers/http";

const { REACT_APP_BACKEND_URL: URL } = process.env;

export const getData =
  (token = null, targetPage = "", params = {}) =>
  async (dispatch) => {
    let initialUrl;

    if (targetPage !== "") {
      initialUrl = `${targetPage}&limit=20`;
    } else {
      initialUrl = `${URL}/kelas?limit=20`;
    }

    let url = initialUrl;

    const paramKeys = Object.keys(params);
    const paramValues = Object.values(params);
    const paramLength = paramKeys.length;

    if (paramLength > 0) {
      for (let i = 0; i < paramLength; i++) {
        url += `&${paramKeys[i]}=${paramValues[i]}`;
      }
    }
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await http(token).get(url);
      console.log(url);

      console.log(data);

      dispatch({
        type: "KELAS_GET",
        payload: data,
      });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (err) {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

//   ---------- delete ----------
//   ---------- delete ----------
//   ---------- delete ----------

export const deleteKelas = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await http(token).delete(`${URL}/kelas/${id}`);
      dispatch({
        type: "KELAS_DELETE",
        payload: data.message,
      });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "KELAS_ERROR",
        payload: err.response.data.message,
      });
      window.alert(err.response.data.message);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};
