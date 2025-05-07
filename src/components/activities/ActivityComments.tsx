
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: Date;
}

interface ActivityCommentsProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  onSubmitComment: (e: React.FormEvent) => void;
}

export const ActivityComments: React.FC<ActivityCommentsProps> = ({
  comments,
  newComment,
  setNewComment,
  onSubmitComment
}) => {
  // Função para formatar a data do comentário
  const formatCommentDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'agora mesmo';
    if (diffMins < 60) return `há ${diffMins} min`;
    if (diffHours < 24) return `há ${diffHours} h`;
    if (diffDays < 7) return `há ${diffDays} dias`;
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center mb-4">
        <MessageSquare className="h-5 w-5 mr-2" />
        <h3 className="text-lg font-medium">Comentários ({comments.length})</h3>
      </div>
      
      {/* Formulário para novo comentário */}
      <form onSubmit={onSubmitComment} className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Adicione um comentário..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={!newComment.trim()}>
            Comentar
          </Button>
        </div>
      </form>
      
      {/* Lista de comentários */}
      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{comment.userName}</p>
                  <p className="text-xs text-muted-foreground">{formatCommentDate(comment.createdAt)}</p>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Seja o primeiro a comentar nesta atividade.
          </div>
        )}
      </div>
    </div>
  );
};
