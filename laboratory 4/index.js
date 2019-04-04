  function wait() {
    let idin = 0;
    while (idin < 1000000000) {
      idin++;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

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
          top: 150 + "px",
          background: comp[i].man.color,
        });
        x += 200;
        i += 1;
      });
      console.log(time);
      i += 1;
      time = getRandomInt(500, 2000);
      let copmut = getRandomInt(0, 3);
      let ranman = arrman.splice(0,1)
      console.log(ranman);
      arrman.push(comp[copmut].man);
      comp[copmut].man = ranman[0];
      timeout();
    }, time);
  }
  let time = 1000;
  let color = ['#04e0fd', '#04fd25', '#ee87b2', '#87eec6', '#cfee87', '#c5bba0', '#37f1c346', '#f5be9946', ' #e2c1eb46', '#da2c5746', '#4c7fec46', '#d14cec46']
  const comput = {
    man: {},
    number: 0
  }
  let arrman = [];
  const man = {
    number: 0,
    color: 0
  }
  for (let j = 0; j < 10; j++) {
    arrman[j] = Object.assign({}, man);
    arrman[j].number = j;
    arrman[j].color = color[j];
  }
  let comp = [];
  for (let i = 0; i < 4; i++) {
    comp[i] = Object.assign({}, comput);
    comp[i].number = i;
    comp[i].man = Object.assign({}, arrman[0]);
    arrman.shift();
  }
  console.log(comp);
  console.log(arrman);
  let zapr = '';
  for (let i = 0; i < 10; i++) {
    zapr += `<div id ='${i}' class='field'><img src="stan.svg" alt=""></div>`;
  }
  let twozapr = '';
  for (let i = 0; i < 4; i++) {
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