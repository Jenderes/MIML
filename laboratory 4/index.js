  function wait() {
    let idin = 0;
    while (idin < 1000000000) {
      idin++;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
function set() {
  function timeout() {
    setTimeout(function () {
      let zapr = '';
      for (let i = 0; i < arrman.length; i++) {
        zapr += `<div id ='${arrman.number}' class='field'><img src="stan.svg" alt=""></div>`;
      }
      let twozapr = '';
      for (let i = 0; i < comp.length; i++) {
        twozapr += `<div id ='${comp[i].man.number}' class='manco'><img src="stan.svg" alt=""></div>`;
      }
      let x = 0;
      let i = 0;
      $("#man").html(zapr);
      // вывод html элементов на страницу
      $(".field").each(function (index) {
        $(this).css({
          left: x + "px",
          top: 300 + "px",
          background: arrman[i].color,
        });
        x += 150;
        i += 1;
      });
      x = 0;
      i = 0;
      $("#conman").html(twozapr);
      // вывод html элементов на страницу
      $(".manco").each(function (index) {
        $(this).css({
          left: x + "px",
          top: 100 + "px",
          background: comp[i].man.color,
        });
        x += 200;
        i += 1;
      });
      console.log(time);
      i += 1;
      time = getRandomInt(1000, 3000);
      let copmut = getRandomInt(0, comp.length-1);
      let ranman = arrman.splice(0, 1)
      console.log(ranman);
      arrman.push(comp[copmut].man);
      comp[copmut].man = ranman[0];
      timeout();
    }, time);
  }
  let time = 1500;
  let color = []
  const comput = {
    man: {},
    number: 0
  }
  let arrman = [];
  const man = {
    number: 0,
    color: 0
  }
  let colcomp = parseInt(document.getElementById('setcomp').value);
  let people = Math.floor(1.8*colcomp);
  console.log(people);
  for (let j = 0; j < people; j++) {
    arrman[j] = Object.assign({}, man);
    arrman[j].number = j;
    arrman[j].color = getRandomColor();
    color.push(arrman[j].color);
  }
  let comp = [];
  for (let i = 0; i < colcomp; i++) {
    comp[i] = Object.assign({}, comput);
    comp[i].number = i;
    comp[i].man = Object.assign({}, arrman[0]);
    arrman.shift();
  }
  console.log(comp);
  console.log(arrman);
  let zapr = '';
  for (let i = 0; i < people; i++) {
    zapr += `<div id ='${i}' class='field'><img src="stan.svg" alt=""></div>`;
  }
  let twozapr = '';
  for (let i = 0; i < colcomp; i++) {
    twozapr += `<div id ='${i}' class='cmpf'><img src="computer.svg" alt=""></div>`;
  }
  let x = 0;
  let i = 0;
  let y = 300;
  $("#man").html(zapr);
  // вывод html элементов на страницу
  $(".field").each(function (index) {
    $(this).css({
      left: x + "px",
      top: y + "px",
      background: color[i],
    });
    x += 150;
    i += 1;
  });
  x = 0;
  i = 0;
  $("#conteiner").html(twozapr);
  // вывод html элементов на страницу
  $(".cmpf").each(function (index) {
    $(this).css({
      left: x + "px",
    });
    x += 200;
    i += 1;
  });
  timeout();
}