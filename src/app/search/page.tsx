import Card from "@/components/Card";
import { SearchParams, fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import React from "react";
import { Listing } from "../../../typings";

type SearchPageProps = {
  searchParams: SearchParams;
};

async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.url) return notFound();

  const results = await fetchResults(searchParams);
  if (!results) return <div>No results were found...</div>;
  console.log("Total results found: ", results.content.listings.length);

  return (
    <section>
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Search Results</h1>
        <h2 className="pb-3">
          Dates of trip:{" "}
          <span className="italic ml-2">
            {searchParams.checkin} to {searchParams.checkout}
          </span>
        </h2>
        <hr className="mb-5" />
        <h3 className="font-semibold text-xl">
          {results.content.total_listings}
        </h3>
        <div className="space-y-2 mt-5">
          {results.content.listings.map((item: Listing, i) => (
            // eslint-disable-next-line react/jsx-key
            <Card {...item} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
