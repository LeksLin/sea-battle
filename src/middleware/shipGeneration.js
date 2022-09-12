let ships = [];
let shipsForbidden;

export const getRandomInt = (max) => 1 + Math.floor(Math.random() * (max - 1));

export const shipGeneration = (shipsName, shipsForbiddenName) => {
    // console.log('------------Построение кораблей---------------')
    ships = [];
    shipsForbidden = [[],[],[],[],[],[],[],[],[],[]];
    for(let i = 0; i < 10; i++){
        let randomIndex;
        let boolCoolRandom = true;
        while(boolCoolRandom){
            randomIndex = getRandomInt(100);
            boolCoolRandom = !funBoolForbidden(shipsForbidden, randomIndex, i);
        }
        // randomIndex = 70;
        let longShps;
        if(i == 0) longShps = 4;
        else if(i > 0 && i < 3) longShps = 3;
        else if(i > 2 && i < 6) longShps = 2;
        else if(i > 5 && i < 10) longShps = 1;
        // console.log(`Стартовое число: ${randomIndex}, Индекс: ${i} Кол-во палуб: ${longShps}\n-------------------------------------------------------`);
        const {bool, index} = findingDirection(randomIndex, longShps, i);
        if(index <= 0){
        //   console.log('revers');
          i--;
          continue;
        }
        const napravlenie = choiceOfDirection(randomIndex, longShps, bool, index);
        

        // Для логов
        // switch(napravlenie){
        //     case 0:
        //         console.log("Направление ЛЕВО");
        //         break;
        //     case 1:
        //         console.log("Направление ВЕРХ");
        //         break;
        //     case 2:
        //         console.log("Направление ПРАВО");
        //         break;
        //     case 3:
        //         console.log("Направление НИЗ");
        //         break;
        // }
        InputItem(randomIndex, napravlenie, longShps, i);
    }
    console.log(shipsForbidden);
    console.log(ships)
    return {[shipsName]: ships, [shipsForbiddenName]: shipsForbidden};
}



// Проверка на прислонение к краям
const findingDirection = (randomIndex, stop, i) => {
    let bool = [];
    let index = 0;
    
    bool.push(randomIndex % 10 >= stop || randomIndex % 10 == 0 ? 1 : 0);
    index += randomIndex % 10 >= stop || randomIndex % 10 == 0 ? 1 : 0;

    bool.push(randomIndex > (stop - 1) * 10  ? 1 : 0);
    index += randomIndex > (stop - 1) * 10  ? 1 : 0;

    bool.push(randomIndex % 10 <= 10 - (stop - 1) && randomIndex % 10 != 0 ? 1 : 0);
    index += randomIndex % 10 <= 10 - (stop - 1) && randomIndex % 10 != 0 ? 1 : 0;

    bool.push(randomIndex < 100 - ((stop - 1) * 10) ? 1 : 0);
    index += randomIndex < 100 - ((stop - 1) * 10) ? 1 : 0;

    bool.forEach((e, i) => {
      if(e != 0){
        switch(i){
          case 0:
            for(let j = 0; j < stop; j++){
              shipsForbidden.forEach(e => {
                e.forEach(el => {
                  if(randomIndex - j == el){
                    bool[i] = 0;
                    index--;
                  }
                })
                
              })
            }
            break;
          case 1:
            for(let j = 0; j < stop; j++){
              shipsForbidden.forEach(e => {
                e.forEach(el => {
                  if(randomIndex - (j * 10) == el){
                    bool[i] = 0;
                    index--;
                  }
                })
              })
            }
            break;
          case 2:
            for(let j = 0; j < stop; j++){
              shipsForbidden.forEach(e => {
                e.forEach(el => {
                  if(randomIndex + j == el){
                    bool[i] = 0;
                    index--;
                  }
                })
              })
            }
            break;
          case 3:
            for(let j = 0; j < stop; j++){
              shipsForbidden.forEach(e => {
                e.forEach(el => {
                  if(randomIndex + (j * 10) == el){
                    bool[i] = 0;
                    index--;
                  }
                })
              })
            }
            break;
        }
      }
    })

    return {bool, index};
}

// Рандомный выбор направления корабля
const choiceOfDirection = (randomIndex, stop, bool, index) => {
    // Выбор направления
    let supRandomIndex = getRandomInt(index);
    // console.log(`Массив рабочих напралений: [${bool}], кол-во индексов: ${index}, Выбранное направление: ${supRandomIndex}`)
    let j = 0;
    let napravlenie;
    bool.forEach((e, y) => {
        if(e == 1){
            j++;
        }
        if(j == supRandomIndex){
            napravlenie = y;
            j++;
        }
    })
    return napravlenie;
}

// Добавление в массив занятых зон и массив кораблей
const InputItem = (randomIndex, napravlenie, stop, i) => {
    let arr = [];
    let oneEt, centerEt, twoEt, bool;
    for(let y = 0; y < stop; y++){
        switch(napravlenie){
            case 0:
                oneEt = randomIndex + 1;
                if(oneEt % 10 == 1) oneEt = -1; 
                centerEt = randomIndex - y;
                twoEt = randomIndex - stop;
                
                if(twoEt % 10 == 0) twoEt = -1;
                arr.push(centerEt);
                bool = false;
                break;
            case 1:
                oneEt = randomIndex + 10;
                centerEt = randomIndex - (y * 10);
                twoEt = randomIndex - (stop * 10);
                arr.push(randomIndex - (y * 10));
                bool = true;
                break;
            case 2:
                oneEt = randomIndex - 1;
                if(oneEt % 10 == 0) oneEt = -1; 
                centerEt = randomIndex + y;
                twoEt = randomIndex + stop;
                if(twoEt % 10 == 1) twoEt = -1;
                arr.push(centerEt);
                bool = false;
                break;
            case 3:
                oneEt = randomIndex - 10;
                centerEt = randomIndex + (y * 10);
                twoEt = randomIndex + (stop * 10);
                
                arr.push(centerEt);
                bool = true;
                break;
        }
        addShipsForbidden(shipsForbidden,[oneEt, centerEt, twoEt], bool, i);
    }
    // console.log(`Готовый массив: [${arr}]`);
    // console.log(`Запрщенные места: [${shipsForbidden}]`);
    // console.log("Длинна " + shipsForbidden.length)
    // setShips(...ships, ships.push(arr));
    ships.push(arr);
    return arr;
}



const funBoolForbidden = (shipsForbidden, randomIndex, i) => {
  return shipsForbidden[i].indexOf(randomIndex) == -1 ? true : false;
}

const addShipsForbidden = (shipsForbidden, valueArr, index, i) => {
    valueArr.forEach(value => {
      if(value >= 0 && value <= 100){
        if(funBoolForbidden(shipsForbidden, value, i)) shipsForbidden[i].push(value);
        if(index){
            if(funBoolForbidden(shipsForbidden, value - 1, i) && (value - 1) % 10 != 0) shipsForbidden[i].push(value - 1);
            if(funBoolForbidden(shipsForbidden, value + 1, i) && (value + 1) % 10 != 1) shipsForbidden[i].push(value + 1);
        }else{
            if(funBoolForbidden(shipsForbidden, value - 10, i) && value - 10 > 0) shipsForbidden[i].push(value - 10);
            if(funBoolForbidden(shipsForbidden, value + 10, i) && (value + 10) <= 100) shipsForbidden[i].push(value + 10);
        }
      }
    })
}