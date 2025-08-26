export type Product = {
    _id: string;
    title: string;
    description?: string;
    tipoProdotto: string;
    colors: {
      name: string;
      sizes: string[];
      images: { asset: { url: string } }[];
    }[];
  };