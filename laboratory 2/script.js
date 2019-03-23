$("#start").on("click", () => {
  var setr;
  function RandomArrayNotRepeat(n) {
    // массив объектов
    let pingt = [];
    let flag = true;
    let flastr = 1;
    const num = Math.floor(Math.random() * (n - 1) + 1);
    // первый элемент массива
    pingt[0] = {
      number: 1,
      id: num,
      idmax: num
    };
    // добовления элементов в массив начигая с 1
    for (let i = 1; i < n; i++) {
      pingt[i] = {};
      pingt[i].number = i + 1;
      flag = true;
      // пока все элементы не повторяются
      while (flag) {
        let idnum = Math.floor(Math.random() * (n - 1 + 1)) + 1;
        for (let j = 0; j < pingt.length - 1; j++) {
        // проверка всех объектов массива на повторение
          if (pingt[j].id != idnum) {
            flastr += 1;
          }
        }
        // если счетчик сработал то внесение данных в объект
        if (flastr == pingt.length) {
          pingt[i].id = idnum;
          pingt[i].idmax = idnum;
          flag = false;
        }
        // сброс счетчика
        flastr = 1;
      }
    }
    // вывод массива
    return pingt;
  }
  // проверка является ли введенное строка числом
  if (typeof parseInt($("#inp").val()) === "number") {
    set = $("#inp").val();
  } else {
    set = 6;
  }
  const radius = 200;
  const width = $("#container").width();
  const height = $("#container").height();
  let angle = 300;
  let schtk = 0;
  const time = 500;
  let arrayobj = RandomArrayNotRepeat(set);
  // создание html элементов
  let zapr = `<div class='radius'></div><div id='center'><p>0</p></div>`;
  for (let i = 0; i < arrayobj.length; i++) {
    zapr += `<div class='field'><p>number:${arrayobj[i].number}</p><p>id:${arrayobj[i].id},idmax:${arrayobj[i].idmax}</p></div>`;
    if (arrayobj[i].idmax === arrayobj.length) {
      setr = i;
    }
  }
  // вывод html элементов на страницу
  $("#container").html(zapr);
  let step = (2 * Math.PI) / $(".field").length;
  $(".field").each(function(index) {
    console.log(index);
    if (index === setr) {
      console.log(setr);
      $(this).css({
        background:'#042928'
      })
    }
    let x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2
    );
    let y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2
    );
    $(this).css({
      left: x + 365 + "px",
      top: y + "px"
    });
    angle += step;
  });
  // обработка кода определенный промежуток времени
  let timerId = setInterval(function() {
    for (let i = arrayobj.length - 1; i >= 0; i--) {
      // если равно максимальному значению то задаем значение первому числу
      if (i === arrayobj.length - 1) {
        if (arrayobj[0].idmax < arrayobj[arrayobj.length - 1].idmax) {
          arrayobj[0].idmax = arrayobj[arrayobj.length - 1].idmax;
        }
        // если равно i значению то задаем значение i+1 числу
      } else if (i !== arrayobj.length - 1) {
        if (arrayobj[i + 1].idmax < arrayobj[i].idmax) {
          arrayobj[i + 1].idmax = arrayobj[i].idmax;
        }
      }
    }
    // значение счетчика
    schtk += 1;
    // отрисовка
    let zapr = `<div class='radius'></div><div id='center'><p>0</p></div>`;
    for (let i = 0; i < arrayobj.length; i++) {
      zapr += `<div class='field'><p>number:${arrayobj[i].number}</p><p>id:${
        arrayobj[i].id
      },idmax:${arrayobj[i].idmax}</p></div>`;
    }
    $("#container").html(zapr);
    $("#center p").html(schtk);
    let step = (2 * Math.PI) / $(".field").length;
    $(".field").each(function(index) {
      if (index === setr) {
        console.log(setr);
        $(this).css({
          background:'#042928'
        })
      }
      let x = Math.round(
        width / 2 + radius * Math.cos(angle) - $(this).width() / 2
      );
      let y = Math.round(
        height / 2 + radius * Math.sin(angle) - $(this).height() / 2
      );
      $(this).css({
        left: x + 365 + "px",
        top: y + "px"
      });
      angle += step;
    });
  }, time);
  const timeset = arrayobj.length * time;
  // остановка программы после длины массива шагов
  setTimeout(function() {
    clearInterval(timerId);
  }, timeset);
});
