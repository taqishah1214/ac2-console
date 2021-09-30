import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  paginationNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  @Input() currentPage: number;
  @Input() pages: number;
  @Input() count: any;
  @Input() perPageCount: number;
  @Input() pageSize: number;
  @Output() page = new EventEmitter<any>();
  uperlimit: boolean = false;
  lowerLimit: boolean = false;

  constructor() {}

  ngOnInit() {}

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.page.emit({
      number: this.currentPage
    });
    this.currentPageChange();
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.page.emit({
      number: this.currentPage
    });
    this.currentPageChange();
  }

  pageNumber(num: number) {
    this.currentPage = num;
    this.page.emit({
      number: this.currentPage
    });
    this.currentPageChange();
  }
  currentPageChange() {
    this.lowerLimit = false;
    this.uperlimit = false;
    this.paginationNumbers = [];
    if (this.currentPage - 4 >= 1) {
      this.lowerLimit = true;
    }

    if (this.currentPage + 4 <= this.pages) {
      this.uperlimit = true;
    }

    if (this.lowerLimit && this.uperlimit) {
      this.paginationNumbers = [
        this.currentPage - 4,
        this.currentPage - 3,
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
        this.currentPage + 3,
        this.currentPage + 4
      ];
    } else if (this.lowerLimit == false) {
      this.paginationNumbers = [];
      var uper = 9 - this.currentPage;
      var lower = this.currentPage - 1;
      for (let i = lower; i > 0; i--) {
        if (this.currentPage - i > 0) {
          this.paginationNumbers.push(this.currentPage - i);
        }
      }
      this.paginationNumbers.push(this.currentPage);
      for (let i = 1; i < uper + 1; i++) {
        this.paginationNumbers.push(this.currentPage + i);
      }
    } else {
      var uper = this.pages - this.currentPage;
      var lower = 9 - uper - 1;

      for (let i = lower; i > 0; i--) {
        if (this.currentPage - i > 0) {
          this.paginationNumbers.push(this.currentPage - i);
        }
      }
      this.paginationNumbers.push(this.currentPage);
      for (let i = 1; i < uper + 1; i++) {
        this.paginationNumbers.push(this.currentPage + i);
      }
    }
  }
}
