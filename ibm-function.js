function main(param) {
    let data = param.__method ? param : { content: "empty" }
    let resp = {
        statusCode: 202,
        body: {
            data: data
        }
    }
    return resp;
}
