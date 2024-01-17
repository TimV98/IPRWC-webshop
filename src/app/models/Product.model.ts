export class Product {

  public id?: number;
  public product_name?: string;
  public genre?: string;
  public price?: number;
  public description?: string;
  public image?: {
    image_url: string,
    name: string,
    type: string
  };

}
