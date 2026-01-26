import { Validators } from "@angular/forms";

export const urlRegex = "^((http|https):\/\/)?[^\s/$.?#]\.[^\s]*$";

export const urlValidator = Validators.pattern(urlRegex);