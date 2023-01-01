import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideTop = trigger('fadetop' , [
    state('void', style({top: '-100px',})),
    transition('void <=> *' , animate(1500) )
])