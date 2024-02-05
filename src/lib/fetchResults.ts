import * as cheerio from "cheerio";
import axios from "axios";
import { Listing } from "../../typings";

export type SearchParams = {
  url: string;
  checkin: string;
  checkout: string;
  group_adults: string;
  group_children: string;
  no_rooms: string;
};

export async function fetchResults(searchParams: SearchParams) {
  const url = new URL(searchParams.url);
  Object.keys(searchParams).forEach((key) => {
    if (key === "url" || key === "location") return;

    const value = searchParams[key as keyof SearchParams];
    if (typeof value === "string") {
      url.searchParams.append(key, value);
    }
  });

  const response = await axios.get(url.href);
  const html = await response.data;

  const $ = cheerio.load(html);

  const lookItems = $("[data-testid='property-card-container']");

  const results = new Array<Listing>();
  lookItems.each((index, element) => {
    results.push({
      title: $(element).find("[data-testid='title']").text(),
      description: $(element).find("h4.abf093bdfe").text(),
      booking_metadata: $(element).find("div.abf093bdfe.d323a31618").text(),
      link: String($(element).find("a.a78ca197d0").attr("href")),
      price: $(element).find("span.f6431b446c").text(),
      url: String($(element).find("img").attr("src")),
      rating_word: $(element)
        .find("div.a3b8729ab1.e6208ee469.cb2cbb3ccb")
        .text(),
      rating: $(element).find("div.a3b8729ab1.d86cee9b25").text(),
      rating_count: $(element)
        .find("div.abf093bdfe.f45d8e4c32.d935416c47")
        .text(),
    });
  });

  console.log("First Result >>>", results[0].title);

  return {
    content: {
      listings: results,
      total_listings: $("h1").text(),
    },
  };
}
