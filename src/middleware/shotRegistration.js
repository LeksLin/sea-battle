// Регистрация попаданий
export const shotRegistration = (shipsState, id, arr, setArr, setShot) => {
    let bool = 0;
    // console.log(arr);
    if(arr.indexOf(id) == -1){
    shipsState.forEach(e => {
        if(e.indexOf(id) != -1) bool = 1;
    })
    setArr(oldsetArr => [...oldsetArr, id])
    // console.log(`${bool ? 'Ранел' : 'Мимо'} ${id}`)
    setShot(oldShot => [...oldShot, {shot: +bool, id: id}]);
    }else{
    return 2;
    }
    return bool;
}