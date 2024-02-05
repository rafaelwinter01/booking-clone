import { Skeleton } from "@/components/ui/skeleton";

function LoadingResults() {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <p className="text-center animate-pulse font-bold text-[#013B94] pt-10">
          Calm down... We are looking for the best solution for your trip!
        </p>
      </div>
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 bg-[#013B94] rounded-full animate-bounce"></div>
      </div>

      <div className="space-y-2 p-5">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex space-x-2 mx-auto max-w-7xl">
            <Skeleton className="h-20 w-20 md:h-44 md:w-44 rounded-lg bg-slate-200" />
            <Skeleton className="h-44 w-full rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default LoadingResults;
