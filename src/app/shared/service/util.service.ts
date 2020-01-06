import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilService {

  constructor() { }

  generateErrMsg(inputContainer, input, missingText) {
    const errorDom = document.createElement("div");
    const label = inputContainer.firstChild;
    if (input.type === "email" && input.validity.typeMismatch) {
      errorDom.textContent = `Please input correct email format`;
    } else {
      errorDom.textContent = missingText;
    }

    if (input.classList.contains("select")) {
      errorDom.classList.add("error", "margin-top25");
    } else {
      errorDom.classList.add("error", "margin-top5");
    }

    if (label) {
      label.classList.remove("big-label");
      label.classList.add("small-label");
    }
    if (inputContainer) inputContainer.appendChild(errorDom);
  }

  validateInput(item) {
    const parent = item.parentElement;
    const sibling = <HTMLElement>item.previousElementSibling;
    const missingText = sibling
      ? "Please input " + sibling.textContent.slice(1).toLowerCase()
      : "";

    // add error message for each invalid input
    if (parent) {
      const hasError = parent.classList.contains("input-container-error");
      if (hasError) return;
      parent.classList.add("input-container-error");
      this.generateErrMsg(parent, item, missingText);
    }

    // remove current error message when input focuses
    item.addEventListener("focus", function () {
      const error = this.parentElement.querySelector(".error");
      parent.classList.remove("input-container-error");
      error && parent.removeChild(error);
    });
  }

  validateSelect(item) {
    const parent = item.parentElement;
    const label = parent.firstChild;
    const missingText = label
      ? "Please select" + label.textContent.slice(1).toLowerCase()
      : "";

    if (parent) {
      const hasError = parent.classList.contains("input-container-error");
      if (hasError) return;
      parent.classList.add("input-container-error");
      this.generateErrMsg(parent, item, missingText);
    }
  }

  validateForm(formClassName: string) {
    const form = document.querySelector(formClassName);
    const invalidInputs = Array.from(
      form.querySelectorAll(".ng-invalid:not(app-input)")
    );

    invalidInputs.forEach((item: HTMLInputElement) => {
      if (item.classList.contains("select")) {
        this.validateSelect(item);
      } else {
        this.validateInput(item);
      }
    });
  }

  handleFormItemStatus(obj: any) {
    const inputs = Array.from(document.querySelectorAll("input, textarea"));
    const selects = Array.from(document.querySelectorAll("app-select input"));
    const calendars = Array.from(
      document.querySelectorAll("input[type=calendar]")
    );
    inputs.forEach((input: HTMLInputElement) => {
      const sibling = input.previousElementSibling;
      if (sibling) {
        for (let prop in obj) {
          const val = obj[prop] && obj[prop].toString();
          // make sure the empty input field label text not float to top
          if (val && input.value == val) {
            sibling.classList.remove("big-label");
            sibling.classList.add("small-label");
          }
        }
      }
      // focus on email field
      if (input.type === "email") {
        input.parentElement.classList.add("focus-border");
        input.focus();
      }
    });

    // selects
    selects.forEach((sel: HTMLInputElement) => {
      const nextSibling = sel.nextElementSibling;

      if (nextSibling) {
        const parent = sel.parentElement;
        const aTags = Array.from(nextSibling.querySelectorAll("a"));
        const selectProp = parent.parentElement.getAttribute("ng-reflect-name");
        aTags.forEach(tag => {
          if (
            tag.getAttribute("data-real-value").toString() ===
            obj[selectProp].toString()
          ) {
            tag.click();
            return;
          }
        });
      }
    });

    // calendars
    calendars.forEach((cal: HTMLElement) => {
      if (cal.getAttribute("ng-reflect-model")) {
        const label = cal.previousElementSibling;
        label.classList.remove("big-label");
        label.classList.add("small-label");
      }
    });
  }

  isSelectedItem(item) {
    return this.isObject(item) && !this.isObjectEmpty(item);
  }
  isObjectEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }
  isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]";
  }
  getOffsetTop(elem, parent) {
    var offsetTop = 0;
    do {
      if (!isNaN(elem.offsetTop)) {
        if (elem.classList.contains(parent)) break;
        offsetTop += elem.offsetTop;
      }
    } while (elem = elem.offsetParent)

    return offsetTop;
  }
}
