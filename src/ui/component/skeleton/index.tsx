import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = (props: any) => {
  return <Skeleton {...props} />;
};

export default SkeletonLoader;
