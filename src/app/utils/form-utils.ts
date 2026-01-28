import { Validators } from "@angular/forms";

export const urlRegex = "(http[s]?:\\/\\/)?\\w+\\.[\\w\\.\\/\\?]*";

export const urlValidator = Validators.pattern(urlRegex);