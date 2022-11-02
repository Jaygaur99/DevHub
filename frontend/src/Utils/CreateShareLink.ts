const createShareLink = (
    roomId: string,
    roomPassword: string,
    shareType: 'WHATSAPP' | 'TWITTER' | 'TELEGRAM',
    type: 'meetp' | 'code-box',
): string => {
    if (shareType === 'TELEGRAM') {
        return `https://telegram.me/share/url?text=Join the ${
            type === 'meetp' ? 'conversation' : 'coding'
        } on ${process.env.REACT_APP_FRONTEND_URL}/${type}/${roomId} ${
            roomPassword ? `where password is ${roomPassword}` : ''
        }&url=${process.env.REACT_APP_FRONTEND_URL}/meetp/${roomId}`;
    } else if (shareType === 'TWITTER') {
        return `https://twitter.com/intent/tweet/?text=Join the ${
            type === 'meetp' ? 'conversation' : 'coding'
        } on ${process.env.REACT_APP_FRONTEND_URL}/${type}/${roomId} ${
            roomPassword ? `where password is ${roomPassword}` : ''
        }`;
    }

    return `https://api.whatsapp.com/send?text=Join the ${
        type === 'meetp' ? 'conversation' : 'coding'
    } on ${process.env.REACT_APP_FRONTEND_URL}/${type}/${roomId}  ${
        roomPassword ? `where password is ${roomPassword}` : ''
    }`;
};

export default createShareLink;
