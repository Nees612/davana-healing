export interface Credentials{
    Emailaddress: string,
    PasswordHash: string
}

export interface Coach{
    id:number,
    firstName:string,
    middleName:string,
    lastName:string,
    emailAddress:string,
    roles:string[],
    scopes:string[],
    phoneNumber:string,
    profileImageURL: string,
    aboutMe: string,
    closestWorkAddress: string
}

export interface Appointment{
    id:number,
    coachID: number,
    userID: number,
    date: Date,
    comment: string,
    meetingType: string,
    approoved: number
}

export interface User{
    firstName:string,    
    lastName:string,
    emailAddress:string,
    passwordHash:string,
    phoneNumber:string,
}
