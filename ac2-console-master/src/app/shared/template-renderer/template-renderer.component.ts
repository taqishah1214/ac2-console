import { Component, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-template-renderer',
  template: `
    <ng-container
      *ngTemplateOutlet="template; context: templateContext"
    ></ng-container>
  `
})
export class TemplateRendererComponent implements ICellRendererAngularComp {
  template: TemplateRef<any>;
  templateContext: { $implicit: any; params: any };

  params: any;
  label: string;
  agInit(params: any) {
    this.params = params;
    this.label = this.params.label || null;
    this.template = params['ngTemplate'];
    this.refresh(params);
  }

  refresh(params?: any): boolean {
    this.templateContext = {
      $implicit: params.data,
      params: params
    };
    return true;
  }

  // editRow() {
  //   if (this.params.editRow instanceof Function) {
  //     // put anything into params u want pass into parents component
  //     const params = {
  //       rowData: this.params.node.data
  //       // ...something
  //     };
  //     this.params.editRow(params);
  //   }
  // }
  // deleteRow() {
  //   if (this.params.deleteRow instanceof Function) {
  //     // put anything into params u want pass into parents component
  //     const params = {
  //       rowData: this.params.node.data
  //       // ...something
  //     };
  //     this.params.deleteRow(params);
  //   }
  // }
}
