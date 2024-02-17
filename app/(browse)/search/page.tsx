import { redirect } from "next/navigation";
import SearchResult, { SearchResultSkeleton } from "./_components/SearchResult";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResult term={searchParams.term}/>
      </Suspense>
    </div>
  );
}
