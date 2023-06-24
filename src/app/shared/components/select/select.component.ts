import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() title: string = ""; // Input property for the title of the select component
  @Input() data: any[] = []; // Input property for the data/options to be displayed in the select component
  @Output() selectedValue = new EventEmitter(); // Output event to emit the selected value

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Event handler for value changes in the select component.
   * Emits the selected value through the 'selectedValue' output event.
   * @param event The selected value from the select component.
   */
  detectChanges(event: any) {
    this.selectedValue.emit(event);
  }
}
