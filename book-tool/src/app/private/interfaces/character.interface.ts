export interface Character {
    cid:string,
    characterImage?:string,
    physicalAspects?:      PhysicalAspects;
    psychologicalAspects?: PsychologicalAspects;
    socialAspects?:        SocialAspects;
}

export interface PhysicalAspects {
    name?:                  string;
    age?:                   string;
    briefDescription?:      string;
    height?:                string;
    weight?:                string;
    eyeColor?:              string;
    race?:                  string;
    hairColor?:             string;
    gender?:                string;
    bodyBuild?:             string;
    skinColor?:             string;
    faceDetails?:           string;
    voiceIntensity?:        string;
    whistleVoice?:          string;
    voiceTone?:             string;
    health?:                string;
    characteristicDetails?: string;
    extraNotes?:            string;
}

export interface PsychologicalAspects {
    psychopathicDisorders?:             string;
    sexLife?:                           string;
    moralEthicalStandards?:             string;
    ambitions?:                         string;
    temperament?:                       string;
    character?:                         string;
    attitudeLife?:                      string;
    complexesInhibitions?:              string;
    disappointments?:                   string;
    intellectualQualitiesDifficulties?: string;
}

export interface SocialAspects {
    nationality?:    string;
    religion?:       string;
    socialStratum?:  string;
    civilStatus?:    string;
    sociability?:    string;
    job?:            string;
    education?:      string;
    familyLife?:     string;
    politicalIdeas?: string;
    economicStatus?: string;
    sportsHobbies?:  string;
    home?:           string;
    hobbies?:        string;
    travels?:        string;
}
