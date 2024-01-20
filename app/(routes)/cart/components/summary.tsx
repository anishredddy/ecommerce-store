"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();

  const [phonenum, setPhonenum] = useState("");
  const [add, setAdd] = useState("");
  //   useEffect(() => {
  //     if (searchParams.get("success")) {
  //       toast.success("Payment completed.");
  //       removeAll();
  //     }

  //     if (searchParams.get("canceled")) {
  //       toast.error("Something went wrong.");
  //     }
  //   }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => ({ productId: item.id })),
        phone: phonenum,
        address: add,
      });

      toast.success("Your Order is Successfully Placed");

      removeAll();

      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const changePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhonenum(event.target.value);
  };

  const changeAddr = (event: ChangeEvent<HTMLInputElement>) => {
    setAdd(event.target.value);
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <div className="mt-7 border-t">
        <p className="text-lg font-medium text-gray-900 mt-5 ">Enter Details</p>
        <div className="flex items-center justify-between pt-4 mt-3  border-t">
          <p className="mb-0">Phone Number:</p>
          <input
            className="mb-0 border border-black"
            type="number"
            size={15}
            value={phonenum}
            onChange={changePhone}
          />
        </div>
        <div className="flex flex-col mt-3">
          <p className="mb-0">Address:</p>
          <input
            className="mb-0 border border-black"
            value={add}
            onChange={changeAddr}
            type="text"
          />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
