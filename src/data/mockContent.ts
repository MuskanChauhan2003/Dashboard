
export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  source: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "AI Breakthrough: New Model Achieves Human-Level Performance",
    description: "Researchers have developed a new AI model that demonstrates unprecedented levels of natural language understanding, potentially revolutionizing how we interact with technology.",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
    category: "Technology",
    source: "Tech Daily",
    timestamp: "2 hours ago",
    likes: 2500,
    comments: 128,
  },
  {
    id: "2", 
    title: "The Last Journey: New Sci-Fi Blockbuster Sets Box Office Records",
    description: "The highly anticipated space adventure film breaks opening weekend records, combining stunning visuals with compelling storytelling.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    category: "Entertainment",
    source: "Entertainment Weekly", 
    timestamp: "3 hours ago",
    likes: 1800,
    comments: 92,
  },
  {
    id: "3",
    title: "Major League Announces New Season Format Changes", 
    description: "Exciting changes coming to the upcoming sports season, including new playoff structures and enhanced fan engagement opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    category: "Sports",
    source: "Sports Network",
    timestamp: "4 hours ago", 
    likes: 920,
    comments: 76,
  },
  {
    id: "4",
    title: "Market Analysis: Tech Stocks Show Strong Recovery",
    description: "Expert analysis on upcoming market trends and investment opportunities, with focus on emerging technology sectors and growth potential.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    category: "Finance",
    source: "Financial Times",
    timestamp: "5 hours ago",
    likes: 1200,
    comments: 45,
  },
  {
    id: "5",
    title: "Next Generation Computing: Quantum Breakthrough",
    description: "Scientists achieve major milestone in quantum computing, bringing us closer to practical applications in cryptography and drug discovery.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    category: "Technology", 
    source: "Science Today",
    timestamp: "6 hours ago",
    likes: 3200,
    comments: 156,
  },
  {
    id: "6",
    title: "Award Show Highlights: Best Moments of the Night",
    description: "A recap of the most memorable moments, speeches, and performances from last night's prestigious entertainment awards ceremony.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    category: "Entertainment",
    source: "Entertainment Today",
    timestamp: "8 hours ago",
    likes: 2100,
    comments: 203,
  }
];
