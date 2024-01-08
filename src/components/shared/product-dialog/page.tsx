"use client";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GrFormNext } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGlobalContext } from "@/context";
import CustomImage from "../custom-image";

const ProductDialog = () => {
  const { open, setOpen, product, addSpaceToNumber } = useGlobalContext();
  const [imageIndx, setImageIndx] = useState<number | null>(null);
  const [counter, setCounter] = useState<number>(1);

  const incrementCounter = () => {
    if (counter !== product?.stock) {
      setCounter((prev) => prev + 1);
    }
  };

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter((prev) => prev - 1);
    }
  };

  const handleOpenChange = () => {
    setOpen(false);
    setImageIndx(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className=" max-w-4xl px-8">
        <div className="w-full grid grid-cols-3 gap-5">
          <div className="w-full flex-col flex items-center justify-start">
            <div className="w-full h-96 bg-[#EFEFEF] rounded-md relative">
              <CustomImage
                image={
                  imageIndx !== null
                    ? (product?.images[imageIndx] as string)
                    : (product?.thumbnail as string)
                }
              />
            </div>
            <button className="p-2 mt-2 font-medium text-[14px] border border-gray-500 w-full rounded-md">
              Maxsulot haqidagi bor ma'lumot
            </button>
          </div>
          <div className="col-span-2">
            <h1 className="text-xl font-semibold line-clamp-2">
              {product?.title}
            </h1>
            <hr className="mt-5 bg-gray-700" />
            <div className="w-full mt-2">
              <span>Rangni tanlang:</span>
              <div className="flex items-start mt-2 w-full">
                {product?.images.map((item, indx) => (
                  <div
                    onClick={() => setImageIndx(indx)}
                    className={`relative cursor-pointer w-16 h-20 p-2 mr-2 border-2 rounded-md ${
                      imageIndx === indx ? "border-gray-900" : "border-gray-300"
                    } `}
                  >
                    <CustomImage image={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <span>Miqdor:</span>
              <div className="flex items-center mt-2">
                <div className="mr-2 border border-gray-300 rounded-md w-28 px-2 flex justify-between py-2">
                  <button
                    onClick={decrementCounter}
                    className={`${counter === 1 ? "text-gray-400" : ""}`}
                  >
                    <FiMinus />
                  </button>
                  <span>{counter}</span>
                  <button
                    onClick={incrementCounter}
                    className={`${
                      counter === product?.stock ? "text-gray-400" : ""
                    }`}
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className=" text-green-500 text-sm font-light">
                  Sotuvda {product?.stock} dona bor
                </span>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-lg font-semibold flex items-center">
                {addSpaceToNumber(
                  Math.floor(((product?.price as number) * 12340) / 2 * counter)
                )}{" "}
                so'm
                <span className="ml-5 line-through text-sm text-gray-400 font-normal">
                  {addSpaceToNumber(
                    Math.floor((product?.price as number) * 12340 + 100000 / 2)
                  )}{" "}
                  so'm
                </span>
                <div className="px-1 ml-2 capitalize text-sm rounded-sm bg-[#5000AA] text-white">
                  {product?.category.split("-").join(" ")}
                </div>
              </span>
              <div className="mt-2 w-full bg-[#F1F3F6] py-3 cursor-pointer px-2 rounded-md flex items-center">
                <span className="bg-[#FFFF00] p-2 font-semibold rounded-md">
                  Oyiga{" "}
                  {addSpaceToNumber(
                    Math.floor(((product?.price as number) * 12340) / 12 / 2)
                  )}{" "}
                  so'mdan
                </span>
                <span className="ml-2 flex items-center justify-between">
                  muddatli to'lov
                </span>
                <GrFormNext className=" ml-auto mr-4 text-lg" />
              </div>
              <button className="w-full p-4 mt-3 rounded-lg text-white font-semibold bg-[#7000FF]">
                Savatga Qo'shish
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
