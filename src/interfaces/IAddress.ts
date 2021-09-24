export interface IAddress {
  _id: object,
  cep: string,
  logradouro: string,
  number: string,
  complement: string,
  district: string,
  city: string,
  state: string
}

export interface IAddressService {
  create(address: IAddress): Promise<IAddress>
}