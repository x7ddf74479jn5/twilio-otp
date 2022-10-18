import * as z from "zod";
import { phoneNumberRegexp, numberRegex } from "./regex";

/** サインアップフォームバリデーションスキーマ */
export const signupFormScheme = z.object({
  phoneNumber: z
    .string()
    .min(1, "必須項目です")
    .regex(numberRegex, {
      message: "半角英数字のみが入力できます",
    })
    .regex(phoneNumberRegexp, {
      message: "携帯電話番号の形式で入力してください",
    }),
});

/** ワンタイムパスワードフォームバリデーションスキーマ */
export const otpFormScheme = z.object({
  otp: z
    .string()
    .min(1, "必須項目です")
    .regex(numberRegex, {
      message: "半角英数字のみが入力できます",
    })
    .length(6, "6桁で入力してください"),
});
