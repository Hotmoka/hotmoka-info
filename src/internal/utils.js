import Vue from "vue";

export const EventBus = new Vue()

const showToast = (vue, title, message, type) => {
    vue.$bvToast.toast(message, {
        title: title,
        variant: type,
        solid: true,
        autoHideDelay: 6000,
        toaster: 'b-toaster-top-right'
    })
}

export const showInfoToast = (vue, title, message) => showToast(vue, title, message, 'info')

export const showSuccessToast = (vue, title, message) => showToast(vue, title, message, 'success')

export const showErrorToast = (vue, title, message) => showToast(vue, title, message, 'danger')

export const showErrorAlert = message => {
    EventBus.$emit('onErrorAlert', {
        message: message,
        show: true
    })
}

export const dismissErrorAlert = () => {
    EventBus.$emit('onErrorAlert', {
        message: '',
        show: false
    })
}

export const getNetworkName = (url, isDev) => {
    try {
        if (isDev && url === '') {
            return 'localhost'
        }
        return url.substring(url.indexOf("://") + 3)
    } catch (e) {
        return ''
    }
}

/**
 * Helper method to wrap a promise task.
 * @param promiseTask the Promise task
 * @return {Promise<unknown>} a promise that resolves to the result of the promise task
 */
export const WrapPromiseTask = (promiseTask) => {
    return new Promise((resolve, reject) => {

        dismissErrorAlert()
        EventBus.$emit('showSpinner', true)
        Promise.resolve(promiseTask())
            .then(result => {
                EventBus.$emit('showSpinner', false)
                resolve(result)
            })
            .catch(err => {
                EventBus.$emit('showSpinner', false)
                reject(err)
            })
    })
}
