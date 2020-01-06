import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "transformStatus"
})
export class TransformStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? "Active" : "Inactive";
  }
}
