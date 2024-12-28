import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import config from "../config/config";

const initialState = {
  user: [],
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegiserRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userRegiserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      toast.success(action.payload.message);
    },
    userRegiserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
    userLoginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.userInfo = {
        userId: action.payload.userId,
        isAdmin: action.payload.isAdmin,
      };
      state.token = action.payload.token;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      localStorage.setItem("token", action.payload.token);
      toast.success(action.payload.message);
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      toast.success("Logout successful!");
    },
    verifyRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    verifySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      toast.success(action.payload.message);
    },
    verifyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload.message);
    },
    forgotPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      toast.success(action.payload.message);
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
    otpRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    otpSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token; // Save token in state
      localStorage.setItem("token", action.payload.token); // Store in localStorage
      toast.success(action.payload.message);
    },

    otpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
    resetPasswordRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      toast.success(action.payload.message);
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(`Error: ${action.payload}`);
    },
  },
});

export const {
  userRegiserRequest,
  userRegiserSuccess,
  userRegiserFailure,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  logout,
  verifyRequest,
  verifySuccess,
  verifyFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  otpRequest,
  otpSuccess,
  otpFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const register = (userData, navigate) => async (dispatch) => {
  dispatch(userRegiserRequest());
  try {
    const response = await fetch(`${config.url}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      dispatch(userRegiserSuccess(data));
      navigate("/login");
    }
  } catch (error) {
    dispatch(userRegiserFailure(error.message));
    throw error;
  }
};

export const verify = (userId, navigate) => async (dispatch) => {
  dispatch(verifyRequest());
  try {
    const response = await fetch(`${config.url}/api/auth/verify/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      dispatch(verifySuccess(data)); // Dispatch success action with data
      navigate("/login");
    }
  } catch (error) {
    dispatch(verifyFailure(error.message));
    throw error;
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  dispatch(userLoginRequest());
  try {
    const response = await fetch(`${config.url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      dispatch(userLoginSuccess(data));
      navigate(data.isAdmin ? "/admin" : "/");
    }
  } catch (error) {
    dispatch(userLoginFailure(error.message));
    throw error;
  }
};

export const forgotPassword = (userData, navigate) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const response = await fetch(`${config.url}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      dispatch(forgotPasswordSuccess(data));
      navigate("/otp");
    }
  } catch (error) {
    dispatch(forgotPasswordFailure(error.message));
    throw error;
  }
};
export const otp = (userData, navigate) => async (dispatch) => {
  dispatch(otpRequest());
  try {
    const response = await fetch(`${config.url}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      dispatch(otpSuccess(data));
      navigate("/resetpassword");
    }
  } catch (error) {
    dispatch(otpFailure(error.message));
    throw error;
  }
};

export const resetPassword = (userData, navigate) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const response = await fetch(`${config.url}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      dispatch(resetPasswordSuccess(data));
      navigate("/login");
    }
  } catch (error) {
    dispatch(resetPasswordFailure(error.message));
    throw error;
  }
};
