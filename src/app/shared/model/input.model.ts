export interface inputItem {
    type?: string;
    className?: string;
    containerClassName?: string;
    controlName: any;
    model: any;
    placeholder?: string;
    minNumber?: number | string;
    isDisabled?: boolean;
    isRequired?: boolean;
    labelName?: string;
    optionsData?: any;
    minDate?: Date;
}