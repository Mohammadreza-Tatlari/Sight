import { getSearch } from "@/lib/search-service";
import SearchResultCard, { SearchResultCardSkeleton } from "./SearchResultCard";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultProps{
    term?: string;
}

export default async function SearchResult({term}:SearchResultProps) {

    const data = await getSearch(term)
  return (
    <>
    <div>
        <h2 className="text-lg font-semibold mb-4">
            Results for term &quot;{term}&quot;
        </h2>
        {data.length === 0 && (
            <p className="text-muted-foreground">
                No result is found.
            </p>
        )}
        <div>
            {data.map((result) => (
                <SearchResultCard data={result} key={result.id}/>
            ))}
        </div>
    </div>
    </>
  )
}

export function SearchResultSkeleton(){
    return(
        <div>
                <Skeleton className="h-8 w-[290px] mb-4"/>
                <div className="flex flex-col gap-y-4">
                    {[...Array(4)].map((_,i) => (
                        <SearchResultCardSkeleton key={i}/>
                    ))}
                </div>
        </div>
    )
}