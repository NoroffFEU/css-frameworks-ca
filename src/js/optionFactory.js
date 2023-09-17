export default function optionFactory(method, body, endpointObject) {
    const newObject = {
        method: method,
        headers: {
            Authorization: `Bearer ${endpointObject.getToken()}`,
            "Content-type": "application/json",
        },
    };
    if (Object.keys(body).length !== 0) {
        newObject.body = JSON.stringify(body);
    }
    return newObject;
}
