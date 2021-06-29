export class SessionUserModel {
    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public token: string,
        public profile_image: any,
        public is_active : boolean,
        public is_admin : boolean
    ) {}
}
