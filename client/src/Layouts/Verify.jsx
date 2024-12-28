import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verify } from "../features/userSlice";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";

const Verify = () => {
  const { userId } = useParams();
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAccount = async () => {
      try {
        await dispatch(verify(userId, navigate));
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    verifyAccount();
  }, [dispatch, userId, navigate]);
  if (loading) return <Loader />;
  if (error) return <AlertMessage message={`Error: ${error}`} />;

  return <></>;
};

export default Verify;
