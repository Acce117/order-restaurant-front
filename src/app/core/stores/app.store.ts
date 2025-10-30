import { effect, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AppStore {
    theme = signal<'light_theme' | 'dark_theme'>('dark_theme');
    body = document.querySelector('body');


    constructor() {
        window.matchMedia('(prefers-color-scheme: dark)')
            ? this.theme.set('dark_theme') : this.theme.set('light_theme');
        
        this.body!.classList.toggle(this.theme());
    }

    toggleTheme() {
        let old_value = '';
        old_value = this.theme();
        if (this.theme() === 'dark_theme') this.theme.set('light_theme');
        else this.theme.set('dark_theme');
        
        this.body!.classList.replace(old_value, this.theme());
    }
}
