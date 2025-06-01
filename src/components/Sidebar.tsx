import type { Category } from '../types/types';

interface SidebarProps {
  categories: Category[];
  pinnedSnippets: number;
  onCategorySelect: (category: string) => void;
  onAddCategory: () => void;
  onDeleteCategory: (id: string) => void;
  onPinnedClick: () => void;
  showPinned: boolean;
}

export const Sidebar = ({ 
  categories, 
  pinnedSnippets, 
  onCategorySelect, 
  onAddCategory,
  onDeleteCategory,
  onPinnedClick,
  showPinned
}: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SnippetHub</h2>
      </div>
      <div 
        className={`sidebar-section clickable ${showPinned ? 'active' : ''}`}
        onClick={onPinnedClick}
      >
        <h3>Pinned ({pinnedSnippets}) {showPinned ? '▼' : '▶'}</h3>
      </div>
      <div className="sidebar-section">
        <div className="section-header">
          <h3>Categories</h3>
          <button onClick={onAddCategory}>+</button>
        </div>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} onClick={() => onCategorySelect(category.name)}>
              <span className="category-color" style={{ backgroundColor: category.color }} />
              {category.name}
              {category.deletable && (
                <button 
                  className="delete-category-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(category.id);
                  }}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};