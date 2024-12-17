import React from "react";

type Props = {
  rating: number; // Nilai rating antara 0 hingga 5
  maxRating?: number; // Maksimal rating, defaultnya 5
};

const Rating = ({ rating, maxRating = 5 }: Props) => {
  const filledStars = Math.floor(rating); // Bintang penuh
  const hasHalfStar = rating % 1 !== 0; // Cek apakah ada bintang setengah
  const emptyStars = maxRating - filledStars - (hasHalfStar ? 1 : 0); // Bintang kosong

  return (
    <div className="flex items-center">
      {/* Render bintang penuh */}
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`filled-${index}`}
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}

      {/* Render bintang setengah */}
      {hasHalfStar && (
        <svg
          className="w-4 h-4 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
      )}

      {/* Render bintang kosong */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`empty-${index}`}
            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}

      {/* Teks Rating */}
      <p className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {rating.toFixed(1)} / {maxRating}
      </p>
    </div>
  );
};

export default Rating;
