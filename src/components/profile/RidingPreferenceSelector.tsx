
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RidingPreferenceSelectorProps {
  selectedPreferences: string[];
  onTogglePreference: (preference: string) => void;
}

export const ridingPreferences = [
  { id: 'mtb', label: 'MTB' },
  { id: 'speed', label: 'Speed' },
  { id: 'gravel', label: 'Gravel' },
  { id: 'urban', label: 'Urbano' },
  { id: 'ebike', label: 'E-Bike' },
  { id: 'other', label: 'Outros' }
];

export const RidingPreferenceSelector: React.FC<RidingPreferenceSelectorProps> = ({
  selectedPreferences,
  onTogglePreference
}) => {
  return (
    <div>
      <Label className="block mb-2">Preferências de Pedal</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ridingPreferences.map((preference) => (
          <div key={preference.id} className="flex items-center space-x-2">
            <Checkbox
              id={preference.id}
              checked={selectedPreferences.includes(preference.id)}
              onCheckedChange={() => onTogglePreference(preference.id)}
            />
            <label
              htmlFor={preference.id}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {preference.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
