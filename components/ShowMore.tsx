"use client";

import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import { updateSeachParams } from "@/utils";
import { CustomButton } from "./CustomButton";

export const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSeachParams("limit", `${newLimit}`);

    router.push(newPathName + "#discover");
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton title="Show more" btnType="button" containerStyles="bg-primary-blue rounded-full text-white" handleClick={handleNavigation} />
      )}
    </div>
  );
};
