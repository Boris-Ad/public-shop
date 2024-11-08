'use client';

import React from 'react';
import Image from 'next/image';
import { useFormStatus, useFormState } from 'react-dom';
import { Category, Product } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { updateProductAction } from '@/app/admin/_actions/update-product.action';
import { addProductAction } from '@/app/admin/_actions/add-product.action';
import { ImagePlus } from 'lucide-react';
import Link from 'next/link';

export const ProductForm = ({ categories, product }: { categories: Category[]; product?: Product | null }) => {
  const [imageUrl, setImageUrl] = React.useState({ root: product?.rootImagePath, first: product?.firstImagePath, second: product?.secondImagePath });
  const [imagesForDelete, setImagesForDelete] = React.useState({ first: false, second: false });
  const [state, dispatch] = useFormState(product ? updateProductAction.bind(null, { productId: product.id, imagesForDelete }) : addProductAction, {});
  const [, setUpdate] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const firstImageRef = React.useRef<HTMLInputElement>(null);
  const secondImageRef = React.useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const clearError = (nameField: keyof typeof state) => {
    delete state[nameField];
    setUpdate(prev => !prev);
  };

  const deleteImage = (name: string) => {
    switch (name) {
      case 'firstImage':
        {
          setImagesForDelete(prev => ({ ...prev, first: true }));
          setImageUrl(prev => ({ ...prev, first: undefined }));
          if (firstImageRef.current?.files) {
            firstImageRef.current.value = '';
          }
        }
        break;
      case 'secondImage':
        {
          setImagesForDelete(prev => ({ ...prev, second: true }));
          setImageUrl(prev => ({ ...prev, second: undefined }));
          if (secondImageRef.current?.files) {
            secondImageRef.current.value = '';
          }
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);

    switch (name) {
      case 'rootImage':
        setImageUrl(prev => ({ ...prev, root: imgUrl }));
        clearError('rootImage');
        break;
      case 'firstImage':
        setImageUrl(prev => ({ ...prev, first: imgUrl }));
        break;
      case 'secondImage':
        setImageUrl(prev => ({ ...prev, second: imgUrl }));
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (state.success) {
      if (!product) {
        setImageUrl({ root: undefined, first: undefined, second: undefined });
        formRef.current?.reset();
      } else {
        setImagesForDelete({ first: false, second: false });
      }

      toast({
        title: state.success,
      });
    }
  }, [state,toast]);

  return (
    <form ref={formRef} action={dispatch} className="">
      <div className="w-[400px] mb-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm">
            Категория
          </Label>
          <Select name="categoryId" onValueChange={() => clearError('categoryId')} defaultValue={product?.categoryId}>
            <SelectTrigger className={cn({ 'border-destructive': !!state.categoryId })} disabled={categories.length === 0}>
              <SelectValue placeholder={categories.length > 0 ? 'Выбрать категорию' : 'Нет категорий'} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.categoryId && <p className="text-sm text-destructive">{state.categoryId}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Название</Label>
          <Input id="name" name="name" defaultValue={product?.name} onFocus={() => clearError('name')} />
          {state.name && <p className="text-sm text-destructive">{state.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Цена</Label>
          <Input id="price" name="price" defaultValue={product?.price} onFocus={() => clearError('price')} />
          {state.price && <p className="text-sm text-destructive">{state.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Количество</Label>
          <Input id="number" name="number" defaultValue={product?.number} onFocus={() => clearError('number')} />
          {state.number && <p className="text-sm text-destructive">{state.number}</p>}
        </div>
      </div>

      <section className="pb-3 flex space-x-3">
        <div className={cn('w-full p-2 border rounded shadow-md', { 'border-destructive': !!state.rootImage })}>
          <Label className="flex justify-center items-center aspect-video bg-slate-400 cursor-pointer relative">
            <Input type="file" accept="image/*" name="rootImage" className="hidden" onChange={e => handleChange(e, 'rootImage')} />

            {imageUrl.root ? (
              <Image src={imageUrl.root} alt="img" fill sizes="300px" className="object-contain" priority />
            ) : (
              <ImagePlus size={60} className="text-slate-300" />
            )}
          </Label>

          <p className="mt-3 leading-9">Основная фотография</p>
        </div>

        <div className={cn('w-full p-2 border rounded shadow-md')}>
          <Label htmlFor="firstImage" className="flex justify-center items-center aspect-video bg-slate-400 cursor-pointer relative">
            <Input
              ref={firstImageRef}
              id="firstImage"
              type="file"
              accept="image/*"
              name="firstImage"
              className="hidden"
              onChange={e => handleChange(e, 'firstImage')}
            />

            {imageUrl.first ? (
              <Image src={imageUrl.first} alt="img" fill sizes="300px" className="object-contain" priority />
            ) : (
              <ImagePlus size={60} className="text-slate-300" />
            )}
          </Label>

          <div className="h-9 mt-3 flex justify-between items-center">
            <p>Дополнительная</p>
            {imageUrl.first && (
              <Button type="button" variant="destructive" size="sm" onClick={() => deleteImage('firstImage')}>
                Удалить
              </Button>
            )}
          </div>
        </div>

        <div className={cn('w-full p-2 border rounded shadow-md')}>
          <Label htmlFor="secondImage" className="flex justify-center items-center aspect-video bg-slate-400 cursor-pointer relative">
            <Input
              ref={secondImageRef}
              id="secondImage"
              type="file"
              accept="image/*"
              name="secondImage"
              className="hidden"
              onChange={e => handleChange(e, 'secondImage')}
            />

            {imageUrl.second ? (
              <Image src={imageUrl.second} alt="img" fill sizes="300px" className="object-contain" priority />
            ) : (
              <ImagePlus size={60} className="text-slate-300" />
            )}
          </Label>

          <div className="h-9 mt-3 flex justify-between items-center">
            <p>Дополнительная</p>
            {imageUrl.second && (
              <Button type="button" variant="destructive" size="sm" onClick={() => deleteImage('secondImage')}>
                Удалить
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="flex space-x-4">
        <SubmitButton />
        <Button asChild type="button" variant="outline">
          <Link href="/admin/products">Отмена</Link>
        </Button>
      </div>
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Применить
    </Button>
  );
};
