import { BehaviorType } from '@yandex/ymaps3-types';
import { YMapCamera, YMapLocation } from '@yandex/ymaps3-types/imperative/YMap';

export interface DropSelectProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  children: React.ReactNode;
  elementRef: React.RefObject<HTMLElement>;
}

//

export interface IPositionByIp {
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: Flag;
  connection: Connection;
  timezone: Timezone;
  currency: Currency;
  security: Security;
}

export interface Flag {
  img: string;
  emoji: string;
  emoji_unicode: string;
}

export interface Connection {
  asn: number;
  org: string;
  isp: string;
  domain: string;
}

export interface Timezone {
  id: string;
  abbr: string;
  is_dst: boolean;
  offset: number;
  utc: string;
  current_time: string;
}

export interface Currency {
  name: string;
  code: string;
  symbol: string;
  plural: string;
  exchange_rate: number;
}

export interface Security {
  anonymous: boolean;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
  hosting: boolean;
}

//

export interface IActionEnd {
  type: BehaviorType;
  location: Required<YMapLocation>;
  camera: YMapCamera;
}

export interface IGeoResponse {
  response: Response;
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty;
  featureMember: FeatureMember[];
}

export interface MetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface GeocoderResponseMetaData {
  request: string;
  found: string;
  results: string;
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObject {
  metaDataProperty: MetaDataProperty2;
  description: string;
  name: string;
  boundedBy: BoundedBy;
  Point: Point;
}

export interface MetaDataProperty2 {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeocoderMetaData {
  kind: string;
  text: string;
  precision: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

export interface Address {
  country_code: string;
  postal_code: string;
  formatted: string;
  Components: Component[];
}

export interface Component {
  kind: string;
  name: string;
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality: Locality;
}

export interface Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

export interface Thoroughfare {
  ThoroughfareName: string;
  Premise: Premise;
}

export interface Premise {
  PremiseNumber: string;
  PostalCode: PostalCode;
}

export interface PostalCode {
  PostalCodeNumber: string;
}

export interface BoundedBy {
  Envelope: Envelope;
}

export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export interface Point {
  pos: string;
}

export interface IYResponse {
  id: string;
  status: string;
  paid: boolean;
  amount: Amount;
  confirmation: Confirmation;
  created_at: string;
  description: string;
  metadata: Metadata;
  recipient: Recipient;
  refundable: boolean;
  test: boolean;
}

export interface Recipient {
  account_id: string;
  gateway_id: string;
}

export interface Metadata {
}

export interface Confirmation {
  type: string;
  confirmation_url: string;
}

export interface Amount {
  value: string;
  currency: string;
}

export interface IProduct {
  id: string;
  name: string;
  amount: number;
  price: number;
  imageUrl: string;
  number: number;
}


