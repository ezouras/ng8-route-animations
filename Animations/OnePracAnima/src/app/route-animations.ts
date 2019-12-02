//where we buil our animations
import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes
} from "@angular/animations";

//Basic -this gets applied to EVERY animation
//"routeAnimations must match what is in the html"
export const fader =
  trigger("routeAnimations",[
    //* = every transition.  from <=  to >*
    transition('* <=> *', [
        //array of funtions to apply to anination.
        //query allows us to apply the pseudo elements to the dom
        //here, when we both enter and leave a page, we will apply
        //the styles defined
      query(":enter, :leave",[ //query is imported
            style({
              position: "absolute",
              left:0,
              width:"100%",
              opacity:0,
              transform:"scale(0) translateY(100%)",
            }),
        ],{optional:true}), //the next one will be ONLY for enter or when you go to a new page
      query(":enter",[
          animate("600ms ease",
            style({opacity:1, transform: 'scale(1) translateY(0)'})),
      ],{optional:true})
  ])
]); //end fader

export const slider =
    trigger("routeAnimations",[
      //isLeft is somthing that is gotten from app-routing module.
      //if you are going from anywhere to the route with "isLeft"
      transition("* => isLeft", slideTo("left")),//here we pass a function
      //from anywhere TO 'isRight' route
      transition("* => isRight", slideTo("right")),
      //isRight going anywhere slide left
      transition("isRight => * ", slideTo("left")),
      //from isRight to anywhere
      transition("isLeft => * ", slideTo("right"))
      //from is left to anywhere
]);

export const transformer =
  trigger('routeAnimations', [
    transition('* => isLeft', translateTo({ x: -100, y: -100, rotate: -720 }) ),
    transition('* => isRight', translateTo({ x: 100, y: -100, rotate: 90 }) ),
    transition('isRight => *', translateTo({ x: -100, y: -100, rotate: 360 }) ),
    transition('isLeft => *', translateTo({ x: 100, y: -100, rotate: -360 }) )
]);

//define a function to be reused in the animations
function slideTo(direction){ //variable direction passed from above
  const optional = { optional: true };
  return [
    query(":enter, :leave",[
      style({
        position: "absolute",
        top:0,
        [direction]:0,
        width:"100%"
      })
    ], optional),
    query(":enter",[
      style({ [direction]: "-100%"})
    ]),
    group([
      query(":leave",[
        animate('600ms ease',style({[direction]: "100%"}))
      ],optional),
      query(":enter",[
        animate("600ms ease", style({[direction]:"0%"}))
      ])
    ]),
  ];
}

function translateTo({x = 100, y = 0, rotate = 0}) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`})
    ]),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)`}))
      ], optional),
      query(':enter', [
        animate('600ms ease-out', style({ transform: `translate(0, 0) rotate(0)`}))
      ])
    ]),
  ];
}

// Keyframes

export const stepper =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ]),
      group([
        query(':enter', [
          animate('2000ms ease', keyframes([
            style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
            style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
          ])),
        ]),
        query(':leave', [
          animate('2000ms ease', keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
            style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
          ])),
        ])
      ]),
    ])

]);
