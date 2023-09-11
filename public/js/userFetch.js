const userFetch = async (cantidad) => {
    const data = await fetch ('https://randomuser.me/api/?results=$(cantidad))');
    const resultado = await data.json;
    return resultado.results;
}


const saveUsersInDom = async () => {
    const userDiv = document.querySelector(" usersContainer");
    const queryParams = new URLSearchParams(window.location.search);
    const cantidad = queryParams.get('cantidad');
    const  user = await userFetch(cantidad);
}

user.forEach (products => {
    const user = document.createElement('article');
    
})