const JsonResponse = (status, message, data) => {
    return {
        status,
        message,
        data,
    }
}

module.exports.JsonResponse = JsonResponse;

