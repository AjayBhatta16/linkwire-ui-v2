import { Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RedirectComponent } from './components/redirect/redirect.component';

/**
 * Matches URLs of the form /<6-digit-code>/... (requires at least one path segment after the code)
 * Example: /123456/some/path/file
 */
export function sixDigitCodeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
    if (!segments || segments.length < 1) {
        return null;
    }

    const first = segments[0].path;
    if (/^[A-Z0-9]{6}$/.test(first)) {
        return { consumed: segments.slice(0, 1), posParams: { redirectCode: segments[0] } };
    }

    return null;
}

// TODO: make this work with file paths after the code (eg APP_URI/ABC123/screenshot.png)
export const routes: Routes = [
	{ path: '', component: LandingPageComponent, pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ 
        matcher: sixDigitCodeMatcher, 
        component: RedirectComponent,
        children: [
            { path: '**', component: RedirectComponent } 
        ] 
    },
	{ path: '**', redirectTo: '' }
];
