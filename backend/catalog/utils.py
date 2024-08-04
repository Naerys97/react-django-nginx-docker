from rest_framework.exceptions import APIException
from rest_framework.views import exception_handler
from http import HTTPStatus


def custom_exception_handler(exec, context):
    response = exception_handler(exec, context)

    if response is not None:
        # Using the description's of the HTTPStatus class as error message.
        http_code_to_message = {v.value: v.description for v in HTTPStatus}
        print(response.data)
        error_payload = {
            "error": {
                "status_code": 0,
                "message": "",
                "details": [],
            }
        }
        error = error_payload["error"]
        status_code = response.status_code

        error["status_code"] = status_code
        error["message"] = http_code_to_message[status_code]
        error["details"] = response.data
        response.data = error_payload
    return response


class BookAlreadyExists(APIException):
    status_code = 400
    default_detail = "The book you are trying to create already exists."
    default_code = "book_already_exists"