function main(param) {
    var data = { content: "empty" };
    if (param.__ow_method) {
        delete param.cookie
        data = param
    }
    let resp = {
        statusCode: 202,
        body: {
            data: data
        }
    }
    return resp;
}
