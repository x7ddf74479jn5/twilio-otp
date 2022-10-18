import type { NextPage } from "next";
import Link from "next/link";
import { pagesPath } from "@/lib/$path";

const OTPComplete: NextPage = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">設定完了！</h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">OTP Sample</h2>
        </div>
        <div className="text-center">
          <Link href={pagesPath.otp.$url()} className="mt-8">
            <span className="no-underline hover:underline">トップへ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPComplete;
