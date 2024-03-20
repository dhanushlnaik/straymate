import * as React from "react";
import Image from "next/image";
import "react-awesome-slider/dist/styles.css";
import AwesomeSlider from "react-awesome-slider";

const imgList = ["/hero2.jpg", "/hero3.jpg"];

export const ImageSlider = () => {
  return (
    <AwesomeSlider className="pb-10">
      {imgList.map((imageUrl, index) => (
        <div key={index} data-src={imageUrl}>
          <Image src={imageUrl} alt="Image" width={300} height={200} />
        </div>
      ))}
    </AwesomeSlider>
  );
};
