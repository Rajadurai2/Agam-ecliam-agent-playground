interface Metadata {
    scenario: string;
    data: Record<string, any>;
}

// Utility to convert NaN → null recursively
function sanitize(value: any): any {
    if (value === undefined || value === null) return value;
    if (typeof value === "number" && isNaN(value)) return null;
    if (Array.isArray(value)) return value.map(sanitize);

    if (typeof value === "object") {
        const result: any = {};
        for (const key in value) result[key] = sanitize(value[key]);
        return result;
    }
    return value;
}

// ----------------------------
// Scenario Data Store
// ----------------------------
const scenarioMetadata: Record<string, Metadata> = {
    // ======================================================
    // 1. CLAIM STATUS SCENARIO
    // ======================================================
    benefit_by_cpt: {
        scenario: "benefit_by_cpt",
        data: sanitize({
            provider_details: {
                "Billing Provider Name": "XYN Clinic",
                "Billing Provider NPI": 1234567890,
                "Billing Provider Tax ID": 123456789,
                "Medicare PTAN": "NERR723",
                "RR Medicare PTAN": "NH6234",
                "Medicaid PIN": 12345678,
                "Pay to Address": "1556 Park Ave, Austin TX 77586",
                "Physical Address": "1556 Park Ave, Austin TX 77586",
                "Practice State": "Texas",
                "Phone Number": "713-344-1133",
                "Fax Number": "844-832-5814",
                "Ordering /Requesting Provider Name": NaN,
                "Ordering /Requesting Provider NPI": NaN,
                "Ordering /Requesting Provider Address": NaN,
                "Site/Facility/Location Name": NaN,
                "Site/Facility/Location NPI": NaN,
                "Site/Facility/Location Address": NaN
            },
            payer_details: {
                "Payer Name": "AETNA",
                "Payer Phone Number": "888-632-3862"
            },
            patient_details: {
                "Member ID": 123456789,
                "Patient Full Name": "Dilip Sekar",
                "DOB": "04/03/1939",
                "Patient Address": NaN,
                "Insured Name": NaN
            },
            cpt_details: {
                DOS: "12/1/2025",
                "CPT code": "33285 & 33286",
                Units: 1,
                "Dx codes": "I48.9",
                POS: 11
            },
            others: {
                "S.No": 1,
                Notes: "Need to Call and check eligibility and benefit verification for specific CPT code",
                Status: "Calling required",
                "Calling Notes": NaN
            }
        })
    },

    // ======================================================
    // 2. BENEFIT BY CPT SCENARIO
    // ======================================================
    claim_status_verification: {
        scenario: "claim_status_verification",
        data: sanitize({
            others: {
                "AR Notes": "Need to check claim status",
                "AR Status": "Calling required",
                "Calling Notes": "",
                Sno: 1
            },
            patient_details: {
                "DOB": "04/03/1939",
                "Insured Name": "",
                "Patient Address": "",
                "Patient Full Name": "Dilip Sekar"
            },
            payer_details: {
                "Payer Name": "AETNA",
                "Payer Phone Number": "888-632-3862"
            },
            provider_details: {
                "Billing Provider NPI": 1234567890,
                "Billing Provider Name": "XYN Clinic",
                "Billing Provider Tax ID": 123456789,
                "Fax Number": "844-832-5814",
                "Medicaid PIN": 12345678,
                "Medicare PTAN": "NERR723",
                "Pay to Address": "1556 Park Ave, Austin TX 77586",
                "Phone Number": "713-344-1133",
                "Physical Address": "1556 Park Ave, Austin TX 77586",
                "Practice State": "Texas",
                "RR Medicare PTAN": "NH6234",
                "Rendering Provider NPI": 1234567890,
                "Rendering Provider Name": "Dr Kelly Wilson"
            }
        })
    }
};

// ----------------------------
// MAIN FUNCTION
// ----------------------------
export function getMetadataByScenario(scenario: string): Metadata | null {
    console.log("************************ getMetadataByScenario ************************")
    console.log(scenario)
    return scenarioMetadata[scenario] || null;
}
