import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const auth_url = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (req) => ({
        url: `${auth_url}/login`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetPassword: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/forget-password`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    resendForgetOTP: build.mutation({
      query: () => {
        return {
          url: `/otp/resend-otp`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    forgetOtpVerify: build.mutation({
      query: (otpData) => {
        return {
          url: `${auth_url}/verify-otp`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: build.mutation({
      query: (resetData) => {
        return {
          url: `${auth_url}/forgot-password-reset`,
          method: "PATCH",
          body: resetData,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    changePassword: build.mutation({
      query: (resetData) => {
        return {
          url: `${auth_url}/change-password`,
          method: "PATCH",
          body: resetData,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResendForgetOTPMutation,
  useForgetOtpVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;
