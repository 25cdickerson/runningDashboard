import { FormControl } from "@angular/forms";

export class FiltersFormModel {
    name: FormControl<string | null> = new FormControl<string | null>("");
    startDate: FormControl<Date | null> = new FormControl<Date | null>(null);
    endDate: FormControl<Date | null> = new FormControl<Date | null>(null);
    quickerThan: FormControl<string | null> = new FormControl<string | null>("");
    slowerThan: FormControl<string | null> = new FormControl<string | null>("");
    lessThanPlace: FormControl<number | null> = new FormControl<number | null>(null);
    greaterThanPlace: FormControl<number | null> = new FormControl<number | null>(null);
}