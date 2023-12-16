
let a = "hi";


switch (a){
    case "hello":
        console.log("hello");
        break;
    case (typeof(a) == 'number') ? a : 'Doesnt Work':
        console.log("IS A NUMBER");
        break;
    default:
        console.log("NONE");
        break;
}