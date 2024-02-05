"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { BedDoubleIcon, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const formSchema = z.object({
  location: z.string().min(2).max(50),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z
    .string()
    .min(1, { message: "At least one adult must be selected" })
    .max(12, { message: "Maximum number of adults is 12" }),
  children: z
    .string()
    .min(0)
    .max(12, { message: "Maximum number of children is 12" }),
  rooms: z.string().min(1, {
    message: "Please, select at least one room",
  }),
});

function SearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      dates: {
        from: new Date(Date.now()),
        to: new Date(Date.now()),
      },
      adults: "1",
      children: "0",
      rooms: "1",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const checkin_day = values.dates.from.getDate().toString();
    const checkin_month = (values.dates.from.getMonth() + 1).toString();
    const checkin_year = values.dates.from.getFullYear().toString();
    const checkout_day = values.dates.to.getDate().toString();
    const checkout_month = (values.dates.to.getMonth() + 1).toString();
    const checkout_year = values.dates.to.getFullYear().toString();

    const checkIn = `${checkin_year}-${checkin_month}-${checkin_day}`;
    const checkOut = `${checkout_year}-${checkout_month}-${checkout_day}`;

    const url = new URL("http://www.booking.com/searchresults.html");
    url.searchParams.set("ss", values.location);
    url.searchParams.set("group_adults", values.adults);
    url.searchParams.set("group_children", values.children);
    url.searchParams.set("no_rooms", values.rooms);
    url.searchParams.set("checkin", checkIn);
    url.searchParams.set("checkout", checkOut);

    router.push(`/search?url=${url.href}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded"
      >
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white flex">
                  Location
                  <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>
                <FormMessage />

                <FormControl>
                  <Input placeholder="Curitiba, BR" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Dates</FormLabel>
                <FormMessage />

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        name="dates"
                        variant={"outline"}
                        className={cn(
                          "w-full lg:w-[300px] justify-start text-left font-normal bg-white rounded  ",
                          !field.value.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, "LLL dd, y")} -{" "}
                              {format(field.value?.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value?.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select your dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="rounded"
                      initialFocus
                      mode="range"
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full items-center space-x-2">
          <div className="grid items-center flex-1">
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Adults</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Adults"
                      {...field}
                      // className="bg-white rounded border-gray-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid items-center flex-1">
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Children</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Children"
                      {...field}
                      // className="bg-white rounded border-gray-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid items-center flex-1">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Rooms</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Rooms"
                      {...field}
                      // className="bg-white rounded border-gray-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="mt-auto">
            <Button
              className="bg-blue-500 text-base rounded text-white hover:bg-blue-700"
              type="submit"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
