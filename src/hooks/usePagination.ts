
import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

interface PaginationResult {
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  pageItems: <T>(items: T[]) => T[];
  isFirstPage: boolean;
  isLastPage: boolean;
  pageRange: number[];
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  totalItems = 0,
}: UsePaginationProps = {}): PaginationResult => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Garante que a página atual está dentro dos limites válidos
  const safePage = Math.min(Math.max(1, page), totalPages);
  if (safePage !== page) {
    setPage(safePage);
  }

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const setPageSize = useCallback((size: number) => {
    // Ajusta a página atual para manter o mesmo item inicial ao mudar o tamanho da página
    const firstItemIndex = (page - 1) * pageSize;
    const newPage = Math.floor(firstItemIndex / size) + 1;
    
    setPageSizeState(size);
    setPage(newPage);
  }, [page, pageSize]);

  const nextPage = useCallback(() => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  }, [page, isLastPage]);

  const prevPage = useCallback(() => {
    if (!isFirstPage) {
      setPage(page - 1);
    }
  }, [page, isFirstPage]);

  const firstPage = useCallback(() => {
    setPage(1);
  }, []);

  const lastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages]);

  const pageItems = useCallback(<T>(items: T[]): T[] => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [page, pageSize]);

  // Gera uma matriz de números de página para exibição na paginação
  const pageRange = (() => {
    const delta = 2; // Número de páginas para mostrar antes e depois da página atual
    const range: number[] = [];
    
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    
    // Adiciona primeiro e último número de página sempre
    if (range.length > 0) {
      if (range[0] > 2) {
        range.unshift(-1); // Representa elipses (...)
      }
      if (range[range.length - 1] < totalPages - 1) {
        range.push(-1); // Representa elipses (...)
      }
    }
    
    if (totalPages > 1) {
      range.unshift(1);
      if (totalPages > 1) {
        range.push(totalPages);
      }
    }
    
    return [...new Set(range)]; // Remove duplicatas
  })();

  return {
    page,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    pageItems,
    isFirstPage,
    isLastPage,
    pageRange,
  };
};
