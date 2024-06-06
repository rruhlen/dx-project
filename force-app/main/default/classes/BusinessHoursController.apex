public with sharing class BusinessHoursController {
    @AuraEnabled(cacheable=true)
    public static List<BusinessHour> getBusinessHours() {
        return [SELECT DayOfWeek__c, StartTime__c, EndTime__c FROM BusinessHour];
    }
}