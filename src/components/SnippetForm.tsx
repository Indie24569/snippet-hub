import { useState } from 'react';
import type { Snippet } from '../types/types';

interface SnippetFormProps {
  snippet?: Snippet;
  onSubmit: (snippet: Snippet) => void;
  onCancel: () => void;
}

export const SnippetForm = ({ snippet, onSubmit, onCancel }: SnippetFormProps) => {
  const [formData, setFormData] = useState<Snippet>(
    snippet || {
      id: '',
      title: '',
      content: '',
      category: 'General',
      tags: [],
      isPinned: false,
      type: 'text',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: formData.id || Date.now().toString(),
    });
  };

  return (
    <form className="snippet-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="text">Text</option>
          <option value="code">Code</option>
          <option value="link">Link</option>
        </select>
      </div>
      <div className="form-group">
        <label>Content</label>
        {formData.type === 'code' ? (
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            required
          />
        ) : (
          <input
            type={formData.type === 'link' ? 'url' : 'text'}
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        )}
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};