import { IUser } from '../../models/User'; // import your IUser model interface

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // The 'user' field can now be properly typed
        }
    }
}
