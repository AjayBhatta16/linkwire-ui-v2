import { urlRegex } from "./form-utils";
import { Validators } from "@angular/forms";

describe('form-utils', () => {
    it('urlRegex works', () => {
        var validator = Validators.pattern(urlRegex);

        var test1 = "https://ajaybhattacharyya.com";
        var test2 = "ajaybhattacharyya.com";
        var test3 = "not a match";
        var test4 = "https://127.0.0.1:3000";
        var test5 = "http://www.google.com";
        var test6 = "https://www.google.com/";
        var test7 = "https://ajaybhattacharyya.com/resume.pdf";

        var matchResult1 = validator({ value: test1 } as any);
        var matchResult2 = validator({ value: test2 } as any);
        var matchResult3 = validator({ value: test3 } as any);
        var matchResult4 = validator({ value: test4 } as any);
        var matchResult5 = validator({ value: test5 } as any);
        var matchResult6 = validator({ value: test6 } as any);
        var matchResult7 = validator({ value: test7 } as any);

        expect(matchResult1).toBeNull();
        expect(matchResult2).toBeNull();
        expect(matchResult3).not.toBeNull();
        expect(matchResult4).toBeNull();
        expect(matchResult5).toBeNull();
        expect(matchResult6).toBeNull();
        expect(matchResult7).toBeNull();
    });
});