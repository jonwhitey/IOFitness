/* eslint-disable no-unused-vars */
const squatAttributes = {
  eccentricMovement: ['ankleDorsiflexion', 'kneeFlexion', 'hipFlexion', 'hipExternalRoation'],
  concentricMovement: ['anklePlantarflexion', 'kneeExtension', 'hipExtension'],
  faultList: [
    'raised heals',
    'anklePronation',
    'hipInteralRotation',
    'lumbarFlexion',
    'lumbarExtension',
    'cervicalExtension',
    'thoracicFlexion',
    'bilateralAsymetry',
  ],
};

const hipHingeAttributes = {
  eccentricMovement: ['hipFlexion', 'kneeFlexion'],
  conecntricMovement: ['hipExtension', 'kneeExtension'],
  faultList: [
    'anklePronation',
    'ankleDorsiflexion',
    'kneeFlexion',
    'lumbarFlexion',
    'lumbarExtension',
    'scapularProtraction',
    'thoracicFlexion',
    'cervicalExtension',
    'disconnectedSpine',
  ],
};

const lungeAttributes = {
  eccentricMovement: ['kneeFlexion', 'hipFlexion'],
  concentricMovement: ['kneeExtension', 'hipExtension'],
  faultList: [
    'anklePronation',
    'ankleSupination',
    'externalHipRotaiton',
    'internalHipRoation',
    'lumbarFlexion',
    'lumbarExtension',
    'thoracicFlexion',
    'thoracicRoation',
    'hipInstability',
  ],
};

const overheadPressAttributes = {
  eccentricMovement: ['shoulderFlexion', 'elbowExtension'],
  concentricMovement: ['shoulderExtension', 'elbowFlexion'],
  movementFaultList: [
    'anklePronation',
    'ankleSupination',
    'lumbarExtension',
    'lumbarFlexion',
    'thoracicFlexion',
    'thoracicRoation',
    'hipInstability',
    'frontalPlaneInstability',
    'elbows out',
    'head forward',
  ],
};

const dipAttributes = {
  eccentricMovement: ['shoulderExtension', 'elbowFlexion'],
  concentricMovement: ['shoulderFlexion', 'elbowExtension'],
  movementFaultList: [
    'lumbarExtension',
    'thoracicExtension',
    'cervicalExtension',
    'shoulderElevation',
    'shouldersRollForward',
    'scapularWinging',
    'elbows out',
  ],
};

const pushupAttributes = {
  eccentricMovement: ['shoulderExtension', 'elbowFlexion'],
  coneentricMovement: ['shoulderFlexion', 'elbowExtension'],
  movementFaultList: [
    'lumbarFlexion',
    'lumbarExtension',
    'thoracicFlexion',
    'cervicalExtension',
    'elbows out',
    'open-hand',
  ],
};

const horizontalRowAttributes = {
  eccentricMovement: ['shoulderFlexion', 'elbowFlexion'],
  concentricMovement: ['shoulderExtension', 'elbowFlexion'],
  movementFaultList: [
    'hipInternalRotation',
    'lumbarFlexion',
    'thoracicFlexion',
    'cervicalExtension',
    'scapularWinging',
    'shoulderElevation',
    'shoulderRollForward',
  ],
};

const pullupAttributes = {
  eccentricMovement: ['shoulderFlexion', 'elbowExtension'],
  concentricMovement: ['shoulderExtension', 'elbowFlexion'],
  movementFaultList: [
    'lumbarExtension',
    'cervicalExtension',
    'shoulderElevation',
    'shoulderRollForward',
  ],
};

const forceVectors = [
  'barbellAtHips',
  'farmerCary',
  'suitcase',
  'goblet',
  'singleRack',
  'doubleRack',
  'doubleOverhead',
  'singleOverhead',
  'dip',
  'plank',
  'sidePlank',
];


const jointMovements = [
  'anklePronation',
  'ankleSupination',
  'ankleEversion',
  'ankleInversion',
  'anklePlantarflexion',
  'ankleDorsiflexion',
  'tibialInternalRotation',
  'tibialExternalRotation',
  'kneeFlexion',
  'kneeExtension',
  'hipFlexion',
  'hipExtension',
  'hipAbduction',
  'hipadduction',
  'hipExternalRotation',
  'hipInternalRotation',
  'lumbarFlexion',
  'lumbarExtension',
  'thoracicExtension',
  'thoracicFlexion',
  'thoracicRoation',
  'cervicalFlexion',
  'cervicalExtension',
  'cervicalRotaion',
  'shoudlerExtension',
  'shoulderFlexion',
  'shoulderInternalRotation',
  'shoulderExternalRoation',
  'shoulderAbduction',
  'shoulderAdduction',
  'shoulderFlexion',
  'shoulderExtension',
  'scapularElevation',
  'scapularDepression',
  'scapularProtraction',
  'scapularRetraction',
  'elbowFlexion',
  'elbowExtension',
  'wristFlexion',
  'wristExtension',

];


const movementFaults = [
  'valgusKnees',
  'disconnectedSpine',
  'hipInstability',
  'frontalPlaneInstability',
];
