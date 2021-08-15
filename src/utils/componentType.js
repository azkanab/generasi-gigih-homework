const componentType = {
    modal: 'modal',
    page: 'pages'
}

export const isModal = (type) => {
    return type === componentType.modal
}

export const isPage = (type) => {
    return type === componentType.page
}