function randomInteger(min, max) { var rand = min - 0.5 + Math.random() * (max - min + 1); rand = Math.round(rand); return rand;}
document.getElementById('ButtonClick').addEventListener('click',function (){
let CountOrder=Math.floor(document.getElementById('SelectCountDelivery').value)+1;
let order = {
 id: 0,
 timer: 1000 
 }
 let orderArr = [];
let OrderArrayDeliver = [];
for (i = 0; i< 40; i++){
orderArr[i]= Object.assign({}, order);
orderArr[i].id=i;
orderArr[i].timer=i*500;
}
let DeliveryMan = {
id: 0
}
let manArr = [];
for (i = 0; i<5; i++){
manArr[i]= Object.assign({}, DeliveryMan);
manArr[i].id=i;
}
   //Отрисовка курьеров
   function otrisovkaKurierov(){ 
   schtk =20; 
  kurier = ``;  
  for (i = 0; i < manArr.length; i++) {
     kurier += `<div class='DeliveryMan' id='DeliveryMan'><div class="imgman" ><img src="img/courier.svg" alt=""></div><div class="number">${manArr[i].id}</div></div>`;      
    }
  $(".ConteinerDeliveryMan").html(kurier);
  $(".DeliveryMan").each(function coord(index) {         
    $(this).css({
      left:"2%",
      top: schtk + "px"    
    });    
     schtk +=120;
  });
  }  
     //Отрисовка заказов справа
   function otrisovkaZakazovRight(){
      schtk2=20;
      let ctk = 400;
      zakaz2 = ``;  
  for (i = 0; i < orderArr.length; i++) {
    zakaz2 += `<div class='Stack' id='Stack'>
    <div clas="imgdeliver"><img src="img/box.svg" alt="" srcset=""></div>
    <div class="numberbox">${orderArr[i].id}</div>
</div>`;     
   }    
 $(".ContainerDeliveryStack").html(zakaz2);
 $(".Stack").each(function coord(index) { 
   if (parseInt($(this).index())%10 === 0) {
     ctk+= 120;
     schtk2 = 20;
   }
    $(this).css({
      left:  ctk + 'px',
      top: schtk2 + 'px'    
    });
   schtk2 +=120;
 });
  } 
  //Отрисовка заказов у курьера
  function otrisovkaZakazovLeft() { 
schtk=120; 
zakaz = ``; 
  for (i = 0; i < OrderArrayDeliver.length; i++) { //Заказы у курьера
    zakaz += `<div class='Deliver' id='Deliver'>
    <div class="imgdeliver"><img src="img/shopping-cart.svg" alt="" srcset=""></div>
    <div class="numberbox">${OrderArrayDeliver[i].id}</div>
   </div>`;      
       }
     $(".ConteinerDelivery").html(zakaz);
     $(".Deliver").each(function coord(index) {         
       $(this).css({
         left: schtk +'px',  
         top: '20px'    
       });   
       schtk +=120;
     });
  } 
  otrisovkaZakazovRight();
  otrisovkaKurierov(); 
   
  k=0;
  schetZak=0;
  stop=0;
  nerandZakaz=0;
  schetForKureerov=0;
  // Переменные для возвращения курьеров
  idBack=0;
   perehodSchet=0;
    Schet2=0;
  /////////////////////////////////////////
  ////Передача заказов курьеру/////////////
  //////////////////////////////////////// 
  function perehod() { 
   perehodSchet+=1;
   Schet2+=1;
  
    if (Schet2==CountOrder*290){
     Schet2=0;
     manArr.length+=1; 
    manArr[manArr.length-1]= Object.assign({}, DeliveryMan);
    manArr[manArr.length-1].id=idBack;
    otrisovkaKurierov();
    idBack+=1;
     
    }
  if (perehodSchet==100){
  perehodSchet=0;
      randZakaz=randomInteger(0, orderArr.length-1);
      k+=1;
      schetZak+=1;  
      schtk=240;
      if (schetZak < CountOrder) { 
OrderArrayDeliver.splice(k,1,orderArr[randZakaz]);//Заказы у курьера
orderArr.splice(randZakaz,1,);//Заказы справа 
  otrisovkaZakazovLeft();  
  otrisovkaZakazovRight();
  }
  else  {
if (manArr.length>0){
manArr.splice(0,1,);
OrderArrayDeliver.splice(0,10,);
  schetZak=0;
  otrisovkaKurierov(); 
  otrisovkaZakazovLeft();
  schetForKureerov+=1;
  schetDel=schetForKureerov/2;

}
}
}
}
 
(function runInterval() {
    interval = (randomInteger(1, 1))*1;
    setTimeout(function(){
       perehod();
       runInterval();
    }, interval);
      timeset = OrderArrayDeliver.length * 1000;
})();

});