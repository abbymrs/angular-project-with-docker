import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Options } from "../../../shared/model/options.model";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit {
  @Input() labelName: string = "Label Name";
  @Input() optionsData: Options[] = [
    { id: 1, value: "item1" },
    { id: 2, value: "item2" }
  ];
  @Input() isRequired: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() model: any = "";
  @Input() controlName: string = "";
  @Input() containerClass = "";
  @Output() inputModelChange = new EventEmitter<string>();

  isOpen: boolean = false;
  constructor() {}

  ngOnInit() {
  }

  closeOptions(container, label, panel, content) {
    panel.classList.add("dis-hide");
    panel.classList.remove("dis-show", "focus-border");
    if (!content.textContent && !content.textContent.trim()) {
      label.classList.remove("small-label", "focus-color");
      label.classList.add("big-label");
      if (container.querySelector(".error")) {
        container.removeChild(container.querySelector(".error"));
      }
      container.classList.remove("focus-border");
    } else {
      label.classList.remove("big-label", "focus-color");
      label.classList.add("small-label");
      container.classList.remove("focus-border");
    }
  }

  onClickSelectContainer(e) {
    this.isOpen = !this.isOpen;
    const container = e;
    const label = e.firstElementChild;
    const panel = container.querySelector(".select-panel");
    const content = e.querySelector(".select-content");
    if (this.isOpen) {
      // open
      const selectValue = content.getAttribute("data-real-value");
      if (selectValue) {
        const options = panel.querySelectorAll("a");
        for (let i = 0; i < options.length; i++) {
          selectValue === options[i].getAttribute("data-real-value")
            ? options[i].classList.add("active-option")
            : options[i].classList.remove("active-option");
        }
      }

      container.classList.add("focus-border");
      container.classList.remove("input-container-error");
      label.classList.add("small-label", "focus-color");
      label.classList.remove("big-label");
      panel.classList.add("dis-show", "focus-border");
      panel.classList.remove("dis-hide");
    } else {
      // close
      this.closeOptions(container, label, panel, content);
    }
  }

  onClickSelectPanel(e) {
    this.isOpen = false;
    e.stopPropagation();
    const target = e.target;
    const container = target.parentElement.parentElement.parentElement;
    const label = container.firstElementChild;
    const panel = container.querySelector(".select-panel");
    const content = container.querySelector(".select-content");
    const contentRealValue = target.getAttribute("data-real-value");

    content.textContent = target.textContent;
    content.setAttribute("data-real-value", contentRealValue);
    this.model = contentRealValue;
    this.closeOptions(container, label, panel, content);
    this.updateChanges();
  }

  updateChanges() {
    this.inputModelChange.emit(this.model);
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue() {
    this.updateChanges();
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
