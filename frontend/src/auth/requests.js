import config from '../../config'

export const register = async (username, password) => {
    // console.log(username, password);

    const request = await fetch(config.API_URL + "auth", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "password": password})
    })
    const response = await request.json();
    console.log(response);
    return response;
}

export const validate = async (username, password) => {
    const response = await fetch(config.API_URL + "auth", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "password": password})
    })
    return response;
}




