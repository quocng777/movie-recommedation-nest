export type CustomCode = {
    customCode: number,
    message: string
}

export const customCode = {
    "USERNAME_DUPLICATED" : {
        customCode: 601,
        message: 'username is duplicated'
    },
    "EMAIL_DUPLICATED" : {
        customCode: 602,
        message: 'email is duplicated'
    }
};