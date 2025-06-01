import { useEffect, useState } from 'react';
import type { Snippet, Category } from './types/types';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { SnippetForm } from './components/SnippetForm';
import './App.css';

const initialCategories: Category[] = [
  { id: '1', name: 'General', color: '#4CAF50', deletable: false },
  { id: '2', name: 'React', color: '#2196F3', deletable: true },
  { id: '3', name: 'JavaScript', color: '#FFC107', deletable: true },
];

const initialSnippets: Snippet[] = [
  {
    id: '1',
    title: 'React useState Hook',
    content: 'const [state, setState] = useState(initialState);',
    category: 'React',
    tags: ['hooks', 'state'],
    isPinned: true,
    type: 'code',
  },
  {
    id: '2',
    title: 'Array.map()',
    content: 'The map() method creates a new array with the results of calling a function on every element.',
    category: 'JavaScript',
    tags: ['arrays', 'methods'],
    isPinned: false,
    type: 'text',
  },
];

export const App = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(() => {
    const saved = localStorage.getItem('snippets');
    if (saved) return JSON.parse(saved);
    return initialSnippets;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    if (saved) return JSON.parse(saved);
    return initialCategories;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [showPinned, setShowPinned] = useState(false);

  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [snippets, categories]);

  // Filtering snippets based on selection and pinned status
  const filteredSnippets = selectedCategory
    ? snippets.filter(snippet => snippet.category === selectedCategory)
    : snippets;

  const displayedSnippets = showPinned
    ? snippets.filter(snippet => snippet.isPinned)
    : filteredSnippets;

  const pinnedSnippetsCount = snippets.filter(snippet => snippet.isPinned).length;

  const handleAddSnippet = () => {
    setEditingSnippet(null);
    setIsFormOpen(true);
  };

  const handleEditSnippet = (id: string) => {
    const snippetToEdit = snippets.find(snippet => snippet.id === id);
    if (snippetToEdit) {
      setEditingSnippet(snippetToEdit);
      setIsFormOpen(true);
    }
  };

  const handleDeleteSnippet = (id: string) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };

  const handleTogglePin = (id: string) => {
    const updatedSnippets = snippets.map(snippet => {
      if (snippet.id === id) {
        return { ...snippet, isPinned: !snippet.isPinned };
      }
      return snippet;
    });
    setSnippets(updatedSnippets);
  };

  const handleSubmitSnippet = (snippet: Snippet) => {
    if (editingSnippet) {
      const updatedSnippets = snippets.map(s => s.id === snippet.id ? snippet : s);
      setSnippets(updatedSnippets);
    } else {
      setSnippets([...snippets, snippet]);
    }
    setIsFormOpen(false);
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: `Category ${categories.length + 1}`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      deletable: true,
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const hasSnippets = snippets.some(s => s.category === category.name);
    if (hasSnippets) {
      alert(`Cannot delete "${category.name}" category - it contains snippets! Delete or move them first.`);
      return;
    }

    setCategories(categories.filter(c => c.id !== categoryId));
  };

  return (
    <div className="app">
      <Sidebar
        categories={categories}
        pinnedSnippets={pinnedSnippetsCount}
        onCategorySelect={setSelectedCategory}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onPinnedClick={() => setShowPinned(!showPinned)}
        showPinned={showPinned}
      />
      <MainContent
        snippets={displayedSnippets}
        onEdit={handleEditSnippet}
        onDelete={handleDeleteSnippet}
        onTogglePin={handleTogglePin}
        onAddSnippet={handleAddSnippet}
        selectedCategory={selectedCategory}
      />
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <SnippetForm
              snippet={editingSnippet || undefined}
              onSubmit={handleSubmitSnippet}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
