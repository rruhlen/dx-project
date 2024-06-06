import { LightningElement, wire } from 'lwc';
import getBusinessHours from '@salesforce/apex/BusinessHoursController.getBusinessHours';

export default class BusinessHoursMessage extends LightningElement {
    currentTime;
    businessHours;

    @wire(getBusinessHours)
    wiredBusinessHours({ error, data }) {
        if (data) {
            this.businessHours = data;
            this.checkBusinessHours();
        } else if (error) {
            console.error('Error fetching business hours:', error);
        }
    }

    connectedCallback() {
        this.checkBusinessHours();
    }

    checkBusinessHours() {
        const now = new Date();
        this.currentTime = now.toTimeString().slice(0, 5); // Format as HH:MM
        const dayOfWeek = now.getDay();

        const businessHour = this.businessHours.find(hour => hour.dayOfWeek === dayOfWeek);

        if (businessHour) {
            const start = businessHour.startTime;
            const end = businessHour.endTime;
            this.isWithinBusinessHours = this.currentTime >= start && this.currentTime <= end;
        } else {
            this.isWithinBusinessHours = false;
        }
    }

    get message() {
        return this.isWithinBusinessHours ? '' : 'Replies will be delayed outside of our business hours 8-5 PT.';
    }
}