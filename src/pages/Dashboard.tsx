
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCard from "@/components/ContentCard";
import { mockContent } from "@/data/mockContent";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, preferences } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", label: "All" },
    { id: "technology", label: "Technology" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
    { id: "finance", label: "Finance" },
  ];

  // Filter content based on user preferences
  const getFilteredContent = () => {
    let content = mockContent;
    
    // Filter by category preferences
    if (activeCategory === "all") {
      content = content.filter(item => {
        const category = item.category.toLowerCase();
        return preferences.categories[category as keyof typeof preferences.categories];
      });
    } else {
      content = content.filter(item => {
        const category = item.category.toLowerCase();
        return category === activeCategory && preferences.categories[category as keyof typeof preferences.categories];
      });
    }
    
    return content;
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Good morning, {user?.name || 'User'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your content today.
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:inline-flex">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-8">
          {filteredContent.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    {...item}
                  />
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <Button className="bg-primary hover:bg-primary-600 text-white">
                  Load More
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No content available for your selected preferences. 
                Check your settings to enable more categories.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Right Sidebar for larger screens */}
      <div className="hidden xl:block fixed right-6 top-24 w-80">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4 dark:text-white">Your Favorites</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=60&h=60&fit=crop"
                alt="Tech News Daily"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-sm dark:text-white">Tech News Daily</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">News</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=60&h=60&fit=crop"
                alt="Sports Highlights"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-sm dark:text-white">Sports Highlights</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sports</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
          <h3 className="font-semibold text-lg mb-4 dark:text-white">Suggested Content</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-medium text-sm mb-1 dark:text-white">Latest Tech Trends</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Technology</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-medium text-sm mb-1 dark:text-white">Market Analysis</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Finance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;