
export const showImage = (fileName: string) => {
    const { public: { serverUrl } } = useRuntimeConfig()

    return fileName ? serverUrl + 'resources/images/' + fileName : ''
}