import { useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import CitySearch from './CitySearch';
import axios from 'axios';
import LatLon from './LatLon';
import Map from './Map';

const API_KEY = "pk.65d9b97b58cfba3574d3a2e41edfe4d8";

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [displayMap, setDisplayMap] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const updateCity = (e) => {
    setSearchQuery(e.target.value);
  };

  const displayLatLon = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    try {
      const response = await axios.get(url);
      setLocation(response.data[0].display_name);
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      setDisplayMap(true);
      setDisplayError(false);
      console.log (response);
    } catch (error) {
      setDisplayMap(false);
      setDisplayError(true);
      setErrorMessage(`${error.response.status}: ${error.response.data.error}`);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <CitySearch
            updateCity={updateCity}
            displayLatLon={displayLatLon}
            hasError={displayError}
            errorMessage={errorMessage}
          />
        </Col>
      </Row>
      {displayMap && (
        <>
          <Row>
            <Col>
              <LatLon
                city={location}
                lat={latitude}
                lon={longitude}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Map
                img_url={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`}
                city={location}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Explorer;