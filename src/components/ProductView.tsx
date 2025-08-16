'use client';

import Image from 'next/image';
import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// shadcn carousel (Embla)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type Product = {
  _id: string;
  title: string;
  description?: string;
  tipoProdotto?: string;
  sizes: string[];
  colors: Array<{
    name: string;
    hexColorCode?: string;
    images?: Array<{ asset: { url: string } }>;
  }>;
};

export default function ProductView({ product }: { product: Product }) {
  const hasColors = product.colors?.length > 0;
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState<string | undefined>(undefined);

  // Embla current slide for dots
  const [current, setCurrent] = React.useState(0);
  const emblaApiRef = React.useRef<any>(null);

  const images = hasColors
    ? product.colors[selectedColorIndex]?.images?.map((i) => i.asset.url) ?? []
    : [];

  React.useEffect(() => {
    const api = emblaApiRef.current;
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [selectedColorIndex]);

  return (
    <main className="container mx-auto max-w-5xl py-8 px-4">
      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT: Slideshow */}
        <section className="flex flex-col">
          {images.length > 0 ? (
            <>
              <Carousel
                setApi={(api: any) => (emblaApiRef.current = api)}
                className="w-full"
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {images.map((src, idx) => (
                    <CarouselItem key={idx} className="basis-full">
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <Image
                          src={src}
                          alt={`${product.title} - ${product.colors[selectedColorIndex]?.name} - ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={idx === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>

              {/* dots */}
              <div className="mt-3 flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Vai a immagine ${i + 1}`}
                    onClick={() => emblaApiRef.current?.scrollTo(i)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      i === current ? 'w-6 bg-foreground' : 'bg-muted-foreground/40'
                    )}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="aspect-square rounded-2xl bg-muted" />
          )}
        </section>

        {/* RIGHT: Details */}
        <section className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="mt-1 flex items-center gap-2">
            {product.tipoProdotto ? (
              <Badge variant="secondary">{product.tipoProdotto}</Badge>
            ) : null}
          </div>

          {product.description ? (
            <p className="mt-4 text-muted-foreground">{product.description}</p>
          ) : null}

          {/* Colori */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">Colori</label>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c, idx) => {
                const isSelected = idx === selectedColorIndex;
                const swatchBg =
                  c.hexColorCode && /^#([0-9A-F]{3}){1,2}$/i.test(c.hexColorCode)
                    ? c.hexColorCode
                    : 'transparent';
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setSelectedColorIndex(idx);
                      setCurrent(0);
                    }}
                    className={cn(
                      'relative flex h-10 w-10 items-center justify-center rounded-lg border',
                      'transition-colors',
                      isSelected ? 'ring-2 ring-ring border-border' : 'border-muted-foreground/30'
                    )}
                    aria-pressed={isSelected}
                    title={c.name}
                  >
                    <span
                      className="block h-7 w-7 rounded-md"
                      style={{ background: swatchBg }}
                    />
                    {/* bordo per bianchi */}
                    <span
                      className={cn(
                        'pointer-events-none absolute inset-1 rounded-md',
                        swatchBg.toLowerCase() === '#ffffff' ? 'border border-muted-foreground/30' : ''
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Selezionato: {product.colors[selectedColorIndex]?.name}
            </p>
          </div>

          {/* Taglie */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">Taglie</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Scegli una taglia" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((taglia) => (
                  <SelectItem key={taglia} value={taglia}>
                    {taglia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CTA (se ti serve) */}
          {/* <Button className="mt-8 w-56" disabled={!selectedSize}>
            Aggiungi al carrello
          </Button> */}
        </section>
      </div>
    </main>
  );
}