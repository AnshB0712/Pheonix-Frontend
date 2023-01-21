export const SWR_CONFIGS = {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if(error.status === 404 || error.status === 401) return
        if(retryCount > 3) return
    },
}