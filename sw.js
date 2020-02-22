importScripts('./sw_copy.js');

let iNmutable="intable_cache-v0.04";
let eStatico="static";
let dInamico="dynamic_cache-v0.02";

const presentacion=[
         "/",
"index.html",
"img/avatars/hulk.jpg",
"img/avatars/ironman.jpg",
"img/avatars/spiderman.jpg",
"img/avatars/thor.jpg",
"img/avatars/wolverine.jpg",
"js/app.js",
"css/style.css"
];
const Nocambian=[
"css/animate.css",
"js/libs/jquery.js",
"https://fonts.googleapis.com/css?family=Quicksand:300,400",
"https://fonts.googleapis.com/css?family=Lato:400,300",
"https://use.fontawesome.com/releases/v5.3.1/css/all.css"
];
self.addEventListener("install",e=>{
const statico=caches.open(eStatico).then(e=>
e.addAll(presentacion).then(e=>{
         console.log("Se guardo a la perfecsion",e)
 }).catch(e=>
         
         console.log("error durante el almacenamiento",e.target.result))
);

const inmutable=caches.open(iNmutable).then(e=>
e.addAll(Nocambian)
.then(e=>{
console.log("SE guardaron los inmutables")         
}).catch(e=>{
         console.log("no pudimos guardar los inmutables")

 }));

e.waitUntil(Promise.all([inmutable,statico]))
})



self.addEventListener('activate', e => {

         const respuesta = caches.keys().then( keys => {
         keys.forEach( key => {
     if (  key !== eStatico && key.includes('static') ) {
                 return caches.delete(key);
                 
         }});
     
         });
     e.waitUntil( respuesta );});


     ///******************************************* */


self.addEventListener("fetch",e=>{
const resultCache=caches.match(e.request).then(resp1=>{
if(resp1){
return resp1
}else{
return fetch(e.request)
.then(resp=>{
return filtroCalback(dInamico,e.request,resp)
})
.catch(e=>{

        console.log("error durante la llamada a la function");
        
})




}


}
         );



         e.respondWith(resultCache)
})
