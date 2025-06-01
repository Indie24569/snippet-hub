import type { Snippet } from '../types/types';
import { SnippetCard } from './SnippetCard';

interface MainContentProps {
  snippets: Snippet[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onAddSnippet: () => void;
  selectedCategory?: string;
}

export const MainContent = ({
  snippets,
  onEdit,
  onDelete,
  onTogglePin,
  onAddSnippet,
  selectedCategory,
}: MainContentProps) => {
  return (
    <div className="main-content">
      <div className="content-header">
        <h2>{selectedCategory || 'All Snippets'}</h2>
        <button onClick={onAddSnippet}>Add Snippet</button>
      </div>
      <div className="snippets-grid">
        {snippets.length === 0 ? (
          <div className="empty-state">No snippets found. Add one to get started!</div>
        ) : (
          snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
            />
          ))
        )}
      </div>
    </div>
  );
};