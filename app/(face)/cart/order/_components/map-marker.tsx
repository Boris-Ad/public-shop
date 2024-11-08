'use client';

import React from 'react';
import { Reactify } from '@yandex/ymaps3-types/reactify';
import { DomEventHandlerObject, LngLat, YMapFeature } from '@yandex/ymaps3-types';
import { useOrder } from '@/hooks/use-order';
import { geoData } from '@/lib/utils';
import { IGeoResponse } from '@/my-types';

const getGeoData = async (coordinates: string): Promise<IGeoResponse | undefined> => {
  const res = await fetch(
    'https://geocode-maps.yandex.ru/1.x/?apikey=' + process.env.NEXT_PUBLIC_YANDEX_MAP_API + '&format=json&geocode=' + coordinates.toString()
  );
  if (!res.ok) return;
  return await res.json();
};

export const MapMarker = ({ reactify }: { reactify: Reactify }) => {
  const { YMapMarker, YMapListener } = reactify.module(ymaps3);
  const [markerPosition, setMarkerPosition] = React.useState<LngLat>();

  const { setCustomerData, customerData } = useOrder(state => state);

  const setCoordinates = async (event: DomEventHandlerObject) => {
    if (!event) return;
    const feature = event.entity as YMapFeature;
    const coordinates = feature.geometry.coordinates as LngLat;
    setMarkerPosition(coordinates);
    const result = await getGeoData(coordinates.toString());

    if (result) {
      const { fullAddress, cityName, street, house } = geoData(result);
      setCustomerData({ customerAddress: fullAddress, customerCity: cityName, customerStreet: street, customerHouse: house });
    }
  };

  return (
    <>
      <YMapListener onClick={setCoordinates} />
      {markerPosition && customerData?.customerStreet && (
        <YMapMarker coordinates={markerPosition}>
          <div className="w-fit px-2 py-1 text-xs text-slate-800 border rounded-md bg-white">
            <p className="text-nowrap">{customerData.customerStreet}, {customerData?.customerHouse}</p>
          </div>
        </YMapMarker>
      )}
    </>
  );
};
