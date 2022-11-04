/* eslint-disable no-undef */
import http from "../../helpers/http";

const { REACT_APP_BACKEND_URL: URL } = process.env;

// ---------- create ----------
// ---------- create ----------
// ---------- create ----------

export const addKelas = (formData, token, history) => {
  return async (dispatch) => {
    const form = new URLSearchParams();

    form.append("nama", formData.nama);
    form.append("jenjangKelas", formData.jenjangKelas);
    form.append("tahunAjaran", formData.tahunAjaran);
    form.append("status", formData.status);

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await http(token).post(`${URL}/kelas`, form.toString());
      dispatch({
        type: "KELAS_ADD",
        payload: data.message,
      });

      history.push("/");
      dispatch({ type: "SET_LOADING", payload: false });
      window.alert(data.message);
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      window.alert(error.response.data.message);
    }
  };
};

// ---------- read ----------
// ---------- read ----------
// ---------- read ----------

export const getSiswa =
  (token = null, targetPage = "", params = {}) =>
  async (dispatch) => {
    let initialUrl;

    if (targetPage !== "") {
      initialUrl = `${targetPage}&limit=20`;
    } else {
      initialUrl = `${URL}/siswa?limit=20`;
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
        type: "SISWA_GET",
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

export const deleteSiswa = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await http(token).delete(`${URL}/siswa/${id}`);
      dispatch({
        type: "SISWA_DELETE",
        payload: data.message,
      });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "SISWA_ERROR",
        payload: err.response.data.message,
      });
      window.alert(err.response.data.message);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};
