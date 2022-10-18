import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormScheme } from "@/validation/formSchemes";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { pagesPath } from "@/lib/$path";

interface ISignupInput {
  phoneNumber: string;
}

const OTPRequest: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ISignupInput>({
    mode: "onChange",
    resolver: zodResolver(signupFormScheme),
  });

  /**
   * 電話を送信する
   * @param inputValue フォームで入力した値
   */
  const submitPhone: SubmitHandler<ISignupInput> = async ({ phoneNumber }): Promise<void> => {
    try {
      const phone = `+81${parseInt(phoneNumber, 10)}`;

      const { data, error } = await supabase.functions.invoke("send-message", {
        body: JSON.stringify({ toMobile: phone }),
      });

      if (error !== null) {
        alert(error);
      }

      console.log({ data });

      // 入力画面に遷移
      await router.push(pagesPath.otp.$url());
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">2段階認証を行う</h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">OTP Sample</h2>
        </div>

        <section>
          <form onSubmit={handleSubmit(submitPhone)} className="flex mt-2 flex-col justify-center">
            <label className="form-label mt-2 text-gray-700">携帯電話番号</label>
            <input
              {...register("phoneNumber")}
              placeholder="半角英数字で入力してください"
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
            <p className="mt-2 text-sm">例）08000000000</p>
            {errors.phoneNumber != null && (
              <p className="mt-2 text-red-600" role="alert">
                {errors.phoneNumber.message}
              </p>
            )}

            <button
              disabled={!isValid || isSubmitting}
              className="mt-2 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              SMSを送信
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default OTPRequest;
