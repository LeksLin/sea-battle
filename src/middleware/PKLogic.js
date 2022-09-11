import {getRandomInt} from '../middleware/shipGeneration';
import {shotRegistration} from '../middleware/shotRegistration';

export const PKLogic = ({
                            shotRobotYes,
                            setShotRobotYes,
                            setDirection,
                            left,
                            top,
                            right,
                            bottom,
                            arrShot,
                            setArrShot,
                            shipsStateUser,
                            arrUser,
                            setArrUser,
                            setShotUser,
                            setOchered
                        }) => {
    const dopFunc = {shipsStateUser, arrUser, setArrUser, setShotUser, setArrShot, setShotRobotYes};
    setOchered(1);
    if(shotRobotYes){
        if(left){
            let testShot = arrShot[arrShot.length - 1] - 1;
            console.log(`Атака Пк Проверка слева: ${testShot}`);

            let result = plannedAttack(testShot, testShot > 1 && testShot < 100 && testShot % 10, dopFunc);

            console.log(result);
            switch(result){
                case 0:
                    setDirection(oldDirection => ({...oldDirection, left: 0, top: 1}));
                    return;
                case 1:
                    setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
                    return;
                case 2:
                    setDirection(oldDirection => ({...oldDirection, left: 0, top: 1}));
                    left = 0;
                    top = 1;
            }
            console.log(left, top);
        }
        if(top){
            let testShot = arrShot[arrShot.length - 1] - 10;
            console.log(`Атака Пк Проверка сверху: ${testShot}`);

            let result = plannedAttack(testShot, testShot > 1 && testShot < 100, dopFunc);

            console.log(result);
            switch(result){
                case 0:
                    setDirection(oldDirection => ({...oldDirection, top: 0, right: 1}));
                    return;
                case 1:
                    setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
                    return;
                case 2:
                    setDirection(oldDirection => ({...oldDirection, top: 0, right: 1}));
                    top = 0;
                    right = 1;
            }
            console.log(top, right);
        }
        if(right){
            let testShot = arrShot[arrShot.length - 1] + 1;
            console.log(`Атака Пк Проверка справа: ${testShot}`);

            let result = plannedAttack(testShot, testShot > 1 && testShot < 100 && testShot % 10 != 1, dopFunc);

            console.log(result);
            switch(result){
                case 0:
                    setDirection(oldDirection => ({...oldDirection, right: 0, bottom: 1}));

                    return;
                case 1:
                    setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
                    return;
                case 2:
                    setDirection(oldDirection => ({...oldDirection, right: 0, bottom: 1}));
                    right = 0;
                    bottom = 1;
            }
            console.log(right, bottom);
        }
        if(bottom){
            let testShot = arrShot[arrShot.length - 1] + 10;
            console.log(`Атака Пк Проверка снизу: ${testShot}`);

            let result = plannedAttack(testShot, testShot > 1 && testShot < 100, dopFunc);

            console.log(result, arrShot);
            switch(result){
                case 0:
                    setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
                    if(arrShot.length == 1) {
                        console.log('Обнуление массива')
                        setArrShot([]);
                        setShotRobotYes(0);
                    }else{
                        console.log('Перепроверка')
                        setArrShot(oldArrShot => [oldArrShot[0]]);
                    }
                    return;
                case 1:
                    setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
                    return;
                case 2:
                    setDirection(oldDirection => ({...oldDirection, left: 1, top: 0, right: 0, bottom: 0}));
                    if(arrShot.length == 1) {
                        console.log('Обнуление массива')
                        setArrShot([]);
                        setShotRobotYes(0);
                        RandomAtakPK(dopFunc);
                    }else{
                        console.log('Перепроверка')
                        setArrShot(oldArrShot => [oldArrShot[0]]);
                    }
            }
            console.log(right, bottom);
        }
    }
    if(!shotRobotYes){
        RandomAtakPK(dopFunc);
    }
}


const RandomAtakPK = ({shipsStateUser, arrUser, setArrUser, setShotUser, setArrShot, setShotRobotYes}) => {
    let bool = 2;
    while(bool == 2){
        const PKAtack = getRandomInt(100);
        bool = shotRegistration(shipsStateUser, PKAtack, arrUser, setArrUser, setShotUser);
        console.log(`Рандомная атака: ${PKAtack}
            Результат атаки: ${bool < 2 
                                ? bool 
                                ? 'Ранел' 
                                : 'Мимо' 
                                : 'Уже стрелял'
                            }`
        );
        if(bool == 1){
            setShotRobotYes(bool);
            setArrShot(oldArrShot => [...oldArrShot, PKAtack]);
        }
    }
}

const plannedAttack = (testShot, examination, {shipsStateUser, arrUser, setArrUser, setShotUser, setArrShot}) => {
    let boolShot;
    if(examination){
        boolShot = shotRegistration(shipsStateUser, testShot, arrUser, setArrUser, setShotUser);
        console.log(`Результат атаки: ${boolShot < 2 
                                            ? boolShot 
                                            ? 'Ранел' 
                                            : 'Мимо' 
                                            : 'Уже стрелял'
                                        } ${boolShot}`);
        if(boolShot == 0 || boolShot == 2){
            return boolShot;
        }
        if(boolShot == 1){
            setArrShot(oldArrShot => [...oldArrShot, testShot]);
            return boolShot;
        }
    }else{
        return 2;
    }
}