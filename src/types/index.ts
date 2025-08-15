export type Product = {
    _id: string;
    title: string;
    description?: string;
    tipoProdotto: string;
    sizes: string[];
    colors: {
      name: string;
      hexColorCode?: string;
      images: { asset: { url: string } }[];
    }[];
  };