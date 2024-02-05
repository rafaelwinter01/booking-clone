export type Result = {
  content: {
    listings: Listing[];
    total_listings: string;
  };
};

export type Listing = {
  title: string;
  description: string;
  booking_metadata: string;
  link: string;
  price: string;
  url: string;
  rating_word: string;
  rating: string;
  rating_count: string | null;
};
