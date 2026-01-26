import { urlRegex } from "./form-utils";

describe('form-utils', () => {
    it('urlRegex works', () => {
        var re = new RegExp();

        var test1 = "https://ajaybhattacharyya.com";
        var test2 = "ajaybhattacharyya.com";
        var test3 = "not a match";
        var test4 = "http://localhost:5000";
        var test5 = "https://www.google.com";
        var test6 = "https://www.google.com/";
        var test7 = "https://ajaybhattacharyya.com/resume.pdf";

        var matchResult1 = test1.match(re);
        var matchResult2 = test2.match(re);
        var matchResult3 = test3.match(re);
        var matchResult4 = test4.match(re);
        var matchResult5 = test5.match(re);
        var matchResult6 = test6.match(re);
        var matchResult7 = test7.match(re);

        expect(matchResult1).not.toBeNull();
        expect(matchResult2).not.toBeNull();
        expect(matchResult3).toBeNull();
        expect(matchResult4).not.toBeNull();
        expect(matchResult5).not.toBeNull();
        expect(matchResult6).not.toBeNull();
        expect(matchResult7).not.toBeNull();
    });
});