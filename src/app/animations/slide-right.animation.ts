import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideRight = trigger('fade' , [
    state('void', style({right: '-100%',})),
    transition('void <=> *' , animate(700) )
])