/* eslint-disable no-undef */
import http from "../../helpers/http";

const { REACT_APP_BACKEND_URL: URL } = process.env;

export const authSignUp = (formData) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    const form = new URLSearchParams();
    form.append("nama", formData.name);
    form.append("noHp", formData.noHp);
    form.append("email", formData.email);
    form.append("password", formData.password);

    try {
      const { data } = await http().post(
        `${URL}/auth/register`,
        form.toString()
      );
      dispatch({
        type: "AUTH_REGISTER",
        payload: data.message,
      });

      formData.navigate.push("/signin");
      dispatch({ type: "SET_LOADING", payload: false });
      window.alert(data.message);
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      window.alert(error.response.data.message);
    }
  };
};

export const authSignin = (dataForm) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    const form = new URLSearchParams();

    form.append("email", dataForm.email);
    form.append("password", dataForm.password);

    try {
      const { data } = await http().post(`${URL}/auth/login`, form.toString());
      dispatch({
        type: "AUTH_LOGIN",
        payload: {
          token: data.results.token,
          userId: data.results.userId,
          role: data.results.role,
          msg: data.message,
        },
      });
      dataForm.navigate.push("/profile");

      dispatch({ type: "SET_LOADING", payload: false });
      window.alert(data.message);
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      window.alert(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
};

export const authLogout = () => {
  return (dispatch) => {
    dispatch({ type: "AUTH_CLEAR" });
  };
};
