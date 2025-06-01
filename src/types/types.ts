export interface Snippet {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  type: 'text' | 'code' | 'link' | 'file';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  deletable?:boolean;
}