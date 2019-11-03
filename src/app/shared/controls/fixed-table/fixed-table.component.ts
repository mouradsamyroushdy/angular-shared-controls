import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import _ from 'lodash';
import { RowSchema} from '@shared/models';
import { ScrollEvent } from '@shared/directives';
import { RowSchemaType } from '@shared/enums';
import { FixedTableRow } from '@shared/models';
import { ThreeState } from '@shared/types';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './fixed-table.component.html',
  styleUrls: ['./fixed-table.component.scss']
})
export class FixedTableComponent implements OnInit, OnChanges {
  // #region ------------------------------------ Options
  readonly options = {
    icons: {
      collapseColumnGroup: 'keyboard_arrow_left',
      collapseRowGroup: 'keyboard_arrow_up',
      collapseRowGroups: 'unfold_less',
      expandColumnGroup: 'keyboard_arrow_right',
      expandRowGroup: 'keyboard_arrow_down',
      expandRowGroups: 'unfold_more',
    },
    selectors: {
      columnGroupCell: '.column-group-cell',
      rowGroupCell: '.row-group-cell',
      rowGroupToggleCell: '.row-group-toggle-cell',
      rowGroupsToggleCell: '.row-groups-toggle-cell',
    }
  };
  // #endregion ---------------------------------

  // #region ------------------------------------ Inputs/Outputs
  @Input() schema: RowSchema[];
  @Input() data: FixedTableRow<any>;
  // #endregion ---------------------------------

  // #region ------------------------------------ Children
  @ViewChild('table', { static: false }) table: ElementRef;
  @ViewChild('head', { static: false }) head: ElementRef;
  @ViewChild('body', { static: false }) body: ElementRef;
  @ViewChild('headerContentCells', { static: false }) headerContentCells: ElementRef;
  @ViewChildren('dummyCell') dummyCells: QueryList<ElementRef>;
  // #endregion ---------------------------------

  // #region ------------------------------------ Getters/Setters
  get rowSchemaType() {
    return RowSchemaType;
  }
  // #endregion ---------------------------------

  // #region ------------------------------------ Lifecycle-Hooks
  constructor(private renderer: Renderer2) {
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data = this.data;
      this.adjustTable();
    }
    if (changes['schema']) {
      this.schema = this.schema;
      this.adjustTable();
    }
  }
  // #endregion ------------------------------------

  // #region ------------------------------------ Event-Handlers
  left;
  handleBodyScroll(event: ScrollEvent): void {
    /**
     * on body scroll event handler.
     * Setting the "thead" left value to the same value of body's left-attribute will make it track the movement of the "tbody" element.
     * Setting the table-cell's left-attribute to the scrolling body's left-attribute in opposite direction
       will maintain/fix their relative position at the left of the table.
     */

    if (this.left === event.left) return;
    else this.left = event.left;

    const left = this.numberToPixels(event.left);
    const headHeaderCells = this.head.nativeElement.querySelectorAll(
      'th:nth-child(1)'
    );
    const bodyHeaderCells = this.body.nativeElement.querySelectorAll(
      'td:nth-child(1)'
    );

    this.renderer.setStyle(this.head.nativeElement, 'left', '-' + left);
    headHeaderCells.forEach(cell => {
      this.renderer.setStyle(cell, 'left', left);
    });
    bodyHeaderCells.forEach(cell => {
      this.renderer.setStyle(cell, 'left', left);
    });
  }
  handleRowGroupsToggle(event): void {
    /**
     * Toggle row groups by triggering each group toggle event.
     */

    const collapsed = 'collapsed';
    const cell = event.target.tagName == 'TD' ? event.target : event.target.closest(this.options.selectors.rowGroupsToggleCell);
    const parentId = _.toNumber(cell.getAttribute('group-id'));
    const isCollapsed = cell.classList.contains(collapsed);
    const childToggleCellsQSA = this.body.nativeElement.querySelectorAll("td[parent-id='" + parentId + "']");
    const toggleButton = cell.querySelector('.toggle');
    const title = isCollapsed ? 'Collapse' : 'Expand';
    this.renderer.setAttribute(toggleButton, 'title', title);
    if (isCollapsed) {
      this.renderer.removeClass(cell, collapsed);
    } else {
      this.renderer.addClass(cell, collapsed);
    }
    childToggleCellsQSA.forEach(cell => this.toggleRowGroup(cell, isCollapsed));
  }
  handleRowGroupToggle(event): void {
    const cell = event.target.tagName == 'TD' ? event.target : event.target.closest(this.options.selectors.rowGroupToggleCell);
    this.toggleRowGroup(cell);
  }
  handleColumnsToggle(state): void {
    /**
     * Toggle  all collapsible columns according to "state".
    */

    const headCells = this.head.nativeElement.querySelectorAll(this.options.selectors.columnGroupCell);
    headCells.forEach(cell => this.toggleColumnGroup(cell, state));
  }
  handleColumnGroupToggle(cell): void {
    /**
     * Toggle collapsible columns of a column-group-cell according to "state".
     */

    this.toggleColumnGroup(cell);
  }
  handleWindowResize(event): void {
    /**
     * on window resize event handler.
     * readjust the table layout to fit the new window size.
     */

    this.adjustTable();
  }
  // #endregion ---------------------------------

  // #region ------------------------------------ Private-Methods
  private toggleRowGroup(cell, state?: boolean): void {
    /**
     * Toggle row group based on its current state.
    */

    const collapsed = 'collapsed';
    const parentId = _.toNumber(cell.getAttribute('parent-id'));

    const row = cell.closest('tr');
    const isCollapsed = state === false || state == true ? state : cell.classList.contains(collapsed);
    const childRowsCount = _.toNumber(cell.getAttribute('child-rows-count'));
    const bodyRowsQSA = this.body.nativeElement.querySelectorAll('tr');
    const bodyRows = Array.from(bodyRowsQSA);
    const rowIndex = bodyRows.indexOf(row);
    const groupRows = bodyRows.slice(rowIndex + 1, childRowsCount + rowIndex);
    const toggleButton = cell.querySelector('.toggle');
    const toggleIcon = cell.querySelector('.toggle i');
    const display = isCollapsed ? 'table-row' : 'none';
    const rowspan = isCollapsed ? childRowsCount : 1;
    const title = isCollapsed ? 'Collapse' : 'Expand';
    const icon = isCollapsed ? this.options.icons.collapseRowGroup : this.options.icons.expandRowGroup;

    this.renderer.setAttribute(toggleButton, 'title', title);
    this.renderer.setProperty(toggleIcon, 'innerText', icon);
    groupRows.forEach(row => this.renderer.setStyle(row, 'display', display));
    this.renderer.setAttribute(cell, 'rowspan', _.toString(rowspan));
    if (isCollapsed) {
      this.renderer.removeClass(cell, collapsed);
    } else {
      this.renderer.addClass(cell, collapsed);
    }
    this.bindRowGroupsToggleState(parentId);

  }
  private toggleColumnGroup(cell, state?: boolean): void {
    if (!cell) return;

    // Compute basic variables.
    const originalColspanCount = _.toNumber(cell.getAttribute('colspan-original')) || 1;
    const colspanCount = _.toNumber(cell.getAttribute('colspan'));
    const isCollapsed = state === false || state === true ? state : !_.isEqual(colspanCount, originalColspanCount);

    // Calculate all preceding columns count.
    const headCells = this.head.nativeElement.querySelectorAll('th');
    const cellIndex = Array.from(headCells).indexOf(cell);
    let precedingColspanCount = 0;
    headCells.forEach((precedingCell, index) => {
      if (index < cellIndex)
        precedingColspanCount += _.toInteger(precedingCell.getAttribute('colspan-original'));
    });

    // Hide/Show column cells based on current collapse/expand state.
    for (let columnIndex = precedingColspanCount; columnIndex < originalColspanCount + precedingColspanCount; columnIndex++) {
      const bodyRows = this.body.nativeElement.querySelectorAll('tr');
      const display = isCollapsed ? 'table-cell' : 'none';
      bodyRows.forEach((row, index) => {
        const notFixedCells = row.querySelectorAll('td:not(.fixed-cell)');
        const cellInIndex = Array.from(notFixedCells)[columnIndex] as HTMLElement;
        if (cellInIndex.classList.contains('collapsible')) {
          this.renderer.setStyle(cellInIndex, 'display', display);
        }
      });
    }

    // Adjust cell's children attributes values.
    const toggleButton = cell.querySelector('.toggle');
    const toggleIcon = cell.querySelector('.toggle i');
    const title = isCollapsed ? 'Collapse' : 'Expand';
    const icon = isCollapsed ? this.options.icons.collapseColumnGroup : this.options.icons.expandColumnGroup;
    const colspan = isCollapsed ? originalColspanCount : 1;
    this.renderer.setAttribute(toggleButton, 'title', title);
    this.renderer.setProperty(toggleIcon, 'innerText', icon);
    this.renderer.setAttribute(cell, 'colspan', _.toString(colspan));

    // Readjust table.
    this.adjustDummyColumn();
    this.adjustHeadWidth();
  }
  private getColumnGroupsToggleState(parentId: number): ThreeState {
    /**
     * Get the current column groups toggle state
     * all-collapsed > false, all-expanded > true, mixed > null.
     */

    return null;
  }
  private bindRowGroupsToggleState(groupId: number): void {
    /**
     * Get the current row groups toggle state
     * all-collapsed > false, all-expanded > true, mixed > null.
     */

    let expanded = 0;
    let collapsed = 0;
    const allToggleGroupCellsQSA = this.body.nativeElement.querySelectorAll(this.options.selectors.rowGroupToggleCell + "[parent-id='" + groupId + "']");
    allToggleGroupCellsQSA.forEach(cell => {
      if (cell.classList.contains('collapsed'))
        collapsed++;
      else
        expanded++;
    });
    const state = collapsed === 0 ? false : expanded === 0 ? true : null;

    const currentToggleGroupsCellsQS = this.body.nativeElement.querySelector(this.options.selectors.rowGroupsToggleCell + "[group-id='" + groupId + "']");
    const iconQS = currentToggleGroupsCellsQS.querySelector('i');
    if (state === false) {
      this.renderer.setProperty(iconQS, 'innerText', this.options.icons.collapseRowGroups);
    } else if (state === true) {
      this.renderer.setProperty(iconQS, 'innerText', this.options.icons.expandRowGroups);
    }
  }
  private adjustTable(): void {
    /**
     * Initialize table to apply fixed header-row/header-column structure.
     */

    setTimeout(() => {
      if (!this.table) return;
      this.adjustTableWidth();
      this.adjustDummyColumn();
      this.adjustHeadWidth();
    }, 10);

  }
  private adjustTableWidth(): void {
    /**
     * Set (table, thead, tbody) width to their wrapper's width to allow horizontal scrolling.
     */

    if (!this.table || !this.body || !this.head) return;

    const tableExtraWidth = this.getElementExtraWidth(this.table.nativeElement as HTMLElement);
    const tableNetWidth = this.table.nativeElement.parentNode.clientWidth - tableExtraWidth + 'px';

    this.renderer.setStyle(this.body.nativeElement, 'width', tableNetWidth);
    this.renderer.setStyle(this.head.nativeElement, 'width', tableNetWidth);
    this.renderer.setStyle(this.table.nativeElement, 'width', tableNetWidth);
  }
  private adjustHeadWidth(): void {
    /**
     * Adjust head cells width based on their visible columns.
     */

    let headCells = this.head.nativeElement.querySelectorAll(this.options.selectors.columnGroupCell);
    headCells.forEach((cell, index) => {
      // Get original-colspan attribute value.
      let colspanCount = _.toInteger(cell.getAttribute('colspan-original')) || 1;

      // Calculate all preceding columns count.
      let precedingColspanCount = 0;
      let precedingCells = _.filter(headCells, (item, siblingIndex) => siblingIndex < index);
      _.forEach(precedingCells, (precedingCell) => {
        let colspanCount = precedingCell.getAttribute('colspan-original');
        precedingColspanCount += _.toInteger(colspanCount);
      });

      // Calculate total width of this head cell based on its visible body columns.
      let totalWidth = 0;
      let startingIndex = precedingColspanCount;
      const notFixedCells = this.body.nativeElement.querySelectorAll('tr:first-child td:not(.fixed-cell)');
      for (let colIndex = startingIndex; colIndex < colspanCount + precedingColspanCount; colIndex++) {
        // Get visible column in this index.
        const columnInIndex = Array.from(notFixedCells)[colIndex] as HTMLElement;
        if (this.getComputedStyleProperty(columnInIndex, 'display') !== 'none') {
          totalWidth += columnInIndex.offsetWidth;
        }
      }

      // Set inner width on cell content.
      const innerWidth = this.numberToPixels(totalWidth - this.getElementExtraWidth(cell));
      const content = cell.querySelector('.content');
      this.renderer.setStyle(content, 'width', innerWidth);
    });
  }
  private adjustDummyColumn(): void {
    /**
     * Toggle/Resize the dummy column based on the size of the visible columns.
     * In case a row's width is greater than the table's width, so hide it, otherwise it will be visible.
     */

    let activeCellsOffsetWidth = 0;
    const firstRowNotDummyCells = this.body.nativeElement.querySelectorAll('tr:first-child td:not(.dummy-cell)');
    firstRowNotDummyCells.forEach((cell) => {
      let width = activeCellsOffsetWidth += cell.clientWidth + this.getElementExtraWidth(cell);
      return width;
    });

    let tableClientWidth = this.table.nativeElement.clientWidth;
    let dummyCellOffsetWidth = tableClientWidth - activeCellsOffsetWidth;

    // Hide/Show dummy cell based on new cell size.
    let width = 0;
    let display = 'none';
    if (dummyCellOffsetWidth > 0) {
      display = 'table-cell';
      width = dummyCellOffsetWidth;
    }
    this.dummyCells.forEach(cell => {
      const content = cell.nativeElement.querySelector('.content');
      this.renderer.setStyle(content, 'width', this.numberToPixels(width));
      this.renderer.setStyle(cell.nativeElement, 'display', display);
    });
  }
  // #endregion ---------------------------------

  // #region ------------------------------------ Utilities
  private getElementExtraWidth(element: HTMLElement) {
    if (!element) return 0;

    const bl = this.pixelsToNumber(this.getComputedStyleProperty(element, 'border-left-width'));
    const br = this.pixelsToNumber(this.getComputedStyleProperty(element, 'border-right-width'));
    const ml = this.pixelsToNumber(this.getComputedStyleProperty(element, 'margin-left'));
    const mr = this.pixelsToNumber(this.getComputedStyleProperty(element, 'margin-right'));
    const pl = this.pixelsToNumber(this.getComputedStyleProperty(element, 'padding-left'));
    const pr = this.pixelsToNumber(this.getComputedStyleProperty(element, 'padding-right'));

    const width = bl + br + ml + mr + pl + pr;
    return width;
  }
  private pixelsToNumber(value: string): number {
    const trimmed = _.replace(value, 'px', '');
    const num = _.toNumber(trimmed);
    const result = _.isNaN(num) ? 0 : num;
    return result;
  }
  private numberToPixels(value: number): string {
    const num = _.isNumber(value) && !_.isNaN(value) ? value : 0;
    const result = num + 'px';
    return result;
  }
  private getComputedStyleProperty(element: HTMLElement, prop: string) {
    return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(prop) : null;
  }
  // #endregion ---------------------------------

}
