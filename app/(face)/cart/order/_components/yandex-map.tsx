'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import { IPositionByIp } from '@/my-types';
import { MapMarker } from './map-marker';
import { geoLocation } from '@/lib/utils';
import { Reactify } from '@yandex/ymaps3-types/reactify';
import Script from 'next/script';

export const YandexMap = ({ myGeo }: { myGeo: IPositionByIp | null }) => {
  const [reactify, setReactify] = React.useState<Reactify | null>(null);

  const onReady = () => {
    Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]).then(([ymaps3Reactify]) => {
      setReactify(ymaps3Reactify.reactify.bindTo(React, ReactDOM));
    });
  };

  return (
    <>
      <Script id="map" src={'https://api-maps.yandex.ru/v3/?lang=ru_RU&apikey=' + process.env.NEXT_PUBLIC_YANDEX_MAP_API} onReady={onReady} />
      {reactify ? <Map reactify={reactify} myGeo={myGeo} /> : <p>Loading...</p>}
    </>
  );
};

function Map({ reactify, myGeo }: { reactify: Reactify; myGeo: IPositionByIp | null }) {
  const center = geoLocation(myGeo);
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = reactify.module(ymaps3);
  return (
    <>
      <YMap
        location={{ center, zoom: 12 }}
        ref={x => {
          window.map = x;
        }}
        mode="vector"
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <MapMarker reactify={reactify} />
      </YMap>
    </>
  );
}
