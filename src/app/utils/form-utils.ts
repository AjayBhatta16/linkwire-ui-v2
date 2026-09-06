import { Validators } from "@angular/forms";

export const urlRegex = "(http[s]?:\\/\\/)?[\\w.-]+(?::\\d+)?(?:[\\/\\?][\\w.\\/?]*)?";

export const urlValidator = Validators.pattern(urlRegex);