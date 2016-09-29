'use strict';

import notifier from 'toastr';

function notifySuccess(message) {
    notifier.success(message);
}

function notifyError(message) {
    notifier.error(message);
}

export { notifySuccess, notifyError };