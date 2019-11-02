import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-dropdown-demo",
  templateUrl: "./dropdown-demo.component.html",
  styleUrls: ["./dropdown-demo.component.scss"]
})
export class DropdownDemoComponent implements OnInit {
  listItems = [
    { key: "a", value: "X-Small" },
    { key: "b", value: "Small" },
    { key: "c", value: "Medium" },
    { key: "d", value: "Large" },
    { key: "e", value: "X-Large" },
    { key: "f", value: "2X-Large" }
  ];
  defaultItem = { key: "Select item...", value: null };
  dropdownDemoForm = new FormGroup({
    ddl: new FormControl(this.defaultItem)
  });
  constructor() {}

  ngOnInit() {}
}
