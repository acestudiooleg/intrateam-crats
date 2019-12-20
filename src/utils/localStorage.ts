if(process.env.IS_SSR) 
{
    require('localstorage-polyfill')
}

export const setItem = localStorage.setItem.bind(localStorage);
export const getItem = localStorage.getItem.bind(localStorage);
export const removeItem = localStorage.removeItem.bind(localStorage);
