import Link from "next/link";
import { Listing } from "../../typings";

function Card(
  {
    title,
    description,
    booking_metadata,
    link,
    price,
    url,
    rating_word,
    rating,
    rating_count,
  }: Listing,
  index: number
) {
  return (
    <div
      key={index}
      className="flex space-y-2 justify-between space-x-4 p-5 border rounded-lg"
    >
      <img
        src={url}
        alt="image of the property"
        className="h-44 w-44 rounded-lg"
      />
      <div className="flex flex-1 space-x-5 justify-between">
        <div>
          <Link
            href={link}
            className="font-bold text-blue-500 hover:text-blue-600 hover:underline hover:"
          >
            {title}
          </Link>
          <p className="text-sm">{description}</p>
          <p className="text-xs">{booking_metadata}</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-start justify-end space-x-2 text-right">
            <div>
              <p className="font-bold">{rating_word}</p>
              <p className="text-sm">{rating_count}</p>
            </div>
            <p className="flex items-center justify-center font-bold text-sm w-12 h-12 text-white bg-blue-900 rounded-lg flex-shrink-0">
              {rating || "N/A"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
