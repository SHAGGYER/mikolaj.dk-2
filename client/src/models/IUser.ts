export interface IUser {
  _id: string;
  displayName: string;
  email: string;
  password: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
  stripeCustomerId: string;
  stripePaymentMethodId: string;
  stripeCardBrand: string;
  stripeCardExpMonth: number;
  stripeCardExpYear: number;
  stripeCardLast4: number;
  stripeCardHolderName: string;
  address: Address;
  githubAccessToken: string;
  githubUsername: string;
}

interface Address {
  name: string;
  street: string;
  city: string;
  zip: string;
}
