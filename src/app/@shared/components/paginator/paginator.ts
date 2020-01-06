
class Paginator {

  constructor() {}

  getPageStartIndex(allItems: any[], pageNumber: number, pageSize: number): number {
    return pageNumber * pageSize;
  }

  getPageEndIndex(allItems: any[], pageNumber: number, pageSize: number): number {
    const pageEnd = this.getPageStartIndex(allItems, pageNumber, pageSize) + pageSize - 1;
    return Math.min(pageEnd, allItems.length - 1);
  }

  filterPageItems(allItems: any[], pageNum: number, pageSize: number): any[] {
    const pageStart = this.getPageStartIndex(allItems, pageNum, pageSize);
    const pageEnd = this.getPageEndIndex(allItems, pageNum, pageSize);

    if (allItems && pageStart < allItems.length)
        return allItems.slice(pageStart, pageEnd + 1);
    return [];
  }

}

export default new Paginator();
