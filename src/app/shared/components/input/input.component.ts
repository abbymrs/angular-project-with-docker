import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { inputItem } from "../../model/input.model";
import { UtilService } from '../../service/util.service';

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit {
  @Input() control: inputItem;
  @Output() inputModelChange = new EventEmitter<any>();

  inputContainerClasses = [];
  panelStyle = <any>{};

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.inputContainerClasses = [
      this.control.type !== "textarea"
        ? "input-container"
        : "textarea-container",
      this.control.isDisabled ? "disabled-input-group" : "",
      this.control.containerClassName ? this.control.containerClassName : ""
    ];
  }

  changInputStatus(target) {
    // const target = e.target;
    const sibling = target.previousElementSibling;

    if (target.value && target.value.trim()) {
      this.floatLable(target);
    } else {
      this.removeFloatLable(target);
    }

    target.parentElement.classList.remove("focus-border");
    sibling.classList.remove("focus-color");

    // make sure the view is consistent with model value
    const isNumberInput = target.getAttribute("type") === "number";
    if (isNumberInput) {
      if (target.value && target.value < this.control.minNumber) {
        target.value = this.control.minNumber;
      }
    }
  }

  floatLable(target) {
    const parent = target.parentElement;
    const sibling = target.previousElementSibling;
    if (sibling) {
      sibling.classList.remove("big-label");
      sibling.classList.add("small-label", "focus-color");
    }
    if (parent) parent.classList.add("focus-border");
  }

  removeFloatLable(target) {
    const sibling = target.previousElementSibling;

    if (sibling) {
      sibling.classList.remove("small-label", "focus-color");
      sibling.classList.add("big-label");
    }
  }

  updateSelectVal(data) {
    if (data) this.control.model = data;
  }

  focusCalendar(e) {
    const target = <HTMLInputElement>e.target;
    const input = target.parentElement.parentElement.previousElementSibling;
    if (input) {
      this.floatLable(input);
      if (
        input.parentElement &&
        input.parentElement.classList.contains("input-container-error")
      ) {
        const container = input.parentElement;
        const sibling = input.previousElementSibling;
        sibling && sibling.classList.remove("error");

        const error = container.querySelector(".error");
        container.classList.remove("input-container-error");
        error && container.removeChild(error);
      }
    }

    // adjust calendar position
    setTimeout(() => {
      const datepicker = <HTMLElement>target.nextElementSibling;
      const dialog = document.querySelector('.ui-dynamicdialog');
      const rect = datepicker && datepicker.getBoundingClientRect();
      const isInvisibleInX = rect.right > window.innerWidth;
      const isInvisibleInY = rect.bottom > window.innerHeight;
      const isOutsideModal = dialog && dialog.clientHeight <= datepicker.clientHeight;

      if (isInvisibleInX && isInvisibleInY) {
        this.updateLeftPos(rect, datepicker);
        this.updateTopPos(rect, datepicker);
      } else if (isInvisibleInX) {
        this.updateLeftPos(rect, datepicker);
      } else if (isInvisibleInY || isOutsideModal) {
        this.updateTopPos(rect, datepicker);
      }
    });
  }

  updateLeftPos(rect, datepicker) {
    const left = Math.ceil(rect.right - window.innerWidth + 20);
    datepicker.setAttribute('style', `left: -${left}px!important; z-index: 1002`);
  }

  updateTopPos(rect, datepicker) {
    const offsetTop = this.utilService.getOffsetTop(datepicker, 'ui-dialog-content');
    // let top = Math.abs(Math.ceil(rect.bottom - window.innerHeight));

    // top = offsetTop < top ? offsetTop : top;
    datepicker.setAttribute('style', `top: -${offsetTop}px!important; z-index: 1002`);
    datepicker.classList.add('condense-datepicker');
  }

  blurCalendar(e) {
    const target = e.target;
    const input = target.parentElement.parentElement.previousElementSibling;
    if (input) {
      this.floatLable(input);
    }
  }

  closeCalendar(e) {
    const input = e.element.parentElement.parentElement.previousElementSibling;
    if (input) {
      this.changInputStatus(input);
    }
  }

  selectCalendar() {
    this.updateChanges();
  }

  updateChanges() {
    this.inputModelChange.emit(this.control.model);
  }

  // overwrite
  onTouched: () => void = () => { };

  onChange: (_: any) => void = (_: any) => { };

  writeValue(value: number): void {
    this.updateChanges();
  }

  // /**
  //  * Registers a callback function that should be called when the control's value changes in the UI.
  //  * @param fn
  //  */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // /**
  //  * Registers a callback function that should be called when the control receives a blur event.
  //  * @param fn
  //  */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
