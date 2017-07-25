export class Appointment {
    public $key: string;

    constructor(public date: Date | string, public description: string) {
    }
}