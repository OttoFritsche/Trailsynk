
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from 'lucide-react';

interface TagSelectorProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  onTagsChange
}) => {
  const [inputValue, setInputValue] = useState('');
  
  // Predefined suggested tags for mountain biking
  const suggestedTags = [
    'técnico', 'scenic', 'flowy', 'downhill', 'uphill', 'rochoso', 'raízes',
    'sombra', 'cascata', 'lago', 'floresta', 'montanha', 'rápido', 'família'
  ].filter(tag => !tags.includes(tag));
  
  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      onTagsChange([...tags, tag.trim()]);
    }
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(inputValue);
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Tags & Palavras-chave</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="flex items-center gap-1 hover:bg-primary/10 transition-colors cursor-pointer"
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Adicionar tag..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => handleAddTag(inputValue)}
            disabled={!inputValue.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {suggestedTags.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Tags sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.slice(0, 8).map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="hover:bg-primary/10 transition-colors cursor-pointer"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TagSelector;
