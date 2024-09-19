const getTokenFromCookie = (): string | null => {

    if (document.cookie) {
        const start = 'token='.length
        return document.cookie.slice(start);
    }

    return null;
};

export default getTokenFromCookie;