import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpFormScheme } from "@/validation/formSchemes";
import { pagesPath } from "@/lib/$path";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

interface OTPInput {
  otp: string;
}

const OTP: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { isValid, isSubmitting, errors },
  } = useForm<OTPInput>({
    mode: "onChange",
    resolver: zodResolver(otpFormScheme),
  });

  /**
   * ワンタイムパスワードを送信する
   * @param inputValue フォームで入力した値
   */
  const submitOTP: SubmitHandler<OTPInput> = useCallback(
    async ({ otp }): Promise<void> => {
      try {
        // TODO ここでAPIを呼び出し
        console.log(otp);

        // 入力画面に遷移
        await router.replace(pagesPath.otp.complete.$url());
      } catch (error) {
        // TODO ここでtoastとか出すか
      }
    },
    [router]
  );

  /** OTP Credential API処理 */
  useEffect(() => {
    // OTP Credential APIが使用可能かどうか
    if (!("OTPCredential" in window)) {
      return;
    }

    const input = document.querySelector('input[autocomplete="one-time-code"]');

    if (input == null) {
      return;
    }

    const form = input.closest("form");
    const ac = new AbortController();
    const abort = (): void => ac.abort();

    if (form != null) {
      // ユーザー操作で送信したらabort
      form.addEventListener("submit", abort);
    }

    // OTP処理
    navigator.credentials
      .get({
        // @ts-expect-error
        otp: { transport: ["sms"] },
        signal: ac.signal,
      })
      .then(async (otp) => {
        // MEMO: hook formを使ってsetValue/trigger
        // @ts-expect-error
        setValue("otp", otp?.code ?? "");
        await trigger("otp");

        // バリデーションを満たしている
        if (isValid) {
          submitOTP({ otp: getValues("otp") });
        }
      })
      .catch((error) => {
        // 本来ならばここでできることはないが、便宜上エラーログを出すように
        console.log(error);
      });

    // クリーンアップ処理でlistenerをremove
    return () => {
      if (form != null) {
        form?.removeEventListener("submit", abort);
      }
    };
  }, [getValues, isValid, setValue, submitOTP, trigger]);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            ワンタイムパスワードを入力する
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">OTP Sample</h2>
        </div>

        <section>
          <form onSubmit={handleSubmit(submitOTP)} className="flex mt-2 flex-col justify-center">
            <label className="form-label mt-2 text-gray-700">ワンタイムパスワード</label>
            <input
              {...register("otp")}
              placeholder="半角英数字で入力してください"
              autoComplete="one-time-code"
              className="
                  form-control
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  mt-2
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {errors.otp != null && (
              <p className="mt-2 text-red-600" role="alert">
                {errors.otp.message}
              </p>
            )}
            <button
              disabled={!isValid || isSubmitting}
              className="mt-2 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              送信
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OTP;
