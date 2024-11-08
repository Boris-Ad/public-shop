import { IGeoResponse, IPositionByIp } from '@/my-types';
import { LngLat } from '@yandex/ymaps3-types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency',
  minimumFractionDigits: 0,
});

const DATE_FORMATTER = new Intl.DateTimeFormat('ru', {
 dateStyle:'medium',
 
});

export const formatDate = (date: Date) => {
  return DATE_FORMATTER.format(date)
}

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};

export const shopBreadcrumb = (path: string, productName: string | undefined) => {
  const pathArr = path.split('/');
  const breadcrumb: { path: string; title: string }[] = [{ path: '/', title: 'Главная' }];

  const one = '/' + pathArr[1];
  const two = '/' + pathArr[1] + '/' + pathArr[2];

  if (pathArr.length >= 2) {
    switch (pathArr[1]) {
      case 'catalog':
        breadcrumb.push({ path: one, title: 'Каталог' });
        break;
      case 'cart':
        breadcrumb.push({ path: one, title: 'Корзина' });
        break;

      default:
        break;
    }
  }
  if (pathArr.length >= 3) {
    switch (pathArr[2]) {
      case 'order':
        breadcrumb.push({ path: two, title: 'Оформление заказа' });
        break;
      default:
        breadcrumb.push({ path: two, title: productName || '' });
        break;
    }
  }
  return breadcrumb;
};

export function numWord(value: number, words: string[]) {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

export const geoLocation = (geo: IPositionByIp | null) => {
  const location: LngLat | undefined = geo ? [geo.longitude, geo.latitude] : undefined;
  return location;
};

export const geoData = (fetchResponse: IGeoResponse) => {
  const addressArr = fetchResponse.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components || [];
  const fullAddress = fetchResponse.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
  const cityName = addressArr.find(item => item.kind === 'locality')?.name;
  const street = addressArr.find(item => item.kind === 'street')?.name;
  const house = addressArr.find(item => item.kind === 'house')?.name;
  return { fullAddress, cityName, street, house };
};
