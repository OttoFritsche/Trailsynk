
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';

interface ProfileAvatarProps {
  avatarUrl: string | null;
  fullName: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  avatarUrl, 
  fullName, 
  onAvatarChange 
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative group">
        <Avatar className="w-24 h-24 border-2 border-primary/30">
          <AvatarImage src={avatarUrl || ''} />
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
            {fullName?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Upload className="h-6 w-6 text-white" />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onAvatarChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">Clique para fazer upload de uma foto</p>
    </div>
  );
};
