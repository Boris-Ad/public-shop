'use client';

import React from 'react';
import { geoData, geoLocation } from '@/lib/utils';
import { IPositionByIp } from '@/my-types';
import { useOrder } from '@/hooks/use-order';
import { DropdownMenu } from './dropdown-menu';
import { LngLat } from '@yandex/ymaps3-types';
import { IGeoResponse } from '@/my-types';

const getGeoData = async (coordinates: string): Promise<IGeoResponse | undefined> => {
  const res = await fetch(
    'https://geocode-maps.yandex.ru/1.x/?apikey=' + process.env.NEXT_PUBLIC_YANDEX_MAP_API + '&format=json&geocode=' + coordinates.toString()
  );
  if (!res.ok) return;
  return await res.json();
};

const searchCity = async (cityName: string): Promise<IGeoResponse | undefined> => {
  const res = await fetch(
    'https://geocode-maps.yandex.ru/1.x/?apikey=' + process.env.NEXT_PUBLIC_YANDEX_MAP_API + '&format=json&results=3&geocode=' + cityName
  );
  if (!res.ok) return;
  return await res.json();
};

export const AddressConfirm = ({ myGeo }: { myGeo: IPositionByIp | null }) => {
  const { customerData, setCustomerData } = useOrder(state => state);
  
  const coordinates = geoLocation(myGeo);
  const [cityName, setCityName] = React.useState('');
  const [coincidences, setCoincidences] = React.useState<{ center: LngLat; name: string }[]>([]);
  const [isVisible, setIsVisible] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timeOut = React.useRef<NodeJS.Timeout>();

  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeOut.current);
    setCityName(event.target.value);
    setCustomerData({});

    if (event.target.value.trim().length <= 1) {
      return setIsVisible(false);
    }

    timeOut.current = setTimeout(async () => {
      const result = await searchCity(event.target.value);
      if (result) {
        setCoincidences([]);
        const resultArr = result.response.GeoObjectCollection.featureMember;
        resultArr.forEach(item => {
          const kind = item.GeoObject.metaDataProperty.GeocoderMetaData.kind;
          if (item.GeoObject.metaDataProperty.GeocoderMetaData.Address.country_code === 'RU') {
            if (kind === 'locality' || kind === 'province') {
              const [lng, lat] = item.GeoObject.Point.pos.split(' ');
              const name = item.GeoObject.name;
              setCoincidences(prev => [...prev, { center: [parseFloat(lng), parseFloat(lat)], name }]);
            }
          }
        });
      }
    }, 400);
  };

  React.useEffect(() => {
    setCityName(customerData?.customerCity || '');
  }, [customerData?.customerCity]);

  React.useEffect(() => {
    if (coordinates) {
      getGeoData(coordinates.toString()).then(res => {
        if (res) {
          const { cityName } = geoData(res);
          if (cityName) {
            setCityName(cityName);
          }
        }
      });
    }
    return () => {
      setCustomerData({});
    };
  }, []);

  

  return (
    <>
      <div className="space-y-3 md:pr-4">
        <h3 className="mb-1">Выберите на карте адрес доставки</h3>
        <div className="space-y-1">
          <label htmlFor="city" className="text-face-muted/60">
            Населенный пункт
          </label>
          <input
            ref={inputRef}
            id="city"
            type="text"
            value={cityName}
            onChange={HandleChange}
            className="px-3 py-1.5 text-sm block h-10 w-full rounded-md border border-face-popover outline-none bg-transparent focus-visible:ring"
          />
        </div>

        <p className="hidden md:block line-clamp-2 pl-3 border-face-secondary border-l">{customerData?.customerAddress}</p>
      </div>
      <DropdownMenu inputRef={inputRef} cityList={coincidences} setCityName={setCityName} isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};
