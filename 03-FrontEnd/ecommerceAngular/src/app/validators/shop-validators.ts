import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {
    static notOnlyWhitespace(control: FormControl): ValidationErrors {
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { 'notOnlyWhitespace': true };
        }
        else {
            return null;
        }
    }
}
