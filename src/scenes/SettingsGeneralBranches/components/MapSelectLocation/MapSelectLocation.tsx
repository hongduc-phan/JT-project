import React, {FunctionComponent, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import GoogleMapReact, {ClickEventValue} from 'google-map-react';
import debounce from 'lodash.debounce';
import TextField, {TextFieldAlignment} from '../../../../components/TextField';
import MenuItem from '../../../../components/MenuItem';
import Menu from '../../../../components/Menu';
import {Search} from '../../../../components/Icons';
import {getCommonLocaleKey} from '../../../../locales/common.locale';
import getCurrentPosition from '../../../../helpers/getCurrentPosition';
import {ModalAction} from '../../../../components/Modal';
import Button, {ButtonVariants} from '../../../../components/Button';
import styles from './MapSelectLocation.module.css';
import config from '../../../../config';

export interface MapSelectLocationProps {
  onCancel?: () => void;
  onAdd?: (result: {lat: number; lng: number}) => void;
}

const MapSelectLocation: FunctionComponent<MapSelectLocationProps> = ({
  onCancel,
  onAdd,
}: MapSelectLocationProps) => {
  const {t} = useTranslation();
  const searchInput = useRef(null);
  const [gmap, setGmap] = useState<{
    map: any | undefined;
    maps: any | undefined;
  }>({map: undefined, maps: undefined});

  const [marker, setMarker] = useState();
  const [center, setCenter] = useState<[number, number]>([
    1.3336245004138407,
    103.88889013420726,
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<{
    lat: number;
    lng: number;
  }>();

  const [resultSearch, setResultSearch] = useState<
    google.maps.places.PlaceResult[]
  >([]);

  const debounceSearch = useRef(debounce(searchPlaces, 700));

  const handleApiLoaded = ({map, maps}: {map: any; maps: any}) => {
    setGmap({
      map,
      maps,
    });

    const getPos = getCurrentPosition();

    if (getPos) {
      getPos.then((pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  function handlerOnClickMap({lat, lng}: ClickEventValue) {
    setSearchQuery(`${lat},${lng}`);
    setMarkerToMap(lat, lng);
    setSelectedResult({
      lat,
      lng,
    });
  }

  function setMarkerToMap(lat: number, lng: number) {
    if (gmap.map && gmap.maps) {
      if (marker) {
        marker.setMap(null);
      }

      setMarker(
        new gmap.maps.Marker({
          position: {lat, lng},
          map: gmap.map,
          title: `lat: ${lat} - lng: ${lng}`,
        }),
      );
    }
  }

  function handlerSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    if (debounceSearch.current && gmap.map && gmap.maps) {
      setResultSearch([]);
      debounceSearch.current(e.target.value, gmap.map, gmap.maps);
    }
  }

  function searchPlaces(query: string, map: any, maps: any) {
    const service = new maps.places.PlacesService(map);
    service.findPlaceFromQuery(
      {
        query,
        fields: ['name', 'geometry', 'formatted_address'],
      },
      (
        results: google.maps.places.PlaceResult[],
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        if (status === maps.places.PlacesServiceStatus.OK) {
          setResultSearch(results);
        } else {
          setResultSearch([]);
        }
      },
    );
  }

  function handlerClickResult(r: google.maps.places.PlaceResult) {
    return () => {
      if ((r.formatted_address || r.geometry) && r.geometry && gmap.map) {
        gmap.map.setCenter(r.geometry.location);
        setMarkerToMap(r.geometry.location.lat(), r.geometry.location.lng());
        setSearchQuery(
          r.formatted_address ||
            (r.geometry
              ? `${r.geometry.location.lat()}, ${r.geometry.location.lng()}`
              : ''),
        );
        setResultSearch([]);
        setSelectedResult({
          lat: r.geometry.location.lat(),
          lng: r.geometry.location.lng(),
        });
      }
    };
  }

  function handlerAdd() {
    if (selectedResult && onAdd) {
      onAdd(selectedResult);
    }
  }

  return (
    <div>
      <div ref={searchInput} className={styles.search}>
        <TextField
          value={searchQuery}
          id="location-search"
          onChange={handlerSearch}
          alignIcon={TextFieldAlignment.left}
          placeholder={t(getCommonLocaleKey('search'))}
          icon={<Search />}
        />
        {resultSearch.length > 0 && (
          <Menu className={styles.results}>
            {resultSearch.map((r) => (
              <MenuItem
                onClick={handlerClickResult(r)}
                className={styles.result}
                key={r.formatted_address}
                value={r.formatted_address}
              >
                {r.formatted_address ||
                  (r.geometry
                    ? `${r.geometry.location.lat()}, ${r.geometry.location.lng()}`
                    : '')}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
      <div className={styles.map}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals={true}
          onClick={handlerOnClickMap}
          onGoogleApiLoaded={handleApiLoaded}
          center={{lat: center[0], lng: center[1]}}
          zoom={12}
          bootstrapURLKeys={{
            key: `${config.googleMapApiKey}&libraries=places`,
          }}
        />
      </div>
      <ModalAction>
        <Button onClick={onCancel} variant={ButtonVariants.Secondary}>
          {t(getCommonLocaleKey('cancel'))}
        </Button>
        <Button
          onClick={handlerAdd}
          disabled={!selectedResult}
          variant={ButtonVariants.Primary}
          className={styles.modalButton}
        >
          {t(getCommonLocaleKey('add'))}
        </Button>
      </ModalAction>
    </div>
  );
};

export default MapSelectLocation;
