
import { useState, useCallback } from 'react';

interface RoutePoint {
  lat: number;
  lng: number;
  elevation?: number;
}

interface UseRouteHistoryResult {
  points: RoutePoint[];
  setPoints: (points: RoutePoint[]) => void;
  addPoint: (point: RoutePoint) => void;
  removeLastPoint: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

export function useRouteHistory(): UseRouteHistoryResult {
  const [points, setPoints] = useState<RoutePoint[]>([]);
  const [undoStack, setUndoStack] = useState<RoutePoint[][]>([]);
  const [redoStack, setRedoStack] = useState<RoutePoint[][]>([]);

  const addPoint = useCallback((point: RoutePoint) => {
    // Save current state to undo stack
    setUndoStack(prev => [...prev, [...points]]);
    
    // Add new point
    setPoints(prev => [...prev, point]);
    
    // Clear redo stack since we're adding a new point
    setRedoStack([]);
  }, [points]);

  const removeLastPoint = useCallback(() => {
    if (points.length === 0) return;
    
    // Save current state to undo stack
    setUndoStack(prev => [...prev, [...points]]);
    
    // Remove last point
    setPoints(prev => prev.slice(0, prev.length - 1));
    
    // Clear redo stack
    setRedoStack([]);
  }, [points]);

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    
    // Get the last state from the undo stack
    const prevPoints = undoStack[undoStack.length - 1];
    
    // Save current state to redo stack
    setRedoStack(prev => [...prev, [...points]]);
    
    // Set points to the previous state
    setPoints(prevPoints);
    
    // Remove the last state from the undo stack
    setUndoStack(prev => prev.slice(0, prev.length - 1));
  }, [undoStack, points]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    
    // Get the last state from the redo stack
    const nextPoints = redoStack[redoStack.length - 1];
    
    // Save current state to undo stack
    setUndoStack(prev => [...prev, [...points]]);
    
    // Set points to the next state
    setPoints(nextPoints);
    
    // Remove the last state from the redo stack
    setRedoStack(prev => prev.slice(0, prev.length - 1));
  }, [redoStack, points]);

  const clearHistory = useCallback(() => {
    setPoints([]);
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  return {
    points,
    setPoints,
    addPoint,
    removeLastPoint,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    clearHistory,
  };
}
