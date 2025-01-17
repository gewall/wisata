import React, { Suspense } from "react";
import FormLogin from "./_sections/FormLogin";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="border-2 p-4 rounded-md w-80">
        <h5 className="font-bold text-2xl py-4 text-center">LOGIN</h5>
        <Suspense fallback={<Skeleton />}>
          <FormLogin />
        </Suspense>
      </div>
    </div>
  );
};

export default Login;
