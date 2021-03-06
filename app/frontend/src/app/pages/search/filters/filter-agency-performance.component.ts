import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
declare let document: any;
@Component({
  selector: 'discovery-filter-agency-performance',
  templateUrl: './filter-agency-performance.component.html',
  styles: []
})
export class FilterAgencyPerformanceComponent implements OnInit {
  @Input()
  items: any[] = [];
  items_selected: any[] = [];
  @Input()
  opened = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<number> = new EventEmitter();
  name = 'Agency Performance History';
  queryName = 'agency_performance';
  id = 'filter-agency-performance';
  error_message;
  agency = '0';
  /** Sample json
  {

  };
  */
  /** Generate inputs labels & values
   *  with these
   */
  json_value = 'id';
  json_description = 'description';
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setInputItems();
  }
  setInputItems() {
    // this.searchService.getAgencies().subscribe(
    //   data => {
    //     this.items = data['results'];
    //     this.emmitLoaded.emit(1);
    //     /** Grab the queryparams and sets default values
    //      *  on inputs Ex. checked, selected, keywords, etc */
    //     if (this.route.snapshot.queryParamMap.has(this.queryName)) {
    //       const values: string[] = this.route.snapshot.queryParamMap
    //         .get(this.queryName)
    //         .split('__');
    //       for (const item of values) {
    //         this.addItem(item);
    //       }
    //       /** Open accordion */
    //       this.opened = true;
    //     } else {
    //       this.opened = false;
    //     }
    //   },
    //   error => (this.error_message = <any>error)
    // );
  }
  addAgency() {
    if (!this.exists(this.agency) && this.agency !== '0') {
      this.addItem(this.agency);
    }
  }
  exists(value: string): boolean {
    for (let i = 0; i < this.items_selected.length; i++) {
      if (this.items_selected[i]['value'] === value) {
        return true;
      }
    }
    return false;
  }
  getSelected(): any[] {
    const item = [];
    if (this.items_selected.length > 0) {
      item['name'] = this.queryName;
      item['description'] = this.name;
      item['items'] = this.items_selected;
    }
    return item;
  }
  reset() {
    this.items_selected = [];
    this.agency = '0';
  }
  getItemDescription(value: string): string {
    if (value) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i][this.json_value] === value) {
          return this.items[i][this.json_description];
        }
      }
    }
  }
  addItem(value: string) {
    const item = {};
    item['value'] = value;
    item['description'] = this.getItemDescription(value);
    this.items_selected.push(item);
    this.emmitSelected.emit(1);
  }
  removeItem(key: string) {
    for (let i = 0; i < this.items_selected.length; i++) {
      if (this.items_selected[i]['value'] === key) {
        this.items_selected.splice(i, 1);
      }
    }
    this.emmitSelected.emit(0);
  }
}
