import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  const hasLink = testimonial.authorLink && testimonial.authorLink.trim() !== "";

  const AuthorContent = (
    <>
      <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
        <Image
          src={testimonial.authorImg}
          alt={testimonial.authorName}
          className="w-full h-full object-cover"
          width={50}
          height={50}
        />
      </div>

      <div>
        <h3 className="font-medium text-dark">{testimonial.authorName}</h3>
        <p className="text-custom-sm">{testimonial.authorRole}</p>
      </div>
    </>
  );

  return (
    <div className="shadow-testimonial bg-white rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">
      <div className="flex items-center gap-1 mb-5">
        <Image src="/images/icons/icon-star.svg" alt="star" width={15} height={15} />
        <Image src="/images/icons/icon-star.svg" alt="star" width={15} height={15} />
        <Image src="/images/icons/icon-star.svg" alt="star" width={15} height={15} />
        <Image src="/images/icons/icon-star.svg" alt="star" width={15} height={15} />
        <Image src="/images/icons/icon-star.svg" alt="star" width={15} height={15} />
      </div>

      <p className="text-dark mb-6">{testimonial.review}</p>

      {hasLink ? (
        <a
          href={testimonial.authorLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          {AuthorContent}
        </a>
      ) : (
        <div className="flex items-center gap-4">{AuthorContent}</div>
      )}
    </div>
  );
};

export default SingleItem;