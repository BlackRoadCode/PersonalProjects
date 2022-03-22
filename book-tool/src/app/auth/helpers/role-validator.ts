import { User } from "../interfaces/user.interface";

export class RoleValidator{

// USER LEVEL_A LEVEL_B LEVEL_C LEVEL_D ADMIN

    isUser( user:User ):boolean{

        if( user.emailVerified && user.role === 'USER' ){
            return true;
        }

        return false;

    }

    // isRoleA( user:User ):boolean{
    //     return user.role === 'LEVEL_A';
    // }

    // isRoleB( user:User ):boolean{
    //     return user.role === 'LEVEL_B';
    // }

    // isRoleC( user:User ):boolean{
    //     return user.role === 'LEVEL_C';
    // }

    // isRoleD( user:User ):boolean{
    //     return user.role === 'LEVEL_D';
    // }

    isAdmin( user:User ):boolean{

        if( user.role && user.accountType === 'ADMIN' ){
            return true;
        }

        return false;

    }

}