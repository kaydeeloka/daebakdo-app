import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coffee, Plane, // Scenario Icons
  Brain, Leaf,   // Topic Icons
  MessageCircle, Zap, // Category Icons
  ArrowLeft, HelpCircle,
  Utensils, Bus, Calculator, Languages // New Category Icons
} from 'lucide-react';

// ==========================================
// CONFIGURATION: ICONS
// ==========================================
const ICON_MAP: Record<string, React.ElementType> = {
  // Main Categories
  scenario_cat: MessageCircle,
  skill_cat: Zap,
  
  // Skill Sub-Categories
  cat_food: Utensils,
  cat_transport: Bus,
  cat_number: Calculator,
  cat_word: Languages,

  // Scenarios
  coffee: Coffee,
  plane: Plane,
  
  // Topics
  general: Brain,
  nature: Leaf,
  
  // Fallback
  default: HelpCircle
};

export interface TopicItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  progress?: { current: number; total: number };
  onClick: () => void;
}

interface GameTopicScreenProps {
  title: string;
  subtitle?: string;
  items: TopicItem[];
  onBack?: () => void;
}

export const GameTopicScreen: React.FC<GameTopicScreenProps> = ({
  title,
  subtitle,
  items,
  onBack,
}) => {

  const renderCard = (item: TopicItem, index: number) => {
    // If icon is found in map, use it. Otherwise check if it's an Emoji string.
    const IconComponent = ICON_MAP[item.icon];
    const isEmoji = !IconComponent && item.icon.match(/\p{Emoji}/u);

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.98 }}
        onClick={item.onClick}
        /* CONFIG: Card Size & Style */
        className="bg-white rounded-3xl p-5 shadow-sm border border-transparent hover:border-primary/20 cursor-pointer flex flex-col items-center text-center h-full min-h-[220px] justify-between"
      >
        {/* Icon Circle */}
        <div className="w-16 h-16 rounded-full bg-orange-50 text-primary flex items-center justify-center mb-4 shadow-inner">
          {IconComponent ? (
            <IconComponent size={32} strokeWidth={1.5} />
          ) : isEmoji ? (
            <span className="text-3xl">{item.icon}</span>
          ) : (
            <HelpCircle size={32} strokeWidth={1.5} />
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className="font-bold text-dark-text text-lg leading-tight mb-1 font-korean">
            {item.title}
          </h3>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            {item.subtitle}
          </p>
        </div>

        {/* Progress Bar Section (Only renders if progress is provided) */}
        {item.progress ? (
          <div className="w-full mt-auto">
            <div className="flex justify-between items-center mb-1 px-1">
              <span className="text-[10px] text-gray-400 font-bold">Progress</span>
              <span className="text-[10px] text-gray-500 font-bold">
                {item.progress.current}/{item.progress.total}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
               <div 
                 className="bg-primary h-full rounded-full transition-all duration-1000" 
                 style={{ width: `${(item.progress.current / item.progress.total) * 100}%` }}
               />
            </div>
          </div>
        ) : (
          /* Decoration for items without progress (like Categories) */
          <div className="w-12 h-1 bg-gray-100 rounded-full mt-auto"></div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-light-bg pb-24">
      
      {/* HEADER SECTION */}
      <div className="mb-6 mt-2 px-2 flex items-start flex-col">
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-4 flex items-center text-gray-400 hover:text-primary transition-colors text-sm font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-1" /> Back
          </button>
        )}
        <h1 className="text-3xl font-bold text-dark-text font-korean tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {/* GRID CONTAINER */}
      {/* CONFIG: Grid Columns (grid-cols-2) - Add cards here */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );
};
