
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showFirstLast = false,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Calculate page range to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range: (number | 'ellipsis')[] = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    
    // Add ellipses and first/last pages
    if (range.length > 0) {
      if (range[0] > 2) {
        range.unshift('ellipsis');
      }
      if (range[range.length - 1] < totalPages - 1) {
        range.push('ellipsis');
      }
    }
    
    if (totalPages > 1) {
      range.unshift(1);
      if (totalPages > 1) {
        range.push(totalPages);
      }
    }
    
    return range;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={cn("my-4", className)}>
      <PaginationContent>
        {showFirstLast && (
          <PaginationItem>
            <PaginationLink
              onClick={() => !isFirstPage && onPageChange(1)}
              isActive={false}
              className={cn(isFirstPage && "pointer-events-none opacity-50")}
            >
              Primeiro
            </PaginationLink>
          </PaginationItem>
        )}
        
        <PaginationItem>
          <PaginationPrevious
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
            className={cn(isFirstPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
        
        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`page-${index}`}>
            {pageNumber === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => typeof pageNumber === 'number' && pageNumber !== currentPage && onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
            className={cn(isLastPage && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
        
        {showFirstLast && (
          <PaginationItem>
            <PaginationLink
              onClick={() => !isLastPage && onPageChange(totalPages)}
              isActive={false}
              className={cn(isLastPage && "pointer-events-none opacity-50")}
            >
              Último
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PageNavigation;
