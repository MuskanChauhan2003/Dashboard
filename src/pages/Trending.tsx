
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import { mockContent } from "@/data/mockContent";
import { useSearch } from "@/contexts/SearchContext";

const Trending = () => {
  const [loadMore, setLoadMore] = useState(false);
  const { debouncedSearchQuery } = useSearch();
  
  // Sort by likes for trending content and filter by search
  let trendingContent = [...mockContent].sort((a, b) => b.likes - a.likes);
  
  if (debouncedSearchQuery) {
    trendingContent = trendingContent.filter(item =>
      item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }
  
  const displayContent = loadMore ? trendingContent : trendingContent.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h1>
          <p className="text-gray-600 dark:text-gray-400">Most popular content across all categories</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium dark:text-white">Last updated: Just now</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {displayContent.length} of {trendingContent.length} trending items
            {debouncedSearchQuery && (
              <span className="ml-2 text-primary">
                (filtered by "{debouncedSearchQuery}")
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayContent.map((item, index) => (
          <div key={item.id} className="relative">
            <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {index + 1}
            </div>
            <ContentCard {...item} />
          </div>
        ))}
      </div>

      {!loadMore && trendingContent.length > 6 && (
        <div className="flex justify-center mt-12">
          <Button 
            onClick={() => setLoadMore(true)}
            className="bg-primary hover:bg-primary-600 text-white"
          >
            Load More Trending
          </Button>
        </div>
      )}

      {debouncedSearchQuery && displayContent.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default Trending;
