import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
declare let document: any;
@Component({
  selector: 'discovery-filter-zone',
  templateUrl: './filter-zone.component.html',
  styles: []
})
export class FilterZoneComponent implements OnInit {
  @Input()
  items: any[] = [];
  items_selected: any[] = [];
  @Input()
  opened = false;
  @Output()
  emmitSelected: EventEmitter<number> = new EventEmitter();
  @Output()
  emmitLoaded: EventEmitter<string> = new EventEmitter();
  name = 'Zone';
  queryName = 'zone';
  id = 'filter-zone';
  error_message;
  zone = '0';
  /** Sample json
  {

  };
  */
  /** Generate inputs labels & values
   *  with these
   */
  json_value = 'value';
  json_description = 'description';
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initZones();
  }
  initZones() {
    this.searchService.getZone().subscribe(
      data => {
        this.items = this.buildItems(data['results']);

        /** Grab the queryparams and sets default values
         *  on inputs Ex. checked, selected, keywords, etc */
        if (this.route.snapshot.queryParamMap.has(this.queryName)) {
          const values: string[] = this.route.snapshot.queryParamMap
            .get(this.queryName)
            .split('__');
          for (const item of values) {
            this.addItem(item);
          }
          /** Open accordion */
          this.opened = true;
        } else {
          this.opened = false;
        }
        this.emmitLoaded.emit(this.queryName);
      },
      error => (this.error_message = <any>error)
    );
  }
  buildItems(obj: any[]) {
    const zones = [];
    for (const prop of obj) {
      const item = {};
      item['value'] = prop['id'];
      item['description'] =
        'Zone ' +
        prop['id'] +
        ' (' +
        this.commaSeparatedList(prop['states'], '') +
        ')';
      zones.push(item);
    }
    return zones;
  }
  commaSeparatedList(obj: any[], key: string) {
    let items = '';
    for (const i of obj) {
      if (key !== '') {
        items += i[key] + ', ';
      } else {
        items += i + ', ';
      }
    }
    return items.slice(0, -2);
  }
  addZone() {
    if (!this.exists(this.zone) && this.zone !== '0') {
      this.addItem(this.zone);
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
    this.zone = '0';
  }
  getItemDescription(value: string): string {
    if (value) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i][this.json_value].toString() === value) {
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
      if (this.items_selected[i]['value'].toString() === key) {
        this.items_selected.splice(i, 1);
      }
    }
    this.emmitSelected.emit(0);
  }
}
