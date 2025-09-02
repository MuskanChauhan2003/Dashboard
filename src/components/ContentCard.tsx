
import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useContent } from "@/contexts/ContentContext";

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  source: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const ContentCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  source,
  timestamp,
  likes,
  comments,
}: ContentCardProps) => {
  const { isLiked, isSaved, toggleLike, toggleSave } = useContent();
  const [likeCount, setLikeCount] = useState(likes);

  const liked = isLiked(id);
  const saved = isSaved(id);

  const handleLike = () => {
    toggleLike(id);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    toggleSave(id);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sports':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'entertainment':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'finance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 animate-fade-in group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getCategoryColor(category)}>
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-medium">{source}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timestamp}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg leading-tight mb-2 text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${
                liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
              } hover:text-red-500 dark:hover:text-red-400`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Share className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`${
                saved ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
              } hover:text-blue-500 dark:hover:text-blue-400`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;