import React, { useEffect, useState } from "react";

import Image from "next/image";
import feat1Src from "@/assets/hands-analytics.png";
import feat2Src from "@/assets/happy-bunch-chat.png";
import feat3Src from "@/assets/stuck-at-home-brainstorming.png";
import feat4Src from "@/assets/cool-kids-brainstorming.png";
import feat5Src from "@/assets/family-values-best-friends.png";
import { useRouter } from "next/router";
const Features = () => {
  const router = useRouter();
  const [currentFeature, setCurrentFeature] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const features = [
    {
      text: "Expense Tracker and Analytics",
      image: feat1Src,
    },
    {
      text: "Flexible Splitting Options",
      image: feat2Src,
    },
    {
      text: "Group Expense Fund",
      image: feat3Src,
    },
    {
      text: "Community",
      image: feat4Src,
    },
    {
      text: "Group Creation",
      image: feat5Src,
    },
  ];
  return (
    <div className="flex w-full flex-col gap-4 p-4 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="font-lato text-3xl font-bold">
          Feature {currentFeature + 1}:
        </p>
        <p className="font-lato text-3xl font-bold">
          {features[currentFeature]?.text}
        </p>
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <Image
            className="w-fit"
            src={features[currentFeature]?.image as unknown as string}
            width={200}
            height={200}
            alt=""
          />
        </div>
      </div>
      <div className="mx-auto flex w-fit gap-2">
        {features.map((feature, index) => (
          <button
            key={index}
            className={`ml-auto h-4 w-4 rounded-full ${
              index === currentFeature ? "bg-zinc-400" : "bg-zinc-300"
            }`}
            onClick={() => setCurrentFeature(index)}
          ></button>
        ))}
      </div>
      <button className="ml-auto" onClick={() => router.push("/home")}>
        ...Skip
      </button>
    </div>
  );
};

export default Features;
