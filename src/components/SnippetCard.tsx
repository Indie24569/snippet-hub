import type { Snippet } from '../types/types';

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const SnippetCard = ({ snippet, onEdit, onDelete, onTogglePin }: SnippetCardProps) => {
  return (
    <div className="snippet-card">
      <div className="card-header">
        <h3>{snippet.title}</h3>
        <span className={`pin ${snippet.isPinned ? 'pinned' : ''}`} onClick={() => onTogglePin(snippet.id)}>
          📌
        </span>
      </div>
      <div className="card-content">
        {snippet.type === 'code' ? (
          <pre>{snippet.content}</pre>
        ) : (
          <p>{snippet.content}</p>
        )}
      </div>
      <div className="card-footer">
        <span className="category">{snippet.category}</span>
        <div className="actions">
          <button onClick={() => onEdit(snippet.id)}>Edit</button>
          <button onClick={() => onDelete(snippet.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};