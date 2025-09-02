
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentContextType {
  likedPosts: Set<string>;
  savedPosts: Set<string>;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  isLiked: (postId: string) => boolean;
  isSaved: (postId: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('contenthub_liked_posts');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [savedPosts, setSavedPosts] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('contenthub_saved_posts');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      localStorage.setItem('contenthub_liked_posts', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      localStorage.setItem('contenthub_saved_posts', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const isLiked = (postId: string) => likedPosts.has(postId);
  const isSaved = (postId: string) => savedPosts.has(postId);

  const value: ContentContextType = {
    likedPosts,
    savedPosts,
    toggleLike,
    toggleSave,
    isLiked,
    isSaved,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
