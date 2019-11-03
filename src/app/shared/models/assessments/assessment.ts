export interface Assessment {
    AssessmentId: number;
    AssessmentSource: string | null;
    AssessmentStatus: string | null;
    AssessmentType: string | null;
    AssessmentValue: number | null;
    ChangeReason: string | null;
    EventDate: string | null;
    EventType: number;
    EventTypeDescription: string | null;
    ExemptionAOXValue: number | null;
    ExemptionAssessmentValue: number | null;
    ExemptionHOXValue: number | null;
    FixtureAssessmentValue: number | null;
    ImprovementsAssessmentValue: number | null;
    LandAssessmentValue: number | null;
    NetAdjustedTaxableAssessmentValue: number | null;
    NetTaxableAssessmentValue: number | null;
    PPAssessmentValue: number | null;
    PropertyId: number;
    RollAssessmentValue: number | null;
    RollType: string | null;
    RollYear: number | null;
    TaxableAssessmentValue: number | null;
    TaxBillNumber: string | null;
    ValueActionDate: Date | null;
    ValueChangeDate: Date | null;
}