import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dropdown-demo",
  templateUrl: "./dropdown-demo.component.html",
  styleUrls: ["./dropdown-demo.component.scss"]
})
export class DropdownDemoComponent implements OnInit {
  listItems = [
    { key: "", value: "X-Small" },
    { key: "", value: "Small" },
    { key: "", value: "Medium" },
    { key: "", value: "Large" },
    { key: "", value: "X-Large" },
    { key: "", value: "2X-Large" }
  ];
  constructor() {}

  ngOnInit() {}
}
