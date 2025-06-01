import { useState } from 'react';
import type { Category } from '../types/types';

interface SidebarProps {
  categories: Category[];
  pinnedSnippets: number;
  onCategorySelect: (category: string) => void;
  onAddCategory: () => void;
  onDeleteCategory: (id: string) => void;
  onRenameCategory: (id: string, newName: string) => void;
  onPinnedClick: () => void;
  showPinned: boolean;
}

export const Sidebar = ({ 
  categories, 
  pinnedSnippets, 
  onCategorySelect, 
  onAddCategory,
  onDeleteCategory,
  onRenameCategory,
  onPinnedClick,
  showPinned
}: SidebarProps) => {
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const handleStartEdit = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  const handleSaveEdit = (categoryId: string) => {
    if (editCategoryName.trim()) {
      onRenameCategory(categoryId, editCategoryName);
    }
    setEditingCategoryId(null);
  };

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
            <li key={category.id} onClick={() => !editingCategoryId && onCategorySelect(category.name)}>
              <span className="category-color" style={{ backgroundColor: category.color }} />
              {editingCategoryId === category.id ? (
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  onBlur={() => handleSaveEdit(category.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(category.id)}
                  autoFocus
                  className="category-edit-input"
                />
              ) : (
                <>
                  <span onDoubleClick={() => category.deletable && handleStartEdit(category)}>
                    {category.name}
                  </span>
                  {category.deletable && (
                    <div className="category-actions">
                      <button
                        className="edit-category-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(category);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-category-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCategory(category.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};