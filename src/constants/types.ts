export interface BrandDataType {
  id: Number | string;
  brandTitle: string;
  offerName: string;
  category: string;
  validity: Date;
  locations: Array<string>;
  termsConditions: string;
  offerDesc: string;
  brandLogo: string;
  productImage: string;
  brandColor: string;
  brandName: string;
  detailsBanner?: string;
  terms?: string;
  coupon: string;
  redemption_count: number;
  isExpired: boolean;
}
