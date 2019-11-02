import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  name = "Angular";
  model = "a";
  public listItems: Array<string> = [
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "2X-Large"
  ];
  dropdownItems = [
    { key: "1", value: "a" },
    { key: "2", value: "b" },
    { key: "3", value: "c" },
    { key: "4", value: "d" }
  ];
}
