import { Validators } from "@angular/forms";

export const urlValidator = Validators.pattern(/^(http|https):\/\/[^ "]+$/)