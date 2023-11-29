import Footer from "@/components/Footer";
import { db } from "@/utils/db";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import arrow from "@/assets/clarity-arrow-line.svg";
import cash from "@/assets/payCash.svg";
import card from "@/assets/payCard.png";
import GCash from "@/assets/GCash.png";
import paypal from "@/assets/PayPal.png";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Payment = ({
  transaction,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  console.log(transaction);
  // function createOrder() {
  //   return fetch("/api/payment/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(transaction),
  //   })
  //     .then((response) => response.json())
  //     .then((order: unknown) => {
  //       // Your code here after create the order
  //       console.log({ order });
  //       return "here should be order id but im bad with typescript";
  //     });
  // }
  // async function onApprove() {
  //   await router.push("/home");
  // }
  return (
    <div className="min-h-screen  w-full p-4">
      <header className="relative flex w-full justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">Payment</h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <p className="font-lato font-bold">Payment options:</p>
        <div className="flex w-full flex-wrap justify-center gap-8">
          <button className="flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 p-4">
            <p className="font-lato font-bold">Pay with</p>
            <Image src={cash as string} width={120} height={120} alt="" />
          </button>
          <button className="flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 p-4">
            <p className="font-lato font-bold">Pay with</p>
            <Image src={card} width={120} height={120} alt="" />
          </button>
          <button className="flex flex-col items-center justify-center gap-2 rounded-md bg-blue-800 p-4 text-white">
            <p className="font-lato font-bold">Pay with</p>
            <Image src={GCash} width={120} height={120} alt="" />
          </button>
          <button className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-4 text-white">
            <p className="font-lato font-bold">Pay with</p>
            <Image src={paypal} width={120} height={120} alt="" />
          </button>
          {/* <PayPalButtons
            style={{ layout: "vertical" }}
            disabled={false}
            forceReRender={[{ layout: "vertical" }]}
            fundingSource={undefined}
            createOrder={createOrder}
            onApprove={onApprove}
          /> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { params } = ctx;
  const { id } = params as {
    id: string | undefined;
  };
  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const transaction = await db.transactionNotification.findFirst({
    where: {
      id,
    },
  });
  if (!transaction) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  type StringifiedTransaction = Omit<typeof transaction, "createdAt"> & {
    createdAt: string;
  };
  return {
    props: {
      transaction: JSON.parse(
        JSON.stringify(transaction),
      ) as StringifiedTransaction,
    },
  };
};

export default Payment;
