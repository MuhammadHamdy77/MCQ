import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideLeft = trigger('fadeleft' , [
    state('void', style({left: '-100%',})),
    transition('void <=> *' , animate(600) )
])